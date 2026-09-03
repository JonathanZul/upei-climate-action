import "server-only";

import { createHash } from "node:crypto";

import { createClient } from "next-sanity";

import { classifyDevice, scanDayKey } from "@/lib/qr";

/**
 * Write-side Sanity client and the QR scan recorder.
 *
 * Kept out of `lib/sanity.ts` on purpose: that module also exports `urlFor()`, which is
 * imported by client components, and an API token has no business living in a module
 * that participates in the client graph. The `server-only` import turns any accidental
 * client import of this file into a build error rather than a silent problem.
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = "2023-05-03"; // Matches lib/sanity.ts
const token = process.env.SANITY_API_WRITE_TOKEN;

/** Fixed document id of the stats singleton defined in the Studio. */
const QR_STATS_DOCUMENT_ID = "qrRedirectStats";

const writeClient =
  projectId && dataset && token
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false, // Never read stale data on a write path.
        token,
      })
    : null;

/**
 * Deterministic id for the rollup document covering one day and one destination.
 *
 * Determinism is the whole point: it lets a scan be recorded with createIfNotExists plus
 * inc, which the server applies atomically. The alternative — keeping counts in an array
 * on a single document — would need a read-modify-write per scan and would silently drop
 * counts whenever two scans overlapped.
 *
 * The target is hashed rather than embedded because Sanity ids allow only
 * [a-zA-Z0-9._-], which URLs are not. 12 hex characters is ample for the handful of
 * destinations a club uses.
 */
function scanDayDocumentId(day: string, target: string): string {
  const targetHash = createHash("sha256").update(target).digest("hex").slice(0, 12);
  return `qrScanDay.${day}.${targetHash}`;
}

interface RecordQrScanInput {
  /** The normalized destination the visitor was actually sent to. */
  target: string;
  /** Raw User-Agent header, used only for a coarse device bucket. */
  userAgent: string | null;
}

/**
 * Record one scan of the QR code.
 *
 * Intended to be called via `after()` so it runs once the redirect response has already
 * been flushed — the visitor never waits on this.
 *
 * Writes two documents in a single transaction: the lifetime totals singleton, which
 * gives the dashboard a cheap headline, and a per-day/per-destination rollup, which is
 * what makes it possible to compare one campaign against another.
 *
 * Failures are swallowed by design. A counter is not worth breaking a redirect that
 * someone is standing in front of a poster waiting on, and the destination has already
 * been sent by the time this runs anyway.
 */
export async function recordQrScan({
  target,
  userAgent,
}: RecordQrScanInput): Promise<void> {
  if (!writeClient) {
    // No token configured (e.g. local dev without one). Counting is optional.
    return;
  }

  const now = new Date();
  const timestamp = now.toISOString();
  const day = scanDayKey(now);
  const device = classifyDevice(userAgent);
  const dayDocumentId = scanDayDocumentId(day, target);

  try {
    await writeClient
      .transaction()
      // Neither document may exist yet, and a bare patch() against a missing document
      // throws.
      .createIfNotExists({
        _id: QR_STATS_DOCUMENT_ID,
        _type: "qrRedirectStats",
        scanCount: 0,
      })
      // inc() is applied server-side, so simultaneous scans cannot lose counts the way
      // a read-modify-write would.
      .patch(QR_STATS_DOCUMENT_ID, (patch) =>
        patch
          .inc({ scanCount: 1 })
          .setIfMissing({ firstScannedAt: timestamp })
          .set({ lastScannedAt: timestamp, lastTarget: target }),
      )
      .createIfNotExists({
        _id: dayDocumentId,
        _type: "qrScanDay",
        date: day,
        target,
        count: 0,
        mobileCount: 0,
        tabletCount: 0,
        desktopCount: 0,
        unknownCount: 0,
        firstScanAt: timestamp,
      })
      .patch(dayDocumentId, (patch) =>
        patch
          .inc({ count: 1, [`${device}Count`]: 1 })
          .set({ lastScanAt: timestamp }),
      )
      // Don't wait for the documents to become visible to queries.
      .commit({ visibility: "async" });
  } catch (error) {
    console.error("Failed to record QR scan:", error);
  }
}
