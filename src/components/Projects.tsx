"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import Chip from "@/components/ui/Chip";
import ProjectCover from "@/components/ProjectCover";
import Reveal from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { cardHover } from "@/components/motion/variants";
import { projects, type ProjectMeta } from "@/data/projects";
import { useLanguage } from "@/i18n/LanguageProvider";

/**
 * The title link stretches over the whole card via `after:inset-0`, so the
 * card is clickable with a single accessible name. Live/GitHub links sit
 * above that overlay (`relative z-10`) instead of nesting anchors.
 */
function ProjectCard({ project, featured }: { project: ProjectMeta; featured: boolean }) {
  const { t } = useLanguage();
  const copy = t.projects.items[project.id];

  return (
    <m.article
      whileHover={cardHover}
      className={`group relative flex flex-col h-full bg-surface-2 border rounded-sm p-5 transition-[border-color,box-shadow] duration-[var(--duration-base)] hover:border-accent hover:shadow-[0_0_0_1px_rgb(6_182_212/0.12),0_12px_36px_-14px_rgb(6_182_212/0.55)] ${
        featured ? "border-line-strong shadow-raise" : "border-line"
      }`}
    >
      <div className="flex items-center gap-3 flex-wrap mb-4">
        <h3 className={`font-fira-code text-fg ${featured ? "text-lg" : "text-sm md:text-base"}`}>
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0">
            {project.name}
          </Link>
        </h3>
        <span className="font-fira-code text-xs text-fg-dim border border-line-strong px-2 py-0.5 rounded-full">
          {copy.badge}
        </span>
      </div>

      <ProjectCover project={project} size={featured ? "lg" : "sm"} />

      <p className="text-fg-muted text-sm leading-relaxed mb-5">{copy.description}</p>

      <div className="flex flex-wrap items-center gap-2 mt-auto">
        {project.tech.map((tech) => (
          <Chip key={tech} label={tech} />
        ))}

        {(project.live || project.github) && (
          <span className="relative z-10 flex items-center gap-4 ml-auto pl-2">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 font-fira-code text-xs text-accent hover:text-accent-bright hover:underline"
              >
                {t.projects.liveLabel} <FiExternalLink className="text-sm" />
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} on GitHub`}
                className="text-fg-dim hover:text-accent transition-colors"
              >
                <FaGithub className="text-base" />
              </a>
            )}
          </span>
        )}
      </div>

      <p aria-hidden="true" className="mt-4 font-fira-code text-xs text-fg-dim group-hover:text-accent transition-colors">
        {t.projects.caseStudyLink} →
      </p>
    </m.article>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 max-w-3xl">
      <Reveal>
        <h2 className="section-title text-2xl md:text-3xl mb-8">{t.projects.heading}</h2>
      </Reveal>

      <div className="flex flex-col gap-6">
        <Stagger className="grid sm:grid-cols-2 gap-6">
          {featured.map((p) => (
            <StaggerItem key={p.id} className="h-full">
              <ProjectCard project={p} featured />
            </StaggerItem>
          ))}
        </Stagger>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((p) => (
            <StaggerItem key={p.id} className="h-full">
              <ProjectCard project={p} featured={false} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
