"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import Chip from "@/components/ui/Chip";
import ProjectCover from "@/components/ProjectCover";
import RichText from "@/components/RichText";
import TelemetryLabel from "@/components/TelemetryLabel";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { projects, type ProjectMeta } from "@/data/projects";
import { caseStudies } from "@/i18n/caseStudies";
import { useLanguage } from "@/i18n/LanguageProvider";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-16">
      <Reveal>
        <h2 className="section-title text-xl md:text-2xl mb-6">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}

/**
 * One project's case study. Fixed spine — context, stack, exactly three
 * decisions, outcome — so a short page reads as deliberate rather than thin.
 * Client component because the locale lives in the browser.
 */
export default function CaseStudy({ project }: { project: ProjectMeta }) {
  const { t, lang } = useLanguage();
  const cs = caseStudies[lang][project.id];
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  return (
    <main id="main" className="py-10 max-w-3xl">
      <Reveal>
        <Link href="/#projects" className="font-fira-code text-sm text-fg-dim hover:text-accent transition-colors">
          ← {t.caseStudy.back}
        </Link>

        <header className="mt-10 mb-10">
          <TelemetryLabel items={[cs.year, cs.role]} className="mb-4" />
          <h1 className="font-fira-code text-fg text-3xl md:text-4xl tracking-tight mb-4">{project.name}</h1>
          <p className="text-fg-muted text-base md:text-lg leading-relaxed">
            <RichText>{cs.tagline}</RichText>
          </p>

          {(project.live || project.github) && (
            <div className="mt-6 flex flex-wrap gap-5 font-fira-code text-sm">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-accent hover:text-accent-bright hover:underline"
                >
                  {t.caseStudy.live} <FiExternalLink />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-fg-muted hover:text-accent transition-colors"
                >
                  <FaGithub /> {t.caseStudy.source}
                </a>
              )}
            </div>
          )}
        </header>

        <ProjectCover project={project} size="xl" />
      </Reveal>

      <Section title={t.caseStudy.context}>
        <div className="space-y-4 text-fg-muted text-base leading-relaxed">
          {cs.context.map((paragraph, i) => (
            <p key={i}>
              <RichText>{paragraph}</RichText>
            </p>
          ))}
        </div>
      </Section>

      <Section title={t.caseStudy.stack}>
        <div className="flex flex-wrap gap-3">
          {project.tech.map((tech) => (
            <Chip key={tech} label={tech} size="md" />
          ))}
        </div>
      </Section>

      <Section title={t.caseStudy.decisions}>
        <Stagger className="flex flex-col gap-4">
          {cs.decisions.map((decision, i) => (
            <StaggerItem
              key={i}
              className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-5 bg-surface-2 border border-line-strong rounded-sm p-5"
            >
              <span className="font-fira-code text-2xl leading-none text-fg-faint mb-3 sm:mb-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-fira-code text-fg text-base mb-4">{decision.title}</h3>
                <dl className="grid grid-cols-1 sm:grid-cols-[6.5rem_1fr] gap-x-4 gap-y-1 sm:gap-y-3 text-sm leading-relaxed">
                  <dt className="font-fira-code text-fg-dim">{t.caseStudy.considered}</dt>
                  <dd className="text-fg-muted mb-2 sm:mb-0">
                    <RichText>{decision.considered}</RichText>
                  </dd>
                  <dt className="font-fira-code text-fg-dim">{t.caseStudy.why}</dt>
                  <dd className="text-fg-muted">
                    <RichText>{decision.why}</RichText>
                  </dd>
                </dl>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Section title={t.caseStudy.outcome}>
        <ul className="space-y-3">
          {cs.outcome.map((item, i) => (
            <li key={i} className="flex gap-3 text-fg-muted text-base leading-relaxed">
              <span className="text-fg-faint shrink-0">▸</span>
              <span>
                <RichText>{item}</RichText>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {cs.retrospective && (
        <Section title={t.caseStudy.retrospective}>
          <div className="space-y-4 text-fg-muted text-base leading-relaxed border-l-2 border-line-strong pl-5">
            {cs.retrospective.map((paragraph, i) => (
              <p key={i}>
                <RichText>{paragraph}</RichText>
              </p>
            ))}
          </div>
        </Section>
      )}

      <nav className="mt-20 pt-6 border-t border-line flex justify-end">
        <Link
          href={`/projects/${next.slug}`}
          className="group font-fira-code text-sm text-fg-dim hover:text-accent transition-colors"
        >
          {t.caseStudy.next}: <span className="text-fg group-hover:text-accent">{next.name}</span> →
        </Link>
      </nav>
    </main>
  );
}
