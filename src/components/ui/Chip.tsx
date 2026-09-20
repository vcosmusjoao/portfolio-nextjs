"use client";

import type { IconType } from "react-icons";
import {
  SiAngular,
  SiAnthropic,
  SiFastapi,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiKeycloak,
  SiLangchain,
  SiNextdotjs,
  SiNodedotjs,
  SiNx,
  SiPostgresql,
  SiPython,
  SiReact,
  SiReactivex,
  SiResend,
  SiSass,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { useSound } from "@/audio/SoundProvider";

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
  Keycloak: SiKeycloak,
  LangGraph: SiLangchain,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  Nx: SiNx,
  PostgreSQL: SiPostgresql,
  Python: SiPython,
  React: SiReact,
  Resend: SiResend,
  RxJS: SiReactivex,
  SASS: SiSass,
  Supabase: SiSupabase,
  "Tailwind CSS": SiTailwindcss,
  TypeScript: SiTypescript,
};

/**
 * Brand colour each logo lights up in on hover. Brands whose colour is black
 * or dark navy would disappear on this background, so they use white or the
 * lighter colour from their own logo.
 */
const BRAND: Record<string, string> = {
  Angular: "#DD0031",
  Claude: "#D97757",
  "Claude Vision": "#D97757",
  FastAPI: "#009688",
  Git: "#F05032",
  "HTML/CSS": "#E34F26",
  JavaScript: "#F7DF1E",
  Jest: "#C21325",
  Keycloak: "#4FC3F7",
  LangGraph: "#FFFFFF",
  "Next.js": "#FFFFFF",
  "Node.js": "#5FA04E",
  Nx: "#FFFFFF",
  PostgreSQL: "#6B8FE8",
  Python: "#FFD43B",
  React: "#61DAFB",
  Resend: "#FFFFFF",
  RxJS: "#E535AB",
  SASS: "#CC6699",
  Supabase: "#3FCF8E",
  "Tailwind CSS": "#38BDF8",
  TypeScript: "#3178C6",
};

export default function Chip({
  label,
  size = "sm",
}: {
  label: string;
  size?: "sm" | "md";
}) {
  const { spark } = useSound();
  const Icon = ICONS[label];
  const scale =
    size === "md" ? "text-sm px-3 py-1.5 gap-2" : "text-xs px-2 py-0.5 gap-1.5";

  return (
    <span
      onPointerEnter={spark}
      style={{ "--brand": BRAND[label] ?? "var(--color-accent)" } as React.CSSProperties}
      className={`shine group/chip inline-flex items-center font-fira-code text-fg-muted bg-surface-3 border border-line-strong rounded-sm hover:text-fg hover:border-accent/60 hover:bg-surface-2 ${scale}`}
    >
      {Icon && (
        <Icon
          aria-hidden="true"
          className="text-fg-dim shrink-0 transition-colors duration-[var(--duration-base)] group-hover/chip:text-(--brand)"
        />
      )}
      {label}
    </span>
  );
}
