import React, { useState } from 'react';
import { LaptopGraphic } from './LaptopGraphic';
import { QuantoValiaInteractive } from './QuantoValiaInteractive';
import { EvolucaoHistoricaChart } from './EvolucaoHistoricaChart';
import { ProgressoCargasDashboard } from './ProgressoCargasDashboard';
import { useLanguage } from '../context/LanguageContext';

export function WorkSection() {
  const { language } = useLanguage();
  const [openArticle1, setOpenArticle1] = useState<boolean>(false);
  const [openArticle2, setOpenArticle2] = useState<boolean>(false);

  return (
    <section className="work border-b border-[#191919] bg-[#f8f6ec]" aria-label={language === 'pt' ? 'Habilidades em prática' : 'Skills in practice'}>
      <article className="skill border-b border-[#191919]">
        <details
          className="explore-details group"
          open={openArticle1}
          onToggle={(e) => setOpenArticle1((e.target as HTMLDetailsElement).open)}
        >
          <summary className="p-6 md:p-8 cursor-pointer select-none border-b border-transparent group-open:border-[#191919] transition-colors hover:bg-black/[0.02]">
            <figure className="cover chart-cover border border-[#191919] bg-[#f8f6ec] p-4 sm:p-6 mb-6">
              <div className="chart-top flex items-start justify-between border-b border-[#191919] pb-3 mb-4 font-mono-custom text-xs uppercase tracking-wider">
                <span className="font-bold leading-tight">
                  {language === 'pt' ? <>INDICADORES<br />DE EFETIVIDADE</> : <>EFFECTIVENESS<br />INDICATORS</>}
                </span>
                <span className="chart-no font-syne text-2xl font-black text-[#191919]">01</span>
              </div>

              <div className="py-2">
                <svg
                  viewBox="0 0 640 290"
                  role="img"
                  aria-label={language === 'pt' ? 'Visualização ilustrativa de indicadores' : 'Illustrative indicator visualization'}
                  className="w-full h-auto block select-none"
                >
                  <g stroke="currentColor" opacity=".14">
                    <path d="M20 60H620M20 120H620M20 180H620M20 240H620" />
                  </g>
                  <g fill="currentColor" opacity=".24">
                    <path d="M32 240V200h30v40zM95 240V172h30v68zM158 240V184h30v56zM221 240V128h30v112zM284 240V142h30v98zM347 240V91h30v149zM410 240V110h30v130zM473 240V58h30v182zM536 240V72h30v168z" />
                  </g>
                  <path
                    d="M47 192L110 169L173 181L236 119L299 137L362 79L425 97L488 44L551 53L603 26"
                    fill="none"
                    stroke="#3cb371"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <figcaption className="text-right font-mono-custom text-[10px] tracking-widest uppercase text-[#555] border-t border-[#191919]/20 pt-2 mt-2">
                {language === 'pt' ? 'VISUALIZAÇÃO ILUSTRATIVA' : 'ILLUSTRATIVE VISUALIZATION'}
              </figcaption>
            </figure>

            <div className="caption flex items-end justify-between gap-4">
              <div>
                <h2 className="font-syne font-bold text-2xl md:text-3xl text-[#191919] tracking-tight">
                  {language === 'pt' ? '01 — Clareza para decidir' : '01 — Clarity to decide'}
                </h2>
                <p className="font-mono-custom text-xs md:text-sm text-[#555] mt-1">
                  {language === 'pt' ? 'Dashboards e indicadores de negócio' : 'Dashboards and business metrics'}
                </p>
              </div>
              <span
                className="arrow font-mono-custom text-2xl md:text-3xl text-[#191919] transition-transform duration-200 group-open:rotate-45"
                aria-hidden="true"
              >
                ↗
              </span>
            </div>
          </summary>

          <div className="detail example-content p-6 md:p-8 bg-[#f8f6ec] space-y-6">
            <h3 className="example-title font-syne font-bold text-xl md:text-2xl text-[#191919]">
              {language === 'pt' ? 'Progresso das cargas' : 'Workload progress'}
            </h3>
            <ProgressoCargasDashboard />

            <p className="project-intro font-mono-custom text-sm text-[#191919] leading-relaxed mb-4 font-medium">
              {language === 'pt'
                ? 'Uma leitura do progresso das cargas, reunindo volume de alertas, evolução por monitoramento e prazo de entrega.'
                : 'A strategic view of workload progress, aggregating regulatory alert volumes, surveillance pipelines, and delivery SLAs.'}
            </p>

            <div className="space-y-4 font-sans text-sm md:text-base text-[#191919]/90">
              <div>
                <h4 className="font-mono-custom font-bold text-xs uppercase tracking-widest text-[#236a47] mb-1">
                  {language === 'pt' ? 'O problema' : 'The problem'}
                </h4>
                <p className="leading-relaxed">
                  {language === 'pt'
                    ? 'Enxergar como diferentes frentes de trabalho avançam ao longo de um mesmo prazo, sem depender de números isolados.'
                    : 'Gaining end-to-end visibility into how distinct operational workstreams advance across a single deadline without relying on fragmented data.'}
                </p>
              </div>

              <div>
                <h4 className="font-mono-custom font-bold text-xs uppercase tracking-widest text-[#236a47] mb-1">
                  {language === 'pt' ? 'A solução' : 'The solution'}
                </h4>
                <p className="leading-relaxed">
                  {language === 'pt'
                    ? 'Um gráfico de linhas compara as cargas por tipo de monitoramento. A marcação do prazo final e os valores exibidos ao passar o cursor ajudam a acompanhar a evolução dos alertas.'
                    : 'A multi-series chart benchmarks workloads by surveillance type. Deadline indicators and interactive hover values help continuously monitor alert resolutions.'}
                </p>
              </div>

              <div>
                <h4 className="font-mono-custom font-bold text-xs uppercase tracking-widest text-[#236a47] mb-2">
                  {language === 'pt' ? 'Habilidades em prática' : 'Skills in practice'}
                </h4>
                <ul className="list-disc list-inside space-y-1 pl-1 font-mono-custom text-xs md:text-sm text-[#191919]/85">
                  <li>{language === 'pt' ? 'Definição e organização de indicadores.' : 'Definition and tracking of operational metrics.'}</li>
                  <li>{language === 'pt' ? 'Visualização comparativa de séries ao longo do tempo.' : 'Comparative longitudinal time-series visualization.'}</li>
                  <li>{language === 'pt' ? 'Comunicação visual de progresso e prazos.' : 'Visual communication of progress against regulatory SLAs.'}</li>
                </ul>
              </div>

              <p className="leading-relaxed pt-2">
                {language === 'pt'
                  ? 'O dashboard também organiza visões diária, mensal, anual e de produtividade, com indicadores de efetividade e qualidade.'
                  : 'The dashboard also organizes daily, monthly, annual, and productivity views with effectiveness and quality ratios.'}
              </p>

              <p className="case-note font-mono-custom text-xs text-[#666] italic">
                {language === 'pt'
                  ? 'A versão demonstrativa utiliza dados locais predefinidos.'
                  : 'Demonstration version leverages pre-configured local simulation data.'}
              </p>
              <a className="text-link inline-flex items-center gap-1 font-mono-custom text-xs uppercase tracking-wider font-bold border-b border-[#191919] pb-0.5 hover:text-[#236a47] hover:border-[#236a47] transition-colors" href="https://github.com/git-duda/control-dashboard" target="_blank" rel="noopener noreferrer">
                {language === 'pt' ? 'Conhecer o projeto no GitHub ↗' : 'Explore the project on GitHub ↗'}
              </a>
            </div>
          </div>
        </details>
      </article>
      <article className="skill last:border-b-0">
        <details
          className="explore-details group"
          open={openArticle2}
          onToggle={(e) => setOpenArticle2((e.target as HTMLDetailsElement).open)}
        >
          <summary className="p-6 md:p-8 cursor-pointer select-none border-b border-transparent group-open:border-[#191919] transition-colors hover:bg-black/[0.02]">
            <figure className="cover chart-cover border border-[#191919] bg-[#f8f6ec] p-4 sm:p-6 mb-6">
              <div className="chart-top flex items-start justify-between border-b border-[#191919] pb-3 mb-4 font-mono-custom text-xs uppercase tracking-wider">
                <span className="font-bold leading-tight">
                  {language === 'pt' ? <>QUANTO VALIA?<br />PODER DE COMPRA</> : <>WHAT WAS IT WORTH?<br />PURCHASING POWER</>}
                </span>
                <span className="chart-no font-syne text-2xl font-black text-[#191919]">02</span>
              </div>

              <div className="py-2">
                <LaptopGraphic />
              </div>

              <figcaption className="text-right font-mono-custom text-[10px] tracking-widest uppercase text-[#555] border-t border-[#191919]/20 pt-2 mt-2">
                {language === 'pt' ? 'SIMULADOR HISTÓRICO & IPCA' : 'HISTORICAL SIMULATOR & IPCA'}
              </figcaption>
            </figure>

            <div className="caption flex items-end justify-between gap-4">
              <div>
                <h2 className="font-syne font-bold text-2xl md:text-3xl text-[#191919] tracking-tight">
                  {language === 'pt' ? '02 — Dados que contam histórias' : '02 — Data that tells stories'}
                </h2>
                <p className="font-mono-custom text-xs md:text-sm text-[#555] mt-1">
                  {language === 'pt' ? 'Análise e visualização de dados' : 'Data analysis and visualization'}
                </p>
              </div>
              <span
                className="arrow font-mono-custom text-2xl md:text-3xl text-[#191919] transition-transform duration-200 group-open:rotate-45"
                aria-hidden="true"
              >
                ↗
              </span>
            </div>
          </summary>

          <div className="detail example-content p-6 md:p-8 bg-[#f8f6ec] space-y-12">
            <div className="example-section border-b border-[#191919]/30 pb-10">
              <h3 className="example-title font-syne font-bold text-xl md:text-2xl text-[#191919] mb-4">
                {language === 'pt' ? 'Comparação de poder de compra' : 'Purchasing power comparison'}
              </h3>
              <QuantoValiaInteractive />

              <p className="project-intro font-mono-custom text-sm text-[#191919] leading-relaxed mb-6 font-medium">
                {language === 'pt'
                  ? 'Comparar preços fica mais significativo quando eles são relacionados ao salário mínimo, à inflação e ao tempo de trabalho.'
                  : 'Comparing prices becomes substantially more insightful when indexed against the minimum wage, official inflation, and required labor hours.'}
              </p>

              <div className="space-y-4 font-sans text-sm md:text-base text-[#191919]/90">
                <div>
                  <h4 className="font-mono-custom font-bold text-xs uppercase tracking-widest text-[#236a47] mb-1">
                    {language === 'pt' ? 'O problema' : 'The problem'}
                  </h4>
                  <p className="leading-relaxed">
                    {language === 'pt'
                      ? 'Um preço nominal não mostra, sozinho, quanto um produto pesa no orçamento ou como seu acesso mudou ao longo dos anos.'
                      : 'A nominal price alone cannot reflect how much a good weighs on the household budget or how access has evolved across economic eras.'}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono-custom font-bold text-xs uppercase tracking-widest text-[#236a47] mb-1">
                    {language === 'pt' ? 'A solução' : 'The solution'}
                  </h4>
                  <p className="leading-relaxed">
                    {language === 'pt'
                      ? 'A calculadora permite escolher produtos predefinidos ou informar preços para comparar dois anos. Apresenta o percentual do salário comprometido, unidades compráveis, tempo de trabalho e comparação com a correção pelo IPCA.'
                      : 'The interactive calculator enables selecting benchmark products or custom prices to compare any two years, computing wage commitment %, purchasable units, labor time, and IPCA inflation adjustments.'}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono-custom font-bold text-xs uppercase tracking-widest text-[#236a47] mb-2">
                    {language === 'pt' ? 'Habilidades em prática' : 'Skills in practice'}
                  </h4>
                  <ul className="list-disc list-inside space-y-1 pl-1 font-mono-custom text-xs md:text-sm text-[#191919]/85">
                    <li>{language === 'pt' ? 'Aplicação de conceitos econômicos a situações cotidianas.' : 'Application of economic concepts to everyday market situations.'}</li>
                    <li>{language === 'pt' ? 'Construção de indicadores comparativos.' : 'Construction of robust comparative macroeconomic indicators.'}</li>
                    <li>{language === 'pt' ? 'Organização de cálculos e apresentação de resultados.' : 'Systematic organization of calculations and clear presentation of findings.'}</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <a
                  className="text-link inline-flex items-center gap-1 font-mono-custom text-xs uppercase tracking-wider text-[#191919] font-bold border-b border-[#191919] pb-0.5 hover:text-[#236a47] hover:border-[#236a47] transition-colors"
                  href="https://github.com/git-duda/quanto-valia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {language === 'pt' ? 'Conhecer o projeto no GitHub ↗' : 'Explore the project on GitHub ↗'}
                </a>
              </div>
            </div>
            <div className="example-section">
              <h3 className="example-title font-syne font-bold text-xl md:text-2xl text-[#191919] mb-4">
                {language === 'pt' ? 'Evolução histórica' : 'Historical evolution'}
              </h3>
              <EvolucaoHistoricaChart />

              <p className="project-intro font-mono-custom text-sm text-[#191919] leading-relaxed mb-6 font-medium">
                {language === 'pt'
                  ? 'Além da comparação entre dois anos, a visão histórica ajuda a explorar como os indicadores se comportam ao longo do tempo.'
                  : 'Beyond bilateral year comparisons, longitudinal views reveal structural trends in purchasing power over three decades of the Real plan.'}
              </p>

              <div className="space-y-4 font-sans text-sm md:text-base text-[#191919]/90">
                <div>
                  <h4 className="font-mono-custom font-bold text-xs uppercase tracking-widest text-[#236a47] mb-1">
                    {language === 'pt' ? 'A solução' : 'The solution'}
                  </h4>
                  <p className="leading-relaxed">
                    {language === 'pt'
                      ? 'Gráficos e uma tabela histórica reúnem a evolução de indicadores como poder de compra, salário mínimo, inflação e participação do preço no salário.'
                      : 'Time series charts and historical data tables consolidate trends in purchasing power, minimum wage gains, cumulative inflation, and price burdens.'}
                  </p>
                </div>

                <div>
                  <h4 className="font-mono-custom font-bold text-xs uppercase tracking-widest text-[#236a47] mb-2">
                    {language === 'pt' ? 'Habilidades em prática' : 'Skills in practice'}
                  </h4>
                  <ul className="list-disc list-inside space-y-1 pl-1 font-mono-custom text-xs md:text-sm text-[#191919]/85">
                    <li>{language === 'pt' ? 'Organização de séries temporais.' : 'Organization and normalization of macroeconomic time series.'}</li>
                    <li>{language === 'pt' ? 'Seleção de visualizações adequadas à comparação.' : 'Selection of visual models tailored for multi-indicator comparisons.'}</li>
                    <li>{language === 'pt' ? 'Apresentação de diferentes perspectivas sobre os mesmos dados.' : 'Communication of diverse perspectives on complex public datasets.'}</li>
                  </ul>
                </div>

                <p className="case-note font-mono-custom text-xs text-[#666] italic pt-2">
                  {language === 'pt'
                    ? 'As séries são armazenadas no projeto; não há consulta a fontes em tempo real. As capturas mostram a versão compartilhada do aplicativo.'
                    : 'Time series data is consolidated locally in the project repository.'}
                </p>
              </div>

              <div className="mt-6">
                <a
                  className="text-link inline-flex items-center gap-1 font-mono-custom text-xs uppercase tracking-wider text-[#191919] font-bold border-b border-[#191919] pb-0.5 hover:text-[#236a47] hover:border-[#236a47] transition-colors"
                  href="https://github.com/git-duda/quanto-valia"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {language === 'pt' ? 'Explorar o código no GitHub ↗' : 'View code on GitHub ↗'}
                </a>
              </div>
            </div>
          </div>
        </details>
      </article>
    </section>
  );
}
