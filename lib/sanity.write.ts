import "server-only";

import { createClient } from "next-sanity";

/**
 * Write-side Sanity client and the QR scan counter.
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
 * Record one scan of the QR code.
 *
 * Intended to be called via `after()` so it runs once the redirect response has already
 * been flushed — the visitor never waits on this.
 *
 * Failures are swallowed by design. A counter is not worth breaking a redirect that
 * someone is standing in front of a poster waiting on, and the destination has already
 * been sent by the time this runs anyway.
 */
export async function recordQrScan(): Promise<void> {
  if (!writeClient) {
    // No token configured (e.g. local dev without one). Counting is optional.
    return;
  }

  try {
    await writeClient
      .transaction()
      // The document may not exist yet on the very first scan, and a bare patch()
      // against a missing document throws.
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
          .set({ lastScannedAt: new Date().toISOString() }),
      )
      // Don't wait for the document to become visible to queries.
      .commit({ visibility: "async" });
  } catch (error) {
    console.error("Failed to record QR scan:", error);
  }
}
