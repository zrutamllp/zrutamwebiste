# Build Spec — "The Cost of Not Enabling AI" Calculator (VERBATIM — source of truth)

A single-page, self-contained lead-magnet calculator for Zrutam. A prospect answers a short guided quiz and sees two separate annual costs of un-enabled AI in their own organisation. Used as a landing page (interactive) and as a source for exported PNG cards attached to cold emails / LinkedIn messages.

> Keep the logic, data, copy, and citations below exactly. Restyle only the visual layer to match the site.

---

## 1. Core principles (do not change these — they are the product)

1. **Two lenses, shown SEPARATELY, never summed.** The tool reports two different numbers and explicitly refuses to add them:
   - **① Hard cash — wasted licences.** Real money already spent on paid Copilot seats that aren't being used. True even if nobody ever saves a minute.
   - **② Value at stake — lost productivity.** The estimated value of time people could save if enabled. The upside of acting.
   - They must **not** be added into a single "total", because for the paid cohort that double-counts: enabling recovers the productivity (②) *and* justifies the licence (①) — you don't bank both. A visible note says exactly this.
2. **Deliberately conservative.** Every default is set below published benchmarks. The tool shows both the conservative figure and an "industry standard" figure so the reader sees we're understating, not inflating.
3. **Copilot is an ADD-ON — count only the incremental Copilot fee.** Never count the base Microsoft 365 (Word/Excel/Outlook/Teams) cost; the customer pays that regardless. Only the Copilot add-on (₹2,495/mo in India = ₹29,940/yr, and regional equivalents) is "at risk".
4. **Hard cash is expressed PER SEAT.** Because in a cold email we don't know the prospect's licence count, the wasted-licence figure is given per idle seat and per 1,000 seats, so nothing is assumed about their exact count — they self-scale.
5. **Currency-native, region-aware.** Currency is the first question. Choosing a currency sets that region's Copilot price, salary ranges, and benchmark chips. All inputs and outputs are in the chosen currency (no live FX of user-entered salaries — switching currency resets salary to that region's typical value).

---

## 2. Page structure (three parts, one HTML file)

1. **Guided wizard** (`#wizard`) — shown by default. 6 steps: currency → headcount → licence % → salary → adoption → reveal. This is the prospect-facing front door.
2. **Full calculator** (`#fullcalc`) — hidden by default (`display:none`); revealed by the "explore the full calculator" link in the wizard reveal. This is the sender's back office: all assumptions exposed, per-currency, plus the **Save as image** button. Includes the cost breakup, method, and citations.
3. **Off-screen share card** (`#shareCard`) — rendered off-screen (`position:fixed; left:-11000px`), captured by html2canvas to produce the email PNG. Two-lens layout, "what we ran" basis line, industry line, CTA.

The tool is fully self-contained: inline CSS + inline JS, no external calls at runtime. **html2canvas 1.4.1 is inlined** into a `<script>` (do not load it from a CDN — corporate networks block it and the file must work offline from an email attachment).

---

## 3. The calculation model (the heart — implement verbatim)

All money is in the **chosen currency**. `sal` = average annual salary/person; `licCost` = annual Copilot add-on price/user; `days` = working days/year (default 220).

```
hourly     = sal / (days * 8)                 // conservative: base salary only, no benefits/overhead
paidCount  = round(emp * licPct/100)          // people on a paid Copilot licence
freeCount  = max(0, emp - paidCount)          // everyone else has free Copilot Chat via M365
hpPaid     = (tsPaid / 60) * days             // saveable hours/yr per paid user
hpFree     = (tsFree / 60) * days             // saveable hours/yr per free-Chat user
oppPaid    = paidCount * hpPaid * hourly * (1 - cap/100)
oppFree    = freeCount * hpFree * hourly * (1 - cap/100)
opp        = oppPaid + oppFree                // ② VALUE AT STAKE
sunk       = paidCount * licCost * (uu/100)   // ① HARD CASH (absolute, when count is known)
seatWaste  = licCost * (uu/100)               // ① per idle seat (count-free framing)
per1000    = seatWaste * 1000                 // ① per 1,000 idle seats
// Industry-standard scenario (always >= conservative):
tsPaidInd  = max(60, tsPaid)
tsFreeInd  = max(20, tsFree)
uuInd      = max(70, uu)
oppInd     = paidCount*(tsPaidInd/60*days)*hourly*(1-cap/100) + freeCount*(tsFreeInd/60*days)*hourly*(1-cap/100)
sunkInd    = paidCount * licCost * (uuInd/100)
```

- `opp` (②) and `sunk`/`seatWaste` (①) are displayed as the two lenses. **Never render `opp + sunk`.**
- `paid cohort` uses `tsPaid` (org-data-grounded, saves more); `free cohort` uses `tsFree` (web-only, saves less).
- `cap` = "% of the potential already realised today without enablement"; `(1 - cap)` is the unrealised share.

---

## 4. Inputs, ranges, defaults

| Input | id | Type | Range / options | Default | Drives |
|---|---|---|---|---|---|
| Currency | `curSeg` / `.wcur` | choice | INR, USD, EUR, AUD | INR | symbol, licCost, salary range, benchmarks |
| Knowledge workers | `emp` / `empR` / `wEmp` | number+slider | 100–12,000 step 100 | (user) | emp |
| Paid licence % | `lic` / `wLic` | slider | 0–100 | 30 | paidCount / freeCount |
| Avg annual salary | `sal` / `salR` / `wSal` | number+slider | per currency (see §5) | per currency | hourly |
| Paid Copilot time saveable/day | `tsPaid` | slider | 10–120 min step 5 | 30 | oppPaid |
| Free Chat time saveable/day | `tsFree` | slider | 0–60 min step 5 | 10 | oppFree |
| Realised today (cap) | `cap` | slider | 0–80 % | 20 | opportunity (set by adoption Q) |
| Copilot add-on price/user/yr | `licCost` | number | per currency | per currency | sunk / seatWaste |
| Licence under-utilisation | `uu` | slider | 0–100 % | 50 | sunk / seatWaste (set by adoption Q) |
| Working days/year | `days` | number | — | 220 | hourly, hours/yr |

Sliders and number fields are **two-way synced** (drag updates the number and vice-versa) for `emp` and `sal`. The wizard sliders (`wEmp`, `wLic`, `wSal`) mirror into the real inputs and call `calc()`.

---

## 5. Currency configuration (region-native data)

Implement as a `CUR` map. `lic` = annual Copilot add-on price in that currency; benchmarks are clickable salary chips.

| Cur | sym | Copilot /mo (`licMo`) | Copilot /yr (`lic`) | salary default | salary min–max (step) | benchmark chips (value → label) | avg-pay note |
|---|---|---|---|---|---|---|---|
| INR | ₹ | ₹2,495/mo | 29,940 | 1,000,000 | 300,000–3,000,000 (25,000) | 500000 Admin ₹5L · 800000 Knowledge worker ₹8L · 1200000 Engineer ₹12L · 2000000 Manager ₹20L | India urban-professional avg ≈ ₹9.45 L/yr (Glassdoor 2026) |
| USD | $ | $30/mo | 360 | 80,000 | 30,000–300,000 (2,500) | 45000 Support $45k · 80000 Professional $80k · 120000 Engineer $120k · 180000 Manager $180k | US knowledge-worker median ≈ $80–95k/yr |
| EUR | € | €28/mo | 336 | 60,000 | 25,000–250,000 (2,500) | 38000 Support €38k · 60000 Professional €60k · 90000 Engineer €90k · 140000 Manager €140k | EU knowledge-worker avg ≈ €55–65k/yr |
| AUD | A$ | A$45/mo | 540 | 95,000 | 40,000–320,000 (2,500) | 60000 Support A$60k · 95000 Professional A$95k · 130000 Engineer A$130k · 180000 Manager A$180k | Australia knowledge-worker avg ≈ A$90–100k/yr |

**Number formatting (`money()`):**
- INR: `≥1e7 → ₹X.XX Cr`, `≥1e5 → ₹X.XX L`, else `₹` + Indian-grouped integer.
- USD/EUR/AUD: `≥1e6 → sym + X.XXM`, else `sym` + US-grouped integer.

**Switching currency** (both the wizard `.wcur` buttons and the top `#curSeg` toggle): set `cur`, set `licCost = CUR[cur].lic`, reset salary/slider ranges + value to region defaults, relabel benchmark chips, update the salary note (`#salNote`) and licence note (`#licNote`), refresh selected-state on both pickers, then `calc()`. **Do not FX-convert the entered salary** — reset to region default (a converted cross-region salary is meaningless). A `fxINR` map (`INR:1, USD:87, EUR:94, AUD:57`) exists only if you ever want optional conversion; it is not used by default.

Copilot regional prices and salary benchmarks are **directional list/average figures** — label them "region list, approx" and treat as adjustable. Verify a specific market's exact Copilot price before quoting it there.

---

## 6. Adoption question → parameter mapping

Wizard step "How well is AI actually used today?" sets `cap` (realised) and `uu` (under-use). Four option buttons:

| Option label | sub-label | cap | uu |
|---|---|---|---|
| Barely — tools sit idle, most can't really prompt | licences bought, mostly unused | 10 | 75 |
| **Patchy — a few power users, most dabble under ~30 min/day** (default selected) | the typical enterprise today | 20 | 50 |
| Fairly well — many use it daily, but not deeply | real adoption, shallow skill | 40 | 30 |
| Heavily — most people are genuinely fluent | rare — you're ahead | 60 | 15 |

The worse the honest self-assessment, the higher both lenses — and the bigger the stated upside of enabling. This is the key "insight" question.

---

## 7. Wizard flow (copy is final — keep it)

Progress: 6 dots. Steps navigate via `data-next` / `data-back`; `wizGo(n)` shows the step whose `data-step==n` and lights dots `data-d<=n`.

1. **Currency** — "First — which currency should we work in?" → four `.wcur` buttons (₹ INR / $ USD / € EUR / A$ AUD). Hint: "We'll set the region's Microsoft Copilot price and typical salary ranges to match — so every figure is in your currency."
2. **Headcount** — "How many knowledge workers do you have? (office / desk staff)" → big value + slider 100–12,000. Hint: "Drag to your rough headcount — your LinkedIn company size is close enough."
3. **Licence %** — "Roughly how many are on a **paid** Copilot licence?" → % slider. Hint: "Not sure? Most enterprises land at 10–30%. Even 0% works — your value-at-stake still shows, and the wasted-licence figure is given per-seat so nothing is assumed about your exact count."
4. **Salary** — "Average annual salary per person?" → big value + slider + benchmark chips (`.wchip`, per currency) + note (`#salNote`, per currency, cites Glassdoor for INR).
5. **Adoption** — "Honestly — how well is AI actually used today, **before** any training?" → four `.wopt` buttons (see §6). Hint: "The less it's used today, the more un-enabled AI is costing you now — and the bigger the upside of enabling your people."
6. **Reveal** — "Here's what un-enabled AI is quietly costing [company] — every year:" with:
   - Card ② VALUE AT STAKE · estimate → `opp`. Sub: "productivity left on the table, across paid + free users".
   - Card ① HARD CASH · wasted licences → `seatWaste` (per idle seat). Sub: per-seat + "at your ~N% that's M seats ≈ [sunk]/yr" (only when licence % > 0).
   - Note: "Shown **separately, not summed** — ① is cash already gone; ② is the upside of fixing it. The wasted-licence figure is **per seat**, so multiply by however many paid Copilot seats you actually hold: ≈ [per1000] per 1,000 idle seats…"
   - CTA: primary "See how to fix it — book 20 min →"; secondary link "or explore the full calculator with all assumptions ↓" (reveals `#fullcalc` + a closing CTA block).

---

## 8. Full calculator (`#fullcalc`) contents

Two-column: **Your numbers** (all inputs from §4, with the assumptions in a `<details>` "Adjust the assumptions (all cited)") and **What it's costing [company]** which contains, in order:

1. **Company / recipient name** field (`#co`) — personalises the headline/eyebrow ("Prepared for …") and the results header.
2. **Two lenses** (same as reveal, larger): ① Hard cash (`#sunkN`) with formula `[paidCount] licences × [licCost]/yr × [uu]% unused = [seatWaste]/idle seat` and range "At industry ~70% under-use ≈ [sunkInd]/yr"; ② Value at stake (`#oppN`) with formula `[paidCount] paid @ [tsPaid] min/day + [freeCount] free @ [tsFree] min/day · [unreal]% unrealised` and range "At industry benchmarks ≈ [oppInd]/yr".
3. **Lens note** — the "two different things, shown separately… we don't add them… double-count" explainer.
4. **Add-on callout** — "Copilot is an add-on… turning Copilot on adds ~[licMo] per person on top of that… entire add-on fee is pure sunk cost… free tier (Copilot Chat) is web-only and can't see your org data."
5. **Cost breakup panel** — table: Base Microsoft 365 (Word/Outlook/Excel/Teams) → "already paid · not counted here"; Copilot add-on price/user/yr → `[licCost] ([licMo] × 12)`; Licensed users N% of E → `[paidCount]`; Total Copilot premium committed → `[paidCount×licCost]`; Under-utilised uu% → **sunk cost** `[sunk]`; footnote: "The add-on price is Copilot only… does not include those apps."
6. **How it's calculated** — the two formula rows + hourly-cost line.
7. **Citations** list (see §10).
8. **Save as image** button (`#saveBtn`) in the results header (marked `data-noshot` so it's excluded from the capture).

---

## 9. Share card & image export (`#shareCard`)

Landscape card, ~940px wide, rendered off-screen. Layout top→bottom:
- Header: brand + "Prepared for [company]" (or default title).
- Headline question: "What un-enabled AI is quietly costing [company] — every year".
- **② Value at stake** (large, teal gradient) → `opp`, sub "estimate · what enablement could unlock".
- **① Hard cash wasted per idle Copilot seat** (orange gradient) → `seatWaste` with small line "per idle seat/yr · ≈[per1000] / 1,000 seats". Label notes "Multiply by however many paid seats you hold."
- Note: "Shown **separately, not summed** — ① is cash already gone, ② is the upside of fixing it. At industry benchmarks the value at stake is ≈ [oppInd] a year."
- "What we ran" basis line: `[emp] workers · [sal] avg salary/yr · [paidCount] paid Copilot @ [tsPaid] min/day + [freeCount] free Chat @ [tsFree] min/day`.
- Footer: "Every assumption is published & adjustable in the live calculator" + "See the fix in 20 min · zrutam.com".

**Export:** on Save click → `html2canvas(#shareCard, {scale:2, useCORS:true, backgroundColor:'#F3F5F7'})` → `canvas.toBlob` → object-URL download named `AI-cost-of-inaction-[company-slug].png` (fallback to `toDataURL`). Show a status message ("Rendering…" → "Saved to your Downloads folder ✓"). Downloads go to the browser's Downloads folder (browsers can't target a folder) — say so in the status.

---

## 10. Citations (keep IDs `#c1`–`#c6`; footnote superscripts link to them)

1. **[1]** Microsoft Work Trend Index — *Copilot's Earliest Users*: ~14 min/day saved, 22% save 30+ min/day, 29% faster, 70% more productive. https://www.microsoft.com/en-us/worklab/work-trend-index/copilots-earliest-users-teach-us-about-generative-ai-at-work
2. **[2]** Microsoft — *11 minutes a day = 10 hours in 11 weeks*. https://news.microsoft.com/en-cee/2024/04/29/11-minutes-a-day-adds-up-to-10-hours-saved-in-11-weeks-results-of-a-study-on-the-impact-of-ai/
3. **[3]** Forrester Total Economic Impact™ of Microsoft 365 Copilot — 132–353% three-year ROI. https://www.microsoft.com/en-us/microsoft-365/blog/2024/10/17/microsoft-365-copilot-drove-up-to-353-roi-for-small-and-medium-businesses-new-study/
4. **[4]** Microsoft 365 Copilot pricing — add-on requiring a qualifying M365 base plan (E3/E5/Business); free Copilot Chat tier is web-grounded only and can't access org data. India list ₹2,495/user/mo (~₹29,940/yr ex-GST). https://www.microsoft.com/en-in/microsoft-365/copilot/
5. **[5]** Average salary in India, 2026 — urban-professional avg base pay ≈ ₹9.45 L/yr (Glassdoor). https://cleartax.in/s/average-salary-in-india
6. **[6]** Copilot utilisation — only ~20–30% of paid seats used weekly (≈70–80% under-used); enterprise activation ≈36% (Gartner/Forrester-compiled estimates, 2025–26; directional). https://valueaddvc.com/blog/microsoft-copilot-enterprise-adoption-what-the-data-shows-about-real-usage-vs-hype

Usage-intensity mapping (§6) is directional and self-reported — present as such, not as a cited hard figure.

---

## 11. Design tokens — REPLACED with the Zrutam Editorial Ink system (see design doc)

Semantic roles preserved: **teal = value/upside**, **amber/orange = cash/waste**, ink for text. Keep all element `id`s and the JS untouched — the logic keys off them. The share card (`#shareCard`) stays visually strong and standalone (it becomes an image).

## 12. Interactive behaviours checklist

- Wizard step nav (next/back), progress dots.
- Currency picker (wizard + top toggle) → `setCurrency()`.
- `emp`/`sal` slider ⇄ number two-way sync.
- Salary benchmark chips set salary.
- Adoption options set `cap`/`uu` and toggle `.on`.
- Company name → personalises headline, results header, share card.
- Currency `money()` formatting (Cr/L for INR; K/M for others).
- Save-as-image (html2canvas, offline, `#shareCard`, per-seat framing).
- "Explore full calculator" reveals `#fullcalc` + closing CTA.
- `calc()` runs on load and on every input/change.

## 13. Integration & deployment (as decided with the user)

- Artifact lives at `public/ai-cost/index.html` (+ `public/ai-cost/fonts/`) → serves at zrutam.com/ai-cost/ AND uploads standalone to **aicost.zrutam.com**.
- html2canvas 1.4.1 inlined (no CDN).
- No storage APIs, no backend, no cookies.
- Feature branch `feat/ai-cost-calculator`, then merge to main.
- Primary CTA → https://www.zrutam.com/contact/?interest=ai-enablement (new "AI Enablement" interest in ContactForm).

## 14. QA checklist before shipping

- [ ] Two lenses render; there is **no combined "total"** anywhere.
- [ ] Switching currency updates symbol, Copilot price, salary range/default, and benchmark chips; all outputs in-currency.
- [ ] Adoption options visibly change both numbers (Barely > Patchy > Fairly > Heavily).
- [ ] Per-seat hard-cash shows for any licence % (including 0%).
- [ ] Company name flows to headline + share card.
- [ ] Save-as-image works **offline** and produces a clean landscape card (no input sliders in it).
- [ ] Sliders and number inputs stay in sync.
- [ ] All six citations link out correctly.
- [ ] Mobile: wizard, lenses, and cards stack cleanly at ≤560px.
