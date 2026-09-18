"use client";

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
      <h2 className="section-title text-2xl md:text-3xl mb-8">
        {t.skills.heading}
      </h2>

      <div className="space-y-8">
        {skillGroups.map(({ key, items }) => (
          <div key={key}>
            <p className="font-fira-code text-fg-dim text-sm mb-3">
              {'// '}{t.skills.categories[key]}
            </p>
            <div className="flex flex-wrap gap-3">
              {items.map((skill) => (
                <span
                  key={skill}
                  className="font-fira-code text-sm text-fg-muted bg-surface-2 border border-line-strong px-3 py-1.5 rounded-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
