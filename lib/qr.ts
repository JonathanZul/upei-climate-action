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

/**
 * Timezone the club operates in.
 *
 * Scan days are bucketed in local time, not UTC. Charlottetown is UTC-3/-4, so an
 * evening scan is already "tomorrow" in UTC — bucketing by UTC would smear a poster's
 * busiest hours across two days and quietly distort every daily chart built on it.
 */
export const CLUB_TIME_ZONE = "America/Halifax";

/** Coarse device buckets. Deliberately not fine-grained — see {@link classifyDevice}. */
export type DeviceType = "mobile" | "tablet" | "desktop" | "unknown";

/**
 * The `YYYY-MM-DD` day a scan belongs to, in {@link CLUB_TIME_ZONE}.
 *
 * `en-CA` formats dates as `YYYY-MM-DD` natively, so this needs no manual assembly of
 * the parts and no date library.
 */
export function scanDayKey(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: CLUB_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/**
 * Bucket a User-Agent into a coarse device type.
 *
 * Only broad enough to answer "did people scan this with a phone?". Tablets are checked
 * before phones on purpose: iPads and most Android tablets also carry mobile tokens, so
 * testing for mobile first would collapse every tablet into "mobile".
 */
export function classifyDevice(userAgent: string | null | undefined): DeviceType {
  if (typeof userAgent !== "string" || !userAgent.trim()) {
    return "unknown";
  }

  const ua = userAgent.toLowerCase();

  // iPadOS 13+ reports itself as a Mac, distinguishable only by touch support, which is
  // not visible from a User-Agent alone. Those land in "desktop"; an acceptable blur for
  // a coarse split.
  if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/.test(ua)) {
    return "tablet";
  }

  if (/mobile|iphone|ipod|android|blackberry|iemobile|opera mini|windows phone/.test(ua)) {
    return "mobile";
  }

  if (/windows|macintosh|mac os x|linux|cros|x11/.test(ua)) {
    return "desktop";
  }

  return "unknown";
}

/**
 * Substrings identifying automated clients: search crawlers, uptime monitors, scripted
 * HTTP clients, and — the ones that actually matter here — chat app link unfurlers.
 *
 * Posting the QR link in a group chat makes several services fetch it at once. Left
 * uncounted for, that adds a burst of phantom "scans" in seconds and corrupts exactly
 * the numbers used to judge whether a poster worked.
 */
const BOT_USER_AGENT_PATTERNS = [
  "bot",
  "crawler",
  "spider",
  "slurp",
  "facebookexternalhit",
  "whatsapp",
  "slackbot",
  "slack-imgproxy",
  "discord",
  "telegram",
  "twitter",
  "linkedin",
  "embedly",
  "quora link preview",
  "redditbot",
  "applebot",
  "skypeuripreview",
  "pinterest",
  "vkshare",
  "google-inspectiontool",
  "curl",
  "wget",
  "python-requests",
  "node-fetch",
  "axios",
  "got (",
  "okhttp",
  "headlesschrome",
  "phantomjs",
  "puppeteer",
  "playwright",
  "uptimerobot",
  "pingdom",
  "statuscake",
  "betteruptime",
  "vercel-screenshot",
  "lighthouse",
  "w3c_validator",
];

/**
 * Whether a request looks automated and so should not count as a scan.
 *
 * A missing or blank User-Agent counts as a bot. Every real phone camera and browser
 * sends one, so a blank value is far more likely to be automation than a person — a
 * deliberate trade of a rare undercount for materially honest numbers.
 *
 * This never affects the redirect itself; bots are still forwarded normally.
 */
export function isBotUserAgent(userAgent: string | null | undefined): boolean {
  if (typeof userAgent !== "string" || !userAgent.trim()) {
    return true;
  }

  const ua = userAgent.toLowerCase();
  return BOT_USER_AGENT_PATTERNS.some((pattern) => ua.includes(pattern));
}
