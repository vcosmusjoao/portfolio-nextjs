"use client";

import RichText from "@/components/RichText";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-20 max-w-2xl">
      <h2 className="font-fira-code text-highlight text-2xl md:text-3xl mb-8">
        {t.experience.heading}
      </h2>

      <div className="flex flex-col gap-8">
        {t.experience.jobs.map((job) => (
          <div key={job.company} className="border border-text/20 rounded-md p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
              <h3 className="font-fira-code text-highlight text-lg">
                {job.role} <span className="text-text/60">· {job.company}</span>
              </h3>
              <span className="font-fira-code text-text/60 text-sm shrink-0">
                {job.period}
              </span>
            </div>

            <p className="text-text/60 text-sm mb-4">{job.location}</p>

            <p className="text-text text-sm leading-relaxed mb-4 opacity-70">
              {job.note}
            </p>

            <ul className="space-y-2 mb-4">
              {job.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-2 text-text text-sm leading-relaxed opacity-80">
                  <span className="text-highlight shrink-0">▸</span>
                  <span>
                    <RichText>{bullet}</RichText>
                  </span>
                </li>
              ))}
            </ul>

            <p className="font-fira-code text-xs text-highlight border border-highlight/40 inline-block px-2 py-1 rounded">
              ↑ {job.promotion}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
