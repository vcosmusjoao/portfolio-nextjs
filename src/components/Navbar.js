"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { m, useScroll } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSound } from "@/audio/SoundProvider";
import { findProjectBySlug, projects } from "@/data/projects";
import useActiveSection from "@/hooks/useActiveSection";

const HOME_SECTIONS = ["home", "about", "experience", "projects", "skills", "contact"];

/** Same comment-style switch as the language toggle. Off by default. */
function SoundToggle() {
  const { enabled, toggle } = useSound();
  const { t } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={t.ui.soundToggle}
      className="font-fira-code text-sm flex items-center gap-1.5 text-fg-muted hover:text-accent transition"
    >
      <span className="text-fg-faint select-none">{"// sound:"}</span>
      <span className={enabled ? "text-accent" : "text-fg-dim"}>{enabled ? "on" : "off"}</span>
    </button>
  );
}

/** Coding-vibe language switch, rendered as a comment that flips value. */
function LangToggle() {
  const { lang, toggle } = useLanguage();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle language / Alternar idioma"
      className="font-fira-code text-sm flex items-center gap-1.5 text-fg-muted hover:text-accent transition"
    >
      <span className="text-fg-faint select-none">{"// lang:"}</span>
      <span className="text-accent">{lang}</span>
    </button>
  );
}

/**
 * The same menu on every page. Inside a case study, `.projects()` opens into a
 * tree of the project names with the current one lit — the menu tells you
 * where you are without turning into a different menu.
 */
function useMenu() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const project = pathname?.startsWith("/projects/")
    ? findProjectBySlug(pathname.split("/")[2] ?? "")
    : undefined;

  // Scroll-spy only makes sense on the home page, where the sections live.
  const active = useActiveSection(project ? [] : HOME_SECTIONS);

  const items = HOME_SECTIONS.map((id) => ({
    id,
    label: t.nav[id],
    href: `/#${id}`,
    current: project ? id === "projects" : active === id,
    children:
      project && id === "projects"
        ? projects.map((p) => ({
            slug: p.slug,
            label: p.name,
            href: `/projects/${p.slug}`,
            current: p.slug === project.slug,
          }))
        : null,
  }));

  return { project, items };
}

/** `<joaovcosta.dev />` at home; the current path inside a case study. */
function Prompt({ project }) {
  const cursor = <span className="motion-safe:animate-pulse ml-1">█</span>;
  if (!project) {
    return (
      <span className="text-accent whitespace-nowrap select-none">
        &lt;joaovcosta.dev /&gt;{cursor}
      </span>
    );
  }
  // The only break point is after `projects/`; the name and cursor stay together.
  return (
    <span className="text-accent select-none">
      ~/projects/
      <wbr />
      <span className="whitespace-nowrap">
        {project.slug}
        {cursor}
      </span>
    </span>
  );
}

function Menu({ items, onNavigate }) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li key={item.id}>
          <Link
            href={item.href}
            onClick={onNavigate}
            aria-current={item.current && !item.children ? "location" : undefined}
            className={`flex transition-colors ${item.current ? "text-accent" : "text-fg-muted hover:text-accent"}`}
          >
            <span aria-hidden="true" className="w-4 shrink-0 select-none">
              {item.current && !item.children ? ">" : ""}
            </span>
            {item.label}
          </Link>

          {item.children && (
            <ul className="mt-2 ml-4 flex flex-col gap-1.5 text-sm">
              {item.children.map((child, i) => {
                const last = i === item.children.length - 1;
                return (
                  <li key={child.slug}>
                    <Link
                      href={child.href}
                      onClick={onNavigate}
                      aria-current={child.current ? "page" : undefined}
                      className={`flex gap-2 transition-colors ${
                        child.current ? "text-accent" : "text-fg-dim hover:text-accent"
                      }`}
                    >
                      <span aria-hidden="true" className={`shrink-0 select-none ${child.current ? "" : "text-fg-faint"}`}>
                        {last ? "└─" : "├─"}
                      </span>
                      <span>{child.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const { project, items } = useMenu();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* SCROLL PROGRESS — hairline down the far left edge */}
      <m.div
        aria-hidden="true"
        style={{ scaleY: scrollYProgress }}
        className="hidden md:block fixed left-0 top-0 z-40 h-full w-px bg-accent origin-top"
      />

      {/* HAMBURGER — pinned, so the menu is reachable mid-page */}
      <button
        aria-label={isOpen ? t.ui.closeMenu : t.ui.openMenu}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((s) => !s)}
        className="md:hidden fixed top-3 left-3 z-40 p-1.5 rounded-sm bg-surface-2/85 backdrop-blur border border-line text-fg-muted hover:text-accent transition-colors"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-lg transition-opacity"
            onClick={() => setIsOpen(false)}
          />
          <nav
            className="
              relative z-50 m-auto
              w-[90%] max-w-sm sm:max-w-md
              max-h-[90vh] overflow-y-auto
              p-6 sm:p-8
              bg-surface-2 border border-line-strong
              rounded-md shadow-lg font-fira-code
              animate-[fadeInSlide_0.25s_ease-out]
            "
          >
            <div className="flex justify-between items-start gap-4 mb-6 text-md">
              <Prompt project={project} />
              <button
                aria-label={t.ui.closeMenu}
                onClick={() => setIsOpen(false)}
                className="text-fg-muted text-xl leading-none hover:text-accent transition"
              >
                ×
              </button>
            </div>

            <Menu items={items} onNavigate={() => setIsOpen(false)} />

            <div className="mt-6 border-t border-line pt-4 flex items-center justify-between">
              <div className="flex gap-4 text-xl">
                <a href="https://github.com/vcosmusjoao" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-fg-dim hover:text-accent transition">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/joaovcsantos/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-fg-dim hover:text-accent transition">
                  <FaLinkedin />
                </a>
              </div>
              <div className="flex flex-col items-end gap-2">
                <LangToggle />
                <SoundToggle />
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside
        className="hidden md:flex fixed top-0 left-0 h-full flex-col justify-between p-8 w-60 font-fira-code overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--color-line-strong)_transparent]"
        aria-hidden={isOpen}
      >
        <div className="mt-8">
          <div className="text-sm mb-10">
            <Prompt project={project} />
          </div>

          <nav>
            <Menu items={items} />
          </nav>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex flex-col gap-2">
            <LangToggle />
            <SoundToggle />
          </div>
          <div className="flex items-center gap-4 text-xl">
            <a
              href={project ? "#main" : "/#home"}
              aria-label={t.ui.backToTop}
              title={t.ui.backToTop}
              className="text-fg-dim hover:text-accent transition"
            >
              <FiArrowUp />
            </a>
            <a href="https://github.com/vcosmusjoao" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-fg-dim hover:text-accent transition">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/joaovcsantos/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-fg-dim hover:text-accent transition">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
