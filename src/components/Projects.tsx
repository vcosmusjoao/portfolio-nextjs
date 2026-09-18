"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Messages } from "@/i18n/messages";
import MixordiaCover from "@/components/covers/MixordiaCover";
import DisputeCover from "@/components/covers/DisputeCover";

type ProjectId = keyof Messages["projects"]["items"];

interface ProjectMeta {
  id: ProjectId;
  name: string;
  tech: string[];
  github?: string;
  live?: string;
  image?: string;
  /** Renders in place of the screenshot when a static image isn't the best fit. */
  cover?: () => ReactNode;
  featured?: boolean;
}

/**
 * Language-independent project metadata. The translated `description` and
 * `badge` live in the i18n dictionary, keyed by `id`.
 */
const projects: ProjectMeta[] = [
  {
    id: "finlivre",
    name: "FinLivre",
    tech: ["Next.js", "React", "TypeScript", "Dexie", "Claude Vision"],
    github: "https://github.com/vcosmusjoao/finlivre",
    live: "https://finlivre.vercel.app",
    image: "/images/projects/finlivre.png",
    featured: true,
  },
  {
    id: "disputeAgent",
    name: "Dispute Triage Agent",
    tech: ["Python", "FastAPI", "LangGraph", "Claude", "Next.js"],
    github: "https://github.com/vcosmusjoao/dispute-triage-agent",
    live: "https://dispute-triage-agent.vercel.app",
    cover: () => <DisputeCover />,
    featured: true,
  },
  {
    id: "mixordia",
    name: "Mixórdia",
    tech: ["React", "Supabase", "SASS"],
    live: "https://www.mixordiamusic.com",
    cover: () => <MixordiaCover />,
    featured: true,
  },
  {
    id: "vizinhelp",
    name: "vizinhelp",
    tech: ["Angular", "TypeScript"],
    github: "https://github.com/vcosmusjoao/vizinhelp",
    image: "/images/projects/vizinhelp.png",
  },
];

function Placeholder({ size }: { size: "sm" | "lg" }) {
  const height = size === "lg" ? "h-44" : "h-32";
  return (
    <div
      className={`w-full ${height} rounded-sm mb-4 bg-surface-3 border border-line flex items-center justify-center`}
    >
      <FaGithub className="text-fg-faint text-3xl" />
    </div>
  );
}

function ProjectImage({
  image,
  name,
  size,
}: {
  image?: string;
  name: string;
  size: "sm" | "lg";
}) {
  const height = size === "lg" ? "h-44" : "h-32";
  if (!image) return <Placeholder size={size} />;
  return (
    <div className={`w-full ${height} rounded-sm mb-4 overflow-hidden border border-line`}>
      <Image
        src={image}
        alt={name}
        width={800}
        height={400}
        className="w-full h-full object-cover object-top"
      />
    </div>
  );
}

function FeaturedCard({ project }: { project: ProjectMeta }) {
  const { t } = useLanguage();
  const copy = t.projects.items[project.id];

  return (
    <div className="flex flex-col h-full bg-surface-2 border border-line-strong shadow-raise rounded-sm p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="font-fira-code text-fg text-lg">
            {project.name}
          </h3>
          <span className="font-fira-code text-xs text-fg-dim border border-line-strong px-2 py-0.5 rounded-full">
            {copy.badge}
          </span>
        </div>
      </div>

      {project.cover ? project.cover() : (
        <ProjectImage image={project.image} name={project.name} size="lg" />
      )}

      <p className="text-fg-muted text-sm leading-relaxed mb-5">
        {copy.description}
      </p>

      <div className="flex flex-wrap items-center gap-2 mt-auto">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="font-fira-code text-xs text-fg-muted bg-surface-3 border border-line-strong px-2 py-0.5 rounded-sm"
          >
            {tech}
          </span>
        ))}

        {(project.live || project.github) && (
          <span className="flex items-center gap-4 ml-auto pl-2">
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
    </div>
  );
}

function RegularCard({ project }: { project: ProjectMeta }) {
  const { t } = useLanguage();
  const copy = t.projects.items[project.id];

  return (
    <a
      href={project.github}
      target="_blank"
      rel="noreferrer"
      className="block bg-surface-2 border border-line hover:border-accent rounded-sm p-5 transition-colors group"
    >
      <ProjectImage image={project.image} name={project.name} size="sm" />

      <span className="font-fira-code text-xs text-fg-dim border border-line-strong px-2 py-0.5 rounded-full mb-3 inline-block">
        {copy.badge}
      </span>
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-fira-code text-fg text-sm md:text-base group-hover:underline">
          {project.name}
        </h3>
        <FiExternalLink className="text-fg-faint text-lg ml-4 shrink-0 group-hover:text-accent transition-colors" />
      </div>
      <p className="text-fg-muted text-sm leading-relaxed mb-4">
        {copy.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="font-fira-code text-xs text-fg-muted bg-surface-3 border border-line-strong px-2 py-0.5 rounded-sm"
          >
            {tech}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 max-w-3xl">
      <h2 className="section-title text-2xl md:text-3xl mb-8">
        {t.projects.heading}
      </h2>

      <div className="flex flex-col gap-6">
        <div className="grid sm:grid-cols-2 gap-6">
          {featured.map((p) => (
            <FeaturedCard key={p.id} project={p} />
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((p) => (
            <RegularCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
