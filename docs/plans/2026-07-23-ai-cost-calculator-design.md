# "Cost of Not Enabling AI" Calculator — Design Document

**Date:** 2026-07-23
**Status:** Approved
**Spec (verbatim, source of truth for logic/copy/citations):** `docs/specs/ai-cost-calculator-spec.md`

## Decisions from user interview

| Question | Answer |
|---|---|
| Source file | No standalone index.html available — build from the spec |
| Placement | ONE artifact, two doors: `public/ai-cost/` in the main site (→ zrutam.com/ai-cost/) AND standalone upload to subdomain |
| Subdomain | **aicost.zrutam.com** (user creates it in hPanel; we provide the upload zip + steps) |
| CTA | Site contact form: `https://www.zrutam.com/contact/?interest=ai-enablement` — requires adding an "AI Enablement" interest to ContactForm |
| Mobile | First-class requirement — LinkedIn in-app browser on phones is a primary consumption context |

## Approach (approved: A)

Single self-contained static artifact — `index.html` with inline CSS + inline JS + inlined html2canvas 1.4.1, plus a `fonts/` folder (self-hosted Fraunces + Inter woff2, referenced relatively). Committed under `public/ai-cost/` so the Next.js static export ships it automatically; the same folder zips into `aicost-subdomain.zip` for the subdomain. No React port: the spec's id-keyed `calc()` JS stays plain, eliminating porting risk and honoring the self-containment mandate.

Rejected: B (native Next route + separate standalone build — two diverging implementations), C (subdomain iframing the main route — fragile in LinkedIn's in-app browser).

## Visual design — Editorial Ink applied

- **Canvas:** paper `#FAF9F6`, white cards, `navy-100` `#E4EBF1` hairlines, soft card/lift shadows, ink `#0B2239` text, `#3E5A75` (navy-600) secondary text.
- **Type:** Fraunces (display; wizard questions, lens figures, headline — one italic teal emphasis word max) + Inter (body/UI). Self-hosted woff2 subset in `fonts/`, `font-display: swap`, system-stack fallback.
- **Lens semantics (from spec §11, mapped to site tokens):** ② value = teal gradient `#075985 → #0284C7`; ① hard cash = amber gradient `#B45309 → #D97706` (spec's gold #B45309 IS the site's amber-700). These gradients appear on the lens cards and share card only.
- **Controls:** wizard option buttons and chips as white cards with `navy-200` borders, selected = `bg-ink text-paper`-equivalent; sliders `accent-teal` with visible focus rings; primary buttons = ink pill (site buttonClasses equivalent, hand-inlined); progress dots teal.
- **Page shell (approved deviation from spec §11 "site header/footer/nav"):** minimal branded shell — slim header (Zrutam logo → https://www.zrutam.com, one "Book 20 min" button) and slim navy `#0B2239` footer strip (© Zrutam · zrutam.com · contact link). Rationale: cold-email landing page conversion (fewer escape routes) + true standalone portability. The full React Navbar/Footer cannot render in a static artifact anyway.
- **Share card:** keeps bolder standalone styling per spec — paper card, Fraunces figures, the two gradients, Zrutam wordmark. Fixed ~940px landscape, off-screen.

## Logic / copy / citations

Implemented **verbatim** from the spec: §3 formulas, §4 inputs/ranges/defaults, §5 CUR map + money() formatting + currency-switch semantics (no FX of entered salaries), §6 adoption mapping, §7 wizard copy, §8 full-calculator contents, §9 share card + export, §10 citations #c1–#c6. Two lenses never summed; per-seat hard-cash framing; conservative + industry figures both shown.

## Main-site touchpoints (the only React changes)

1. `src/components/ContactForm.tsx`: add "AI Enablement" to INTERESTS and `"ai-enablement"` (+ `"ai-cost"` alias) to SLUG_TO_INTEREST.
2. `public/sitemap.xml`: add `/ai-cost/`.
3. NOT in the navbar (lead-magnet page, direct-link distribution). Can be added later if wanted.

## Mobile (≤560px)

Single column; wizard steps full-width with ≥44px touch targets; lens cards stack; full calculator collapses to one column; share card untouched (it's an image source, not a layout); no horizontal overflow at 360–430px widths; font sizes clamp down (h1 ~clamp(1.8rem, 7vw, 3.5rem)).

## Deployment

- Feature branch `feat/ai-cost-calculator` → merge to main → rebuild main-site zip (calculator included).
- `aicost-subdomain.zip` = contents of `public/ai-cost/` (index.html + fonts/ + .htaccess with `ErrorDocument 404 /index.html`-style fallback NOT needed — single page; include nothing extra).
- User: hPanel → Domains → Subdomains → create `aicost` → upload zip into the subdomain's document root → extract.
- DEPLOY.md gains a subdomain section.

## QA

Spec §14 checklist executed in the browser pane (desktop 1280 + mobile 375/390), including: currency switch behavior, adoption monotonicity (Barely > Patchy > Fairly > Heavily on both lenses), 0% licence path, company-name flow, offline PNG export producing a clean landscape card, slider/number sync, citation links, no-total-anywhere audit.
