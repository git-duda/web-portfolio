import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
    const content = document.getElementById('conteudo');
    content?.scrollTo({ top: 0, left: 0, behavior });
    window.scrollTo({ top: 0, left: 0, behavior });
    const focusTarget = window.matchMedia('(min-width: 701px)').matches
      ? content : document.querySelector<HTMLElement>('header a');
    focusTarget?.focus({ preventScroll: true });
    window.history.replaceState(null, '', '#inicio');
  };

  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 p-6 md:p-8 bg-[#f8f6ec] text-[#191919] font-mono-custom text-xs">
      <span className="leading-relaxed">
        © 2026 Eduarda Saraiva
        <br />
        {t.footer.rights}
      </span>

      <a
        href="#inicio"
        onClick={scrollToTop}
        className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-[#191919] hover:text-[#236a47] border-b border-[#191919] hover:border-[#236a47] pb-0.5 transition-colors"
      >
        {t.footer.backToTop}
      </a>
    </footer>
  );
}
