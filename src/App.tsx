import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/Header';
import { IdentityAside } from './components/IdentityAside';
import { AbilitiesSection } from './components/AbilitiesSection';
import { WorkSection } from './components/WorkSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <LanguageProvider>
      <div className="portfolio-shell min-h-screen bg-[#f8f6ec] text-[#191919] flex flex-col font-sans selection:bg-[#236a47] selection:text-white">
        <Header />
        <div className="layout">
          <IdentityAside />
          <main id="conteudo" tabIndex={-1} className="flex-1 flex flex-col focus:outline-none min-w-0">
            <AboutSection />
            <AbilitiesSection />
            <WorkSection />
            <ContactSection />
            <Footer />
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
}
