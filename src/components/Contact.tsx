"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 max-w-2xl">
      <h2 className="section-title text-2xl md:text-3xl mb-8">
        {t.contact.heading}
      </h2>

      <p className="text-fg-muted text-base md:text-lg leading-relaxed mb-8">
        {t.contact.intro}
      </p>

      <div className="flex flex-col gap-4">
        <a
          href="mailto:joaodevcosta@gmail.com"
          className="flex items-center gap-3 text-fg-muted hover:text-accent transition-colors group"
        >
          <MdEmail className="text-xl text-fg-dim group-hover:text-accent transition-colors shrink-0" />
          <span className="font-fira-code text-sm md:text-base group-hover:underline">
            joaodevcosta@gmail.com
          </span>
        </a>

        <a
          href="https://github.com/vcosmusjoao"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 text-fg-muted hover:text-accent transition-colors group"
        >
          <FaGithub className="text-xl text-fg-dim group-hover:text-accent transition-colors shrink-0" />
          <span className="font-fira-code text-sm md:text-base group-hover:underline">
            github.com/vcosmusjoao
          </span>
        </a>

        <a
          href="https://www.linkedin.com/in/joaovcsantos/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 text-fg-muted hover:text-accent transition-colors group"
        >
          <FaLinkedin className="text-xl text-fg-dim group-hover:text-accent transition-colors shrink-0" />
          <span className="font-fira-code text-sm md:text-base group-hover:underline">
            linkedin.com/in/joaovcsantos
          </span>
        </a>
      </div>
    </section>
  );
}
