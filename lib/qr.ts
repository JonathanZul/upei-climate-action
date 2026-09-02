/**
 * Helpers for the dynamic QR code redirect served at `/qr`.
 *
 * The printed poster encodes a static `https://upeiclimateaction.ca/qr` URL. Where that
 * URL forwards to is stored in Sanity and can be changed by a CMS editor at any time,
 * which is the whole point of the feature — but it also means the destination is
 * attacker-adjacent input from the app's perspective: it comes from a mutable external
 * system, and a mistake there must not turn into a broken or dangerous redirect.
 */

/** Where visitors go when no usable destination is configured. */
export const QR_FALLBACK_TARGET = "/";

/** URL schemes we are willing to forward a visitor to. */
const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

/**
 * Reduce a CMS-supplied destination to something safe to put in a `Location` header.
 *
 * Accepts absolute `http(s)` URLs and site-relative paths (`/events`). Everything else —
 * `javascript:` and `data:` URIs, protocol-relative `//evil.com`, unparseable strings,
 * blank values — collapses to {@link QR_FALLBACK_TARGET} so a scan always lands
 * somewhere sensible rather than erroring or dead-ending.
 *
 * The Studio validates this field too; this is the second gate, not the only one.
 *
 * @param raw The `target` value read from the `qrRedirect` document.
 * @returns A destination safe to redirect to. Never empty.
 */
export function normalizeRedirectTarget(raw: string | null | undefined): string {
  if (typeof raw !== "string") {
    return QR_FALLBACK_TARGET;
  }

  const value = raw.trim();
  if (!value) {
    return QR_FALLBACK_TARGET;
  }

  // Site-relative path. `//` is excluded deliberately: `new URL('//evil.com', origin)`
  // resolves to an off-site absolute URL, so a protocol-relative value would silently
  // escape the site while looking like a local path.
  if (value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }

  try {
    const url = new URL(value);
    if (ALLOWED_PROTOCOLS.has(url.protocol)) {
      return url.toString();
    }
  } catch {
    // Not a parseable absolute URL — fall through to the fallback.
  }

  return QR_FALLBACK_TARGET;
}
