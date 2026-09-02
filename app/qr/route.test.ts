import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NextRequest } from "next/server";

/**
 * Route-level tests for the QR redirect.
 *
 * Sanity and the scan counter are mocked so these run offline and never touch the real
 * dataset. What is being checked here is the contract a printed poster depends on: the
 * status code, the Location header, and the cache headers.
 */

const fetchMock = vi.fn();
const recordQrScanMock = vi.fn();

vi.mock("@/lib/sanity", () => ({
  client: {
    withConfig: () => ({ fetch: fetchMock }),
  },
}));

vi.mock("@/lib/sanity.write", () => ({
  recordQrScan: recordQrScanMock,
}));

// `after()` requires a real request scope, which does not exist in a unit test.
vi.mock("next/server", async (importOriginal) => {
  const actual = await importOriginal<typeof import("next/server")>();
  return { ...actual, after: (fn: () => void) => fn() };
});

const { GET } = await import("./route");

/** Minimal stand-in for the parts of NextRequest this route actually reads. */
function requestFor(url = "http://localhost:3000/qr") {
  return { nextUrl: new URL(url) } as NextRequest;
}

describe("GET /qr", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  it("redirects to the configured absolute destination", async () => {
    fetchMock.mockResolvedValue({ target: "https://forms.gle/example" });

    const response = await GET(requestFor());

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://forms.gle/example");
  });

  it("resolves a site-relative destination against the request origin", async () => {
    fetchMock.mockResolvedValue({ target: "/events" });

    const response = await GET(requestFor());

    expect(response.headers.get("location")).toBe("http://localhost:3000/events");
  });

  it("sends visitors home when no document exists", async () => {
    fetchMock.mockResolvedValue(null);

    const response = await GET(requestFor());

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/");
  });

  it("sends visitors home when the destination is unsafe", async () => {
    fetchMock.mockResolvedValue({ target: "javascript:alert(1)" });

    const response = await GET(requestFor());

    expect(response.headers.get("location")).toBe("http://localhost:3000/");
  });

  it("still redirects when Sanity is unreachable", async () => {
    fetchMock.mockRejectedValue(new Error("network down"));

    const response = await GET(requestFor());

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/");
  });

  it("never lets the response be cached", async () => {
    fetchMock.mockResolvedValue({ target: "https://example.com/" });

    const response = await GET(requestFor());

    expect(response.headers.get("cache-control")).toContain("no-store");
    expect(response.headers.get("x-robots-tag")).toBe("noindex");
  });

  it("records the scan", async () => {
    fetchMock.mockResolvedValue({ target: "https://example.com/" });

    await GET(requestFor());

    expect(recordQrScanMock).toHaveBeenCalledTimes(1);
  });

  it("records the scan even when the destination falls back", async () => {
    fetchMock.mockRejectedValue(new Error("network down"));

    await GET(requestFor());

    expect(recordQrScanMock).toHaveBeenCalledTimes(1);
  });
});
