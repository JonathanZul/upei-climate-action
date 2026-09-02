# 🌱 UPEI Climate Action Association Website

This repository contains the frontend source code for the official website of the Climate Action Association at UPEI, built with Next.js and Tailwind CSS.

**Live Website:** [https://upeiclimateaction.ca](https://upeiclimateaction.ca)

---

## Tech Stack

-   **Framework:** Next.js (App Router)
-   **Styling:** Tailwind CSS
-   **CMS:** Sanity.io (Headless)
-   **Deployment:** Vercel

---

## Getting Started

### Prerequisites

-   Node.js (v18 or later)
-   npm

### 1. Clone the Repository

```bash
git clone https://github.com/JonathanZul/upei-climate-action.git
cd upei-climate-action
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in the real values:

```bash
cp .env.example .env.local
```

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | Sanity project to read content from |
| `NEXT_PUBLIC_SANITY_DATASET` | Yes | Usually `production` |
| `SANITY_WEBHOOK_SECRET` | Yes | Verifies the on-demand revalidation webhook |
| `SANITY_API_WRITE_TOKEN` | No | Increments the QR scan counter. Without it, `/qr` still redirects but stops counting scans |
| `RESEND_API_KEY` | Yes | Sends contact form submissions |
| `CONTACT_FORM_EMAIL_TO` | Yes | Where contact form submissions are delivered |
| `BEEHIIV_API_KEY` | Yes | Newsletter subscriptions |
| `BEEHIIV_PUBLICATION_ID` | Yes | Newsletter publication to subscribe people to |

Never commit real values. `.env.local` is gitignored; `.env.example` is committed and holds placeholders only.

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

### 5. Run the Checks

```bash
npm run test       # unit tests
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

---

## Dynamic QR Code Redirect

Posters carry a **static** QR code encoding `https://upeiclimateaction.ca/qr`. That image
can never change once printed, so `/qr` looks up its destination in the CMS on every scan
and forwards the visitor there. Changing where a poster sends people is a CMS edit — no
deploy, no reprint.

### For CMS users

1. Open the Studio and click **QR Code Redirect** (pinned at the top of the sidebar).
2. Paste the new destination into **Redirect Destination** — either a full link
   (`https://forms.gle/...`) or an internal path (`/events`).
3. Optionally note what it points to in **Internal Label**.
4. Press **Publish**. The change is live on the next scan; there is no cache to wait out.

**QR Scan Stats** shows how many times the code has been scanned and when it was last
used. Those numbers are written by the website and cannot be edited by hand.

If no destination is set — or the document is unpublished, or Sanity is unreachable — the
QR code sends visitors to the homepage rather than an error page. A printed code never
dead-ends.

### For developers

| Piece | Location |
| --- | --- |
| Route handler | `app/qr/route.ts` |
| Destination sanitizer | `lib/qr.ts` |
| Scan counter | `lib/sanity.write.ts` |
| Schemas | `schemas/qrRedirect.ts`, `schemas/qrRedirectStats.ts` (CMS repo) |
| Studio nav + singleton locking | `structure.ts`, `sanity.config.ts` (CMS repo) |

The route is `force-dynamic` and sets `Cache-Control: no-store`, and it responds **307**
rather than 301 — browsers cache permanent redirects indefinitely, which would pin every
printed poster to whichever destination was set first.

Only `http`/`https` URLs and site-relative paths are accepted. Anything else (a
`javascript:` URI, a protocol-relative `//host`) falls back to the homepage.

---

## Deployment

This project is deployed on [Vercel](https://vercel.com). The `main` branch is automatically deployed to production.

To deploy changes, create a pull request from a feature branch into `main`. Once merged, Vercel will trigger a new build and deployment.
