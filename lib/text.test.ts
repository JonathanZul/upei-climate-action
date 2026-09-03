import { describe, expect, it } from "vitest";

import {
  getBioPreview,
  TEAM_BIO_PREVIEW_LIMIT,
  TEAM_BIO_TRUNCATE_THRESHOLD,
  truncateAtWord,
} from "./text";

/** Build a string of `count` characters made of short whole words. */
function words(count: number): string {
  return "lorem ipsum ".repeat(Math.ceil(count / 12)).slice(0, count).trim();
}

describe("truncateAtWord", () => {
  it("returns short text untouched", () => {
    expect(truncateAtWord("a short bio", 320)).toBe("a short bio");
  });

  it("returns text of exactly the limit untouched", () => {
    const exact = words(50);
    expect(truncateAtWord(exact, exact.length)).toBe(exact);
  });

  it("never returns more characters than the limit", () => {
    for (const limit of [10, 25, 80, 320]) {
      expect(truncateAtWord(words(1000), limit).length).toBeLessThanOrEqual(limit);
    }
  });

  it("cuts on a word boundary rather than mid-word", () => {
    const result = truncateAtWord("alpha bravo charlie delta echo", 20);
    // Every word kept must be a whole word from the original.
    const kept = result.replace("…", "").split(" ").filter(Boolean);
    const original = "alpha bravo charlie delta echo".split(" ");
    for (const word of kept) {
      expect(original).toContain(word);
    }
  });

  it("appends exactly one ellipsis character", () => {
    const result = truncateAtWord(words(1000), 100);
    expect(result.endsWith("…")).toBe(true);
    expect([...result].filter((c) => c === "…")).toHaveLength(1);
  });

  it("strips trailing punctuation before the ellipsis", () => {
    // "one two," lands right at the boundary, so the comma would otherwise sit before "…".
    const result = truncateAtWord("one two, three four five six", 12);
    expect(result).not.toContain(",…");
  });

  it("hard-cuts a single word longer than the limit", () => {
    const long = "a".repeat(500);
    const result = truncateAtWord(long, 50);
    expect(result).toHaveLength(50);
    expect(result.endsWith("…")).toBe(true);
  });

  it("trims surrounding whitespace", () => {
    expect(truncateAtWord("   spaced out   ", 320)).toBe("spaced out");
  });

  it("returns an empty string for a non-positive limit", () => {
    expect(truncateAtWord("anything", 0)).toBe("");
  });
});

describe("getBioPreview", () => {
  describe("shows the bio in full", () => {
    it("when it is comfortably short", () => {
      const bio = words(120);
      expect(getBioPreview(bio)).toEqual({ preview: bio, isTruncated: false });
    });

    it("when it is over the preview limit but within the threshold", () => {
      // This is the case the threshold exists for: truncating here would hide a handful
      // of characters behind a click.
      const bio = words(TEAM_BIO_PREVIEW_LIMIT + 4);
      expect(bio.length).toBeGreaterThan(TEAM_BIO_PREVIEW_LIMIT);
      expect(bio.length).toBeLessThanOrEqual(TEAM_BIO_TRUNCATE_THRESHOLD);

      const { preview, isTruncated } = getBioPreview(bio);
      expect(isTruncated).toBe(false);
      expect(preview).toBe(bio);
    });

    it("at exactly the threshold", () => {
      const bio = words(TEAM_BIO_TRUNCATE_THRESHOLD);
      expect(getBioPreview(bio).isTruncated).toBe(false);
    });
  });

  describe("truncates", () => {
    it("once past the threshold", () => {
      const bio = words(TEAM_BIO_TRUNCATE_THRESHOLD + 40);
      const { preview, isTruncated } = getBioPreview(bio);

      expect(isTruncated).toBe(true);
      expect(preview.length).toBeLessThanOrEqual(TEAM_BIO_PREVIEW_LIMIT);
      expect(preview.endsWith("…")).toBe(true);
    });

    it("a long real-world bio, keeping the opening intact", () => {
      // Roughly the length of the longest bio currently in the CMS.
      const bio = `Ilakiza coordinates events and outreach. ${words(864)}`;
      const { preview, isTruncated } = getBioPreview(bio);

      expect(isTruncated).toBe(true);
      expect(preview.startsWith("Ilakiza coordinates events and outreach.")).toBe(true);
      expect(preview.length).toBeLessThanOrEqual(TEAM_BIO_PREVIEW_LIMIT);
    });
  });

  describe("offers no affordance", () => {
    it.each([
      ["undefined", undefined],
      ["null", null],
      ["an empty string", ""],
      ["whitespace only", "   \n  "],
    ])("for %s", (_label, bio) => {
      expect(getBioPreview(bio)).toEqual({ preview: "", isTruncated: false });
    });
  });
});
