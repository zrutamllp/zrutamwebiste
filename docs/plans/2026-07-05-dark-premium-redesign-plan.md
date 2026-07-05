# Zrutam Dark Premium Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restyle the entire Zrutam site to a richly animated dark-premium aesthetic (per `docs/plans/2026-07-05-dark-premium-redesign-design.md`) with zero new dependencies and zero logic changes.

**Architecture:** Foundation-first: extend Tailwind tokens + global CSS with the dark design system (surfaces, glass, glow, keyframes), then restyle shared components (navbar, footer, hero, cards, stats, awards, testimonials, CTA), then sweep inner pages to replace light-theme classes with dark equivalents. Framer Motion (already installed) handles choreography; CSS keyframes handle ambient motion.

**Tech Stack:** Next.js 14 (static export), Tailwind CSS 3.4, Framer Motion 12, TypeScript.

**Verification:** No test suite exists. Each task's "test" is: `npm run build` passes + visual check in browser preview. Never modify the Formspree/email-gate logic in `src/app/360-calculator/page.tsx` — class names only.

---

## Design tokens (used throughout — defined in Task 1)

- Page background: `bg-surface` (`#050A14`). Alternate sections: `bg-surface-raised` (`#0A1628`).
- Glass card: `glass-card` utility = `bg-white/[0.04] border border-white/10 backdrop-blur-md rounded-2xl`.
- Hover glow: `shadow-glow-teal`, borders shift to `border-teal/40`.
- Gradient text: `text-gradient` utility (teal → sky-300).
- Headings on dark: `text-white tracking-tight`; body: `text-slate-400` (use existing gray scale: `text-gray-400`).
- Ambient: `.aurora-blob` elements + `.bg-grid-dots` overlay; all disabled under `prefers-reduced-motion`.

---

### Task 1: Design-system foundation

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

**Step 1: Extend `tailwind.config.ts`** — add to `theme.extend`:

```ts
colors: {
  // ...keep existing navy/teal/amber/gray...
  surface: {
    DEFAULT: "#050A14",
    raised: "#0A1628",
    overlay: "#0D1B2E",
  },
},
boxShadow: {
  "glow-teal": "0 0 40px -8px rgba(14, 165, 233, 0.4)",
  "glow-teal-lg": "0 0 60px -10px rgba(14, 165, 233, 0.55)",
  "glow-amber": "0 0 40px -8px rgba(245, 158, 11, 0.45)",
},
keyframes: {
  "aurora-1": {
    "0%, 100%": { transform: "translate(0, 0) scale(1)" },
    "33%": { transform: "translate(80px, -60px) scale(1.15)" },
    "66%": { transform: "translate(-40px, 40px) scale(0.95)" },
  },
  "aurora-2": {
    "0%, 100%": { transform: "translate(0, 0) scale(1)" },
    "33%": { transform: "translate(-70px, 50px) scale(1.1)" },
    "66%": { transform: "translate(50px, -30px) scale(0.9)" },
  },
  marquee: {
    "0%": { transform: "translateX(0)" },
    "100%": { transform: "translateX(-50%)" },
  },
  shimmer: {
    "0%": { backgroundPosition: "200% 50%" },
    "100%": { backgroundPosition: "-200% 50%" },
  },
  "float-slow": {
    "0%, 100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-12px)" },
  },
},
animation: {
  "aurora-1": "aurora-1 18s ease-in-out infinite",
  "aurora-2": "aurora-2 22s ease-in-out infinite",
  marquee: "marquee 35s linear infinite",
  shimmer: "shimmer 6s linear infinite",
  "float-slow": "float-slow 6s ease-in-out infinite",
},
```

**Step 2: Rewrite `src/app/globals.css`** — keep the Inter import and tailwind directives; change body to dark; add utilities:

```css
body {
  font-family: "Inter", system-ui, sans-serif;
  color: #cbd5e1;
  background: #050A14;
}

::selection { background: rgba(14, 165, 233, 0.35); color: #fff; }

@layer utilities {
  .text-balance { text-wrap: balance; }
  .gradient-navy { background: linear-gradient(135deg, #0A1628 0%, #1A2A44 50%, #0F1E34 100%); }
  .gradient-teal { background: linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%); }

  .text-gradient {
    @apply text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal to-sky-400;
  }
  .glass-card {
    @apply bg-white/[0.04] border border-white/10 backdrop-blur-md rounded-2xl;
  }
  .bg-grid-dots {
    background-image: radial-gradient(circle, rgba(148, 163, 184, 0.12) 1px, transparent 1px);
    background-size: 28px 28px;
  }
  .aurora-blob {
    @apply absolute rounded-full blur-3xl pointer-events-none;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  html { scroll-behavior: auto; }
}
```

**Step 3: Verify** — Run `npm run build`. Expected: compiles (pages will look half-migrated; fine).

**Step 4: Commit** — `git commit -m "feat: dark design-system foundation (tokens, glass, aurora, glow)"`

---

### Task 2: Navbar → dark glass

**Files:** Modify: `src/components/Navbar.tsx`

- Header: replace `bg-white` / `shadow-md` with `bg-surface/70 backdrop-blur-xl border-b border-white/[0.06]`; when scrolled, `bg-surface/90` + `shadow-lg shadow-black/20`.
- Desktop links: `text-gray-300 hover:text-white`; add an underline-slide: wrap label with `relative` span + `after:` pseudo — `after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-teal after:transition-all hover:after:w-full`.
- Dropdown panel: `bg-surface-overlay/95 backdrop-blur-xl border border-white/10 shadow-xl shadow-black/40`; item hover `hover:bg-white/5 hover:text-teal-300`, text `text-gray-300`.
- Desktop CTA: `bg-amber text-navy hover:shadow-glow-amber hover:-translate-y-0.5 transition-all`.
- Hamburger bars: `bg-navy` → `bg-white`.
- Mobile menu: `bg-white` → `bg-surface-overlay/98 backdrop-blur-xl border-t border-white/10`; links `text-gray-200`, hovers `hover:bg-white/5 hover:text-teal-300`.
- No logic changes (dropdown timers, scroll lock stay as-is).

**Verify:** `npm run build`; preview: navbar renders dark glass over hero, dropdown readable, mobile menu dark. **Commit.**

---

### Task 3: Footer → refined dark

**Files:** Modify: `src/components/Footer.tsx`

- Root: `bg-navy` → `bg-surface border-t border-white/[0.06]`.
- Add subtle top treatment: relative wrapper with an `aurora-blob` (teal/5, ~400px, bottom-right) behind content.
- Social buttons: `hover:bg-teal/20` → also `hover:shadow-glow-teal hover:-translate-y-0.5 transition-all`.
- Link hovers: `hover:text-teal` → `hover:text-teal-300`.
- Everything else (content, links) unchanged.

**Verify:** build + preview. **Commit.**

---

### Task 4: HeroSection → showcase

**Files:** Modify: `src/components/HeroSection.tsx`

Full rebuild of visuals (content/CTAs/links identical):

1. **Background** (replace current blobs):
```tsx
<div className="absolute inset-0 overflow-hidden">
  <div className="absolute inset-0 bg-grid-dots opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
  <div className="aurora-blob animate-aurora-1 -top-40 -right-20 w-[600px] h-[600px] bg-teal/15" />
  <div className="aurora-blob animate-aurora-2 top-1/3 -left-40 w-[500px] h-[500px] bg-sky-600/10" />
  <div className="aurora-blob animate-aurora-1 -bottom-60 right-1/4 w-[550px] h-[550px] bg-amber/[0.07]" style={{ animationDelay: "-9s" }} />
  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface to-transparent" />
</div>
```
Section becomes `bg-surface` (drop `gradient-navy`), `min-h-screen`.

2. **Headline word-by-word reveal** — split the h1 text into words, render each in a `motion.span` (inline-block) with container/child variants: child `{ opacity: 0, y: 24, filter: "blur(8px)" }` → `{ opacity: 1, y: 0, filter: "blur(0px)" }`, spring `{ type: "spring", stiffness: 120, damping: 18 }`, `staggerChildren: 0.06`. "AI-Powered Learning" keeps gradient but upgrade to shimmer: `text-transparent bg-clip-text bg-[linear-gradient(110deg,#5EEAD4,45%,#0EA5E9,55%,#5EEAD4)] bg-[length:200%_100%] animate-shimmer`.

3. **Badge** — glass pill: `bg-white/5 border border-white/10 backdrop-blur` with a small pulsing teal dot (`animate-ping` inner span, wrapped in relative spans).

4. **CTAs** — primary: `bg-amber text-navy shadow-glow-amber hover:-translate-y-1 hover:shadow-glow-amber transition-all duration-300`; secondary: `glass-card !rounded-lg text-white hover:border-teal/40 hover:bg-white/[0.08]`.

5. **Floating stat chips** (new, right side, hidden below `lg`): 2–3 small `glass-card px-4 py-3` chips absolutely positioned (e.g. "10,000+ Leaders Trained", "97% Completion Rate") with `animate-float-slow` and staggered `animationDelay`, entering via motion `opacity/scale` after headline (delay ~0.8s).

6. **Scroll indicator** — bottom-center `motion.div`: mouse-outline (border rounded-full w-6 h-10) with animated inner dot (`animate-bounce` styled), fades in last.

**Verify:** build + preview at 1280 and 375 (chips hidden on mobile, no horizontal overflow). **Commit.**

---

### Task 5: Homepage sections + logo marquee

**Files:** Modify: `src/app/page.tsx`

- Section backgrounds: `bg-gray-50` → `bg-surface`, `bg-white` → `bg-surface-raised`; heading colors `text-navy` → `text-white tracking-tight`; body `text-gray-600` → `text-gray-400`. Stats section wrapper: drop `gradient-navy` (component handles bg).
- Add section eyebrow labels above h2s: `<span className="text-teal-300 text-sm font-semibold uppercase tracking-[0.2em]">` (e.g. "What we do").
- **Logo marquee** (replaces flex-wrap): two copies of the logo list inside a translating track:
```tsx
<div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
  <div className="flex w-max animate-marquee gap-16 pr-16 hover:[animation-play-state:paused]">
    {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
      <div key={i} className="flex items-center justify-center h-10 opacity-50 hover:opacity-100 transition-opacity brightness-0 invert">
        <Image src={logo.src} alt={logo.alt} width={120} height={40} className="h-8 md:h-10 w-auto object-contain" />
      </div>
    ))}
  </div>
</div>
```
(`brightness-0 invert` renders all logos white; check in preview — if a logo disappears, use `grayscale invert` instead.)

**Verify:** build + preview: marquee loops seamlessly, pauses on hover. **Commit.**

---

### Task 6: SolutionCard → glass + cursor spotlight

**Files:** Modify: `src/components/SolutionCard.tsx`

- Card shell: `bg-white ... shadow-sm` → `glass-card p-6 lg:p-8 transition-all duration-300 hover:border-teal/30 hover:shadow-glow-teal hover:bg-white/[0.06]`. Keep `whileHover={{ y: -6 }}`.
- **Spotlight**: track mouse per-card and render a radial highlight:
```tsx
const [pos, setPos] = useState({ x: 0, y: 0 });
const [hovering, setHovering] = useState(false);
// onMouseMove on card div:
//   const r = e.currentTarget.getBoundingClientRect();
//   setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
<div
  className="pointer-events-none absolute inset-0 transition-opacity duration-300"
  style={{
    opacity: hovering ? 1 : 0,
    background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, rgba(14,165,233,0.12), transparent 65%)`,
  }}
/>
```
- Icon tile: `bg-teal-50 text-teal` → `bg-gradient-to-br from-teal/20 to-sky-600/10 text-teal-300 border border-teal/20`, hover `group-hover:from-teal group-hover:to-sky-500 group-hover:text-white group-hover:shadow-glow-teal`.
- Title: `text-navy` → `text-white`, hover `group-hover:text-teal-300`. Description: `text-gray-500` → `text-gray-400`. Keep top accent line and arrow-slide.

**Verify:** build + preview: spotlight follows cursor, glow on hover. **Commit.**

---

### Task 7: StatsCounter → gradient numerals

**Files:** Modify: `src/components/StatsCounter.tsx`

- Section: `gradient-navy` → `bg-surface relative overflow-hidden` + one centered `aurora-blob animate-aurora-2 bg-teal/[0.07] w-[700px] h-[700px]` behind + `border-y border-white/[0.06]`.
- `AnimatedNumber` span: `text-teal` → `text-gradient`.
- Labels stay `text-gray-400`; add thin divider accents between columns on lg (`lg:divide-x lg:divide-white/[0.06]` on the grid).

**Verify:** build + preview: numbers count up in gradient. **Commit.**

---

### Task 8: AwardsSection → dark glass

**Files:** Modify: `src/components/AwardsSection.tsx`

- Section: `bg-white` → `bg-surface-raised`; keep pattern div but raise fill opacity slightly for dark (`fill='%23FFFFFF'`, opacity 0.02).
- Badge pill: `bg-amber-50 border-amber-200/60 text-amber-700` → `bg-amber/10 border-amber/25 text-amber-300`.
- Heading `text-navy` → `text-white`; body `text-gray-600` → `text-gray-400`.
- Card: `bg-white border-gray-200/80` → `glass-card hover:border-amber/30 hover:shadow-glow-amber`; inner text: title → `text-white`, category → `text-gray-300` / label `text-gray-100`, organizer → `text-gray-400`/`text-gray-200`. Trophy tile unchanged (already navy gradient — works on dark).

**Verify:** build + preview. **Commit.**

---

### Task 9: TestimonialSlider → dark glass

**Files:** Modify: `src/components/TestimonialSlider.tsx`

- Section: `bg-gray-50` → `bg-surface`.
- Heading `text-navy` → `text-white`; sub `text-gray-500` → `text-gray-400`.
- Card: `bg-white shadow-sm border-gray-100` → `glass-card p-8 sm:p-10 lg:p-12`; quote text `text-navy` → `text-gray-200`; name `text-navy` → `text-white`; keep avatar gradient.
- Dots: inactive `bg-gray-300 hover:bg-gray-400` → `bg-white/20 hover:bg-white/40`.
- Arrows: `border-gray-200 text-gray-400` → `border-white/15 text-gray-400 hover:border-teal/50 hover:text-teal-300 hover:shadow-glow-teal`.
- Add a large decorative quote glyph behind the card (`text-white/[0.03]`, absolute, text-[200px], serif).

**Verify:** build + preview: slider crossfades, dots/arrows work. **Commit.**

---

### Task 10: CTABanner → animated gradient border

**Files:** Modify: `src/components/CTABanner.tsx`

- Section: `bg-surface py-20 lg:py-28`; remove stray empty `<div className="gradient-navy" />`.
- Wrap content in a glowing panel:
```tsx
<div className="relative max-w-5xl mx-auto rounded-3xl p-[1px] bg-[linear-gradient(120deg,rgba(14,165,233,0.5),rgba(245,158,11,0.4),rgba(14,165,233,0.5))] bg-[length:200%_200%] animate-shimmer">
  <div className="relative rounded-3xl bg-surface-raised px-6 py-16 sm:px-12 lg:py-20 overflow-hidden">
    {/* aurora-blob teal/10 top-right + amber/[0.06] bottom-left inside */}
    {/* existing heading/sub/CTAs, text-white / text-gray-400 */}
  </div>
</div>
```
- Primary CTA: add `hover:-translate-y-1 hover:shadow-glow-amber transition-all`; secondary: `border-white/20 hover:border-teal/50 hover:bg-white/5`.

**Verify:** build + preview: border gradient slowly moves. **Commit.**

---

### Task 11: Inner-pages dark sweep

**Files (modify each):**
- `src/components/SolutionDetailPage.tsx` (drives all 5 solution pages)
- `src/app/solutions/page.tsx`
- `src/app/about/page.tsx`
- `src/app/clients/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`
- `src/app/profile/page.tsx`
- `src/app/tools/idp/page.tsx`, `src/app/tools/360/page.tsx`
- `src/app/360-calculator/page.tsx` (**class names only — do not touch state, handlers, fetch, or the email-gate/Formspree logic**)

Read each file first. Apply the mapping consistently:

| Old (light) | New (dark) |
|---|---|
| `bg-white` section | `bg-surface-raised` |
| `bg-gray-50` / `bg-gray-100` section | `bg-surface` |
| `text-navy` headings | `text-white tracking-tight` |
| `text-gray-600`/`text-gray-700` body | `text-gray-400` / `text-gray-300` |
| white cards (`bg-white border-gray-* shadow-*`) | `glass-card` (+ `hover:border-teal/30 hover:shadow-glow-teal` where interactive) |
| form inputs (`bg-white border-gray-300`) | `bg-white/5 border-white/15 text-white placeholder-gray-500 focus:border-teal focus:ring-teal/30` |
| `hover:text-teal` | `hover:text-teal-300` |
| light hero strips (`gradient-navy` etc.) | keep, add `bg-grid-dots` overlay + one aurora blob for consistency |

Larger pages may be done as sub-steps; **build + commit after each file or logical group** (e.g. "solutions pages", "content pages", "tools + calculator").

**Verify per group:** `npm run build` passes; preview each page for unreadable text (dark-on-dark) — the #1 regression risk.

---

### Task 12: Final verification

1. `npm run build` — clean pass, all routes exported.
2. Preview at 1280px and 375px: home, one solution detail, solutions hub, about, contact (form usable), blog + one post, tools/360, 360-calculator.
3. 360-calculator: email gate overlay appears, inputs typeable, submit button enabled state unchanged (do not actually submit to Formspree).
4. Check `prefers-reduced-motion` via preview emulation or DevTools: ambient animation stops.
5. Screenshot homepage hero + solutions + CTA for the user.
6. Final commit if any fixes were made.
