import type { Messages } from "@/i18n/messages";

export type AchievementId = keyof Messages["achievements"]["items"];

export interface Achievement {
  id: AchievementId;
  /** Where "read more" goes: a home section or a case study. */
  href: string;
  kind: "experience" | "project";
  /** Position in the cloud's box, as a percentage. */
  x: number;
  y: number;
  /** Per-node drift so no two nodes move together. */
  duration: number;
  delay: number;
}

const entries: Omit<Achievement, "x" | "y" | "duration" | "delay">[] = [
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

/** Deterministic PRNG — a seeded scatter renders identically on server and client. */
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Scattered, not orbiting: nodes sit at irregular angles and distances rather
 * than evenly around one ring. Rejection sampling keeps them clear of each
 * other, of the centre, and of the edges (labels need room below each node).
 */
function scatter(count: number) {
  const random = mulberry32(79);
  const points: { x: number; y: number }[] = [];
  let minGap = 21;

  for (let attempt = 0; points.length < count && attempt < 40000; attempt++) {
    // Relax the spacing if the constraints prove too tight to fill.
    if (attempt > 0 && attempt % 8000 === 0) minGap -= 1.5;

    const x = 14 + random() * 72;
    const y = 10 + random() * 72;
    // A wide band, so some nodes sit close in and others far out — an even
    // distance from the centre is what made it read as orbits.
    const fromCentre = Math.hypot(x - 50, y - 50);
    if (fromCentre < 18 || fromCentre > 48) continue;
    if (points.some((p) => Math.hypot(p.x - x, p.y - y) < minGap)) continue;

    points.push({ x: +x.toFixed(2), y: +y.toFixed(2) });
  }
  return points;
}

const points = scatter(entries.length);

/**
 * The hero cloud's nodes. Every one is something already stated elsewhere on
 * the site (Experience or a case study) — the cloud is a way in, not a new
 * claim.
 */
export const achievements: Achievement[] = entries.map((entry, i) => ({
  ...entry,
  ...points[i],
  duration: 16 + (i % 5) * 3,
  delay: -(i * 2.6),
}));
