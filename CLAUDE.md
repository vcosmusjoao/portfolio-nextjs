# Portfolio — CLAUDE.md

## What this project is

This is João Costa's personal portfolio, built with Next.js 14, Tailwind CSS v4, and Framer Motion.
It is the #1 priority deliverable in his 6-month international career plan.

**The goal is to have a live deployed URL as fast as possible — not a perfect portfolio.**
A deployed imperfect portfolio is infinitely more valuable than a perfect undeployed one.
João has a pattern of not finishing personal projects. Hold him accountable to shipping.

Read his full career context for background:
`C:\Users\victo\OneDrive\Área de Trabalho\dev\career-os\CAREER_OS.md`

## About João

- Frontend Engineer at PicPay (major Brazilian fintech, 60M+ users)
- Deep Angular + TypeScript + RxJS expertise
- Learning React and Next.js — this portfolio IS his React/Next.js proof of work
- Targeting international remote positions (US/EU) by December 2026
- English is conversational but not yet technical — all text in this portfolio must be in English
- Self-confidence issues: tends to delay shipping because "it's not ready yet" — push back on this

## Tech stack

- Next.js 14 (App Router) — `src/app/`
- Tailwind CSS v4
- Framer Motion (animations)
- React Icons
- TypeScript (mixed with JS — prefer .tsx/.ts for new files)

## Current state (as of June 2026)

**V1 shipped.** Live at `https://www.joaovcosta.dev` (Vercel + Cloudflare domain).

All MVP sections are done:
- Hero, About, Projects, Skills, Contact
- Full SEO metadata, OG image, robots.txt, sitemap.xml, favicon
- Build and lint clean

Next priorities are in `ROADMAP_V2.md`. Top items:
1. LinkedIn Post Inspector — verify OG preview
2. Lighthouse audit — baseline scores
3. "Download CV" button (PDF)
4. Google Search Console — indexing

## What NOT to do

- Do not suggest a backend or database — this is a static portfolio
- Do not let João start over with a new template or framework
- Do not add new sections before polishing existing ones

## Commands

```bash
npm run dev     # start dev server at localhost:3000
npm run build   # production build
npm run lint    # lint check
```
