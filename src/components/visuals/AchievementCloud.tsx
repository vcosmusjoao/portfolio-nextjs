"use client";

import Link from "next/link";
import { AnimatePresence, m } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { achievements, type AchievementId } from "@/data/achievements";
import { skyDots, VIEWBOX } from "@/data/constellation";
import { EASE_OUT_EXPO } from "@/components/motion/variants";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSound } from "@/audio/SoundProvider";

const CARD_ID = "achievement-card";

/** The centre is selectable too, and tells you who this is. */
type Selected = AchievementId | "whoami" | null;

/**
 * The hero's interactive cloud: things João has built and shipped, drifting
 * around him. Each node is a real button; opening one dims the rest and
 * expands a card that links to where the achievement is told in full.
 *
 * The SVG is only atmosphere (66 faint module dots and the core). The nodes
 * are HTML buttons laid over it by percentage, so they get real focus, labels
 * and tap targets. Drift pauses while a card is open.
 */
export default function AchievementCloud({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  const { note } = useSound();
  const [selected, setSelected] = useState<Selected>(null);
  const [touched, setTouched] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const nodeRefs = useRef(new Map<string, HTMLButtonElement>());
  const lastOpened = useRef<Selected>(null);
  const returnFocus = useRef(false);

  const toggle = (id: Exclude<Selected, null>) => {
    setTouched(true);
    setSelected((current) => (current === id ? null : id));
  };

  const close = useCallback((restoreFocus: boolean) => {
    returnFocus.current = restoreFocus;
    setSelected(null);
  }, []);

  // Focus moves into the card when it opens and back to its node when it's
  // dismissed from the keyboard or the × — not when the visitor clicked away.
  useEffect(() => {
    if (selected) {
      lastOpened.current = selected;
      closeRef.current?.focus({ preventScroll: true });
      return;
    }
    if (lastOpened.current && returnFocus.current) {
      nodeRefs.current.get(lastOpened.current)?.focus({ preventScroll: true });
    }
    lastOpened.current = null;
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onPointer = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(`#${CARD_ID}`) || target.closest("[data-node]")) return;
      close(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [selected, close]);

  const open = achievements.find((a) => a.id === selected) ?? null;
  const isWhoami = selected === "whoami";
  const copy = open ? t.achievements.items[open.id] : null;
  const card = isWhoami
    ? { title: t.achievements.whoami.label, href: "/#about", linkLabel: t.achievements.aboutMe }
    : open && copy
      ? {
          title: copy.label,
          href: open.href,
          linkLabel: open.kind === "project" ? t.achievements.readCaseStudy : t.achievements.seeExperience,
        }
      : null;

  return (
    <div
      role="group"
      aria-label={t.achievements.label}
      className={`relative aspect-square ${selected ? "is-still" : ""} ${className}`}
    >
      <div aria-hidden="true" className="cloud-nebula pointer-events-none absolute inset-0" />

      <svg viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`} aria-hidden="true" className="constellation absolute inset-0 h-full w-full">
        <g opacity={0.55}>
          {skyDots.map((d) => (
            <circle
              key={d.i}
              cx={d.x}
              cy={d.y}
              r={1.4}
              className="constellation-module"
              style={{ "--i": d.i } as CSSProperties}
            />
          ))}
        </g>

      </svg>

      <button
        type="button"
        data-node
        ref={(el) => {
          if (el) nodeRefs.current.set("whoami", el);
          else nodeRefs.current.delete("whoami");
        }}
        onClick={() => toggle("whoami")}
        onPointerEnter={() => note(0)}
        onFocus={() => note(0)}
        aria-expanded={selected === "whoami"}
        aria-controls={CARD_ID}
        aria-label={t.achievements.whoami.label}
        className={`group/core absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full transition-opacity duration-300 ${
          selected && selected !== "whoami" ? "opacity-30" : ""
        }`}
      >
        <span
          aria-hidden="true"
          className={`h-3.5 w-3.5 rounded-full bg-accent shadow-[0_0_16px_4px] shadow-accent/60 transition-transform duration-300 ${
            selected === "whoami" ? "scale-150" : "group-hover/core:scale-125"
          }`}
        />
        <span
          aria-hidden="true"
          className="font-fira-code text-[10px] uppercase tracking-[0.18em] text-fg-faint transition-colors group-hover/core:text-accent"
        >
          {t.achievements.core}
        </span>
      </button>

      {!touched && (
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 text-center font-fira-code text-[10px] uppercase tracking-[0.18em] text-fg-faint"
        >
          {`// ${t.achievements.hint}`}
        </p>
      )}

      {achievements.map((a, i) => {
        const isOpen = selected === a.id;
        const dimmed = selected !== null && !isOpen;
        const label = t.achievements.items[a.id].label;
        return (
          // Wrapper holds the position; the button inside drifts, so the
          // animation's transform can't clobber the centring translate.
          <div
            key={a.id}
            style={{ left: `${a.x}%`, top: `${a.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
          <button
            type="button"
            data-node
            ref={(el) => {
              if (el) nodeRefs.current.set(a.id, el);
              else nodeRefs.current.delete(a.id);
            }}
            onClick={() => toggle(a.id)}
            onPointerEnter={() => note(i)}
            onFocus={() => note(i)}
            aria-expanded={isOpen}
            aria-controls={CARD_ID}
            aria-label={label}
            style={{ "--dur": `${a.duration}s`, "--delay": `${a.delay}s` } as CSSProperties}
            className={`cloud-drift group/node flex h-11 w-11 items-center justify-center rounded-full transition-opacity duration-300 ${
              dimmed ? "opacity-30" : ""
            }`}
          >
            <span aria-hidden="true" className="cloud-halo absolute h-7 w-7 rounded-full" style={{ "--i": i } as CSSProperties} />
            {!touched && i === 0 && (
              <span aria-hidden="true" className="absolute h-6 w-6 rounded-full border border-accent motion-safe:animate-ping" />
            )}
            <span
              aria-hidden="true"
              className={`relative h-3 w-3 rounded-full transition-[transform,background-color,box-shadow] duration-300 ${
                isOpen
                  ? "scale-150 bg-accent shadow-[0_0_14px_3px] shadow-accent/70"
                  : "bg-accent-dim group-hover/node:scale-125 group-hover/node:bg-accent"
              }`}
            />
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute left-1/2 top-[78%] hidden w-[6.5rem] -translate-x-1/2 text-center font-fira-code text-[11px] leading-tight transition-colors sm:block ${
                isOpen ? "text-accent" : "text-fg-muted group-hover/node:text-accent"
              }`}
            >
              {label}
            </span>
          </button>
          </div>
        );
      })}

      <AnimatePresence mode="wait">
        {card && (
          <m.div
            key={selected}
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <m.div
              id={CARD_ID}
              role="region"
              aria-labelledby={`${CARD_ID}-title`}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.96 }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
              // Sized to the screen, not the cloud: on a narrow phone the cloud is
              // ~200px and a card that fits it turns into a tall, skinny column.
              className="pointer-events-auto w-[min(18rem,calc(100vw-3rem))] shrink-0 rounded-sm border border-accent/40 bg-surface-2/95 p-4 shadow-[0_0_32px_-8px_rgb(6_182_212/0.55)] backdrop-blur"
            >
              <div className="mb-2 flex items-start justify-between gap-3">
                <p id={`${CARD_ID}-title`} className="font-fira-code text-sm text-accent">
                  {card.title}
                </p>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => close(true)}
                  aria-label={t.achievements.close}
                  className="text-lg leading-none text-fg-dim transition-colors hover:text-accent"
                >
                  ×
                </button>
              </div>
              {isWhoami ? (
                <ul className="mb-3 space-y-1 font-fira-code text-xs leading-relaxed text-fg-muted">
                  {t.achievements.whoami.lines.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span aria-hidden="true" className="text-fg-faint">
                        ▸
                      </span>
                      {line}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mb-3 text-sm leading-relaxed text-fg-muted">{copy?.detail}</p>
              )}
              <Link
                href={card.href}
                onClick={() => close(false)}
                className="font-fira-code text-xs text-accent hover:text-accent-bright hover:underline"
              >
                {card.linkLabel} →
              </Link>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
