"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import useTerminalEffect from "@/hooks/useTerminalEffect";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function Hero() {
  const { t } = useLanguage();
  const { output, done } = useTerminalEffect(t.hero.terminal, 60, 800);

  return (
    <section id="home" className="relative w-full min-h-[calc(100vh-3rem)] flex flex-col md:flex-row">
      {/* Left — Content */}
      <motion.div
        className="flex-1 max-w-xl pt-4 pr-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="font-fira-code text-highlight text-3xl md:text-4xl mb-4 mt-6">
          {t.hero.greeting}
        </h1>

        <p className="text-text text-base md:text-lg leading-relaxed">
          {t.hero.tagline1}
        </p>

        <p className="text-text text-base md:text-lg leading-relaxed mt-2">
          {t.hero.tagline2}
        </p>

        <a
          href={t.hero.cvUrl}
          download
          className="mt-6 inline-flex items-center gap-2 font-fira-code text-sm text-highlight border border-highlight px-4 py-2 rounded-md hover:bg-highlight/10 transition-colors"
        >
          <FiDownload /> {t.hero.downloadCv}
        </a>

        <div className="mt-8 mb-8 flex flex-col sm:flex-row gap-4">
          {t.hero.stats.map((stat) => (
            <div key={stat.value} className="border border-highlight p-4 rounded-md flex-1">
              <p className="font-fira-code text-highlight text-lg mb-1">{stat.value}</p>
              <p className="text-text text-sm opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 font-fira-code text-highlight text-base leading-relaxed space-y-2 pr-4 sm:pr-0">
          {output.map((line, i) => (
            <p key={i}>&gt; {line}</p>
          ))}
          {!done && <p className="animate-pulse mt-1">_</p>}
        </div>
      </motion.div>

      {/* Right — Profile Image */}
      <motion.div
        className="hidden sm:flex flex-1 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        <Image
          src="/images/profile/b3a4c130-2390-4dc3-95f1-2b305cf14c2e.png"
          alt="João Costa"
          width={360}
          height={360}
          priority
          className="avatar-landscape-hide hidden sm:block absolute right-0 bottom-0 w-40 sm:w-48 md:w-56 lg:w-72 xl:w-80 object-contain pointer-events-none select-none z-30"
        />
        <div
          aria-hidden="true"
          className="absolute right-0 bottom-0 w-40 sm:w-48 md:w-56 lg:w-72 xl:w-80 h-28 pointer-events-none z-20"
          style={{
            background: "linear-gradient(0deg, rgba(15,23,42,1) 20%, rgba(15,23,42,0.6) 50%, rgba(15,23,42,0) 100%)",
          }}
        />
      </motion.div>
    </section>
  );
}
