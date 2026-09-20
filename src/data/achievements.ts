import type { Messages } from "@/i18n/messages";

export type AchievementId = keyof Messages["achievements"]["items"];

export interface Achievement {
  id: AchievementId;
  /** Where "read more" goes: a home section or a case study. */
  href: string;
  kind: "experience" | "project";
  /** Position around the centre, as a percentage of the cloud's box. */
  x: number;
  y: number;
}

const RADIUS = 36;

/** Evenly spaced around the centre, 40° apart, starting upper-left. */
function place(i: number) {
  const angle = ((-150 + i * 40) * Math.PI) / 180;
  return {
    x: +(50 + RADIUS * Math.cos(angle)).toFixed(2),
    y: +(50 + RADIUS * Math.sin(angle)).toFixed(2),
  };
}

const entries: Omit<Achievement, "x" | "y">[] = [
  { id: "herodash", href: "/#experience", kind: "experience" },
  { id: "workspace", href: "/#experience", kind: "experience" },
  { id: "queues", href: "/#experience", kind: "experience" },
  { id: "promoted", href: "/#experience", kind: "experience" },
  { id: "pix", href: "/#experience", kind: "experience" },
  { id: "mixordia", href: "/projects/mixordia", kind: "project" },
  { id: "dispute", href: "/projects/dispute-triage-agent", kind: "project" },
  { id: "finlivre", href: "/projects/finlivre", kind: "project" },
  { id: "vizinhelp", href: "/projects/vizinhelp", kind: "project" },
];

/**
 * The hero cloud's nodes. Every one is something already stated elsewhere on
 * the site (Experience or a case study) — the cloud is a way in, not a new
 * claim.
 */
export const achievements: Achievement[] = entries.map((e, i) => ({ ...e, ...place(i) }));
