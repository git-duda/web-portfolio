import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export function AbilitiesSection() {
  const { t } = useLanguage();

  return (
    <section
      id="explorar"
      className="abilities grid grid-cols-1 md:grid-cols-3 border-b border-[#191919] bg-[#f8f6ec]"
      aria-label={t.abilities.sectionAria}
    >
      <div className="p-6 md:p-7 border-b md:border-b-0 md:border-r border-[#191919]">
        <h2 className="font-mono-custom text-sm font-bold tracking-widest text-[#191919] uppercase mb-2">
          {t.abilities.economicsTitle}
        </h2>
        <p className="font-mono-custom text-xs md:text-sm text-[#191919] opacity-90 leading-relaxed">
          {t.abilities.economicsDesc}
        </p>
      </div>

      <div className="p-6 md:p-7 border-b md:border-b-0 md:border-r border-[#191919]">
        <h2 className="font-mono-custom text-sm font-bold tracking-widest text-[#191919] uppercase mb-2">
          {t.abilities.analysisTitle}
        </h2>
        <p className="font-mono-custom text-xs md:text-sm text-[#191919] opacity-90 leading-relaxed">
          {t.abilities.analysisDesc}
        </p>
      </div>

      <div className="p-6 md:p-7">
        <h2 className="font-mono-custom text-sm font-bold tracking-widest text-[#191919] uppercase mb-2">
          {t.abilities.dataTitle}
        </h2>
        <p className="font-mono-custom text-xs md:text-sm text-[#191919] opacity-90 leading-relaxed">
          {t.abilities.dataDesc}
        </p>
      </div>
    </section>
  );
}
