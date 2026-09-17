import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [activeSection, setActiveSection] = useState<string>('sobre');

  useEffect(() => {
    const pane = document.getElementById('conteudo');
    const handleScroll = () => {
      const top = window.matchMedia('(min-width:701px)').matches ? (pane?.getBoundingClientRect().top ?? 0) : 70;
      let active = 'sobre';
      for (const id of ['explorar', 'contato']) {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= top + 180) active = id;
      }
      setActiveSection(active);
    };
    pane?.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => { pane?.removeEventListener('scroll', handleScroll); window.removeEventListener('scroll', handleScroll); };
  }, []);

  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-[#191919] text-[#f8f6ec] px-4 py-2 font-mono-custom text-xs"
        href="#conteudo"
      >
        {t.nav.skipToContent}
      </a>

      <header className="sticky top-0 z-40 w-full bg-[#f8f6ec] border-b border-[#191919]">
        <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3">
          <a
            className="font-mono-custom text-xl md:text-2xl font-bold tracking-tight text-[#191919] hover:opacity-75 transition-opacity"
            href="#sobre"
            aria-label="Eduarda Saraiva, início"
          >
            ES*
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <nav aria-label="Navegação principal" className="flex items-center gap-1 sm:gap-2">
              <a
                href="#sobre"
                className={`px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-mono-custom uppercase tracking-wider border transition-colors ${
                  activeSection === 'sobre'
                    ? 'bg-[#191919] text-[#f8f6ec] border-[#191919]'
                    : 'bg-[#f8f6ec] text-[#191919] border-[#191919] hover:bg-[#191919] hover:text-[#f8f6ec]'
                }`}
              >
                {t.nav.about}
              </a>
              <a
                href="#explorar"
                className={`px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-mono-custom uppercase tracking-wider border transition-colors ${
                  activeSection === 'explorar'
                    ? 'bg-[#191919] text-[#f8f6ec] border-[#191919]'
                    : 'bg-[#f8f6ec] text-[#191919] border-[#191919] hover:bg-[#191919] hover:text-[#f8f6ec]'
                }`}
              >
                {t.nav.explore}
              </a>
              <a
                href="#contato"
                className={`px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-mono-custom uppercase tracking-wider border transition-colors ${
                  activeSection === 'contato'
                    ? 'bg-[#191919] text-[#f8f6ec] border-[#191919]'
                    : 'bg-[#f8f6ec] text-[#191919] border-[#191919] hover:bg-[#191919] hover:text-[#f8f6ec]'
                }`}
              >
                {t.nav.contact}
              </a>
            </nav>
            <div
              className="flex items-center border border-[#191919] bg-white text-xs font-mono-custom ml-1"
              role="group"
              aria-label="Seleção de idioma / Language selector"
            >
              <button
                type="button"
                onClick={() => setLanguage('pt')}
                aria-pressed={language === 'pt'}
                className={`px-2 py-1 uppercase tracking-wider transition-colors cursor-pointer ${
                  language === 'pt'
                    ? 'bg-[#236a47] text-white font-bold'
                    : 'bg-transparent text-[#191919] hover:bg-neutral-100'
                }`}
              >
                PT
              </button>
              <div className="w-[1px] h-4 bg-[#191919]/30" />
              <button
                type="button"
                onClick={() => setLanguage('en')}
                aria-pressed={language === 'en'}
                className={`px-2 py-1 uppercase tracking-wider transition-colors cursor-pointer ${
                  language === 'en'
                    ? 'bg-[#236a47] text-white font-bold'
                    : 'bg-transparent text-[#191919] hover:bg-neutral-100'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
