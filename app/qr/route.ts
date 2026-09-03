import { groq } from "next-sanity";
import { after, type NextRequest, NextResponse } from "next/server";

import { client } from "@/lib/sanity";
import { isBotUserAgent, normalizeRedirectTarget } from "@/lib/qr";
import { recordQrScan } from "@/lib/sanity.write";

/**
 * Dynamic QR code redirect.
 *
 * Printed posters carry a static QR code encoding https://upeiclimateaction.ca/qr.
 * The image can never change once printed, so this route reads the current destination
 * from Sanity on every request and forwards the visitor there. Changing the link is a
 * CMS edit, not a deploy and not a reprint.
 *
 * A route handler rather than a page: there is nothing to render, and it gives direct
 * control over the status code and cache headers, both of which matter here.
 */

// Never prerender or cache this route — the destination is expected to change at any
// time, and a cached copy would keep sending people to a stale link.
export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Reads the published singleton only. Sanity drafts live under a `drafts.` id prefix, so
 * matching the bare id means an editor's unpublished work-in-progress is never served to
 * someone scanning a poster — they have to press Publish.
 */
const QR_REDIRECT_QUERY = groq`*[_type == "qrRedirect" && _id == "qrRedirect"][0]{ target }`;

interface QrRedirectDocument {
  target?: string;
}

/**
 * Fetch the configured destination, or null if it cannot be determined.
 *
 * Deliberately bypasses both caches: the shared client is configured with `useCdn: true`,
 * which can serve stale data for a short window after an edit, and `no-store` keeps
 * Next's own data cache out of the way.
 */
async function fetchQrTarget(): Promise<string | null> {
  try {
    const doc = await client
      .withConfig({ useCdn: false })
      .fetch<QrRedirectDocument | null>(
        QR_REDIRECT_QUERY,
        {},
        { cache: "no-store" },
      );

    return doc?.target ?? null;
  } catch (error) {
    // Sanity unreachable, misconfigured, rate-limited... A poster in the wild must not
    // dead-end, so fall back rather than surfacing a 500.
    console.error("Failed to load QR redirect target:", error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const configuredTarget = await fetchQrTarget();
  const target = normalizeRedirectTarget(configuredTarget);

  // Bots are still redirected — they just aren't counted. Sharing the link in a group
  // chat makes several unfurlers fetch it at once, which would otherwise show up as a
  // burst of scans that no person ever made.
  const userAgent = request.headers.get("user-agent");
  if (!isBotUserAgent(userAgent)) {
    // Runs after the response is flushed, so the visitor never waits on the write.
    after(() => recordQrScan({ target, userAgent }));
  }

  const response = NextResponse.redirect(
    new URL(target, request.nextUrl.origin),
    // 307, never 301: browsers cache permanent redirects indefinitely, which would pin
    // every scanned poster to whichever destination happened to be set first.
    307,
  );

  response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
  // Keep crawlers out of /qr so they neither index the hop nor inflate scan counts.
  response.headers.set("X-Robots-Tag", "noindex");

  return response;
}
