# Zrutam 360 Marketing Funnel — Design Document

**Date:** 2026-03-30
**Status:** Approved

## Overview

Build a 3-page marketing funnel for the Zrutam 360° Leadership Feedback product, targeting CHROs and HR Directors at MNCs in India, Dubai, and Singapore. The funnel converts thought leadership into demo bookings.

**Flow:** Blog Article → ROI Calculator → Product Landing Page → Book a Demo

Each page is shareable independently and cross-links to the next step in the funnel.

## Deliverables

### 1. Product Landing Page — `/tools/360`

Replaces the current "Coming Soon" placeholder. Full marketing landing page.

**Sections:**
1. **Hero** — Dark navy gradient background. Headline: "Enterprise-Grade 360° Feedback, Built for India's Frontline Leaders." Subheadline about 1/10th the cost of global players. Two CTAs: "Book a Demo" (primary, mailto:ceo@zrutam.com) + "Calculate Your Risk" (secondary, links to /360-calculator).
2. **Problem Statement** — "Why 360° Feedback Is Broken" — 3 cards covering Survey Fatigue (47-sec attention span), 50-Question Danger Zone (satisfaction drops to 56%), 40-Page Paralysis & Cost ($100-500/person).
3. **How It Works** — 4 steps: Setup (upload CSV, configure competencies) → Survey (10-15 min, mobile-friendly, auto-reminders) → Analyse (AI-powered 6-page infographic report) → Act (focus areas + development nudges).
4. **Features Grid** — 6-8 cards: 5 Competency Frameworks, 4 Rater Types, 6-Page Infographic PDF Report, Real-time Coverage Dashboard, Auto-Reminders (Day 3/5/9), Rater Management, Bulk ZIP Download, DPDP/GDPR Compliant.
5. **Sample Report Preview** — Screenshot/image of demo report PDF.
6. **Pricing Hint** — "Starting at ₹1,999/person (~$24 USD)" + "Contact for Volume Pricing" CTA.
7. **FAQ** — 5-6 questions covering what's included, survey duration, anonymity, onboarding process, etc.
8. **CTA Footer** — "Ready to build data-driven leaders?" + Book a Demo button.

**Design:** Matches existing site theme (navy/teal/amber). Uses Framer Motion for animations. Reuses shared Navbar/Footer.

### 2. ROI Calculator Page — `/360-calculator`

Convert standalone HTML calculator (calc.txt) into a Next.js React page.

**Layout:**
- Header with title and explainer
- Two-column (desktop), single-column (mobile):
  - Left: Input panel — Company Demographics (headcount, salary, USD/INR toggle, management tier breakdown) + Adjustable Assumptions (sliders with industry benchmark anchors)
  - Right: Sticky results dashboard — live-updating risk metrics with animated meter bars, danger indicators, total annual risk figure
- Bottom CTA: "Stop the Guesswork — Book a Demo" (mailto:ceo@zrutam.com) + link to /tools/360

**Technical:** All calculator logic (formulas, slider ranges, currency conversion) ported from calc.txt as React state/effects. Tailwind classes adapted to match site design system.

### 3. Blog Article — `/blog/why-legacy-360-assessments-fail`

New blog post in existing blog system.

**Metadata:**
- slug: `why-legacy-360-assessments-fail`
- title: "The Attention Economy: Why Legacy 360° Assessments Are Failing Your Frontline"
- category: "360° Feedback"
- readTime: "8 min read"
- keyword: "360 degree feedback assessment"

**Content sections:**
1. The multi-trillion dollar blind spot — why frontline managers matter
2. Survey Fatigue Epidemic — attention span data
3. The 50-Question Danger Zone — satisfaction/dropout data
4. 40-Page Paralysis & Prohibitive Costs
5. How Zrutam Solves This — concise surveys, actionable reports, scalable pricing
6. CTA: "Calculate your organization's hidden risk" → /360-calculator

**Integration:** Added to `BLOG_POSTS` in constants.ts + `articleContent` in blog slug page.

## Cross-Linking Strategy

| From | CTA | To |
|------|-----|----|
| Blog article | "Calculate your risk" | /360-calculator |
| Calculator | "See the solution" / "Book a Demo" | /tools/360 / mailto:ceo@zrutam.com |
| Product page | "Calculate Your Risk" | /360-calculator |
| Product page | "Book a Demo" (primary) | mailto:ceo@zrutam.com |
| Product page | "Read: Why Legacy Assessments Fail" | Blog article |

## Navigation Updates

- Update `/tools/360` nav link label from implying "coming soon" to active product
- Add `/360-calculator` as a sub-link under Tools if appropriate
- Blog article appears naturally in blog listing

## Brand/Styling

- Colors: navy (#0A1628), teal (#0EA5E9), amber (#F59E0B)
- Font: Inter (via Google Fonts)
- Animations: Framer Motion (consistent with rest of site)
- Responsive: Mobile-first, tested at mobile/tablet/desktop

## Contact Details

- Demo bookings: ceo@zrutam.com
- Support: support@zrutam.com
- Phone: displayed on product page
