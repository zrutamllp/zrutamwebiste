# Zrutam Light Editorial Redesign — Design Document

**Date:** 2026-07-14
**Status:** Approved

## Brief (from user interview)

| Decision | Answer |
|---|---|
| Scope | Full visual redesign, same content & URLs (18 pages) |
| Mood | Light, editorial, trustworthy (McKinsey/Notion energy) |
| Palette | Keep navy / teal / amber, on a light canvas |
| Typography | Elegant display serif headlines + clean sans body |
| Imagery | Custom abstract SVG graphics & data-viz motifs |
| Motion | Refined & purposeful (scroll reveals, micro-interactions) |
| Tools | Redesigned light too — full consistency, logic untouched |
| Lead capture | Real forms via Web3Forms (replaces all mailto CTAs) |
| Sitemap | Unchanged |
| Goal | Brand authority + demo conversion, equally |
| Approach | A — in-place design-system swap (approved over fresh-scaffold and two-track alternatives) |

## 1. Design system — "Editorial Ink"

**Canvas & color.** Warm paper background `#FAF9F6` (not stark white). Deep ink-navy `#0B2239` for text and primary buttons. Teal for interactive accents and data-viz strokes. Amber reserved for highlights and key numbers. Hairline navy-tinted borders; soft shadows on hover only. Tokens defined in `tailwind.config.ts` (paper, ink/navy scale, teal, amber) replacing the dark-theme tokens.

**Typography.** Fraunces (variable display serif, Google Fonts via `next/font/google` — self-hosted at build time, no runtime CDN dependency) for all headlines: large sizes, tight tracking, occasional italic emphasis. Inter for body/UI. Type scale: heroes 4–5rem desktop; body max-width ~65ch.

**Primitives (shared components).** `Button` (solid navy / outline / text-with-arrow), `SectionHeading` (teal eyebrow → serif headline → lede), `Card` (paper, hairline border, hover lift), `Stat` (amber serif number + label), form fields. All page styling derives from these.

**Motion.** Framer Motion: soft rise-and-fade scroll reveals (staggered grids), animated stat counters, underline-sweep links, hover lifts, gentle hero parallax. Respects `prefers-reduced-motion`.

## 2. Signature graphics

Hand-built SVG illustration language: thin navy line-work with teal/amber nodes — network/skill-graph motifs, radial 360° rings, ascending growth arcs, dotted grids. Used for hero art, section backgrounds, per-solution icons. Barely-visible paper-grain texture on canvas. Lucide line icons for small UI icons. No stock photography.

## 3. Page-by-page treatment (URLs unchanged)

- **Navbar** — light, translucent blur on scroll, refined dropdowns, navy "Book a Demo" button.
- **Home** — editorial hero (oversized serif headline, radial-network SVG, dual CTAs), light logo marquee, solutions grid, amber stats band, testimonials, blog teasers, closing CTA.
- **Solutions hub + 5 detail pages** — shared `SolutionDetailPage` template redesigned once: two-column editorial hero, numbered feature rows, audience callout, CTA.
- **Tools (IDP `/tools/idp`, Zrutam 360 `/tools/360`, Risk Calculator `/360-calculator`)** — restyled light, **zero logic changes** (inputs, formulas, state untouched). Calculator results become a paper card with navy/teal meters, amber risk highlights.
- **Blog** — editorial index grid (featured post large); article pages with serif headings, 65ch column, styled pull-quotes.
- **About / Profile / Clients** — light editorial layouts; Clients gets structured logo grid + testimonial band.
- **Contact** — real form (name, company, email, interest, message).
- **Footer** — stays deep navy as a deliberate dark anchor: sitemap, contact, LinkedIn.
- **404** — new custom styled page.

## 4. Lead capture

Web3Forms: form POSTs to their API; submissions arrive at ceo@zrutam.com. No backend needed — works on Hostinger static hosting. All "Book a Demo" CTAs point to the contact form with interest pre-selected. Built with placeholder access key + inline success/error states. **Go-live prerequisite: user obtains free access key at web3forms.com** (flagged in deploy checklist).

## 5. Build & deployment (Hostinger)

`output: "export"` and `trailingSlash: true` already configured — unchanged. Deliverables: custom 404 page and a deploy checklist (`npm run build` → zip `out/` → upload to `public_html` via Hostinger File Manager or FTP). No server config needed.

## 6. Verification

Each page batch verified in the live dev-server browser at desktop + mobile widths before proceeding. Final pass: production `out/` build, all three tools functioning, form flow end-to-end.
