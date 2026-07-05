# Zrutam Dark Premium Redesign — Design

**Date:** 2026-07-05
**Status:** Approved
**Approach:** Redesign in place with existing stack (Next.js 14, Tailwind, Framer Motion). No new dependencies.

## Goal

Upgrade the entire site to a premium, richly animated "dark tech" aesthetic (Linear/Stripe/Vercel class) while keeping all content, page structure, routing, and the Formspree-backed calculator logic untouched.

## Decisions

- **Direction:** Dark premium tech — deep navy-black base, glassmorphism, teal glow accents.
- **Scope:** Whole site — homepage showcase + shared components + inner pages inherit.
- **Motion level:** Rich but tasteful — no cursor-chasing gimmicks beyond card spotlight; everything respects `prefers-reduced-motion`.
- **No new npm packages.** CSS keyframes for ambient motion, Framer Motion for choreography.

## Design system

- **Base:** `#050A14` page background. Sections alternate two dark elevations (base and `#0A1628`-tinted) instead of white/gray-50.
- **Glass surfaces:** `bg-white/5`, `border-white/10`, `backdrop-blur`; hover elevates border to teal/40 with soft glow shadow.
- **Typography:** Inter, larger/tighter display scale (`tracking-tight`), gradient text accents (teal → sky-300).
- **Signature textures:** faint dot-grid overlay; slow-drifting aurora gradient blobs (CSS keyframes, GPU-transform only).
- **Tailwind additions:** dark surface colors, glow shadows, keyframes (aurora drift, marquee, shimmer, pulse-slow), animation utilities.

## Components

| Component | Treatment |
|---|---|
| Navbar | Dark glass, backdrop blur, underline-slide link hover, glowing amber CTA. Dropdowns become dark glass panels. |
| HeroSection | Aurora + grid background, word-by-word spring headline reveal, gradient shimmer on key phrase, glowing CTAs with hover lift, floating glass stat chips, scroll indicator. |
| Client logos | Infinite seamless CSS marquee, pause on hover, white/muted logo treatment. |
| SolutionCard | Glass card with cursor-tracking radial spotlight, gradient icon tile, staggered reveal. |
| StatsCounter | Gradient numerals, existing count-up kept, subtle pulse accent. |
| AwardsSection / TestimonialSlider | Glass restyle, crossfade slider with progress dots. |
| CTABanner | Animated gradient border glow around panel. |
| Footer | Dark refined, matches system. |
| FadeInSection | Kept as the standard scroll-reveal primitive; tuned easing. |

## Inner pages

Solutions hub + 5 detail pages (via `SolutionDetailPage`), about, clients, contact, blog (+`[slug]`), profile, tools/idp, tools/360, 360-calculator: inherit dark theme via shared components and a global CSS/utility pass. Forms restyled to dark inputs. **Calculator email gate and Formspree submission logic: styling changes only, no logic changes.**

## Constraints & risks

- Static export (`out/`) — client-only animation, no server features.
- Logo is an amber circle — works on dark, no asset change needed.
- Client SVG logos may need `brightness-0 invert` treatment for dark background.
- All ambient animation uses `transform`/`opacity` only; `prefers-reduced-motion` disables it.

## Verification

- `npm run build` passes.
- Browser preview check: desktop (1280) and mobile (375) on homepage, one solution page, contact, and 360-calculator (email gate still functions).
