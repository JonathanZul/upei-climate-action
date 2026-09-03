import { describe, expect, it } from "vitest";

import {
  classifyDevice,
  isBotUserAgent,
  normalizeRedirectTarget,
  QR_FALLBACK_TARGET,
  scanDayKey,
} from "./qr";

describe("normalizeRedirectTarget", () => {
  describe("accepts", () => {
    it("an absolute https URL", () => {
      expect(normalizeRedirectTarget("https://forms.gle/example")).toBe(
        "https://forms.gle/example",
      );
    });

    it("an absolute http URL", () => {
      expect(normalizeRedirectTarget("http://example.com/page")).toBe(
        "http://example.com/page",
      );
    });

    it("a URL with a query string and fragment", () => {
      const target = "https://example.com/form?entry.1=abc&entry.2=d#section";
      expect(normalizeRedirectTarget(target)).toBe(target);
    });

    it("a site-relative path", () => {
      expect(normalizeRedirectTarget("/events")).toBe("/events");
    });

    it("a site-relative path with a query string", () => {
      expect(normalizeRedirectTarget("/blog?tag=climate")).toBe("/blog?tag=climate");
    });

    it("a value padded with whitespace, trimming it", () => {
      expect(normalizeRedirectTarget("  https://example.com/  ")).toBe(
        "https://example.com/",
      );
    });
  });

  describe("falls back", () => {
    it.each([
      ["a javascript: URI", "javascript:alert(1)"],
      ["a data: URI", "data:text/html,<script>alert(1)</script>"],
      ["a protocol-relative URL that would escape the site", "//evil.com"],
      ["a protocol-relative URL with a path", "//evil.com/phish"],
      ["a mailto: URI", "mailto:someone@example.com"],
      ["a file: URI", "file:///etc/passwd"],
      ["an unparseable string", "not a url at all"],
      ["a bare hostname with no scheme", "example.com"],
      ["an empty string", ""],
      ["a whitespace-only string", "   "],
    ])("for %s", (_label, input) => {
      expect(normalizeRedirectTarget(input)).toBe(QR_FALLBACK_TARGET);
    });

    it("for null", () => {
      expect(normalizeRedirectTarget(null)).toBe(QR_FALLBACK_TARGET);
    });

    it("for undefined", () => {
      expect(normalizeRedirectTarget(undefined)).toBe(QR_FALLBACK_TARGET);
    });
  });

  it("never returns an empty destination", () => {
    for (const input of ["", "   ", "javascript:void 0", null, undefined]) {
      expect(normalizeRedirectTarget(input).length).toBeGreaterThan(0);
    }
  });
});

describe("scanDayKey", () => {
  it("formats as YYYY-MM-DD", () => {
    expect(scanDayKey(new Date("2026-09-02T15:00:00Z"))).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("buckets a late-evening local scan on the local day, not the UTC one", () => {
    // 2026-09-03T02:30Z is 2026-09-02 23:30 in Charlottetown (ADT, UTC-3).
    // Bucketing by UTC would file this under the 3rd and split the evening in two.
    expect(scanDayKey(new Date("2026-09-03T02:30:00Z"))).toBe("2026-09-02");
  });

  it("rolls over at local midnight", () => {
    // 03:30Z on the 3rd is 00:30 local on the 3rd.
    expect(scanDayKey(new Date("2026-09-03T03:30:00Z"))).toBe("2026-09-03");
  });

  it("handles a winter date, when the offset is UTC-4 rather than UTC-3", () => {
    // 2026-01-15T03:30Z is 2026-01-14 23:30 local (AST).
    expect(scanDayKey(new Date("2026-01-15T03:30:00Z"))).toBe("2026-01-14");
  });

  it("handles the spring DST transition", () => {
    // Clocks jump 02:00 -> 03:00 local on 2026-03-08.
    expect(scanDayKey(new Date("2026-03-08T05:30:00Z"))).toBe("2026-03-08");
  });
});

describe("classifyDevice", () => {
  it.each([
    [
      "an iPhone",
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
      "mobile",
    ],
    [
      "an Android phone",
      "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
      "mobile",
    ],
    [
      "an iPad",
      "Mozilla/5.0 (iPad; CPU OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/604.1",
      "tablet",
    ],
    [
      "an Android tablet, which also carries Linux/Android tokens",
      "Mozilla/5.0 (Linux; Android 13; SM-X200) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      "tablet",
    ],
    [
      "a macOS desktop",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      "desktop",
    ],
    [
      "a Windows desktop",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      "desktop",
    ],
  ])("classifies %s", (_label, ua, expected) => {
    expect(classifyDevice(ua)).toBe(expected);
  });

  it.each([
    ["null", null],
    ["undefined", undefined],
    ["an empty string", ""],
    ["whitespace", "   "],
    ["an unrecognisable agent", "SomeUnknownClient/1.0"],
  ])("returns unknown for %s", (_label, ua) => {
    expect(classifyDevice(ua)).toBe("unknown");
  });
});

describe("isBotUserAgent", () => {
  it.each([
    ["Googlebot", "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"],
    ["Slack's unfurler", "Slackbot-LinkExpanding 1.0 (+https://api.slack.com/robots)"],
    ["WhatsApp", "WhatsApp/2.23.20.0"],
    ["Discord", "Mozilla/5.0 (compatible; Discordbot/2.0; +https://discordapp.com)"],
    ["Telegram", "TelegramBot (like TwitterBot)"],
    ["Facebook", "facebookexternalhit/1.1"],
    ["Twitter", "Twitterbot/1.0"],
    ["LinkedIn", "LinkedInBot/1.0"],
    ["Apple", "Mozilla/5.0 (Macintosh) AppleWebKit/605 (KHTML, like Gecko) Applebot/0.1"],
    ["iMessage previews", "Mozilla/5.0 (Macintosh) SkypeUriPreview Preview/0.5"],
    ["curl", "curl/8.4.0"],
    ["wget", "Wget/1.21.4"],
    ["python-requests", "python-requests/2.31.0"],
    ["headless Chrome", "Mozilla/5.0 (X11; Linux x86_64) HeadlessChrome/125.0.0.0"],
    ["an uptime monitor", "Mozilla/5.0 (compatible; UptimeRobot/2.0)"],
  ])("flags %s", (_label, ua) => {
    expect(isBotUserAgent(ua)).toBe(true);
  });

  it.each([
    ["null", null],
    ["undefined", undefined],
    ["an empty string", ""],
    ["whitespace only", "   "],
  ])("treats %s as a bot, since real clients always send an agent", (_label, ua) => {
    expect(isBotUserAgent(ua)).toBe(true);
  });

  it.each([
    [
      "an iPhone camera scan",
      "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
    ],
    [
      "an Android browser",
      "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Mobile Safari/537.36",
    ],
    [
      "desktop Safari",
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
    ],
  ])("does not flag %s", (_label, ua) => {
    expect(isBotUserAgent(ua)).toBe(false);
  });
});
