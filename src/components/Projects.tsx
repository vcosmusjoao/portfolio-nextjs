"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { Messages } from "@/i18n/messages";
import MixordiaCover from "@/components/covers/MixordiaCover";

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
    id: "mixordia",
    name: "Mixórdia",
    tech: ["React", "Supabase", "SASS"],
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
  {
    id: "chatgptClone",
    name: "chatgpt-clone",
    tech: ["React", "Next.js", "TypeScript"],
    github: "https://github.com/vcosmusjoao/chatgpt-clone",
  },
  {
    id: "picpayChallenge",
    name: "frontend-challenge-picpay",
    tech: ["Angular", "TypeScript", "RxJS"],
    github: "https://github.com/vcosmusjoao/frontend-challenge-picpay",
  },
];

function Placeholder({ size }: { size: "sm" | "lg" }) {
  const height = size === "lg" ? "h-44" : "h-32";
  return (
    <div
      className={`w-full ${height} rounded-md mb-4 bg-text/5 border border-text/10 flex items-center justify-center`}
    >
      <FaGithub className="text-text/20 text-3xl" />
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
    <div className={`w-full ${height} rounded-md mb-4 overflow-hidden border border-text/10`}>
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
    <div className="block border border-highlight rounded-md p-5 bg-highlight/5 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="font-fira-code text-highlight text-lg">
            {project.name}
          </h3>
          <span className="font-fira-code text-xs text-highlight border border-highlight/50 px-2 py-0.5 rounded-full">
            {copy.badge}
          </span>
        </div>
      </div>

      {project.cover ? project.cover() : (
        <ProjectImage image={project.image} name={project.name} size="lg" />
      )}

      <p className="text-text text-sm leading-relaxed mb-5 opacity-80">
        {copy.description}
      </p>

      <div className="flex flex-wrap items-center gap-2 mt-auto">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="font-fira-code text-xs text-highlight border border-highlight/40 px-2 py-0.5 rounded"
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
                className="flex items-center gap-1 font-fira-code text-xs text-highlight hover:underline"
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
                className="text-highlight/70 hover:text-highlight transition-colors"
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
      className="block border border-text/20 hover:border-highlight rounded-md p-5 transition-colors group"
    >
      <ProjectImage image={project.image} name={project.name} size="sm" />

      <span className="font-fira-code text-xs text-highlight border border-highlight/50 px-2 py-0.5 rounded-full mb-3 inline-block">
        {copy.badge}
      </span>
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-fira-code text-highlight text-sm md:text-base group-hover:underline">
          {project.name}
        </h3>
        <FiExternalLink className="text-text/40 text-lg ml-4 shrink-0 group-hover:text-highlight transition-colors" />
      </div>
      <p className="text-text text-sm leading-relaxed mb-4 opacity-70">
        {copy.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((tech) => (
          <span
            key={tech}
            className="font-fira-code text-xs text-highlight border border-highlight/40 px-2 py-0.5 rounded"
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
      <h2 className="font-fira-code text-highlight text-2xl md:text-3xl mb-8">
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
