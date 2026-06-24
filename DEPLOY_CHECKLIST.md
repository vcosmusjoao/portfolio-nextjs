# Deploy Readiness Checklist

Status of each production concern. **Re-run `npm run build` + `npm run lint` to confirm the
build/lint rows before deploy** (not executed in this audit session).

| Status | Meaning |
|--------|---------|
| ✅ | Ready |
| ⚠️ | Partial / needs attention |
| ❌ | Missing |

---

## Checklist

| Area | Status | Notes |
|------|:------:|-------|
| **Responsiveness** | ✅ | Desktop sidebar + accessible mobile drawer; fluid type scales; landscape avatar hide. Recommend a final manual pass at 360 / 768 / 1280 px. |
| **SEO** | ✅ | `metadataBase`, `title` template, `description`, `keywords`, `authors`, `canonical`, and `robots` set in `src/app/layout.js`. Sitemap + robots present (below). |
| **Performance** | ✅ | Static App Router page, `next/font` (self-hosted), `next/image` with `priority` on hero. Run Lighthouse post-deploy to confirm. |
| **Accessibility** | ⚠️ | Strong mobile-menu a11y (`aria-modal`, `aria-expanded`, Esc). Gaps: no `prefers-reduced-motion`; verify cyan-on-dark contrast for low-opacity body text (`opacity-70/80`). |
| **Metadata** | ✅ | Full `metadata` in `src/app/layout.js`: `metadataBase` (joaovcosta.dev), `openGraph`, `twitter` (summary_large_image), canonical. |
| **Open Graph** | ✅ | `src/app/opengraph-image.tsx` (1200×630, terminal theme) via `next/og` on edge runtime. Twitter card falls back to it. |
| **Sitemap** | ✅ | `src/app/sitemap.ts` → `/sitemap.xml` (verified in build). |
| **robots.txt** | ✅ | `src/app/robots.ts` → `/robots.txt` with sitemap reference (verified in build). |
| **Favicon** | ✅ | Custom `src/app/icon.tsx` + `apple-icon.tsx` ("J" mark). Template `public/favicon.ico` removed. |
| **Loading states** | ⚠️ | No `loading.tsx`, but acceptable — the page is static/instant. Low priority. |
| **Error handling** | ⚠️ | No custom `not-found.tsx` / `error.tsx`; relies on Next defaults. A themed 404 is recommended. P2 #9. |
| **Analytics** | ❌ | None. Add `@vercel/analytics` + Speed Insights to learn who visits. |
| **Security** | ✅ | Static site, no secrets, no backend. All external links use `rel="noreferrer"` + `target="_blank"`. Optional: add security headers in `next.config.js`. |
| **Environment variables** | ✅ | None required — fully static. `.gitignore` already excludes `.env*.local`. |
| **Build passes** | ✅ | `npm run build` exits 0 (verified 2026-06-24). Image routes (`icon`/`apple-icon`/`opengraph-image`) run on edge runtime — required to avoid a `@vercel/og` `fileURLToPath` crash during Node prerender on Windows. |
| **Lint passes** | ✅ | `npm run lint` clean. (Benign warning: eslint-config-next@13 expects a `pages/` dir — harmless on App Router.) |

---

## Verdict

**Can it deploy today?** Yes — there are no blockers; the site will build and run.

**Should it deploy today?** Yes. The four P1 pre-deploy items are now **done and verified
in a clean `npm run build`**. Remaining ⚠️/❌ items are P2/P3 improvements that can ship in a
fast follow.

**Pre-deploy minimum — DONE (verified 2026-06-24):**
1. ✅ Complete `metadata` (OpenGraph + Twitter + metadataBase) — `src/app/layout.js`.
2. ✅ `opengraph-image` 1200×630 — `src/app/opengraph-image.tsx` (edge runtime).
3. ✅ `robots.ts` + `sitemap.ts` — generate `/robots.txt` + `/sitemap.xml`.
4. ✅ Replace template favicon — `src/app/icon.tsx` + `apple-icon.tsx`.

**Note:** the `next/og` image routes use `export const runtime = "edge"`. This is required —
the Node prerender path crashes on Windows (`@vercel/og` `fileURLToPath: Invalid URL`). Edge
runtime is also the recommended Vercel pattern and renders the images on demand in production.

See [AUDIT.md](AUDIT.md) for exact fixes and file paths.
