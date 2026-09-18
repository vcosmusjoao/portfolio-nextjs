"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiArrowUp } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/LanguageProvider";

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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

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

  const items = [
    { label: t.nav.home, href: "/#home" },
    { label: t.nav.about, href: "/#about" },
    { label: t.nav.experience, href: "/#experience" },
    { label: t.nav.projects, href: "/#projects" },
    { label: t.nav.skills, href: "/#skills" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  return (
    <>
      {/* HAMBURGER BUTTON - MOBILE */}
      <button
        aria-label={isOpen ? t.ui.closeMenu : t.ui.openMenu}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((s) => !s)}
        className="md:hidden absolute top-4 left-4 z-40 text-fg-muted hover:text-accent transition-colors"
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
              p-6 sm:p-8
              bg-surface-2 border border-line-strong
              rounded-md shadow-lg font-fira-code
              animate-[fadeInSlide_0.25s_ease-out]
            "
          >
            <div className="flex justify-between items-center mb-6">
              <div className="text-accent text-md flex items-center">
                &lt;joaovcosta.dev /&gt;
                <span className="motion-safe:animate-pulse ml-1">█</span>
              </div>
              <button
                aria-label="Close"
                onClick={() => setIsOpen(false)}
                className="text-fg-muted text-xl hover:text-accent transition"
              >
                ×
              </button>
            </div>

            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-fg-muted hover:text-accent transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-line pt-4 flex items-center justify-between">
              <div className="flex gap-4 text-xl">
                <a href="https://github.com/vcosmusjoao" target="_blank" rel="noreferrer" aria-label="GitHub" className="text-fg-dim hover:text-accent transition">
                  <FaGithub />
                </a>
                <a href="https://www.linkedin.com/in/joaovcsantos/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="text-fg-dim hover:text-accent transition">
                  <FaLinkedin />
                </a>
              </div>
              <LangToggle />
            </div>
          </nav>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside
        className="hidden md:flex fixed top-0 left-0 h-full flex-col justify-between p-8 w-60 font-fira-code"
        aria-hidden={isOpen}
      >
        <div className="mt-8">
          <div className="text-accent text-sm mb-10 flex items-center whitespace-nowrap">
            <span className="select-none">&lt;joaovcosta.dev /&gt;</span>
            <span className="motion-safe:animate-pulse ml-1">█</span>
          </div>

          <nav className="flex flex-col gap-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-fg-muted hover:text-accent transition cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <LangToggle />
          <div className="flex items-center gap-4 text-xl">
            <a
              href="/#home"
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
