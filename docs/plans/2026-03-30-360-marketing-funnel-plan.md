# Zrutam 360 Marketing Funnel — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a 3-page marketing funnel (blog article → ROI calculator → product landing page) for the Zrutam 360° Feedback product.

**Architecture:** Three new/replacement pages in the existing Next.js App Router site. Blog article integrates into existing blog system via constants.ts + dynamic slug page. Calculator is a new React page converting standalone HTML. Product page replaces the current /tools/360 "Coming Soon" placeholder.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion, Lucide React icons

**Design doc:** `docs/plans/2026-03-30-360-marketing-funnel-design.md`

---

## Task 1: Add Blog Article to Constants & Blog System

**Files:**
- Modify: `src/lib/constants.ts` (add new BLOG_POSTS entry)
- Modify: `src/app/blog/[slug]/page.tsx` (add articleContent + slug to generateStaticParams)

**Step 1: Add blog post metadata to constants.ts**

Add this entry at the TOP of the `BLOG_POSTS` array (newest first):

```typescript
{
  slug: "why-legacy-360-assessments-fail",
  title: "The Attention Economy: Why Legacy 360° Assessments Are Failing Your Frontline",
  excerpt: "Legacy HR tools are incompatible with the modern workforce's attention span. Survey fatigue, bloated questionnaires, and 40-page reports are destroying data quality and paralyzing frontline managers.",
  category: "360° Feedback",
  date: "2026-03-28",
  readTime: "8 min read",
  keyword: "360 degree feedback assessment",
},
```

**Step 2: Add article content to blog slug page**

In `src/app/blog/[slug]/page.tsx`, add a new key to the `articleContent` object:

```typescript
"why-legacy-360-assessments-fail": [
  "If 360-degree feedback is so critical for frontline leadership development, why isn't it already standard practice? Because legacy HR tools are entirely incompatible with the modern workforce's attention span. By 2030, Generation Z will make up nearly 30% of the global workforce, rendering 1990s-era assessment tools obsolete.",

  "The Survey Fatigue Epidemic: Traditional 360 assessments contain 50 to 80 redundant questions — a catastrophic design flaw. Research from UC Irvine indicates the average on-screen attention span has plummeted from 2.5 minutes in 2004 to just 47 seconds today. SurveySparrow data reveals high dropout rates after just 9 minutes on mobile and 12 minutes on desktop. When organizations force employees through a 45-minute survey, respondents rush through to finish, destroying the accuracy of behavioral data.",

  "The 50-Question Danger Zone: The correlation between survey length and data quality is undeniable. A Milieu Insight study demonstrates that surveys with 10 to 20 questions yield 88% to 91% satisfaction rates. Once a survey crosses 50 questions (roughly 10 minutes), satisfaction plummets to 56% and the attention fail rate doubles.",

  "The 40-Page Paralysis and Prohibitive Costs: Legacy systems generate massive 40-page PDF reports filled with complex charts. For a new frontline manager, receiving a 40-page dossier isn't empowering — it's paralyzing. These assessments cost between $100 to $500 per employee. Scaling a $300, 60-question assessment across hundreds of frontline managers is a financial and logistical impossibility.",

  "At Zrutam LLP, we recognized the traditional multi-rater model was fundamentally broken — too long, too expensive, and misaligned with frontline reality. Our Zrutam 360° Assessment eliminates survey fatigue with frictionless 10-15 minute surveys focused on core observable competencies. Instead of paralyzing 40-page PDFs, managers receive clear, prioritized insights with 2-3 specific growth areas. Starting at just ₹1,999 INR (approx. $24 USD) per person, elite leadership insights no longer require an executive-tier budget.",

  "You cannot fix systemic engagement or productivity issues without developing your frontline. Calculate your organization's hidden financial risk with our free Organizational Risk Calculator at /360-calculator, then explore the Zrutam 360° Assessment at /tools/360.",
],
```

**Step 3: Verify the slug is picked up by generateStaticParams**

The existing `generateStaticParams` already maps all `BLOG_POSTS` — no change needed since it reads from the array dynamically.

**Step 4: Build and verify**

Run: `npm run build`
Expected: Successful build with the new blog slug generated.

**Step 5: Commit**

```bash
git add src/lib/constants.ts src/app/blog/[slug]/page.tsx
git commit -m "feat: add blog article on legacy 360 assessment failures"
```

---

## Task 2: Build the ROI Calculator Page

**Files:**
- Create: `src/app/360-calculator/page.tsx`

**Step 1: Create the calculator page**

Create `src/app/360-calculator/page.tsx` — a "use client" React component that ports all logic from `D:/calc.txt`.

The page must include:
- Metadata export for SEO (title: "Organizational Risk Calculator | Zrutam")
- **Header:** "Organizational Risk Calculator" with explainer text
- **Two-column layout** (lg:grid-cols-12):
  - Left (col-span-5): Input panel with:
    - Company Demographics: Total Headcount, Avg Base Salary (with USD/INR toggle), Top/Middle/Frontline manager counts
    - Adjustable Assumptions: 4 range sliders — Ineffective Managers (5-60%, default 30%), Flight Risk (10-60%, default 33%), Cost to Replace (20-150%, default 50%), Productivity Leakage (5-40%, default 20%)
    - "REVEAL RISK EXPOSURE" button
  - Right (col-span-7, sticky): Output panel with:
    - Staff total, Span of Control with meter bar (green/yellow/red thresholds at 7/12)
    - Big scary number: Annual Value at Risk (TVR)
    - Breakdown cards: Productivity Leakage + Turnover Cost
    - Methodology footnotes (Gallup, SHRM & DDI citations)
- **Bell Curve Section:** "The Selected Few Fallacy" — 10/70/20 distribution graphic showing the untouched middle
- **Bottom CTA:** "Stop the Guesswork" → mailto:ceo@zrutam.com + link to /tools/360

**Calculator formulas** (from calc.txt):
```
staff = total - (senior + middle + flm)
span = staff / flm
ineffectiveFLMs = ceil(flm * pctIneffective)
affectedStaff = round(ineffectiveFLMs * span)
totalFlightRisk = round(affectedStaff * pctFlight)
turnoverCost = totalFlightRisk * (salary * pctTurnover)
prodLoss = affectedStaff * (salary * pctProd)
totalRisk = turnoverCost + prodLoss
```

**Currency formatting:**
```
USD: >= 1M → "$X.XXM", else "$X,XXX"
INR: >= 1Cr → "₹X.XX Cr", >= 1L → "₹X.XX L", else "₹X,XXX"
Exchange rate: 83
```

**Span of control meter thresholds:**
- <= 7: green, "Healthy span of control"
- <= 12: yellow, "Moderate risk"
- > 12: red, "CRITICAL RISK"

**Animated number counting:** Use requestAnimationFrame with easeOutQuad easing over 1500ms on first reveal.

**Styling:** Match Zrutam site theme (navy/teal/amber color palette from tailwind.config.ts). Use Framer Motion for entrance animations. Glass-panel effect for input/output sections.

**Step 2: Build and verify**

Run: `npm run build`
Expected: Successful build, /360-calculator page generated.

**Step 3: Commit**

```bash
git add src/app/360-calculator/page.tsx
git commit -m "feat: add organizational risk calculator page"
```

---

## Task 3: Replace /tools/360 Product Landing Page

**Files:**
- Modify: `src/app/tools/360/page.tsx` (full replacement)

**Step 1: Replace the Coming Soon page with full product landing page**

Completely rewrite `src/app/tools/360/page.tsx`. The page must be "use client" and include:

**Section 1 — Hero:**
- Dark navy gradient (gradient-navy class)
- Headline: "Enterprise-Grade 360° Feedback, Built for India's Frontline Leaders"
- Subheadline: positioning vs global players at 1/10th cost
- Badge: "Now Live" (teal, replacing amber "Coming Soon")
- Primary CTA: "Book a Demo" → mailto:ceo@zrutam.com
- Secondary CTA: "Calculate Your Risk" → /360-calculator
- Framer Motion entrance animations

**Section 2 — Problem Statement: "Why 360° Feedback Is Broken"**
3 cards in a row:
1. Survey Fatigue — 47-second attention span stat, 9-min mobile dropout
2. The 50-Question Danger Zone — satisfaction drops from 91% to 56%
3. 40-Page Paralysis — $100-$500/person, paralyzing reports

**Section 3 — How It Works (4 steps):**
1. Setup — Upload CSV, configure 5 competency frameworks, assign rater types
2. Survey — 10-15 min mobile-friendly assessment, auto-reminders Day 3/5/9
3. Analyse — AI-powered 6-page infographic PDF (radar chart, heatmap, Johari window, verbatims)
4. Act — Focus areas with development nudges, IDP integration

**Section 4 — Features Grid (8 cards):**
5 Competency Frameworks, 4 Rater Types (Self/Direct Reports/Peers/Supervisor), 6-Page Infographic PDF, Real-time Coverage Dashboard, Auto-Reminders, Rater Management, Bulk ZIP Download, DPDP/GDPR Compliant

**Section 5 — Sample Report Preview:**
Visual mockup showing the 6 report pages (radar chart, heatmap, gap analysis, Johari window, verbatims, focus areas). Use styled placeholder cards since we can't embed the actual PDF in static export.

**Section 6 — Pricing:**
"Starting at ₹1,999/person (~$24 USD)" card with features list. "Contact for Volume Pricing" CTA → mailto:ceo@zrutam.com

**Section 7 — FAQ (5 questions):**
1. What does the 360° assessment include?
2. How long does the survey take?
3. Is the feedback anonymous?
4. How do we get started?
5. Can we customize the competency framework?

**Section 8 — CTA Footer:**
"Ready to build data-driven leaders?" + "Book a Demo" button + "Read: Why Legacy Assessments Fail" link to blog

**Step 2: Build and verify**

Run: `npm run build`
Expected: Successful build, /tools/360 page generated.

**Step 3: Commit**

```bash
git add src/app/tools/360/page.tsx
git commit -m "feat: replace 360 coming-soon with full product landing page"
```

---

## Task 4: Update Navigation & Cross-Links

**Files:**
- Modify: `src/lib/constants.ts` (update NAV_LINKS to add calculator)
- Modify: `src/components/Footer.tsx` (add 360 calculator to Resources links if applicable)

**Step 1: Add calculator to nav**

In `constants.ts`, under the Tools nav item, add the calculator:

```typescript
{ label: "Tools", href: "/tools/idp", children: [
  { label: "IDP Tool", href: "/tools/idp" },
  { label: "Zrutam 360", href: "/tools/360" },
  { label: "Risk Calculator", href: "/360-calculator" },
]},
```

**Step 2: Check Footer links**

If the Footer has a Resources column with hardcoded links, add the calculator and update the 360 tool description if it still says "Coming Soon".

**Step 3: Build and verify**

Run: `npm run build`
Expected: Clean build, all links working.

**Step 4: Commit**

```bash
git add src/lib/constants.ts src/components/Footer.tsx
git commit -m "feat: add calculator to navigation and update cross-links"
```

---

## Task 5: Final Build, Push & Deploy

**Step 1: Full build verification**

Run: `npm run build`
Expected: All pages build successfully, zero ESLint errors. Check output for the new routes: /360-calculator, /tools/360, /blog/why-legacy-360-assessments-fail.

**Step 2: Push to remote**

```bash
git push origin main
```

**Step 3: Verify Vercel deployment**

Monitor Vercel build logs. Confirm all 3 new pages are accessible:
- https://www.zrutam.com/blog/why-legacy-360-assessments-fail
- https://www.zrutam.com/360-calculator
- https://www.zrutam.com/tools/360

---

## Shareable Links Summary (for marketing use)

| Purpose | URL | Use Case |
|---------|-----|----------|
| Thought leadership | /blog/why-legacy-360-assessments-fail | Share on LinkedIn, email to prospects |
| Calculate their risk | /360-calculator | Share with CHROs to self-diagnose |
| Product page | /tools/360 | Send to serious prospects, demo follow-up |
| Book a demo | mailto:ceo@zrutam.com | All CTAs funnel here |
