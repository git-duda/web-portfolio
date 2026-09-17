import React, { useState } from 'react';

interface HistoryPoint {
  year: number;
  wage: number;
  ipcaAcc: number;
  purchasingPowerIndex: number; // 1994 base = 100
}

const HISTORICAL_DATA: HistoryPoint[] = [
  { year: 1994, wage: 64.79, ipcaAcc: 100, purchasingPowerIndex: 100 },
  { year: 1998, wage: 130.0, ipcaAcc: 147, purchasingPowerIndex: 136 },
  { year: 2002, wage: 200.0, ipcaAcc: 192, purchasingPowerIndex: 160 },
  { year: 2006, wage: 350.0, ipcaAcc: 254, purchasingPowerIndex: 212 },
  { year: 2010, wage: 510.0, ipcaAcc: 308, purchasingPowerIndex: 255 },
  { year: 2014, wage: 724.0, ipcaAcc: 395, purchasingPowerIndex: 282 },
  { year: 2018, wage: 954.0, ipcaAcc: 510, purchasingPowerIndex: 288 },
  { year: 2022, wage: 1212.0, ipcaAcc: 662, purchasingPowerIndex: 282 },
  { year: 2024, wage: 1412.0, ipcaAcc: 745, purchasingPowerIndex: 295 },
  { year: 2026, wage: 1518.0, ipcaAcc: 805, purchasingPowerIndex: 304 },
];

export function EvolucaoHistoricaChart() {
  const [activeMetric, setActiveMetric] = useState<'purchasingPower' | 'wage' | 'ipca'>('purchasingPower');
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);

  // Dimensions
  const width = 640;
  const height = 240;
  const padLeft = 45;
  const padRight = 25;
  const padTop = 25;
  const padBottom = 35;

  const minYear = 1994;
  const maxYear = 2026;

  // Metric bounds
  const getVal = (d: HistoryPoint) => {
    if (activeMetric === 'purchasingPower') return d.purchasingPowerIndex;
    if (activeMetric === 'wage') return d.wage;
    return d.ipcaAcc;
  };

  const currentValues = HISTORICAL_DATA.map(getVal);
  const minVal = Math.min(...currentValues) * 0.9;
  const maxVal = Math.max(...currentValues) * 1.05;

  const getX = (year: number) => padLeft + ((year - minYear) / (maxYear - minYear)) * (width - padLeft - padRight);
  const getY = (val: number) => height - padBottom - ((val - minVal) / (maxVal - minVal)) * (height - padTop - padBottom);

  const pointsString = HISTORICAL_DATA.map((d) => `${getX(d.year)},${getY(getVal(d))}`).join(' ');

  const areaPoints = `${getX(minYear)},${height - padBottom} ${pointsString} ${getX(maxYear)},${height - padBottom}`;

  const hoveredData = HISTORICAL_DATA.find((d) => d.year === hoveredYear);

  return (
    <div className="border border-[#191919] bg-[#f8f6ec] p-5 mb-6">
<p className="font-mono-custom text-xs text-[#555] mb-3">Demonstração interativa com valores ilustrativos.</p>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#191919] pb-3 mb-4">
        <div>
          <span className="font-mono-custom text-[11px] uppercase tracking-widest text-[#236a47] block">
            Série Temporal (1994 — 2026)
          </span>
          <h4 className="font-syne font-bold text-base text-[#191919]">
            Evolução Histórica Comparada
          </h4>
        </div>

        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setActiveMetric('purchasingPower')}
            className={`px-2.5 py-1 text-xs font-mono-custom border transition-colors ${
              activeMetric === 'purchasingPower'
                ? 'bg-[#191919] text-white border-[#191919]'
                : 'bg-white/60 text-[#191919] border-[#191919]/40 hover:border-[#191919]'
            }`}
          >
            Poder de Compra
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('wage')}
            className={`px-2.5 py-1 text-xs font-mono-custom border transition-colors ${
              activeMetric === 'wage'
                ? 'bg-[#191919] text-white border-[#191919]'
                : 'bg-white/60 text-[#191919] border-[#191919]/40 hover:border-[#191919]'
            }`}
          >
            Salário (R$)
          </button>
          <button
            type="button"
            onClick={() => setActiveMetric('ipca')}
            className={`px-2.5 py-1 text-xs font-mono-custom border transition-colors ${
              activeMetric === 'ipca'
                ? 'bg-[#191919] text-white border-[#191919]'
                : 'bg-white/60 text-[#191919] border-[#191919]/40 hover:border-[#191919]'
            }`}
          >
            IPCA Base
          </button>
        </div>
      </div>
      <div className="relative bg-white/50 border border-[#191919]/30 p-2">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto block select-none">
          {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
            const y = padTop + ratio * (height - padTop - padBottom);
            const val = maxVal - ratio * (maxVal - minVal);
            return (
              <g key={ratio} stroke="#191919" opacity="0.1">
                <line x1={padLeft} y1={y} x2={width - padRight} y2={y} />
                <text
                  x={padLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                  fill="#191919"
                  opacity="0.7"
                >
                  {activeMetric === 'wage' ? `R$${val.toFixed(0)}` : val.toFixed(0)}
                </text>
              </g>
            );
          })}
          <polygon points={areaPoints} fill="#236a47" opacity="0.1" />
          <polyline
            points={pointsString}
            fill="none"
            stroke="#236a47"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {HISTORICAL_DATA.map((d) => {
            const cx = getX(d.year);
            const cy = getY(getVal(d));
            const isHovered = hoveredYear === d.year;

            return (
              <g key={d.year} className="cursor-pointer" onMouseEnter={() => setHoveredYear(d.year)}>
                <circle cx={cx} cy={cy} r={isHovered ? 6 : 3.5} fill="#236a47" stroke="#ffffff" strokeWidth="1.5" />
                <text
                  x={cx}
                  y={height - padBottom + 16}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                  fill="#191919"
                >
                  {d.year}
                </text>
              </g>
            );
          })}
        </svg>

        {hoveredData && (
          <div className="absolute top-4 right-4 bg-[#191919] text-white p-2.5 text-xs font-mono-custom shadow-md border border-[#f8f6ec]">
            <div className="font-bold text-[#3cb371]">{hoveredData.year}</div>
            <div>Salário: R$ {hoveredData.wage.toFixed(2)}</div>
            <div>Índice Poder Compra: {hoveredData.purchasingPowerIndex}</div>
            <div>IPCA Acumulado: {hoveredData.ipcaAcc} pts</div>
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] font-mono-custom text-[#555]">
        <span>Passe o cursor sobre os pontos para conferir os indicadores.</span>
        <button
          type="button"
          onClick={() => setShowTable(!showTable)}
          className="underline hover:text-[#191919]"
        >
          {showTable ? 'Ocultar tabela histórica' : 'Exibir tabela histórica'}
        </button>
      </div>

      {showTable && (
        <div className="mt-4 border border-[#191919] overflow-x-auto">
          <table className="w-full text-xs font-mono-custom text-left border-collapse">
            <thead>
              <tr className="bg-[#191919] text-white">
                <th className="p-2 border-r border-white/20">Ano</th>
                <th className="p-2 border-r border-white/20">Salário Mínimo</th>
                <th className="p-2 border-r border-white/20">IPCA Acumulado</th>
                <th className="p-2">Índice de Poder (Base 100)</th>
              </tr>
            </thead>
            <tbody>
              {HISTORICAL_DATA.map((row) => (
                <tr key={row.year} className="border-t border-[#191919]/20 hover:bg-white/60">
                  <td className="p-2 border-r border-[#191919]/20 font-bold">{row.year}</td>
                  <td className="p-2 border-r border-[#191919]/20">R$ {row.wage.toFixed(2)}</td>
                  <td className="p-2 border-r border-[#191919]/20">{row.ipcaAcc} pts</td>
                  <td className="p-2 font-semibold text-[#236a47]">{row.purchasingPowerIndex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
