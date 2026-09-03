/**
 * Text helpers for trimming CMS-authored copy down to a preview length.
 *
 * Kept free of React so the rules stay unit-testable, and so the truncation decision lives
 * in one place rather than as an inline condition in JSX. Team bios are written by club
 * execs with no length guidance, so the component cannot assume anything about them.
 */

/** Longest preview shown on a collapsed team card, in characters. */
export const TEAM_BIO_PREVIEW_LIMIT = 320;

/**
 * A bio is only truncated once it exceeds this, not merely the preview limit.
 *
 * Without the slack, a 324-character bio would get a "Read more" that reveals four more
 * characters — a control that costs a click and returns nothing.
 */
export const TEAM_BIO_TRUNCATE_THRESHOLD = 360;

/** Trailing punctuation that reads badly immediately before an ellipsis. */
const TRAILING_PUNCTUATION = /[\s.,;:!?—–-]+$/;

/**
 * Shorten `text` to at most `limit` characters, cutting on a word boundary.
 *
 * The returned string, ellipsis included, never exceeds `limit`. A single word longer than
 * the limit has no boundary to fall back to, so it is cut hard rather than returned whole —
 * otherwise the function could hand back text longer than the caller asked for.
 */
export function truncateAtWord(text: string, limit: number): string {
  const trimmed = text.trim();

  if (limit <= 0) {
    return "";
  }

  if (trimmed.length <= limit) {
    return trimmed;
  }

  // Reserve one character for the ellipsis so the result honours `limit` exactly.
  const budget = limit - 1;
  const candidate = trimmed.slice(0, budget);
  const lastSpace = candidate.lastIndexOf(" ");

  const cut = lastSpace > 0 ? candidate.slice(0, lastSpace) : candidate;

  return `${cut.replace(TRAILING_PUNCTUATION, "")}…`;
}

export interface BioPreview {
  /** What the collapsed card shows. Empty when there is no bio. */
  preview: string;
  /** Whether anything was withheld, and therefore whether to offer the full text. */
  isTruncated: boolean;
}

/**
 * Decide what a team card shows for a bio.
 *
 * `bio` is optional in the CMS, so a member can be published before their bio is written.
 * That case returns an empty preview and no affordance, letting the card skip the paragraph
 * rather than render an empty one.
 */
export function getBioPreview(bio: string | null | undefined): BioPreview {
  if (typeof bio !== "string") {
    return { preview: "", isTruncated: false };
  }

  const trimmed = bio.trim();

  if (!trimmed) {
    return { preview: "", isTruncated: false };
  }

  if (trimmed.length <= TEAM_BIO_TRUNCATE_THRESHOLD) {
    return { preview: trimmed, isTruncated: false };
  }

  return {
    preview: truncateAtWord(trimmed, TEAM_BIO_PREVIEW_LIMIT),
    isTruncated: true,
  };
}
