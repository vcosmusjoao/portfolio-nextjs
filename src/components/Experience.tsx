"use client";

import RichText from "@/components/RichText";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-20 max-w-2xl">
      <Reveal>
        <h2 className="section-title text-2xl md:text-3xl mb-8">
          {t.experience.heading}
        </h2>
      </Reveal>

      <Stagger className="flex flex-col gap-8">
        {t.experience.jobs.map((job) => (
          <StaggerItem key={job.company} className="bg-surface-2 border border-line-strong rounded-sm p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-1">
              <h3 className="font-fira-code text-fg text-lg">
                {job.role} <span className="text-fg-dim">· {job.company}</span>
              </h3>
              <span className="font-fira-code text-fg-dim text-sm shrink-0">
                {job.period}
              </span>
            </div>

            <p className="text-fg-dim text-sm mb-4">{job.location}</p>

            <p className="text-fg-dim text-sm leading-relaxed mb-4">
              {job.note}
            </p>

            <ul className="space-y-2 mb-4">
              {job.bullets.map((bullet, i) => (
                <li key={i} className="flex gap-2 text-fg-muted text-sm leading-relaxed">
                  <span className="text-fg-faint shrink-0">▸</span>
                  <span>
                    <RichText>{bullet}</RichText>
                  </span>
                </li>
              ))}
            </ul>

            <p className="font-fira-code text-xs text-signal-positive bg-signal-positive/5 border border-signal-positive/40 inline-block px-2 py-1 rounded-sm">
              ↑ {job.promotion}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
