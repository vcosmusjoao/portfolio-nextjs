# Session Handoff — Portfolio

> Snapshot for the next session. **Next session's goal: commit + push → deploy on Vercel →
> connect the Cloudflare domain `joaovcosta.dev`.**

---

## Where things stand

- **Repo location:** `C:\dev\portfolio` (moved out of OneDrive on 2026-06-24). Open Claude Code
  here, **not** the old `...\OneDrive\Área de Trabalho\...` path.
- **Build:** `npm run build` → ✅ exit 0. `npm run lint` → ✅ clean.
- **Branch:** `main`. All work below is **uncommitted** (committing was intentionally deferred).
- **Domain:** `joaovcosta.dev` — registered at **Cloudflare**. Not yet connected to anything.
- **Deploy target:** Vercel (not deployed yet).

---

## What was done this session

### 1. Full pre-deploy audit (report-only) → 5 docs at repo root
- `AUDIT.md` — prioritized P0–P3 findings + code-cleanup checklist.
- `DEPLOY_CHECKLIST.md` — readiness table (now mostly ✅ after the P1 fixes).
- `ROADMAP_V2.md` — post-launch improvements by Impact × Effort.
- `BRANDING.md` — domain options (chosen: `joaovcosta.dev`).
- `README.md` — rewritten professional README (replaced the template one).

### 2. Four P1 pre-deploy fixes (done + verified in build)
- **Metadata** — full `metadata` in `src/app/layout.js`: `metadataBase` (joaovcosta.dev),
  `openGraph`, `twitter` (summary_large_image), `keywords`, `authors`, canonical, `robots`.
- **OG image** — `src/app/opengraph-image.tsx` (1200×630, terminal theme).
- **robots + sitemap** — `src/app/robots.ts`, `src/app/sitemap.ts` → `/robots.txt` + `/sitemap.xml`.
- **Favicon** — `src/app/icon.tsx` + `src/app/apple-icon.tsx` ("J" mark). Removed template
  `public/favicon.ico`.

### 3. Environment fixes
- Moved repo out of OneDrive → `C:\dev\portfolio` (robocopy; `node_modules` reinstalled).
- Stopped the OneDrive process to release file locks (it restarts on login).

### ⚠️ Critical gotcha — do NOT remove
The three `next/og` image routes (`icon`, `apple-icon`, `opengraph-image`) each have
**`export const runtime = "edge"`**. This is required: without it, `next build` crashes on
Windows during Node prerender (`@vercel/og` → `TypeError: Invalid URL` / `fileURLToPath`).
Edge runtime makes them on-demand (`ƒ`) and is the standard Vercel pattern.

---

## Files changed/created this session

```
M  README.md                      (rewritten)
M  src/app/layout.js              (full metadata)
D  public/favicon.ico             (template favicon removed)
A  AUDIT.md AUDIT report
A  BRANDING.md
A  DEPLOY_CHECKLIST.md
A  ROADMAP_V2.md
A  HANDOFF.md                     (this file)
A  src/app/robots.ts
A  src/app/sitemap.ts
A  src/app/opengraph-image.tsx    (edge runtime)
A  src/app/icon.tsx               (edge runtime)
A  src/app/apple-icon.tsx         (edge runtime)
?? website images/                (untracked template leftover — candidate for cleanup)
```

---

## NEXT SESSION — Deploy plan

### Step 0 — Pre-flight
- [ ] Confirm working dir is `C:\dev\portfolio`.
- [ ] `npm run build` passes locally (it does).
- [ ] Optional cleanup before committing (see AUDIT.md cleanup list): remove `website images/`,
      dead code (`useTypingEffect.js`, `Icons.js`, `Home.module.css`), unused template assets.

### Step 1 — Commit & push
- [ ] Review `git status` / `git diff`.
- [ ] Commit the audit docs + P1 fixes (suggest 2 commits: `docs: add pre-deploy audit reports`
      and `feat: add SEO metadata, OG image, robots, sitemap, favicon`).
- [ ] Confirm the GitHub remote (`git remote -v`). Repo owner handle is `vcosmusjoao`.
- [ ] `git push origin main`.

### Step 2 — Deploy on Vercel
- [ ] Go to vercel.com/new → import the GitHub repo.
- [ ] Framework auto-detected as **Next.js**; keep defaults (build `next build`, output `.next`).
- [ ] No environment variables needed (static site).
- [ ] Deploy → confirm the `*.vercel.app` URL renders (check `/`, `/opengraph-image`, `/icon`,
      `/robots.txt`, `/sitemap.xml`).

### Step 3 — Connect Cloudflare domain `joaovcosta.dev`
- [ ] In **Vercel** → Project → Settings → **Domains** → add `joaovcosta.dev` (and `www`).
      Vercel will show the required DNS records.
- [ ] In **Cloudflare** → DNS for `joaovcosta.dev`, add the records Vercel asks for. Typically:
  - Apex `joaovcosta.dev`: **A** record → `76.76.21.21` (verify the exact IP Vercel shows).
  - `www`: **CNAME** → `cname.vercel-dns.com`.
- [ ] **Cloudflare proxy:** set the records to **DNS only (grey cloud)** initially to avoid
      SSL/redirect loops while Vercel issues its cert. Can revisit proxying later.
- [ ] Set SSL/TLS mode in Cloudflare to **Full** (not Flexible) if proxy is ever enabled.
- [ ] Wait for Vercel to verify the domain + issue the certificate (a few minutes).
- [ ] Set the apex (or www) as the primary domain in Vercel and confirm the redirect direction.

### Step 4 — Post-deploy verification
- [ ] Visit `https://joaovcosta.dev` — site loads over HTTPS.
- [ ] Test social preview: paste the URL into the LinkedIn Post Inspector / metatags.io to
      confirm the OG image + title render.
- [ ] `https://joaovcosta.dev/robots.txt` and `/sitemap.xml` resolve and reference the real domain.
- [ ] Run Lighthouse; note scores for the ROADMAP.

### Nice-to-haves after deploy (from ROADMAP_V2.md)
- [ ] Add `@vercel/analytics` + Speed Insights.
- [ ] Submit the site to Google Search Console (verify via DNS TXT on Cloudflare).
- [ ] Email alias on the domain (e.g. `hi@joaovcosta.dev`) via Cloudflare Email Routing.
