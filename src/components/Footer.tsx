import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 p-6 md:p-8 bg-[#f8f6ec] text-[#191919] font-mono-custom text-xs">
      <span className="leading-relaxed">
        © 2026 Eduarda Saraiva
        <br />
        {t.footer.rights}
      </span>

      <a
        href="#sobre"
        onClick={scrollToTop}
        className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-[#191919] hover:text-[#236a47] border-b border-[#191919] hover:border-[#236a47] pb-0.5 transition-colors"
      >
        {t.footer.backToTop}
      </a>
    </footer>
  );
}
