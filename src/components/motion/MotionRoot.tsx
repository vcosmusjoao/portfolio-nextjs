"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Single choke point for motion.
 *
 * `reducedMotion="user"` makes every descendant skip transform and layout
 * animation when the OS asks for it, so no individual component has to
 * remember. `strict` forbids the full `motion.*` bundle — use `m.*`.
 */
export default function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
