"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { EASE_OUT_EXPO } from "@/components/motion/variants";

const STORAGE_KEY = "portfolio.booted";
const DURATION_MS = 1100;
const LOG = ["> mount joaovcosta.dev", "> hydrate 6 sections", "> ready"];
const SKIP_EVENTS = ["pointerdown", "keydown", "wheel", "touchstart"] as const;

/**
 * A one-second "power on" over the page, once per session.
 *
 * It is an overlay, never a gate: the content underneath is server-rendered at
 * full opacity and paints on its own, so LCP and crawlers never wait on this.
 * Any input ends it immediately, and it never runs under reduced motion.
 */
export default function BootSequence() {
  const { t } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let booted = false;
    try {
      booted = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {}
    if (booted || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Mark the session only when the boot ends: StrictMode runs this effect
    // twice in development, and marking it up front would suppress it.
    const end = () => {
      setShow(false);
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
    };

    setShow(true);
    const timer = window.setTimeout(end, DURATION_MS);
    SKIP_EVENTS.forEach((e) => window.addEventListener(e, end, { once: true, passive: true }));

    return () => {
      window.clearTimeout(timer);
      SKIP_EVENTS.forEach((e) => window.removeEventListener(e, end));
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <m.div
          key="boot"
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
        >
          <m.div
            className="absolute inset-0 bg-void"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
          />

          <m.div
            className="absolute inset-x-0 top-0 h-px bg-accent shadow-[0_0_14px_2px] shadow-accent/60"
            initial={{ y: 0 }}
            animate={{ y: "100vh" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />

          <div className="boot-grain absolute inset-0" />

          <div className="absolute bottom-6 right-6 space-y-1 text-right font-fira-code text-xs text-fg-muted">
            {LOG.map((line, i) => (
              <m.p
                key={line}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.22 }}
              >
                {line}
              </m.p>
            ))}
            <p className="pt-2 text-fg-faint">{t.ui.bootSkip}</p>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
