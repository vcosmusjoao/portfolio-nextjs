# Production Audit — Portfolio

> Senior Front-End pre-deploy audit of the Next.js portfolio.
> **This document is report-only — no code was changed and no files were removed.**
> Date: 2026-06-24 · Stack: Next.js 14 (App Router), Tailwind v4, Framer Motion.

## Priority legend

| Tag | Meaning |
|-----|---------|
| **P0** | Blocker — must fix before deploy |
| **P1** | Important — should fix before deploy |
| **P2** | Improvement — recommended, not required |
| **P3** | Future — nice to have |

---

## P0 — Blockers

**None identified.** The app is structurally sound: a single-page App Router site with a
clean component tree (`Hero`, `About`, `Projects`, `Skills`, `Contact`), valid metadata,
and all referenced images present on disk. There is nothing that hard-blocks a Vercel
deploy. Confirm with a clean `npm run build` and `npm run lint` (see Verification).

---

## P1 — Important (fix before deploy)

### 1. SEO / metadata is incomplete
- **Finding:** `src/app/layout.js` exports `metadata` with only `title` and `description`.
- **Why it matters:** No `metadataBase`, `openGraph`, or `twitter` card means links shared on
  LinkedIn / WhatsApp / X render as a bare URL with no image or rich preview — the single most
  important surface when a recruiter shares or revisits your site.
- **Suggested fix:** Add to `metadata`:
  - `metadataBase: new URL("https://<your-domain>")`
  - `openGraph` (title, description, url, siteName, images, locale, type)
  - `twitter` (card: "summary_large_image", title, description, images)
  - `keywords`, `authors`, `creator`
  - `alternates.canonical`
- **File:** `src/app/layout.js`

### 2. No Open Graph / social preview image
- **Finding:** No `opengraph-image` or `og-image.png` exists.
- **Why it matters:** Even with OG metadata, there's no image to show. A 1200×630 preview card
  dramatically increases click-through when the link is shared.
- **Suggested fix:** Add `src/app/opengraph-image.png` (1200×630) or a dynamic
  `opengraph-image.tsx` using `next/og`. App Router auto-wires it.
- **File:** `src/app/` (new asset)

### 3. No `robots.txt` and no `sitemap.xml`
- **Finding:** Neither exists.
- **Why it matters:** Search engines can't reliably discover/index the site; a portfolio that
  ranks for your name is a real asset for recruiters Googling you.
- **Suggested fix (App Router native):** add `src/app/robots.ts` and `src/app/sitemap.ts`
  (Next generates `/robots.txt` and `/sitemap.xml` automatically).
- **File:** `src/app/robots.ts`, `src/app/sitemap.ts` (new)

### 4. Template favicon still in place
- **Finding:** `public/favicon.ico` is the starter-template icon.
- **Why it matters:** Generic favicon in the browser tab undercuts a personal-brand site.
- **Suggested fix:** Replace with a custom mark (e.g. a "J" / terminal glyph). For App Router,
  drop `src/app/icon.png` and `src/app/apple-icon.png`; Next handles the `<link>` tags.
- **File:** `public/favicon.ico` → `src/app/icon.png` + `apple-icon.png`

---

## P2 — Improvements (recommended)

### 5. Redundant `jsconfig.json` alongside `tsconfig.json`
- **Finding:** Both exist. `jsconfig.json` sets `checkJs: true` and `jsx: "react"`.
- **Why it matters:** Next.js uses `tsconfig.json` in a TS project; the `jsconfig` is dead config
  that can confuse editors/contributors and contradicts the real setup (`jsx: "preserve"`).
- **Suggested fix:** Delete `jsconfig.json`. (Path alias `@/*` already lives in `tsconfig.json`.)
- **File:** `jsconfig.json`

### 6. Dependency version skew
- **Finding:** `eslint-config-next@13.2.4` with `next@14.2.10`; `@types/react@19.x` with `react@18.2`.
- **Why it matters:** Lint rules lag the framework; React 18 runtime with React 19 types can
  surface spurious type errors or hide real ones.
- **Suggested fix:** Bump `eslint-config-next` to `^14.2`; pin `@types/react`/`@types/react-dom`
  to the `^18` line to match the runtime.
- **File:** `package.json`

### 7. Mixed `.js` / `.tsx` across components
- **Finding:** `layout.js`, `Hero.js`, `Navbar.js` are `.js`; the rest are `.tsx`.
- **Why it matters:** `CLAUDE.md` mandates TS for new files; consistency signals discipline to
  reviewers reading the repo. JS files skip type-checking entirely.
- **Suggested fix:** Migrate the three to `.tsx`/`.ts` and type the props (`RootLayout` children,
  Navbar handlers). Low risk, high polish.
- **Files:** `src/app/layout.js`, `src/components/Hero.js`, `src/components/Navbar.js`

### 8. Portuguese comments in source
- **Finding:** `useTerminalEffect.ts` contains PT comments: *"prepara as linhas vazias"*,
  *"← cleanup REAL opcional"*.
- **Why it matters:** `CLAUDE.md` requires all text in English; an international recruiter reading
  the code should see English throughout.
- **Suggested fix:** Translate the comments (or remove the redundant ones).
- **File:** `src/hooks/useTerminalEffect.ts`

### 9. No custom `not-found` / `error` / `loading` routes
- **Finding:** Project relies on Next's default error/404 pages.
- **Why it matters:** A styled 404 that matches the terminal theme reads far more finished than
  the default white page.
- **Suggested fix:** Add `src/app/not-found.tsx` (and optionally `error.tsx`) using the design
  tokens. `loading.tsx` is low value for a static page — skip.
- **File:** `src/app/not-found.tsx` (new)

### 10. No `prefers-reduced-motion` support
- **Finding:** Framer Motion entrances + `animate-pulse` cursor always run.
- **Why it matters:** Accessibility (and a polish signal); users with motion sensitivity get no
  reduced experience.
- **Suggested fix:** Gate animations behind `useReducedMotion()` from Framer Motion, or add a
  `@media (prefers-reduced-motion: reduce)` block in `globals.css` to disable the keyframes.
- **Files:** `src/components/FadeIn.tsx`, `src/components/Hero.js`, `src/styles/globals.css`

---

## P3 — Future

- **GitHub handle vs email mismatch (cosmetic):** handle `vcosmusjoao`, email `joaodevcosta`.
  Optional to align under one identity. Display name **"João Costa"** is already consistent and correct.
- **`any` cast in `Projects.tsx`:** `{...(wrapperProps as any)}` in `FeaturedCard`. Replace with a
  typed conditional (`as` on a discriminated prop set) for full type safety.
- **Light/dark theme toggle:** `Icons.js` already ships Sun/Moon transition icons — a theme switch
  is half-built.
- **Analytics:** add `@vercel/analytics` + Speed Insights for visitor data.

---

## Positives

- **Clean architecture** — small, single-responsibility components; semantic `<section id>` anchors
  wired to the nav (`#home`, `#about`, `#projects`, `#skills`, `#contact`).
- **Tasteful motion** — `FadeIn` uses `whileInView` with `once: true`; Hero terminal effect is a
  strong, on-brand hero moment.
- **Accessible mobile menu** — `role="dialog"`, `aria-modal`, `aria-expanded`, Escape-to-close,
  backdrop click-to-close, and route-change auto-close.
- **Token-based theming** — Tailwind v4 `@theme` variables (`--color-bg/text/highlight`) keep the
  design system consistent and easy to retheme.
- **Responsive details** — mobile drawer, landscape-height avatar hide, fluid type scales.
- **Clean codebase hygiene** — no `console.log`, `TODO`, `FIXME`, or `debugger` anywhere.

---

## Technical risks (future)

| Risk | Impact | Mitigation |
|------|--------|------------|
| `strict: false` + `allowJs` in tsconfig | Real type bugs stay hidden | Enable `strict` after migrating JS → TS |
| Dependency skew (eslint/types) | Lint/type drift over time | Align versions (P2 #6) |
| Single hardcoded domain assumptions once OG added | Broken previews if domain changes | Centralize base URL in one env/const |
| Hand-rolled typing effect (`setInterval`) | Edge-case flicker on fast remounts | Already has cleanup; acceptable |

---

## Code Cleanup checklist (flagged — NOT removed this session)

### Dead code
- [ ] `src/hooks/useTypingEffect.js` — exported hook, **never imported**.
- [ ] `src/components/Icons.js` — full SVG icon set, **never imported** anywhere.
- [ ] `src/styles/Home.module.css` — **never imported**.

### Unused assets (`public/`) — template leftovers
- [ ] `public/All-Texts/` (`Icons.txt`, `pages.txt`, `prompts.txt`, `styles.txt`)
- [ ] `public/dummy.pdf`
- [ ] `public/images/articles/` (8 images — no articles section exists)
- [ ] `public/images/circular-text.png`
- [ ] `public/images/svgs/` (10 SVGs — unused)
- [ ] `public/next.svg`, `public/thirteen.svg`, `public/vercel.svg`
- [ ] `public/images/profile/developer-pic-1.png`, `developer-pic-2.jpg` (Hero uses `b3a4c130-…png`)
- [ ] Unused project covers: `agency-website-cover-image.jpg`, `crypto-screener-cover-image.jpg`,
      `devdreaming.jpg`, `fashion-studio-website.jpg`, `nft-collection-website-cover-image.jpg`,
      `portfolio-cover-image.jpg`

### Naming
- [ ] Rename `public/images/profile/b3a4c130-2390-4dc3-95f1-2b305cf14c2e.png` →
      e.g. `joao-avatar.png` (and update the `src` in `src/components/Hero.js`).

### Comments / i18n
- [ ] Translate Portuguese comments in `src/hooks/useTerminalEffect.ts` to English.

> **Note:** removing the unused assets above also shrinks the repo a recruiter browses on GitHub.
> None of these are referenced by code (verified), so deletion is safe — but defer to the
> execution session per the task rules.

---

## Verification (run in the execution session)

```bash
npm run build   # confirm no P0 build errors
npm run lint    # confirm no blocking lint errors
```

Then cross-check every file path cited above still exists before acting.
