import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ProductPreset {
  id: string;
  name: { pt: string; en: string };
  unit: { pt: string; en: string };
  price1994: number; // in R$ (July 1994 when Plano Real began)
  price2024: number;
}

const PRESETS: ProductPreset[] = [
  { id: 'cesta', name: { pt: 'Cesta Básica', en: 'Essential Basket' }, unit: { pt: 'conjunto mensal', en: 'monthly set' }, price1994: 64.12, price2024: 750.0 },
  { id: 'gasolina', name: { pt: 'Gasolina', en: 'Gasoline' }, unit: { pt: '1 litro', en: '1 liter' }, price1994: 0.55, price2024: 5.95 },
  { id: 'arroz', name: { pt: 'Arroz', en: 'Rice' }, unit: { pt: 'pacote 5kg', en: '5kg pack' }, price1994: 3.2, price2024: 28.5 },
  { id: 'cafe', name: { pt: 'Café moído', en: 'Ground Coffee' }, unit: { pt: '500g', en: '500g' }, price1994: 2.9, price2024: 18.9 },
  { id: 'gas', name: { pt: 'Botijão de Gás', en: 'Cooking Gas' }, unit: { pt: '13kg', en: '13kg cylinder' }, price1994: 8.5, price2024: 104.0 },
  { id: 'pao', name: { pt: 'Pão Francês', en: 'Bread' }, unit: { pt: '1 kg', en: '1 kg' }, price1994: 1.1, price2024: 16.5 },
];

const MIN_WAGE = {
  1994: 64.79, // R$ at inception of Real (July 1994)
  2000: 151.0,
  2010: 510.0,
  2020: 1045.0,
  2024: 1412.0,
  2026: 1518.0,
};

// IPCA accumulated multiplier (approximate reference)
const IPCA_MULTIPLIERS: Record<number, Record<number, number>> = {
  1994: { 2024: 8.12, 2026: 8.75 },
  2000: { 2024: 4.15, 2026: 4.47 },
  2010: { 2024: 2.18, 2026: 2.35 },
};

export function QuantoValiaInteractive() {
  const { language } = useLanguage();
  const [selectedPresetId, setSelectedPresetId] = useState<string>('cesta');
  const [yearA, setYearA] = useState<1994 | 2000 | 2010>(1994);
  const [yearB, setYearB] = useState<2024 | 2026>(2024);
  const [customPriceA] = useState<number>(64.12);
  const [customPriceB] = useState<number>(750.0);
  const [isCustom, setIsCustom] = useState<boolean>(false);

  const currentPreset = PRESETS.find((p) => p.id === selectedPresetId);

  const priceA = isCustom ? customPriceA : (currentPreset?.price1994 ?? 64.12);
  const priceB = isCustom ? customPriceB : (currentPreset?.price2024 ?? 750.0);

  const wageA = MIN_WAGE[yearA];
  const wageB = MIN_WAGE[yearB];

  // % of minimum wage
  const pctWageA = (priceA / wageA) * 100;
  const pctWageB = (priceB / wageB) * 100;

  // Work hours (220 hours standard Brazilian monthly work hours)
  const hoursA = (priceA / wageA) * 220;
  const hoursB = (priceB / wageB) * 220;

  // Units purchasable with 1 minimum wage
  const unitsA = wageA / priceA;
  const unitsB = wageB / priceB;

  // IPCA corrected price of A in year B
  const ipcaFactor = IPCA_MULTIPLIERS[yearA]?.[yearB] || 8.12;
  const priceACorrected = priceA * ipcaFactor;
  const diffVsIpca = ((priceB - priceACorrected) / priceACorrected) * 100;

  return (
    <div className="border border-[#191919] bg-[#f8f6ec] p-5 md:p-6 mb-6">
<p className="font-mono-custom text-xs text-[#555] mb-3">Demonstração interativa com valores ilustrativos.</p>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#191919] pb-4 mb-5">
        <div>
          <span className="font-mono-custom text-[11px] uppercase tracking-widest text-[#236a47] block font-bold">
            {language === 'pt' ? 'Interface Demonstrativa' : 'Demonstration Interface'}
          </span>
          <h4 className="font-syne font-bold text-lg text-[#191919]">
            {language === 'pt' ? 'Quanto valia? — Calculadora de Poder de Compra' : 'Quanto Valia? — Purchasing Power Calculator'}
          </h4>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 text-[11px] font-mono-custom bg-[#191919] text-[#f8f6ec] uppercase tracking-wider">
          {language === 'pt' ? 'Simulação Econômica' : 'Economic Simulation'}
        </span>
      </div>
      <div className="mb-5">
        <label className="block text-xs font-mono-custom uppercase tracking-wider text-[#191919] mb-2 font-medium">
          {language === 'pt' ? 'Selecione o produto ou serviço:' : 'Select product or service:'}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {PRESETS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedPresetId(item.id);
                setIsCustom(false);
              }}
              className={`p-2 text-left border transition-all text-xs font-mono-custom cursor-pointer ${
                !isCustom && selectedPresetId === item.id
                  ? 'border-[#191919] bg-[#191919] text-white shadow-sm'
                  : 'border-[#191919]/30 bg-white/70 text-[#191919] hover:border-[#191919]'
              }`}
            >
              <span className="block font-semibold truncate">{item.name[language]}</span>
              <span className="text-[10px] opacity-75">{item.unit[language]}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="border border-[#191919] p-4 bg-white/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono-custom uppercase font-semibold text-[#191919]">
              {language === 'pt' ? 'Ano Base' : 'Base Year'}
            </span>
            <select
              value={yearA}
              onChange={(e) => setYearA(Number(e.target.value) as 1994 | 2000 | 2010)}
              aria-label={language === 'pt' ? 'Ano Base' : 'Base Year'}
              className="font-mono-custom text-xs border border-[#191919] bg-[#f8f6ec] px-2 py-1"
            >
              <option value={1994}>1994 ({language === 'pt' ? 'Início Real' : 'Real Inception'})</option>
              <option value={2000}>2000</option>
              <option value={2010}>2010</option>
            </select>
          </div>
          <div className="space-y-1 font-mono-custom text-xs">
            <div className="flex justify-between py-1 border-b border-[#191919]/15">
              <span className="text-[#555]">{language === 'pt' ? 'Preço nominal:' : 'Nominal price:'}</span>
              <span className="font-bold">R$ {priceA.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#191919]/15">
              <span className="text-[#555]">{language === 'pt' ? 'Salário Mínimo:' : 'Minimum Wage:'}</span>
              <span>R$ {wageA.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#555]">{language === 'pt' ? 'Impacto no Salário:' : 'Wage Impact:'}</span>
              <span className="font-bold text-[#236a47]">{pctWageA.toFixed(1)}%</span>
            </div>
          </div>
        </div>

        <div className="border border-[#191919] p-4 bg-white/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono-custom uppercase font-semibold text-[#191919]">
              {language === 'pt' ? 'Ano Comparado' : 'Comparison Year'}
            </span>
            <select
              value={yearB}
              onChange={(e) => setYearB(Number(e.target.value) as 2024 | 2026)}
              aria-label={language === 'pt' ? 'Ano Comparado' : 'Comparison Year'}
              className="font-mono-custom text-xs border border-[#191919] bg-[#f8f6ec] px-2 py-1"
            >
              <option value={2024}>2024 (R$ 1.412)</option>
              <option value={2026}>2026 (R$ 1.518)</option>
            </select>
          </div>
          <div className="space-y-1 font-mono-custom text-xs">
            <div className="flex justify-between py-1 border-b border-[#191919]/15">
              <span className="text-[#555]">{language === 'pt' ? 'Preço nominal:' : 'Nominal price:'}</span>
              <span className="font-bold">R$ {priceB.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#191919]/15">
              <span className="text-[#555]">{language === 'pt' ? 'Salário Mínimo:' : 'Minimum Wage:'}</span>
              <span>R$ {wageB.toFixed(2)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#555]">{language === 'pt' ? 'Impacto no Salário:' : 'Wage Impact:'}</span>
              <span className="font-bold text-[#236a47]">{pctWageB.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#191919] pt-4">
        <div className="p-3 border border-[#191919] bg-white/80">
          <span className="block text-[11px] font-mono-custom uppercase text-[#666] mb-1">
            {language === 'pt' ? 'Tempo de Trabalho' : 'Labor Time Required'}
          </span>
          <div className="font-syne text-xl font-bold text-[#191919]">
            {hoursA.toFixed(0)}h <span className="text-xs font-mono-custom text-[#666]">→</span> {hoursB.toFixed(0)}h
          </div>
          <span className="text-[10px] font-mono-custom text-[#236a47] block mt-1">
            {hoursB < hoursA
              ? `${language === 'pt' ? 'Economia de' : 'Savings of'} ${(hoursA - hoursB).toFixed(0)} ${language === 'pt' ? 'horas' : 'hours'}`
              : `${language === 'pt' ? 'Aumento de' : 'Increase of'} ${(hoursB - hoursA).toFixed(0)} ${language === 'pt' ? 'horas' : 'hours'}`}
          </span>
        </div>

        <div className="p-3 border border-[#191919] bg-white/80">
          <span className="block text-[11px] font-mono-custom uppercase text-[#666] mb-1">
            {language === 'pt' ? 'Unidades por Salário' : 'Units per Minimum Wage'}
          </span>
          <div className="font-syne text-xl font-bold text-[#191919]">
            {unitsA.toFixed(1)} un <span className="text-xs font-mono-custom text-[#666]">→</span> {unitsB.toFixed(1)} un
          </div>
          <span className="text-[10px] font-mono-custom text-[#236a47] block mt-1">
            {unitsB >= unitsA
              ? `+${(((unitsB - unitsA) / unitsA) * 100).toFixed(0)}% ${language === 'pt' ? 'poder de compra' : 'purchasing power'}`
              : `-${(((unitsA - unitsB) / unitsA) * 100).toFixed(0)}% ${language === 'pt' ? 'poder de compra' : 'purchasing power'}`}
          </span>
        </div>

        <div className="p-3 border border-[#191919] bg-white/80">
          <span className="block text-[11px] font-mono-custom uppercase text-[#666] mb-1">
            {language === 'pt' ? 'Correção pelo IPCA' : 'IPCA Inflation Adjusted'}
          </span>
          <div className="font-syne text-xl font-bold text-[#191919]">
            R$ {priceACorrected.toFixed(2)}
          </div>
          <span
            className={`text-[10px] font-mono-custom block mt-1 ${
              diffVsIpca > 0 ? 'text-[#8b261e]' : 'text-[#236a47]'
            }`}
          >
            {diffVsIpca > 0
              ? `+${diffVsIpca.toFixed(1)}% ${language === 'pt' ? 'acima da inflação oficial' : 'above official inflation'}`
              : `${Math.abs(diffVsIpca).toFixed(1)}% ${language === 'pt' ? 'abaixo da inflação' : 'below official inflation'}`}
          </span>
        </div>
      </div>
    </div>
  );
}
