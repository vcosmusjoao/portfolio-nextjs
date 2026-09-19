"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { staggerContainer, staggerItem, VIEWPORT } from "./variants";

/** Entrance for a list: children trickle in rather than moving as one block. */
export function Stagger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <m.div className={className} variants={staggerItem}>
      {children}
    </m.div>
  );
}
