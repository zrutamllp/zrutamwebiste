# Zrutam Light Editorial Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restyle the entire 18-page Zrutam site from dark theme to a light, editorial, premium design ("Editorial Ink") without changing content, URLs, or tool logic; replace all mailto CTAs with a real Web3Forms contact form; ship a Hostinger-ready static build.

**Architecture:** In-place design-system swap. New Tailwind tokens + Fraunces/Inter fonts land first, then shared primitives (Button, SectionHeading, Card, Stat) and an SVG graphics library, then pages are restyled in dependency order (chrome → home → marketing → tools). Static export config (`output: "export"`, `trailingSlash: true`) is untouched.

**Tech Stack:** Next.js 14 App Router (static export), TypeScript, Tailwind 3, Framer Motion 12, `next/font/google` (Fraunces + Inter), Lucide icons, Web3Forms (no backend).

**Design doc:** `docs/plans/2026-07-14-light-editorial-redesign-design.md`

**Verification model:** This is a visual restyle of a project with no test framework — adding one is YAGNI. Every task's gate is: `npm run build` exits 0, then a browser check of the affected pages at desktop (1280px) and mobile (375px) via the dev server (`.claude/launch.json` already defines it). The three tools additionally get a functional check (interact, confirm outputs unchanged). Commit after every task.

---

## Shared reference: dark → light class map

Apply this map wherever old dark styling is met. Do not leave any entry of the left column in a restyled file.

| Old (dark) | New (light) |
|---|---|
| `bg-surface`, `bg-surface-raised`, `bg-surface-overlay`, `bg-navy`, `bg-navy-*` as page/section bg | `bg-paper` (default) or `bg-paper-warm` (alternating sections). Footer and stats band keep `bg-ink`. |
| `text-white` (headings) | `text-ink font-display` (serif for h1–h3) |
| `text-gray-300`, `text-gray-400`, `text-slate-*` (body on dark) | `text-navy-600` |
| `glass-card`, `bg-white/[0.04] border-white/10 backdrop-blur*` | `bg-white border border-navy-100 rounded-2xl shadow-card` |
| `border-white/10`, `border-white/5` | `border-navy-100` |
| `text-gradient` | `text-ink` with `<em className="italic text-teal-600">` on the emphasis word, or plain `text-teal-600` |
| `shadow-glow-teal*`, `shadow-glow-amber` | `hover:shadow-lift hover:-translate-y-1 transition` |
| `aurora-blob`, `animate-aurora-*` | delete (replaced by SVG motifs from Task 3) |
| `bg-grid-dots` | keep (utility gets re-tinted in Task 1) |
| `text-teal-300`, `text-teal-400` (links/accents on dark) | `text-teal-600 hover:text-teal-700` |
| `gradient-navy`, `gradient-teal` (deleted utilities — silently no-op) | `bg-paper`/`bg-paper-warm` section, or `bg-ink` if the section is an intentional dark anchor |
| `navy-50`, `navy-100`, `navy-900` usages written for the OLD dark scale | re-derive from context: old navy-50 `#1A2A44` was dark, new navy-50 `#F1F5F8` is near-white — do not keep the shade number blindly (affects AwardsSection, blog pages, tools/idp) |
| amber accents `text-amber-300/400` | `text-amber-600` |
| CTA `bg-teal hover:bg-teal-500` buttons | `<Button>` primitive (Task 2) |
| `mailto:ceo@zrutam.com` CTAs | `/contact/?interest=<slug>` links (Task 9 lists every location) |

Section rhythm: `py-20 md:py-28`; container `mx-auto max-w-6xl px-6`; reading columns `max-w-[65ch]`.

---

### Task 0: Branch

**Step 1:** `git checkout -b redesign/light-editorial`
**Step 2:** Verify: `git branch --show-current` → `redesign/light-editorial`

### Task 1: Design tokens, fonts, global styles

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Step 1: Replace the `theme.extend` of `tailwind.config.ts`** (content globs, plugins unchanged):

```ts
extend: {
  colors: {
    ink: "#0B2239",
    paper: { DEFAULT: "#FAF9F6", warm: "#F3F0E9" },
    navy: {
      DEFAULT: "#0B2239",
      900: "#071829", 800: "#0B2239", 700: "#16324B", 600: "#3E5A75",
      500: "#5F7A94", 400: "#8AA0B5", 300: "#AFC0D0", 200: "#CFDAE4",
      100: "#E4EBF1", 50: "#F1F5F8",
    },
    teal: {
      DEFAULT: "#0EA5E9",
      50: "#E0F2FE", 100: "#BAE6FD", 200: "#7DD3FC", 300: "#38BDF8",
      400: "#0EA5E9", 500: "#0284C7", 600: "#0369A1", 700: "#075985",
    },
    amber: {
      DEFAULT: "#F59E0B",
      50: "#FFFBEB", 100: "#FEF3C7", 200: "#FDE68A", 300: "#FCD34D",
      400: "#FBBF24", 500: "#F59E0B", 600: "#D97706", 700: "#B45309",
    },
  },
  fontFamily: {
    sans: ["var(--font-inter)", "system-ui", "sans-serif"],
    display: ["var(--font-fraunces)", "Georgia", "serif"],
  },
  boxShadow: {
    card: "0 1px 2px rgba(11,34,57,0.05), 0 1px 8px rgba(11,34,57,0.04)",
    lift: "0 16px 40px -16px rgba(11,34,57,0.22)",
  },
  keyframes: {
    marquee: {
      "0%": { transform: "translateX(0)" },
      "100%": { transform: "translateX(-50%)" },
    },
    "float-slow": {
      "0%, 100%": { transform: "translateY(0)" },
      "50%": { transform: "translateY(-12px)" },
    },
  },
  animation: {
    marquee: "marquee 35s linear infinite",
    "float-slow": "float-slow 6s ease-in-out infinite",
  },
},
```

Note: default Tailwind `gray` scale returns (we deleted the custom override — the values were identical to defaults; audit any `gray-*` usage still compiles, it will).

**Step 2: Replace `src/app/globals.css` entirely:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --navy: #0B2239;
  --teal: #0EA5E9;
  --amber: #F59E0B;
}

html {
  scroll-behavior: smooth;
}

body {
  color: #0b2239;
  background: #faf9f6;
}

::selection {
  background: rgba(14, 165, 233, 0.2);
  color: #0b2239;
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }
  .bg-grid-dots {
    background-image: radial-gradient(circle, rgba(11, 34, 57, 0.08) 1px, transparent 1px);
    background-size: 28px 28px;
  }
  /* faint paper grain, sits on body sections that want texture */
  .grain {
    position: relative;
  }
  .grain::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.35;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0.04 0 0 0 0 0.13 0 0 0 0 0.22 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E");
  }
  /* editorial link underline sweep */
  .link-underline {
    background-image: linear-gradient(currentColor, currentColor);
    background-repeat: no-repeat;
    background-size: 0% 1px;
    background-position: 0 100%;
    transition: background-size 0.3s ease;
  }
  .link-underline:hover {
    background-size: 100% 1px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  html {
    scroll-behavior: auto;
  }
}
```

(The Google Fonts CDN `@import` is gone — fonts now self-host via `next/font`, which also removes a render-blocking request.)

**Step 3: Update `src/app/layout.tsx` fonts** — add Fraunces alongside Inter:

```tsx
import { Inter, Fraunces } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});
```

and `<html lang="en" className={`${inter.variable} ${fraunces.variable}`}>`; body stays `font-sans antialiased` (add `bg-paper text-ink`).

**Step 4: Verify build** — `npm run build`. Expected: exit 0. Pages will look half-broken in the browser at this point (dark markup on light canvas) — that is expected until Tasks 4–11 land; do NOT try to fix pages here. If the build FAILS, it will be from deleted tokens (`surface`, `glow`, `aurora`, `shimmer`, custom `gray`) still referenced. Fix forward: grep each failing class (`grep -rn "bg-surface\|glow-\|aurora\|shimmer" src/`) and apply the class map above to just make the build pass (full restyle comes later). Tailwind won't fail the build on unknown classes, but TS/imports can — realistically build passes; browser check confirms fonts load (view-source shows `/​_next/static/media/*.woff2`, no fonts.googleapis.com).

**Step 5: Commit** — `git commit -am "feat: light editorial design tokens, Fraunces/Inter self-hosted fonts"`

### Task 2: Shared primitives

**Files:**
- Create: `src/components/ui/Button.tsx`
- Create: `src/components/ui/SectionHeading.tsx`
- Create: `src/components/ui/Card.tsx`
- Create: `src/components/ui/Stat.tsx`

**Step 1: `src/components/ui/Button.tsx`**

```tsx
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "outline" | "text";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper px-7 py-3.5 hover:bg-navy-700 hover:shadow-lift hover:-translate-y-0.5",
  outline:
    "border border-navy-200 text-ink px-7 py-3.5 hover:border-ink hover:-translate-y-0.5",
  text: "text-teal-600 hover:text-teal-700 px-1 py-1 group",
};

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
}: {
  href: string;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      {variant === "text" && (
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      )}
    </Link>
  );
}
```

**Step 2: `src/components/ui/SectionHeading.tsx`**

```tsx
export default function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  align?: "left" | "center";
}) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-3xl ${alignCls} mb-12 md:mb-16`}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600 mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-3xl md:text-5xl leading-[1.1] tracking-tight text-ink text-balance">
        {title}
      </h2>
      {lede && (
        <p className="mt-5 text-lg leading-relaxed text-navy-600 max-w-[65ch]">
          {lede}
        </p>
      )}
    </div>
  );
}
```

**Step 3: `src/components/ui/Card.tsx`**

```tsx
export default function Card({
  children,
  className = "",
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`bg-white border border-navy-100 rounded-2xl shadow-card ${
        hover ? "transition-all duration-300 hover:shadow-lift hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
```

**Step 4: `src/components/ui/Stat.tsx`** — wraps the existing `StatsCounter` count-up logic; presentational only:

```tsx
export default function Stat({
  value,
  label,
  dark = false,
}: {
  value: React.ReactNode; // animated number node from StatsCounter
  label: string;
  dark?: boolean;
}) {
  return (
    <div className="text-center">
      <div className={`font-display text-4xl md:text-6xl ${dark ? "text-amber-400" : "text-amber-600"}`}>
        {value}
      </div>
      <div className={`mt-2 text-sm uppercase tracking-[0.14em] ${dark ? "text-navy-300" : "text-navy-500"}`}>
        {label}
      </div>
    </div>
  );
}
```

**Step 5: Verify** — `npm run build` exits 0 (components compile even if unused yet).
**Step 6: Commit** — `git commit -am "feat: shared UI primitives (Button, SectionHeading, Card, Stat)"`

### Task 3: SVG graphics library

**Files:**
- Create: `src/components/graphics/NetworkMotif.tsx` — radial network: concentric thin circles (stroke `#0B2239` at 12–20% opacity), ~10 nodes (small filled circles, mix of teal/amber), connecting hairline arcs. Accepts `className`. Built as a pure inline `<svg viewBox="0 0 600 600">`.
- Create: `src/components/graphics/RadialRings.tsx` — 360°-evoking concentric rings with one amber arc segment (stroke-dasharray), for the 360 tool + calculator pages.
- Create: `src/components/graphics/GrowthArc.tsx` — ascending curved path with dotted grid behind and 3–4 nodes, for solutions/upskilling contexts.
- Create: `src/components/graphics/DotGrid.tsx` — parametric dotted-grid rectangle used as section background accent (absolute-positioned, `aria-hidden`).

**Rules for all four:** `aria-hidden="true"`, no fixed width/height (scale via className), strokes 1–1.5px, palette limited to navy/teal/amber with opacity, no gradients-on-gradients. Each ~30–60 lines. Optional gentle `animate-float-slow` on node groups.

**Step: Verify + commit** — `npm run build`; `git commit -am "feat: SVG graphics library (network, rings, arc, dot grid)"`

### Task 4: Navbar + Footer

**Files:**
- Modify: `src/components/Navbar.tsx` (306 lines)
- Modify: `src/components/Footer.tsx` (251 lines)

**Navbar recipe:** apply class map. Bar: `bg-paper/80 backdrop-blur-md border-b border-navy-100` when scrolled, transparent at top. Links `text-navy-600 hover:text-ink link-underline`. Dropdown panels: `bg-white border border-navy-100 shadow-lift rounded-xl`. Replace both `mailto:ceo@zrutam.com` CTAs (lines ~167, ~292) with `<Button href="/contact/">Book a Demo</Button>` (import primitive; mobile menu uses same). Logo: `public/logo.png` is navy-based — verify it reads on light bg (it will; it was designed for light originally).

**Footer recipe:** keep dark — `bg-ink text-navy-300`, headings `text-paper font-display`, links `hover:text-teal-300`, hairlines `border-navy-700`. Replace 2 mailto links (lines ~169, ~202) with `/contact/` links (keep a plain `ceo@zrutam.com` text line under "Contact" as information, not a CTA).

**Verify:** dev server → check `/` top nav + footer, desktop + 375px (hamburger menu opens, dropdown works). **Commit.**

### Task 5: Home page

**Files:**
- Modify: `src/components/HeroSection.tsx`, `src/components/SolutionCard.tsx`, `src/components/StatsCounter.tsx`, `src/components/TestimonialSlider.tsx`, `src/components/AwardsSection.tsx`, `src/components/CTABanner.tsx`, `src/components/FadeInSection.tsx` (audit only — likely theme-neutral), `src/app/page.tsx`

**Recipe:**
- **Hero:** `bg-paper grain` section, two-column at `lg`: left = eyebrow + `font-display text-5xl md:text-7xl` headline with one italic teal emphasis word + lede + `<Button>` pair (primary "Book a Demo" → `/contact/`, outline "Explore Solutions" → `/solutions/`); right = `<NetworkMotif>` with float animation. Kill aurora blobs/dark gradient. Home `page.tsx` line ~101 secondary CTA `mailto:` → `/contact/`.
- **Logo marquee (AwardsSection/clients strip):** logos on `bg-paper-warm` band; SVGs are already background-stripped (recent commit) — render at `opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition`.
- **SolutionCard:** rebuild on `<Card>`: icon in `bg-teal-50 text-teal-600` rounded square, `font-display text-xl text-ink` title, `text-navy-600` description, `text-teal-600` text-arrow link.
- **StatsCounter:** dark band exception — `bg-ink grain` section, `<Stat dark>` items (amber serif numbers). Count-up logic untouched.
- **TestimonialSlider:** white `<Card>` with oversized `font-display` quotation mark, `text-ink` quote, `text-navy-500` attribution; slider controls `border-navy-200`.
- **CTABanner:** `bg-ink rounded-3xl` inset banner inside a `bg-paper` section, serif headline in `text-paper`, amber accent, primary button inverted (`bg-paper text-ink`).

**Verify:** dev server `/` full scroll, both widths, reduced-motion sanity. **Commit.**

### Task 6: Solutions hub + detail template

**Files:**
- Modify: `src/app/solutions/page.tsx` (123)
- Modify: `src/components/SolutionDetailPage.tsx` (204 — restyling this covers all 5 detail pages; the 5 page files are 23-line wrappers, do not touch them)

**Recipe:** hub = `SectionHeading` + grid of restyled `SolutionCard`s, alternating `bg-paper`/`bg-paper-warm`. Detail template: two-column editorial hero (serif title + lede + Button pair | `GrowthArc` graphic); features become numbered editorial rows (`01`–`05` in `font-display text-navy-300`, hairline separators) instead of checkmark cards; `targetAudience` as a `bg-teal-50 border-l-2 border-teal-500` callout; `highlight` as amber pull-quote; closing CTA via `CTABanner`.

**Verify:** `/solutions/` + one detail page (`/solutions/idp-tool/`), both widths — the other 4 render from the same template. **Commit.**

### Task 7: Blog index + article

**Files:**
- Modify: `src/app/blog/page.tsx` (126)
- Modify: `src/app/blog/[slug]/page.tsx` (250)

**Recipe:** index = featured (latest) post as full-width editorial card (serif 4xl title, category in teal eyebrow, excerpt, read-time), remaining posts in 2-col card grid. Article = centered `max-w-[65ch]` column; `font-display` h1/h2/h3; body `text-navy-700 text-lg leading-relaxed`; pull-quotes `border-l-2 border-amber-500 font-display italic text-2xl`; inline stats/callouts as `bg-paper-warm` boxes; author/CTA block at end (Button → `/contact/`). Keep whatever content-rendering mechanism exists — restyle wrappers only.

**Verify:** `/blog/` + `/blog/why-legacy-360-assessments-fail/`. **Commit.**

### Task 8: About, Clients, Profile

**Files:**
- Modify: `src/app/about/page.tsx` (267)
- Modify: `src/app/clients/page.tsx` (206)
- Modify: `src/app/profile/page.tsx` (703) + audit `src/app/profile/layout.tsx`

**Recipe:** class map throughout. About: editorial intro (serif), founder block with `public/shobhraj.jpg` in rounded frame with offset `border border-navy-200` accent rectangle, values as numbered rows. Clients: structured logo grid on white cards + testimonial band (reuse TestimonialSlider). Profile: keep structure; map its indigo accents (line ~691 `bg-indigo-600` CTA) to the site palette (`<Button>`); its `mailto:shobhrajsharma@gmail.com` personal CTA MAY stay as mailto (personal contact, per design doc only ceo@ CTAs become form links — replace styling only).

**Verify:** all three pages, both widths. **Commit.**

### Task 9: Contact page + Web3Forms + site-wide mailto sweep

**Files:**
- Create: `src/components/ContactForm.tsx`
- Modify: `src/app/contact/page.tsx` (142)
- Modify (mailto sweep): `src/app/tools/360/page.tsx` (lines ~222, ~447, ~543), `src/app/360-calculator/page.tsx` (line ~937) — these two are restyled in Tasks 10–11 but the href swap happens HERE so the sweep is complete in one commit; `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/app/page.tsx` already done in Tasks 4–5 (verify).

**Step 1: `src/components/ContactForm.tsx`** (client component):

```tsx
"use client";

import { useState, useEffect } from "react";

const ACCESS_KEY = "REPLACE_WITH_WEB3FORMS_ACCESS_KEY"; // web3forms.com — free, takes 1 min

const INTERESTS = [
  "Book a Demo — Zrutam 360",
  "Book a Demo — IDP Tool",
  "Leadership Development",
  "Upskilling & Reskilling",
  "Custom E-Learning",
  "AI Skills Assessment",
  "General Inquiry",
];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [interest, setInterest] = useState(INTERESTS[6]);

  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("interest");
    if (param) {
      const match = INTERESTS.find((i) => i.toLowerCase().includes(param.toLowerCase()));
      if (match) setInterest(match);
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...data, access_key: ACCESS_KEY, subject: `Zrutam website: ${data.interest}` }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="bg-teal-50 border border-teal-200 rounded-2xl p-10 text-center">
        <p className="font-display text-2xl text-ink">Thank you — message received.</p>
        <p className="mt-2 text-navy-600">We&apos;ll get back to you within one business day.</p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-navy-200 bg-white px-4 py-3 text-ink placeholder:text-navy-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-100";

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      <input name="name" required placeholder="Full name" className={field} />
      <input name="company" required placeholder="Company" className={field} />
      <input name="email" type="email" required placeholder="Work email" className={`${field} sm:col-span-2`} />
      <select
        name="interest"
        value={interest}
        onChange={(e) => setInterest(e.target.value)}
        className={`${field} sm:col-span-2`}
      >
        {INTERESTS.map((i) => (
          <option key={i}>{i}</option>
        ))}
      </select>
      <textarea name="message" rows={5} placeholder="How can we help?" className={`${field} sm:col-span-2`} />
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-medium text-paper transition hover:bg-navy-700 hover:shadow-lift disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        {status === "error" && (
          <p className="mt-3 text-sm text-red-600">
            Something went wrong — please email{" "}
            <a href="mailto:ceo@zrutam.com" className="underline">ceo@zrutam.com</a> directly.
          </p>
        )}
      </div>
    </form>
  );
}
```

(Static-export note: query-param reading must be `window.location` in `useEffect`, NOT `useSearchParams`, which would demand a Suspense boundary and can bail static generation.)

**Step 2: Rebuild `src/app/contact/page.tsx`** — light editorial two-column: left = serif heading, contact info (email as text, LinkedIn), reassurance copy; right = `<ContactForm />` in a `<Card hover={false} className="p-8">`.

**Step 3: mailto sweep** — replace remaining `mailto:ceo@zrutam.com` hrefs in `src/app/tools/360/page.tsx` and `src/app/360-calculator/page.tsx` with `/contact/?interest=360` (href only, styling waits for Tasks 10–11). Then `grep -rn "mailto:ceo@zrutam.com" src/` — expected: only the fallback link inside ContactForm's error state.

**Step 4: Verify** — `/contact/` renders; fill form; expect the **error** state (placeholder key) with graceful fallback — that's correct pre-key behavior. `/contact/?interest=idp` preselects IDP. Build passes.
**Step 5: Commit** — `git commit -am "feat: Web3Forms contact form, replace mailto CTAs site-wide"`

### Task 10: Tools restyle — IDP + 360 landing

**Files:**
- Modify: `src/app/tools/idp/page.tsx` (308)
- Modify: `src/app/tools/360/page.tsx` (561)

**HARD RULE:** zero changes to state, handlers, formulas, question data, or copy. Classes and decorative wrappers only. Use `RadialRings` on the 360 hero, class map everywhere. 360 landing sections (problem cards, how-it-works steps, features grid, pricing hint, FAQ) map to `<Card>`/`SectionHeading`/numbered-row patterns from Task 6.

**Verify (functional):** dev server — interact with the IDP tool end-to-end (answer flow produces same outputs as before), 360 page FAQ accordions toggle, all CTAs point to `/contact/?interest=360`. Both widths. **Commit.**

### Task 11: Risk Calculator restyle

**Files:**
- Modify: `src/app/360-calculator/page.tsx` (954 — largest file, budget accordingly)
- Audit: `src/app/360-calculator/layout.tsx` (metadata only, likely untouched)

**HARD RULE:** the calculator's `useState`/`useEffect`/formula/slider-range/currency logic is untouched — restyle inputs, sliders, meters, results panel only. Recipe: inputs panel = white `<Card>` with labeled fieldsets; sliders restyled with teal accent (`accent-teal-500`); sticky results panel = white card, navy/teal meter bars, total annual risk figure in `font-display text-amber-600`; danger indicators `text-red-600` on `bg-red-50` chips (red stays red — it's semantic).

**Verify (functional):** change headcount/salary/sliders → results update with identical numbers to pre-restyle for the same inputs (spot-check one scenario before starting by noting values at defaults, e.g. screenshot). USD/INR toggle works. Both widths. **Commit.**

### Task 12: Custom 404

**Files:**
- Create: `src/app/not-found.tsx`

```tsx
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="bg-paper grain min-h-[70vh] flex items-center">
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-600 mb-4">404</p>
        <h1 className="font-display text-5xl md:text-7xl text-ink text-balance">
          This page took a <em className="italic text-teal-600">development detour.</em>
        </h1>
        <p className="mt-6 text-lg text-navy-600">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex justify-center gap-4">
          <Button href="/">Back to home</Button>
          <Button href="/solutions/" variant="outline">Explore solutions</Button>
        </div>
      </div>
    </section>
  );
}
```

**Verify:** static export emits `out/404.html` (Hostinger/Apache serves it automatically). **Commit.**

### Task 13: Final verification + deploy checklist

**Files:**
- Create: `DEPLOY.md`

**Step 1: Dark-theme purge audit** — `grep -rn "bg-surface\|glass-card\|aurora\|glow-teal\|glow-amber\|text-gradient\|gradient-navy\|gradient-teal\|navy-50\|#050A14" src/` → expected: no hits except intentional new-scale `navy-50` usages verified individually (footer/stats-band `bg-ink` is the only intentional dark).
**Step 2: Full build** — `npm run build` exit 0; confirm `out/` contains all 18 routes + `404.html` + fonts under `_next/static/media/`.
**Step 3: Browser pass** — every route at 1280px and 375px; tools functional; form flow; no console errors.
**Step 4: `DEPLOY.md`** — checklist: (1) get Web3Forms access key at web3forms.com (free) and paste into `src/components/ContactForm.tsx` `ACCESS_KEY`; (2) `npm run build`; (3) zip contents of `out/` (not the folder itself); (4) Hostinger hPanel → File Manager → `public_html` → upload + extract (or FTP); (5) verify live: home, one tool, contact form sends a real email; (6) confirm `https://www.zrutam.com/sitemap.xml` still resolves. Note: `public/robots.txt` + `sitemap.xml` copy through automatically.
**Step 5: Commit** — `git commit -am "docs: Hostinger deploy checklist; final redesign verification"`
**Step 6:** Merge decision via superpowers:finishing-a-development-branch.

---

## Task order & dependencies

1 → 2 → 3 → 4 → 5 → (6, 7, 8 in any order) → 9 → (10, 11 in any order) → 12 → 13.
Tasks 6–8 and 10–11 are independent of each other but all depend on Tasks 1–4.
