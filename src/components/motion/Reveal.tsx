"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { reveal, VIEWPORT } from "./variants";

/** Entrance for a block with no internal list to stagger. */
export default function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </m.div>
  );
}
