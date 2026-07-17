# Deploying zrutam.com to Hostinger

The site is a fully static export (Next.js `output: "export"`). No Node.js needed on the server — you upload plain HTML/CSS/JS files.

## 1. Activate the forms — ✅ DONE (2026-07-15)

Both the **contact form** and the **Risk Calculator email gate** post to Web3Forms. The live access key is already wired into `WEB3FORMS_ACCESS_KEY` in `src/lib/constants.ts` (commit 181adf9). Submissions arrive at the inbox the Web3Forms form was registered with — confirm in the Web3Forms dashboard that delivery points at **ceo@zrutam.com**.

To rotate the key later: replace that one constant and rebuild.

## 2. Build

```
npm run build
```

The complete static site is written to `out/`.

## 3. Upload to Hostinger

1. Zip the **contents** of `out/` (select everything *inside* the folder — `index.html`, `_next/`, etc. — not the `out` folder itself).
2. Hostinger hPanel → **File Manager** → `public_html` → upload the zip → **Extract** it there.
   (FTP works too — copy the contents of `out/` into `public_html`.)
3. `index.html` must end up directly in `public_html`, not in `public_html/out`.

Re-deploying: repeat steps 2–3. Overwrite existing files.

## 4. 404 handling

Handled by the `.htaccess` that ships in every build (`ErrorDocument 404 /404.html` — lives in `public/`, copied to `out/` automatically). Every real route is a folder with its own `index.html` (the build uses `trailingSlash: true`). Verified live 2026-07-17: Hostinger does NOT serve `404.html` automatically without this file.

## 5. Post-deploy verification

- [ ] https://www.zrutam.com/ loads with the Fraunces display font (headings are serif, not fallback Georgia flash that stays)
- [ ] One solution page renders, e.g. /solutions/leadership-development/
- [ ] /360-calculator/ — enter headcount 1000, salary 50000, pyramid 20/80/100, hit "Reveal Risk Exposure" → TVR shows **$4.38M**
- [ ] /contact/ — submit the form and confirm a REAL email arrives at ceo@zrutam.com (only works after step 1)
- [ ] https://www.zrutam.com/sitemap.xml resolves
- [ ] A made-up URL like /nope/ shows the branded 404 page

## Notes

- `robots.txt` and `sitemap.xml` ship automatically from `public/` — they are already in `out/` after every build.
- Fonts are self-hosted in `_next/static/media/` — no Google Fonts requests at runtime.
