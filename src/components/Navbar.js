import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import useTypingEffect from "@/hooks/useTypingEffect";
import React from "react";

export default function Navbar() {
  const typedText = useTypingEffect("<joao.dev />", 70);

  const items = [
    { label: ".is()", href: "/" },
    { label: ".projects()", href: "/projects" },
    { label: ".about()", href: "/about" },
    { label: ".contact()", href: "/contact" },
  ];

  return (
    <aside
      className="
        hidden md:flex
        fixed top-0 left-0 h-full
        flex-col justify-between
        p-8 w-56
       
        font-fira-code
      "
    >
      {/* Topo */}
      <div className="mt-6">
        <div className="text-highlight text-md mb-6 flex items-center">
          {typedText}
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

      {/* Ícones no rodapé da sidebar */}
      <div className="flex flex-col gap-4 text-text text-xl mt-6">
        <a
          href="https://github.com/seu-usuario"
          target="_blank"
          className="hover:text-highlight transition"
        >
          <FaGithub />
        </a>

        <a
          href="https://www.linkedin.com/in/seu-usuario/"
          target="_blank"
          className="hover:text-highlight transition"
        >
          <FaLinkedin />
        </a>
      </div>
    </aside>
  );
}
