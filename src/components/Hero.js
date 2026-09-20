"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { m } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import useTerminalEffect from "@/hooks/useTerminalEffect";
import AchievementCloud from "@/components/visuals/AchievementCloud";
import TelemetryLabel from "@/components/TelemetryLabel";
import { HERODASH } from "@/data/constellation";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useSound } from "@/audio/SoundProvider";

export default function Hero() {
  const { t } = useLanguage();
  const { click, armedCount } = useSound();
  const terminalRef = useRef(null);
  const [replay, setReplay] = useState(0);
  const [instant, setInstant] = useState(false);

  // Type once per session: coming back from a case study shouldn't replay ~15s
  // of typing. The flag is written when it finishes, not when it starts, so
  // StrictMode's double mount in development doesn't suppress the first run.
  useEffect(() => {
    try {
      if (window.sessionStorage.getItem("portfolio.typed") === "1") setInstant(true);
    } catch {}
  }, []);

  // The terminal has usually finished typing before anyone finds the sound
  // toggle, so switching sound on re-types it once — only if it's on screen,
  // otherwise the clicks would come from something the visitor can't see.
  useEffect(() => {
    if (!armedCount) return;
    const box = terminalRef.current?.getBoundingClientRect();
    if (box && box.top < window.innerHeight && box.bottom > 0) {
      setInstant(false);
      setReplay((n) => n + 1);
    }
  }, [armedCount]);

  const { output, done } = useTerminalEffect(t.hero.terminal, 60, 800, click, replay, instant);

  useEffect(() => {
    if (!done) return;
    try {
      window.sessionStorage.setItem("portfolio.typed", "1");
    } catch {}
  }, [done]);

  return (
    <section id="home" className="relative w-full min-h-[calc(100vh-3rem)] flex flex-col md:flex-row">
      {/* Left — Content */}
      <m.div
        className="relative z-10 flex-1 max-w-xl pt-4 pr-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="font-fira-code text-fg text-3xl md:text-4xl tracking-tight mb-4 mt-6">
          {t.hero.greeting}
        </h1>

        <p className="text-fg-muted text-base md:text-lg leading-relaxed">
          {t.hero.tagline1}
        </p>

        <p className="text-fg-muted text-base md:text-lg leading-relaxed mt-2">
          {t.hero.tagline2}
        </p>

        <a
          href={t.hero.cvUrl}
          download
          className="shine mt-6 inline-flex items-center gap-2 font-fira-code text-sm text-accent border border-accent px-4 py-2 rounded-sm hover:bg-accent/10 hover:text-accent-bright hover:border-accent-bright"
        >
          <FiDownload /> {t.hero.downloadCv}
        </a>

        {/* Spec sheet rather than three equal boxes: the `auto` column sizes to
            the widest value, so every row aligns at any width. */}
        <dl className="mt-8 mb-8 grid grid-cols-[auto_1fr] gap-x-5 border-t border-line">
          {t.hero.stats.map((stat, i) => (
            <React.Fragment key={i}>
              <dt className="font-fira-code text-fg text-sm py-3 border-b border-line">
                {stat.value}
              </dt>
              <dd className="text-fg-dim text-sm py-3 border-b border-line self-center">
                {stat.label}
              </dd>
            </React.Fragment>
          ))}
        </dl>

        <TelemetryLabel
          className="-mt-4 mb-8"
          items={[
            `${HERODASH.modules} ${t.hero.telemetry.modules}`,
            `${HERODASH.squads}+ ${t.hero.telemetry.squads}`,
            `${HERODASH.products} ${t.hero.telemetry.products}`,
          ]}
        />

        <div
          ref={terminalRef}
          className="mt-8 font-fira-code text-accent text-base leading-relaxed space-y-2 pr-4 sm:pr-0"
        >
          {output.map((line, i) => (
            <p key={i}>&gt; {line}</p>
          ))}
          {!done && <p className="motion-safe:animate-pulse mt-1">_</p>}
        </div>
      </m.div>

      {/* Right — the achievement cloud, with the avatar behind it */}
      <m.div
        className="relative flex flex-1 items-start justify-center min-h-[300px] md:min-h-0 md:justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center">
          <AchievementCloud className="z-40 w-[300px] sm:w-[340px] md:w-[360px] lg:w-[440px]" />
          {/* Mobile only: the desktop avatar below overlaps the cloud on
              purpose, which only works once there's room beside it. */}
          <Image
            src="/images/profile/b3a4c130-2390-4dc3-95f1-2b305cf14c2e.png"
            alt="João Costa"
            width={320}
            height={320}
            sizes="256px"
            className="mt-4 w-64 object-contain pointer-events-none select-none sm:hidden"
          />
        </div>
        <Image
          src="/images/profile/b3a4c130-2390-4dc3-95f1-2b305cf14c2e.png"
          alt="João Costa"
          width={360}
          height={360}
          sizes="(min-width: 1280px) 320px, (min-width: 1024px) 288px, (min-width: 768px) 224px, 192px"
          priority
          className="avatar-landscape-hide hidden sm:block absolute right-0 bottom-0 w-40 sm:w-48 md:w-56 lg:w-72 xl:w-80 object-contain pointer-events-none select-none z-30"
        />
        <div
          aria-hidden="true"
          className="hidden sm:block absolute right-0 bottom-0 w-40 sm:w-48 md:w-56 lg:w-72 xl:w-80 h-28 pointer-events-none z-20"
          style={{
            background: "linear-gradient(0deg, rgba(15,23,42,1) 20%, rgba(15,23,42,0.6) 50%, rgba(15,23,42,0) 100%)",
          }}
        />
      </m.div>
    </section>
  );
}
