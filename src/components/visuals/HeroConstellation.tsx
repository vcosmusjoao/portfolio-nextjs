import {
  CORE,
  HERODASH,
  modules,
  PULSE_EDGES,
  RINGS,
  squads,
  VIEWBOX,
} from "@/data/constellation";

/**
 * The HeroDash monorepo drawn as a graph: one core, 10 squads, 66 modules.
 *
 * Pure inline SVG — no canvas, no physics, no JS. Weight is encoded by radius
 * and opacity only, so the whole thing reads in one hue. Animation is CSS with
 * a per-node delay, and `prefers-reduced-motion` stops it in globals.css.
 */
export default function HeroConstellation({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
      className={`constellation ${className}`}
      role="img"
      aria-label={`The HeroDash monorepo: ${HERODASH.modules} feature modules shared across ${HERODASH.squads} squads.`}
    >
      <g className="constellation-rings">
        {RINGS.map((r) => (
          <circle key={r} cx={CORE.x} cy={CORE.y} r={r} fill="none" />
        ))}
      </g>

      <g className="constellation-edges">
        {modules.map((m) => {
          const squad = squads[m.squadIndex];
          return (
            <line
              key={`m${m.i}`}
              x1={m.x}
              y1={m.y}
              x2={squad.x}
              y2={squad.y}
              className={PULSE_EDGES.includes(m.i) ? "constellation-pulse" : undefined}
              style={{ "--i": m.i } as React.CSSProperties}
            />
          );
        })}
        {squads.map((s) => (
          <line key={`s${s.i}`} x1={s.x} y1={s.y} x2={CORE.x} y2={CORE.y} />
        ))}
      </g>

      <g className="constellation-nodes">
        {modules.map((m) => (
          <circle
            key={m.i}
            cx={m.x}
            cy={m.y}
            r={m.r}
            className="constellation-module"
            style={{ "--i": m.i } as React.CSSProperties}
          />
        ))}
        {squads.map((s) => (
          <circle
            key={s.i}
            cx={s.x}
            cy={s.y}
            r={s.r}
            className="constellation-squad"
            style={{ "--i": s.i * 6 } as React.CSSProperties}
          />
        ))}
        <circle cx={CORE.x} cy={CORE.y} r={CORE.r} className="constellation-core" />
      </g>
    </svg>
  );
}
