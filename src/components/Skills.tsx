"use client";

import Chip from "@/components/ui/Chip";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { useLanguage } from "@/i18n/LanguageProvider";

const skillGroups = [
  { key: "expert", items: ["Angular", "TypeScript", "RxJS", "JavaScript", "HTML/CSS"] },
  { key: "learning", items: ["React", "Next.js"] },
  { key: "tooling", items: ["Jest", "Nx", "Git", "Tailwind CSS"] },
] as const;

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-20 max-w-2xl">
      <Reveal>
        <h2 className="section-title text-2xl md:text-3xl mb-8">
          {t.skills.heading}
        </h2>
      </Reveal>

      <Stagger className="space-y-8">
        {skillGroups.map(({ key, items }) => (
          <StaggerItem key={key}>
            <p className="font-fira-code text-fg-dim text-sm mb-3">
              {'// '}{t.skills.categories[key]}
            </p>
            <div className="flex flex-wrap gap-3">
              {items.map((skill) => (
                <Chip key={skill} label={skill} size="md" />
              ))}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
