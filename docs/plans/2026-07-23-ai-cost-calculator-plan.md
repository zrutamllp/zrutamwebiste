# AI-Cost Calculator Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build the "Cost of Not Enabling AI" two-lens lead-magnet calculator as a self-contained static artifact styled in Editorial Ink, served at zrutam.com/ai-cost/ and deployable standalone to aicost.zrutam.com.

**Architecture:** One static folder `public/ai-cost/` (index.html with inline CSS + inline JS + inlined html2canvas 1.4.1, plus self-hosted fonts/) that ships through the Next.js static export untouched. No React; the spec's id-keyed vanilla JS is authoritative. Two tiny main-site edits (ContactForm interest, sitemap).

**Tech Stack:** Plain HTML/CSS/JS, html2canvas 1.4.1 (inlined from npm), woff2 fonts reused from the site build, bsdtar for the subdomain zip.

**Source-of-truth documents (implementers MUST read both):**
- `docs/specs/ai-cost-calculator-spec.md` — VERBATIM logic, formulas, CUR map, wizard copy, adoption mapping, citations. Sections are referenced below as "spec §N". When in doubt, the spec wins.
- `docs/plans/2026-07-23-ai-cost-calculator-design.md` — approved visual/deployment decisions.

**Verification model:** no test framework; gates are `npm run build` (artifact must survive the export copy), browser checks in the dev server (desktop 1280 + mobile 375/390), and the spec §14 QA checklist. Commit after every task on branch `feat/ai-cost-calculator`.

---

### Task 1: Assets — html2canvas + fonts

**Files:**
- Modify: `package.json` (devDependency html2canvas@1.4.1)
- Create: `public/ai-cost/fonts/*.woff2` (copied, renamed)
- Create: `public/ai-cost/fonts/fonts.css` (scratch reference only — final @font-face goes inline in Task 2; this file is deleted at the end of Task 2)

**Step 1:** `npm install --save-dev html2canvas@1.4.1` — verify `node_modules/html2canvas/dist/html2canvas.min.js` exists (~195 KB).
**Step 2:** Identify the site's font files: run `npm run build` if `out/` is stale, then read `out/_next/static/css/*.css` and extract every `@font-face` block (family __Fraunces_*, __Inter_*; normal + italic; note unicode-range subsets). Map each `src: url(/_next/static/media/<hash>.woff2)` to its family/style/weight.
**Step 3:** Copy the latin-subset woff2 files (Fraunces normal, Fraunces italic, Inter normal — the latin `unicode-range` ones; skip cyrillic/greek/viet subsets, keep file count ≤ 6) into `public/ai-cost/fonts/` with readable names (`fraunces-latin.woff2`, `fraunces-latin-italic.woff2`, `inter-latin.woff2`, plus latin-ext if trivially available).
**Step 4:** Write the corresponding `@font-face` rules (family names `Fraunces`, `Inter`; `font-display: swap`; relative `url(fonts/…)`; keep the original `unicode-range` values) into `public/ai-cost/fonts/fonts.css` as the reference for Task 2.
**Step 5:** Commit: `git add package.json package-lock.json public/ai-cost && git commit -m "chore: html2canvas dep + self-hosted latin fonts for ai-cost artifact"`

### Task 2: The artifact — `public/ai-cost/index.html`

**Files:**
- Create: `public/ai-cost/index.html` (everything inline)
- Delete: `public/ai-cost/fonts/fonts.css` (its rules move inline)

This is the core task. Implement the ENTIRE spec: §2 structure (`#wizard` 6 steps, `#fullcalc` hidden, `#shareCard` off-screen), §3 formulas VERBATIM, §4 inputs/ids/ranges/defaults, §5 CUR map + `money()` + `setCurrency()` semantics, §6 adoption mapping, §7 wizard copy FINAL, §8 fullcalc contents in order, §9 share card + html2canvas export, §10 citations `#c1`–`#c6`, §12 behaviors checklist. Keep every element id from spec §4/§8/§9.

**Structure of the file:**
1. `<head>`: meta viewport, `<title>The Cost of Not Enabling AI | Zrutam</title>`, meta description, inline `<style>` containing: @font-face rules (from Task 1), CSS custom properties for Editorial Ink tokens (see design doc: paper #FAF9F6, ink #0B2239, navy-600 #3E5A75, navy-200 #CFDAE4, navy-100 #E4EBF1, teal #0EA5E9/#0284C7/#075985, amber #F59E0B/#D97706/#B45309), all component styles, and the ≤560px + ≤400px media queries.
2. `<body>`: minimal branded shell (slim header: "Zrutam" wordmark in Fraunces linking https://www.zrutam.com + ink-pill "Book 20 min" → CTA URL; slim `#0B2239` footer strip) wrapping: `#wizard`, `#fullcalc` (display:none), closing CTA block (hidden until fullcalc reveal), `#shareCard` (position:fixed; left:-11000px).
3. `<script>` #1: html2canvas.min.js pasted VERBATIM from `node_modules/html2canvas/dist/html2canvas.min.js` (with its license header comment).
4. `<script>` #2: the calculator: `CUR` map (spec §5 exactly), state vars with spec §4 defaults, `money()` (spec §5 formatting exactly, incl. Indian digit grouping via `toLocaleString('en-IN')`), `calc()` (spec §3 verbatim — derive and write every output id), `setCurrency(c)` (spec §5 switch semantics — no FX), `wizGo(n)` + `data-next`/`data-back` wiring + progress dots, adoption `.wopt` handlers (spec §6 cap/uu values), two-way slider⇄number sync for emp/sal, benchmark chip handlers, company-name propagation, fullcalc reveal, `saveCard()` export (spec §9: scale 2, `#F3F5F7`→ use paper #FAF9F6 as backgroundColor, toBlob→object URL, filename `AI-cost-of-inaction-<slug>.png`, status messages), `calc()` on load.

**Design application (from the design doc):** wizard questions + lens figures + headline in Fraunces; lens cards use the two gradients (teal #075985→#0284C7 for ②, amber #B45309→#D97706 for ①) with white Fraunces figures; option buttons/chips = white cards, `1px solid #CFDAE4`, selected = ink bg / paper text; sliders `accent-color: #0284C7` with focus-visible outlines; hint text #3E5A75; hairline dividers #E4EBF1; buttons = ink pill (radius 9999px, hover lift). ≤560px: everything single-column, ≥44px touch targets, wizard value text clamps.

**CTA URLs:** primary everywhere → `https://www.zrutam.com/contact/?interest=ai-enablement`; footer contact link same; secondary reveal link toggles `#fullcalc`.

**Accessibility:** one `<h1>` (wizard's first visible heading; subsequent step questions are `<h2>`), `role="progressbar"` semantics on the dots container (aria-valuenow = step), labels/aria-labels on all inputs, `aria-pressed` on option/currency buttons, focus-visible outlines, decorative elements aria-hidden. Reduced motion: wrap transitions in `@media (prefers-reduced-motion: no-preference)`.

**Steps:** build the file section by section (CSS shell → wizard markup → fullcalc markup → shareCard markup → JS), then:
**Verify:** `npm run build` exit 0 AND `out/ai-cost/index.html` + `out/ai-cost/fonts/` exist; open `/ai-cost/` in the dev server — wizard renders step 1, currency buttons work, full flow reaches reveal with plausible numbers (spot-check: INR defaults, emp 1000, lic 30%, sal 10L, Patchy → ② ≈ ₹2.6 Cr order of magnitude, ① seatWaste = 29,940 × 0.5 = ₹14,970).
**Commit:** `git add public/ai-cost && git commit -m "feat: Cost of Not Enabling AI calculator artifact (two-lens, currency-native)"`

### Task 3: Main-site touchpoints

**Files:**
- Modify: `src/components/ContactForm.tsx` — INTERESTS gains `"AI Enablement"` (insert before "General Inquiry"); SLUG_TO_INTEREST gains `"ai-enablement": "AI Enablement"` and `"ai-cost": "AI Enablement"`.
- Modify: `public/sitemap.xml` — add `/ai-cost/` entry (priority 0.7, match existing format).

**Verify:** `npx tsc --noEmit` + `npm run build` exit 0; dev server `/contact/?interest=ai-enablement` preselects "AI Enablement".
**Commit:** `git commit -m "feat: AI Enablement contact interest + sitemap entry for /ai-cost/"`

### Task 4: QA — spec §14 checklist in the browser

Dev server, desktop 1280 AND mobile 375 (plus 390 spot-check). Execute EVERY §14 item:
1. Two lenses render; grep the DOM text for any summed total (must not exist).
2. Currency switch (wizard AND `#curSeg`): symbol, licCost, salary range/default/chips, salNote/licNote all update; outputs re-render in-currency.
3. Adoption monotonicity: record (opp, seatWaste) for all four options with fixed inputs → Barely > Patchy > Fairly > Heavily on BOTH lenses.
4. Licence 0%: reveal still shows ② and per-seat ①; no NaN; the "at your ~N%" line hidden.
5. Company name → headline, results header, share card text.
6. Save-as-image: click → PNG downloads (verify via browser download or capture the blob URL + dimensions ≈ 1880×… at scale 2); card contains no sliders/inputs; status messages appear.
7. emp/sal slider⇄number sync both directions.
8. Six citation links present with correct hrefs (#c1–#c6).
9. Mobile ≤560px: no horizontal overflow (scrollWidth == innerWidth) on every wizard step, reveal, and fullcalc; touch targets ≥44px.
10. `calc()` on load + on every input (change an input, output updates without focus loss).
11. Negative/empty input torture: type -1000 and clear each number field — no negative money, no NaN, mirrors don't jump.
12. Save path by environment: desktop → download + "Saved…" status; share-capable webview → share sheet; in-app webview without file share → inline PNG + long-press hint. OG tags present; og-card.png exists and is 1200×627.
Fix everything found; commit fixes: `git commit -m "fix: ai-cost QA findings (spec §14)"`

### Task 5: Packaging + deploy docs + merge

**Files:**
- Create: `aicost-subdomain.zip` (NOT committed — add to .gitignore)
- Modify: `.gitignore` (+ `aicost-subdomain.zip`)
- Modify: `DEPLOY.md` — new "Subdomain: aicost.zrutam.com" section: create subdomain in hPanel (Domains → Subdomains → `aicost`), upload `aicost-subdomain.zip` to its document root, extract, verify https://aicost.zrutam.com loads + exports PNG; note the main site serves the identical page at /ai-cost/.

**Steps:**
1. Build zip with bsdtar (NEVER Compress-Archive — see memory/DEPLOY.md): `tar.exe -a -cf aicost-subdomain.zip -C public/ai-cost .` → verify forward slashes via `unzip -l`.
2. Commit `.gitignore` + DEPLOY.md: `git commit -m "docs: aicost subdomain deploy steps"`
3. Merge: `git checkout main && git merge feat/ai-cost-calculator --no-edit`, verify `npx tsc --noEmit` + `npm run build` on main, `git branch -d feat/ai-cost-calculator`, push main.
4. Rebuild the main-site zip: `tar.exe -a -cf zrutam-site.zip -C out .` (includes /ai-cost/).

---

## Task order

1 → 2 → 3 → 4 → 5 strictly sequential (2 needs 1's assets; 4 QAs 2+3; 5 packages the QA'd result).
