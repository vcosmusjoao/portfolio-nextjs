/**
 * Geometry for the hero constellation.
 *
 * The numbers are real: HeroDash is the Angular monorepo at PicPay, 66 feature
 * modules shared across 10+ squads. The picture is the data, so it stays honest
 * if the data changes.
 *
 * Positions come from a golden-angle phyllotaxis — deterministic, so the server
 * and the client render byte-identical markup and there is no `Math.random`
 * hydration hazard.
 */

export const HERODASH = {
  modules: 66,
  squads: 10,
  products: 14,
} as const;

const GOLDEN_ANGLE = 137.507;
const CENTER = 200;
const SQUAD_RADIUS = 92;
const MODULE_INNER = 108;
const MODULE_SPREAD = 78;

export const VIEWBOX = 400;

/** Faint concentric rings behind the nodes — a radar grid, deliberately recessive. */
export const RINGS = [SQUAD_RADIUS, MODULE_INNER + MODULE_SPREAD * 0.6, MODULE_INNER + MODULE_SPREAD];

export const CORE = { x: CENTER, y: CENTER, r: 5.5 };

function polar(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: +(CENTER + radius * Math.cos(rad)).toFixed(2),
    y: +(CENTER + radius * Math.sin(rad)).toFixed(2),
  };
}

export const squads = Array.from({ length: HERODASH.squads }, (_, i) => {
  const angle = i * (360 / HERODASH.squads) - 90;
  return { ...polar(angle, SQUAD_RADIUS), r: 3.2, i };
});

export const modules = Array.from({ length: HERODASH.modules }, (_, i) => {
  const angle = i * GOLDEN_ANGLE - 90;
  const radius = MODULE_INNER + MODULE_SPREAD * Math.sqrt((i + 1) / HERODASH.modules);
  const normalised = (((angle + 90) % 360) + 360) % 360;
  const squadIndex = Math.round(normalised / (360 / HERODASH.squads)) % HERODASH.squads;
  return { ...polar(angle, radius), r: 1.5, i, squadIndex };
});

/** Four module edges carry a travelling pulse, spread around the circle. */
export const PULSE_EDGES = [7, 23, 41, 58];
