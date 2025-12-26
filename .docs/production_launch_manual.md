# 🏭 Production Launch Manual (The "On-the-Job" Guide)

This document simulates the checklist a Senior DevOps/Product Engineer uses before taking a service public. Follow these steps to graduate from "Side Project" to "SaaS Product".

## Phase 1: The Identity (Domain Name)
Right now, you are on `captionkiln.vercel.app`. This screams "hobby project".
*   **Action**: Buy a domain (e.g., `captionkiln.com` or `captionkiln.io`).
*   **provider**: Namecheap, GoDaddy, or Vercel Domains (easiest integration).
*   **DNS Setup**:
    1.  Go to Vercel Project Settings -> **Domains**.
    2.  Add your domain.
    3.  Vercel gives you an `A Record` (76.76.21.21) or `CNAME` (cname.vercel-dns.com).
    4.  Login to your Domain Registrar and add these records.
    5.  **Professional Tip**: Always set up the `www` redirect to the non-www version (or vice versa) for SEO consistency.

## Phase 2: The Eye in the Sky (Analytics & Monitoring)
You cannot ship blind. If a user crashes, you need to know *why* before they complain.
*   **Error Tracking (Sentry.io)**:
    *   **Why**: It captures the exact line of code that crashed on the user's browser.
    *   **Setup**: `npx sentry-wizard@latest -i nextjs`.
*   **User Analytics (PostHog / Google Analytics 4)**:
    *   **Why**: "How many people clicked Export?", "Where do they drop off?"
    *   **Setup**: Install `posthog-js`. Add a provider in `app/layout.tsx`.

## Phase 3: SEO Validation (Google Search Console)
Owning the domain isn't enough; you must tell Google you own it.
*   **Action**:
    1.  Go to [search.google.com](https://search.google.com/search-console).
    2.  Add Property (Domain).
    3.  It will give you a **TXT Record** (e.g., `google-site-verification=...`).
    4.  Add this to your Domain DNS (same place as Phase 1).
    5.  Once verified, submit your standard sitemap: `https://captionkiln.com/sitemap.xml`.

## Phase 4: Production Environment Variables
Your `.env` file is local. Vercel needs to know the **Production** secrets.
*   **Action**:
    *   Go to Vercel Settings -> Environment Variables.
    *   Ensure `NEXT_PUBLIC_SUPABASE_URL` and `KEY` are set for **Production** environment.
    *   **Crucial**: If you have a different Stripe/PortOne key for *Live Payments*, add them here. Do NOT use Test keys in Production.

## Phase 5: The "Soft Launch" (Smoke Test)
Before tweeting it to the world:
1.  **Browser Test**: Open the site in Incognito Mode (no cache, no cookies).
2.  **Flow Test**: Sign up with a *new* email. Upload a video. Export it.
3.  **Mobile Test**: Open on your phone. Does the layout break?
4.  **Speed Test**: Run it through [PageSpeed Insights](https://pagespeed.web.dev/). Aim for >90 on Desktop.

## Phase 6: Legal Compliance (Korea Specific)
If you sell to Korean customers:
*   **Footer**: Must display Business Registration Number (사업자등록번호), Address, and CEO Name.
*   **Mail Order License**: (통신판매업신고) is required for e-commerce.

---

**Ready to start Phase 1?**
Go purchase your domain. I can help with the DNS configuration once you have it.
