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

Create a file named `.env.local` in the project root and add the necessary environment variables.

```# .env.local

# Sanity.io Credentials
NEXT_PUBLIC_SANITY_PROJECT_ID="YOUR_SANITY_PROJECT_ID"
NEXT_PUBLIC_SANITY_DATASET="production"

# Sanity Webhook Secret for On-Demand Revalidation
SANITY_WEBHOOK_SECRET="YOUR_WEBHOOK_SECRET"

# Resend API Key (Contact Form)
RESEND_API_KEY="YOUR_RESEND_API_KEY"
CONTACT_FORM_EMAIL_TO="your-club-email@example.com"

# Mailchimp Credentials (Newsletter) (DEPRECATED)
MAILCHIMP_API_KEY="YOUR_MAILCHIMP_API_KEY"
MAILCHIMP_AUDIENCE_ID="YOUR_AUDIENCE_ID"
MAILCHIMP_SERVER_PREFIX="YOUR_MAILCHIMP_SERVER_PREFIX" # e.g., us14

# BeeHiiv Credentials (Replaces Mailchimp for Newsletter)
BEEHIIV_API_KEY="OaiV2BX1505QF96UoCNu7SI52vwcDgIlCiNP0ln8PIgmypiXfdUsUfTJdTRzsvBn"
BEEHIIV_PUBLICATION_ID="pub_446df571-9daa-422a-9973-29c064860f1a"
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

---

## Deployment

This project is deployed on [Vercel](https://vercel.com). The `main` branch is automatically deployed to production.

To deploy changes, create a pull request from a feature branch into `main`. Once merged, Vercel will trigger a new build and deployment.
