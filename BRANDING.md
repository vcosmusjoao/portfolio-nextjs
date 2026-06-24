# Branding & Domain Strategy

## Positioning

- **Name:** João Victor Costa Santos → public brand **"João Costa"** (matches LinkedIn).
- **Role:** Front-End Engineer (Angular/TypeScript today, React/Next.js growth).
- **Audience:** international recruiters & engineering managers (US / EU), English-first.
- **Goal:** a domain that is short, easy to say on a call, easy to type, and unmistakably a
  developer's personal site.

### Guidelines used to rank
1. **`.dev` is best** for a developer brand — instantly signals "engineer," and is HTTPS-only.
2. **Shorter + closer to your real name** ranks higher (recruiters Google "João Costa").
3. **Avoid hyphens, numbers, and hard-to-spell handles** (`vcosmusjoao` is great as a GitHub
   handle but poor as a domain — nobody can spell it from hearing it).
4. `.io` / `.tech` are solid fallbacks; `.com` only if an exact-name match is available.

> ⚠️ Availability changes constantly — **verify each on a registrar (Namecheap / Cloudflare /
> Porkbun) before buying.** Ranking below is by *brand quality*, not confirmed availability.

---

## Recommended domains (ranked by quality)

> Note: `joao.dev` is taken. These build on the **"João Costa"** brand.

### Tier 1 — strongest (name-accurate, short, `.dev`)
1. **joaocosta.dev** — exact brand, ideal. First choice if available.
2. **joaovcosta.dev** — adds the middle initial; very clean.
3. **jvcosta.dev** — initials + surname; short and memorable.
4. **joaocosta.io** — strong fallback if the `.dev` is taken.
5. **costa.dev** — surname-only; premium if available (likely taken/priced high).

### Tier 2 — very good
6. **joao-costa.dev** — readable; hyphen is the only minor knock.
7. **joaovcosta.io**
8. **jvcosta.io**
9. **joaocosta.tech**
10. **joaocodes.dev** — "João codes," brandable and friendly.
11. **buildwithjoao.dev** — action-oriented, memorable.
12. **joaocosta.me** — personal-brand TLD; clean for an "about me" site.

### Tier 3 — good fallbacks / brandable
13. **hellojoao.dev** — warm, conversational.
14. **joaoc.dev** — ultra-short (initial surname); a bit cryptic.
15. **joaobuilds.dev** — shows you ship.
16. **joaofrontend.dev** — descriptive of the role.
17. **jcosta.dev** — compact initials.
18. **joao.engineer** — niche TLD, clearly an engineer.
19. **joaocosta.app** — works if you frame it as "my app."
20. **costadev.io** — surname + "dev."

### Tier 4 — extra options
21. **joaocosta.work**
22. **joaov.dev** — short, but loses the surname.
23. **iamjoaocosta.dev**
24. **joaocosta.page**
25. **devjoao.dev**

---

## Recommendation

Try to secure, in order: **joaocosta.dev → joaovcosta.dev → jvcosta.dev**. If all three are gone,
**joaocodes.dev** or **buildwithjoao.dev** are the strongest brandable alternatives.

Once purchased:
- Point it at Vercel (**Settings → Domains**).
- Update `metadataBase` in `src/app/layout.js` to the new URL.
- Use the same domain in OpenGraph `url`, `sitemap.ts`, and `robots.ts`.
- Set up an email alias on the domain (e.g. `hi@joaocosta.dev`) for a professional contact address.
