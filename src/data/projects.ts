import type { Messages } from "@/i18n/messages";

export type ProjectId = keyof Messages["projects"]["items"];

export interface ProjectMeta {
  id: ProjectId;
  /** URL segment for the case study: /projects/<slug> */
  slug: string;
  name: string;
  tech: string[];
  github?: string;
  live?: string;
  image?: string;
  /** Hand-built cover used in place of a screenshot. */
  cover?: "dispute" | "mixordia";
  featured?: boolean;
}

/**
 * Language-independent project data. Translated copy lives in the i18n
 * dictionaries keyed by `id`. Kept out of any client component so the case
 * study route and the sitemap can read it on the server.
 */
export const projects: ProjectMeta[] = [
  {
    id: "finlivre",
    slug: "finlivre",
    name: "FinLivre",
    tech: ["Next.js", "React", "TypeScript", "Dexie", "Claude Vision"],
    github: "https://github.com/vcosmusjoao/finlivre",
    live: "https://finlivre.vercel.app",
    image: "/images/projects/finlivre.png",
    featured: true,
  },
  {
    id: "disputeAgent",
    slug: "dispute-triage-agent",
    name: "Dispute Triage Agent",
    tech: ["Python", "FastAPI", "LangGraph", "Claude", "Next.js"],
    github: "https://github.com/vcosmusjoao/dispute-triage-agent",
    live: "https://dispute-triage-agent.vercel.app",
    cover: "dispute",
    featured: true,
  },
  {
    id: "mixordia",
    slug: "mixordia",
    name: "Mixórdia",
    tech: ["React", "Supabase", "SASS", "Resend"],
    live: "https://www.mixordiamusic.com",
    cover: "mixordia",
    featured: true,
  },
  {
    id: "vizinhelp",
    slug: "vizinhelp",
    name: "vizinhelp",
    tech: ["Angular", "TypeScript", "Node.js", "PostgreSQL", "Keycloak"],
    github: "https://github.com/vcosmusjoao/vizinhelp",
    image: "/images/projects/vizinhelp.png",
  },
];

export function findProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}
