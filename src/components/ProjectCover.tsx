import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import DisputeCover from "@/components/covers/DisputeCover";
import MixordiaCover from "@/components/covers/MixordiaCover";
import type { ProjectMeta } from "@/data/projects";

type Size = "sm" | "lg" | "xl";

// xl is a 2:1 frame rather than a fixed height: it keeps a ~2:1 screenshot
// whole at any width, and top-anchors full-page captures instead of towering.
const HEIGHT: Record<Size, string> = { sm: "h-32", lg: "h-44", xl: "aspect-[2/1]" };

// Stated in px because the containers cap well below the viewport — without
// `sizes`, Next serves an 828px source into a ~175px box.
const SIZES: Record<Size, string> = {
  sm: "(min-width: 1024px) 250px, (min-width: 640px) 380px, 92vw",
  lg: "(min-width: 640px) 380px, 92vw",
  xl: "(min-width: 768px) 720px, 92vw",
};

/** The screenshot or hand-built cover for a project, at a given size. */
export default function ProjectCover({ project, size }: { project: ProjectMeta; size: Size }) {
  const height = HEIGHT[size];

  if (project.cover === "dispute") return <DisputeCover className={height} />;
  if (project.cover === "mixordia") return <MixordiaCover className={height} />;

  if (!project.image) {
    return (
      <div className={`w-full ${height} rounded-sm mb-4 bg-surface-3 border border-line flex items-center justify-center`}>
        <FaGithub className="text-fg-faint text-3xl" />
      </div>
    );
  }

  return (
    <div className={`w-full ${height} rounded-sm mb-4 overflow-hidden border border-line`}>
      <Image
        src={project.image}
        alt={project.name}
        width={size === "xl" ? 1440 : 800}
        height={size === "xl" ? 720 : 400}
        sizes={SIZES[size]}
        quality={95}
        className="w-full h-full object-cover object-top"
      />
    </div>
  );
}
