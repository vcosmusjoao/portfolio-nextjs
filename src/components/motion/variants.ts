import type { Variants } from "framer-motion";

/** Mirrors --ease-out-expo in globals.css. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Viewport trigger shared by every scroll-triggered entrance. */
export const VIEWPORT = { once: true, amount: 0.2 } as const;

export const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_OUT_EXPO },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: EASE_OUT_EXPO },
  },
};

/** Lift on hover. MotionConfig drops the transform under reduced motion. */
export const cardHover = {
  y: -3,
  transition: { duration: 0.2, ease: EASE_OUT_EXPO },
} as const;
