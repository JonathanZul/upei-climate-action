import { describe, expect, it } from "vitest";

import { normalizeRedirectTarget, QR_FALLBACK_TARGET } from "./qr";

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
