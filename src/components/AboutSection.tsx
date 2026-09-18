import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export function AboutSection() {
  const { t } = useLanguage();

  return (
    <section id="sobre" className="about p-6 md:p-10 lg:p-12 border-b border-[#191919] bg-[#f8f6ec]">
      <span className="eyebrow font-mono-custom text-xs font-bold uppercase tracking-widest text-[#236a47] block mb-3">
        {t.about.eyebrow}
      </span>

      <h2 className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-[#191919] leading-[1.08] tracking-tight mb-8 whitespace-pre-line">
        {t.about.title}
      </h2>

      <div className="space-y-4 max-w-3xl text-base md:text-lg text-[#191919]/90 leading-relaxed mb-10">
        <p>{t.about.p1}</p>
        <p>{t.about.p2}</p>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#191919] pt-8">
        <div className="border-l-2 border-[#236a47] pl-4">
          <dt className="font-mono-custom text-xs uppercase tracking-wider font-bold text-[#191919] mb-1">
            {t.about.educationTitle}
          </dt>
          <dd className="font-sans text-sm md:text-base text-[#191919]/85">
            {t.about.educationDesc}
          </dd>
        </div>

        <div className="border-l-2 border-[#236a47] pl-4">
          <dt className="font-mono-custom text-xs uppercase tracking-wider font-bold text-[#191919] mb-1">
            {t.about.analysisTitle}
          </dt>
          <dd className="font-sans text-sm md:text-base text-[#191919]/85">
            {t.about.analysisDesc}
          </dd>
        </div>

        <div className="border-l-2 border-[#236a47] pl-4">
          <dt className="font-mono-custom text-xs uppercase tracking-wider font-bold text-[#191919] mb-1">
            {t.about.vizTitle}
          </dt>
          <dd className="font-sans text-sm md:text-base text-[#191919]/85">
            {t.about.vizDesc}
          </dd>
        </div>

        <div className="border-l-2 border-[#236a47] pl-4">
          <dt className="font-mono-custom text-xs uppercase tracking-wider font-bold text-[#191919] mb-1">
            {t.about.appliedEconTitle}
          </dt>
          <dd className="font-sans text-sm md:text-base text-[#191919]/85">
            {t.about.appliedEconDesc}
          </dd>
        </div>
      </dl>
    </section>
  );
}
