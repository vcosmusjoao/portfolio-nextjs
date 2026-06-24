# Roadmap V2

Post-launch improvements, organized by category and tagged **Impact × Effort**.
Ship V1 first (the four P1 items in [DEPLOY_CHECKLIST.md](DEPLOY_CHECKLIST.md)) — this roadmap
is what comes after the site is live.

**Legend:** Impact `High/Med/Low` · Effort `S(mall)/M(edium)/L(arge)`.

---

## Do first — high impact, low effort

| Item | Category | Impact × Effort |
|------|----------|:---------------:|
| Complete metadata + OpenGraph + Twitter card | SEO | High × S |
| Add `robots.ts` + `sitemap.ts` | SEO | High × S |
| Custom favicon + `apple-icon` | UI / Branding | High × S |
| ~~Add `@vercel/analytics` + Speed Insights~~ ✅ Done | Conversion | High × S |
| Remove template dead code & unused assets (see AUDIT cleanup list) | Tech refactor | Med × S |
| Add a "Download CV / Resume" button (PDF) | Recruiter | High × S |

---

## UX

| Item | Impact × Effort | Notes |
|------|:---------------:|-------|
| Active-section highlight in nav (scroll spy) | Med × M | Show which section you're viewing — orient the visitor. |
| Smooth-scroll offset for anchored sections | Low × S | Avoid headings hidden under sticky areas. |
| `prefers-reduced-motion` support | Med × S | Accessibility + polish; gate Framer Motion via `useReducedMotion()`. |
| Themed `not-found.tsx` (404) | Med × S | Terminal-styled 404 reads finished. |
| Keyboard shortcut hint for the terminal vibe (e.g. `/` focuses nav) | Low × M | Fun, on-brand. |

## UI

| Item | Impact × Effort | Notes |
|------|:---------------:|-------|
| Light/dark theme toggle | Med × M | Sun/Moon icons already exist in `Icons.js`. |
| Real project screenshots in cards | High × S | Replace placeholders; visuals sell projects. |
| Subtle hover/focus states on project cards | Low × S | Depth and interactivity. |
| Consistent spacing audit between sections | Low × S | Tighten vertical rhythm. |

## Performance

| Item | Impact × Effort | Notes |
|------|:---------------:|-------|
| Run Lighthouse + fix any flagged items | Med × S | Target 95+ across the board. |
| Audit image sizes / formats (WebP/AVIF) | Med × S | `next/image` handles most; confirm source sizes are sane. |
| Lazy-load below-the-fold motion sections | Low × M | Marginal for a small page. |

## SEO

| Item | Impact × Effort | Notes |
|------|:---------------:|-------|
| Structured data (JSON-LD `Person`) | Med × S | Helps Google show you as a person/entity. |
| Per-section semantic headings audit | Low × S | Ensure one `h1`, logical `h2` order. |
| Custom domain (see [BRANDING.md](BRANDING.md)) | High × M | `you.dev` >> `*.vercel.app` for recruiters. |

## Future features

| Item | Impact × Effort | Notes |
|------|:---------------:|-------|
| Blog / writing section | Med × L | Demonstrates communication + English; great for SEO. |
| Live project demos / case studies | High × L | Depth beyond GitHub links; show your reasoning. |
| Contact form (Resend / Formspree) | Med × M | Lower friction than mailto. |
| i18n (EN default, PT optional) | Low × L | EN is the priority for international roles. |

## Tech refactors

| Item | Impact × Effort | Notes |
|------|:---------------:|-------|
| Migrate `.js` → `.tsx` (layout, Hero, Navbar) | Med × M | Consistency + type safety. |
| Enable `strict: true` in tsconfig after migration | Med × M | Catch real bugs. |
| Remove redundant `jsconfig.json` | Low × S | One source of truth. |
| Align dependency versions (eslint-config-next, @types/react) | Low × S | Stop drift. |
| Replace `as any` in `Projects.tsx` with typed props | Low × S | Full type safety. |
| Translate Portuguese comments to English | Low × S | `CLAUDE.md` rule. |

## Recruiter-facing

| Item | Impact × Effort | Notes |
|------|:---------------:|-------|
| Resume/CV download (PDF) | High × S | Recruiters want a takeaway. |
| Clear "Open to international remote roles" statement | High × S | State availability explicitly. |
| Tech-stack badges with proficiency context | Med × S | Already have Expert/Learning split — keep it honest. |
| Link each project to a live demo + repo | High × M | Proof over claims. |

## Conversion (turning visits into opportunities)

| Item | Impact × Effort | Notes |
|------|:---------------:|-------|
| Prominent, single primary CTA (e.g. "Let's talk") | High × S | Reduce decision friction. |
| Calendly / scheduling link | Med × S | One click to a conversation. |
| Social proof (PicPay scale, years, a quote) | Med × S | Credibility signals. |
| Analytics goals on contact clicks | Med × S | Measure what actually converts. |
