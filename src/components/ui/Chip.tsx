import type { IconType } from "react-icons";
import {
  SiAngular,
  SiAnthropic,
  SiFastapi,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiLangchain,
  SiNextdotjs,
  SiNx,
  SiPython,
  SiReact,
  SiReactivex,
  SiSass,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

/**
 * Tech logos, keyed by the exact label used in project and skill data.
 * An unmapped label simply renders without an icon — no placeholder, no gap.
 */
const ICONS: Record<string, IconType> = {
  Angular: SiAngular,
  Claude: SiAnthropic,
  "Claude Vision": SiAnthropic,
  FastAPI: SiFastapi,
  Git: SiGit,
  "HTML/CSS": SiHtml5,
  JavaScript: SiJavascript,
  Jest: SiJest,
  LangGraph: SiLangchain,
  "Next.js": SiNextdotjs,
  Nx: SiNx,
  Python: SiPython,
  React: SiReact,
  RxJS: SiReactivex,
  SASS: SiSass,
  Supabase: SiSupabase,
  "Tailwind CSS": SiTailwindcss,
  TypeScript: SiTypescript,
};

export default function Chip({
  label,
  size = "sm",
}: {
  label: string;
  size?: "sm" | "md";
}) {
  const Icon = ICONS[label];
  const scale =
    size === "md" ? "text-sm px-3 py-1.5 gap-2" : "text-xs px-2 py-0.5 gap-1.5";

  return (
    <span
      className={`inline-flex items-center font-fira-code text-fg-muted bg-surface-3 border border-line-strong rounded-sm ${scale}`}
    >
      {Icon && <Icon aria-hidden="true" className="text-fg-dim shrink-0" />}
      {label}
    </span>
  );
}
