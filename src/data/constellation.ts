/**
 * Geometry for the faint "sky" behind the hero cloud.
 *
 * The numbers are real — HeroDash, the Angular monorepo at PicPay, has 66
 * feature modules shared across 10+ squads — and the dots are one per module.
 * Positions come from a golden-angle phyllotaxis: deterministic, so server and
 * client render identical markup with no `Math.random` hydration hazard.
 */

export const HERODASH = {
  modules: 66,
  squads: 10,
  products: 14,
} as const;

const GOLDEN_ANGLE = 137.507;
const INNER = 70;
const SPREAD = 125;

export const VIEWBOX = 400;
export const CENTER = VIEWBOX / 2;

/** Faint concentric rings — a radar grid, deliberately recessive. */
export const RINGS = [70, 130, 190];

export const skyDots = Array.from({ length: HERODASH.modules }, (_, i) => {
  const angle = ((i * GOLDEN_ANGLE - 90) * Math.PI) / 180;
  const radius = INNER + SPREAD * Math.sqrt((i + 1) / HERODASH.modules);
  return {
    i,
    x: +(CENTER + radius * Math.cos(angle)).toFixed(2),
    y: +(CENTER + radius * Math.sin(angle)).toFixed(2),
  };
});
