"use client";

import RichText from "@/components/RichText";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 max-w-2xl">
      <h2 className="font-fira-code text-highlight text-2xl md:text-3xl mb-8">
        {t.about.heading}
      </h2>

      <div className="space-y-4 text-text text-base md:text-lg leading-relaxed">
        {t.about.paragraphs.map((paragraph, i) => (
          <p key={i}>
            <RichText>{paragraph}</RichText>
          </p>
        ))}
      </div>
    </section>
  );
}
