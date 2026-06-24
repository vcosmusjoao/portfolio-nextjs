import Image from "next/image";
import { FaGithub } from "react-icons/fa";

interface Project {
  name: string;
  description: string;
  tech: string[];
  github?: string;
  badge?: string;
  image?: string;
  featured?: boolean;
}

const projects: Project[] = [
  {
    name: "Mixórdia",
    description:
      "Institutional website for a nightlife venue in Brazil. Integrates Supabase for user management and authentication, and connects with Zig's bar tab API to map drink purchases and event attendance, giving the client real behavioral data about their audience.",
    tech: ["React", "Supabase", "SASS"],
    badge: "Freelance",
    image: "/images/projects/mixordia.png",
    featured: true,
  },
  {
    name: "vizinhelp",
    description:
      "A community platform connecting neighbors for local mutual aid and services.",
    tech: ["React", "Next.js", "TypeScript"],
    github: "https://github.com/vcosmusjoao/vizinhelp",
    image: "/images/projects/vizinhelp.png",
    badge: "Academic",
  },
  {
    name: "chatgpt-clone",
    description:
      "A ChatGPT-like interface built to practice React state management, streaming responses, and clean UI design.",
    tech: ["React", "Next.js", "TypeScript"],
    github: "https://github.com/vcosmusjoao/chatgpt-clone",
    badge: "Study",
  },
  {
    name: "frontend-challenge-picpay",
    description:
      "A frontend technical challenge from PicPay, implementing core banking UI features with Angular and TypeScript.",
    tech: ["Angular", "TypeScript", "RxJS"],
    github: "https://github.com/vcosmusjoao/frontend-challenge-picpay",
    badge: "Job · Tech Challenge",
  },
];

function Placeholder({ size }: { size: "sm" | "lg" }) {
  const height = size === "lg" ? "h-52" : "h-32";
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
  const height = size === "lg" ? "h-52" : "h-32";
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

function FeaturedCard({ project }: { project: Project }) {
  const Wrapper = project.github ? "a" : "div";
  const wrapperProps = project.github
    ? { href: project.github, target: "_blank", rel: "noreferrer" }
    : {};

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className="block border border-highlight rounded-md p-6 bg-highlight/5 group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <h3 className="font-fira-code text-highlight text-lg md:text-xl">
            {project.name}
          </h3>
          {project.badge && (
            <span className="font-fira-code text-xs text-highlight border border-highlight/50 px-2 py-0.5 rounded-full">
              {project.badge}
            </span>
          )}
        </div>
        {project.github && (
          <span className="text-highlight/40 text-sm ml-4 shrink-0 group-hover:text-highlight transition-colors">
            ↗
          </span>
        )}
      </div>

      <ProjectImage image={project.image} name={project.name} size="lg" />

      <p className="text-text text-sm md:text-base leading-relaxed mb-5 opacity-80">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-fira-code text-xs text-highlight border border-highlight/40 px-2 py-0.5 rounded"
          >
            {t}
          </span>
        ))}
      </div>
    </Wrapper>
  );
}

function RegularCard({ project }: { project: Project }) {
  return (
    <a
      href={project.github}
      target="_blank"
      rel="noreferrer"
      className="block border border-text/20 hover:border-highlight rounded-md p-5 transition-colors group"
    >
      <ProjectImage image={project.image} name={project.name} size="sm" />

      {project.badge && (
        <span className="font-fira-code text-xs text-highlight border border-highlight/50 px-2 py-0.5 rounded-full mb-3 inline-block">
          {project.badge}
        </span>
      )}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-fira-code text-highlight text-sm md:text-base group-hover:underline">
          {project.name}
        </h3>
        <span className="text-text/40 text-sm ml-4 shrink-0">↗</span>
      </div>
      <p className="text-text text-sm leading-relaxed mb-4 opacity-70">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-fira-code text-xs text-highlight border border-highlight/40 px-2 py-0.5 rounded"
          >
            {t}
          </span>
        ))}
      </div>
    </a>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-20 max-w-3xl">
      <h2 className="font-fira-code text-highlight text-2xl md:text-3xl mb-8">
        .projects()
      </h2>

      <div className="flex flex-col gap-6">
        {featured.map((p) => (
          <FeaturedCard key={p.name} project={p} />
        ))}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          {rest.map((p) => (
            <RegularCard key={p.name} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
