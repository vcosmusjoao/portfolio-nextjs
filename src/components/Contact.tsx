"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { useLanguage } from "@/i18n/LanguageProvider";

const links = [
  { href: "mailto:joaodevcosta@gmail.com", Icon: MdEmail, label: "joaodevcosta@gmail.com", external: false },
  { href: "https://github.com/vcosmusjoao", Icon: FaGithub, label: "github.com/vcosmusjoao", external: true },
  { href: "https://www.linkedin.com/in/joaovcsantos/", Icon: FaLinkedin, label: "linkedin.com/in/joaovcsantos", external: true },
];

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 max-w-2xl">
      <Reveal>
        <h2 className="section-title text-2xl md:text-3xl mb-8">
          {t.contact.heading}
        </h2>

        <p className="text-fg-muted text-base md:text-lg leading-relaxed mb-8">
          {t.contact.intro}
        </p>
      </Reveal>

      <Stagger className="flex flex-col gap-4">
        {links.map(({ href, Icon, label, external }) => (
          <StaggerItem key={href}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="inline-flex items-center gap-3 text-fg-muted hover:text-accent transition-colors group"
            >
              <Icon className="text-xl text-fg-dim group-hover:text-accent transition-colors shrink-0" />
              <span className="font-fira-code text-sm md:text-base group-hover:underline">
                {label}
              </span>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
