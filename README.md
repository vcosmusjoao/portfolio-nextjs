# João Costa — Developer Portfolio

A minimalist, terminal-themed personal portfolio built with **Next.js 14**, **Tailwind CSS v4**,
and **Framer Motion**. It presents my background, projects, and skills as a frontend engineer,
and is the React/Next.js proof-of-work behind my move into international remote roles.

> **Live:** _add your Vercel URL here once deployed_ → `https://<your-domain>`

<!-- SCREENSHOT: replace with a hero screenshot of the deployed site -->
<!-- ![Portfolio — Home](public/screenshots/home.png) -->

---

## Overview

I'm João Costa, a Front-End Engineer at **PicPay** (one of Brazil's largest digital banks, 60M+
users), where I build scalable interfaces with Angular, TypeScript, and RxJS. This portfolio is a
single-page application with five sections — Hero, About, Projects, Skills, and Contact — styled
around a developer/terminal aesthetic with an animated terminal intro and scroll-reveal sections.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | TypeScript / JavaScript (React 18) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) (`@theme` tokens) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Icons | [React Icons](https://react-icons.github.io/react-icons/) |
| Fonts | Fira Code + Inter (`next/font/google`) |
| Hosting | [Vercel](https://vercel.com/) |

---

## Features

- ⌨️ **Animated terminal hero** — custom typing/terminal effect (`useTerminalEffect`).
- 🎬 **Scroll-reveal sections** — `whileInView` fade-ins via Framer Motion.
- 📱 **Responsive layout** — desktop sidebar nav + accessible mobile drawer (Escape & backdrop close).
- 🎨 **Token-based design system** — themed via Tailwind v4 `@theme` CSS variables.
- 🧩 **Project showcase** — featured + grid cards with tech tags and GitHub links.
- ♿ **Accessibility-minded nav** — `aria-modal`, `aria-expanded`, keyboard support.

---

## Folder Structure

```
portfolio/
├── public/
│   ├── images/
│   │   ├── profile/        # avatar
│   │   └── projects/       # project cover images
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.js       # root layout + metadata + fonts
│   │   └── page.tsx        # composes all sections
│   ├── components/
│   │   ├── Hero.js
│   │   ├── About.tsx
│   │   ├── Projects.tsx
│   │   ├── Skills.tsx
│   │   ├── Contact.tsx
│   │   ├── Navbar.js
│   │   └── FadeIn.tsx       # scroll-reveal wrapper
│   ├── hooks/
│   │   └── useTerminalEffect.ts
│   └── styles/
│       └── globals.css      # Tailwind import + @theme tokens
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites
- Node.js 18.17+ (Next.js 14 requirement)
- npm (or pnpm / yarn)

### Run locally

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build   # create an optimized production build
npm run start   # serve the production build locally
```

### Lint

```bash
npm run lint
```

---

## Deployment (Vercel)

This is a static, server-rendered Next.js app — Vercel deploys it with zero config.

1. Push the repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset is auto-detected as **Next.js** — keep the defaults
   (Build: `next build`, Output: `.next`).
4. Deploy. Add your custom domain under **Settings → Domains**.

---

## Environment Variables

**None required.** This is a fully static portfolio with no backend, database, or API keys.

If analytics or a contact form are added later, document the variables here, e.g.:

```env
# Example (not currently used)
# NEXT_PUBLIC_SITE_URL=https://your-domain.dev
```

---

## Screenshots

<!-- Add screenshots of the deployed site below. Suggested: home (desktop + mobile), projects. -->

| Home (desktop) | Projects | Mobile |
|----------------|----------|--------|
| _SCREENSHOT_   | _SCREENSHOT_ | _SCREENSHOT_ |

---

## About Me

I'm a Front-End Engineer at PicPay with deep Angular + TypeScript + RxJS experience, currently
expanding into React and Next.js. My goal is to work remotely for companies in the US or Europe.
I care about maintainability, clean architecture, and shipping real products for real people.

---

## Links

- **GitHub:** [github.com/vcosmusjoao](https://github.com/vcosmusjoao)
- **LinkedIn:** [linkedin.com/in/joaovcsantos](https://www.linkedin.com/in/joaovcsantos/)
- **Email:** [joaodevcosta@gmail.com](mailto:joaodevcosta@gmail.com)

---

<sub>Built with Next.js, Tailwind CSS, and Framer Motion · © João Costa</sub>
