"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

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
    { label: ".home()", href: "/#home" },
    { label: ".about()", href: "/#about" },
    { label: ".projects()", href: "/#projects" },
    { label: ".skills()", href: "/#skills" },
    { label: ".contact()", href: "/#contact" },
  ];

  return (
    <>
      {/* HAMBURGER BUTTON - MOBILE */}
      <button
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((s) => !s)}
        className="md:hidden absolute top-4 left-4 z-40 text-text"
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
              bg-bg border border-text/20
              rounded-md shadow-lg font-fira-code
              animate-[fadeInSlide_0.25s_ease-out]
            "
          >
            <div className="flex justify-between items-center mb-6">
              <div className="text-highlight text-md flex items-center">
                &lt;joaovcosta.dev /&gt;
                <span className="animate-pulse ml-1">█</span>
              </div>
              <button
                aria-label="Close"
                onClick={() => setIsOpen(false)}
                className="text-text text-xl hover:text-highlight transition"
              >
                ×
              </button>
            </div>

            <ul className="flex flex-col gap-5 text-text">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-highlight hover:text-text transition"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-text/10 pt-4 flex gap-4 text-xl">
              <a href="https://github.com/vcosmusjoao" target="_blank" rel="noreferrer" className="hover:text-highlight transition">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/joaovcsantos/" target="_blank" rel="noreferrer" className="hover:text-highlight transition">
                <FaLinkedin />
              </a>
            </div>
          </nav>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside
        className="hidden md:flex fixed top-0 left-0 h-full flex-col justify-between p-8 w-56 font-fira-code"
        aria-hidden={isOpen}
      >
        <div className="mt-6">
          <div className="text-highlight text-md mb-6 flex items-center">
            <span className="select-none">&lt;joaovcosta.dev /&gt;</span>
            <span className="animate-pulse ml-1">█</span>
          </div>

          <nav className="flex flex-col gap-4 text-text">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-highlight transition cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 text-text text-xl mt-6">
          <a href="https://github.com/vcosmusjoao" target="_blank" rel="noreferrer" className="hover:text-highlight transition">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/joaovcsantos/" target="_blank" rel="noreferrer" className="hover:text-highlight transition">
            <FaLinkedin />
          </a>
        </div>
      </aside>
    </>
  );
}
