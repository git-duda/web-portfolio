import React, { useState } from 'react';

interface DayAlertData {
  day: number;
  bolsa: number;
  balcao: number;
  surveillance: number;
  cripto: number;
}

// 45-day simulated progression for the 4 monitoring streams
const DAYS_DATA: DayAlertData[] = [
  { day: 1, bolsa: 120, balcao: 80, surveillance: 160, cripto: 45 },
  { day: 5, bolsa: 340, balcao: 190, surveillance: 410, cripto: 110 },
  { day: 10, bolsa: 680, balcao: 420, surveillance: 890, cripto: 240 },
  { day: 15, bolsa: 1150, balcao: 690, surveillance: 1420, cripto: 480 },
  { day: 20, bolsa: 1780, balcao: 1040, surveillance: 2050, cripto: 780 },
  { day: 25, bolsa: 2420, balcao: 1510, surveillance: 2890, cripto: 1140 },
  { day: 30, bolsa: 3190, balcao: 2080, surveillance: 3820, cripto: 1590 },
  { day: 35, bolsa: 3950, balcao: 2710, surveillance: 4760, cripto: 2080 },
  { day: 40, bolsa: 4850, balcao: 3340, surveillance: 5690, cripto: 2620 },
  { day: 45, bolsa: 5620, balcao: 3980, surveillance: 6540, cripto: 3180 },
];

export function ProgressoCargasDashboard() {
  const [selectedStream, setSelectedStream] = useState<'all' | 'bolsa' | 'balcao' | 'surveillance' | 'cripto'>('all');
  const [hoveredDay, setHoveredDay] = useState<DayAlertData | null>(DAYS_DATA[DAYS_DATA.length - 1]);

  const width = 760;
  const height = 300;
  const padLeft = 55;
  const padRight = 35;
  const padTop = 30;
  const padBottom = 40;

  const maxAlerts = 7000;

  const getX = (day: number) => padLeft + ((day - 1) / (45 - 1)) * (width - padLeft - padRight);
  const getY = (val: number) => height - padBottom - (val / maxAlerts) * (height - padTop - padBottom);

  const streamsConfig = [
    { id: 'bolsa', name: 'Bolsa', color: '#191919', strokeWidth: 3 },
    { id: 'balcao', name: 'Balcão', color: '#236a47', strokeWidth: 3 },
    { id: 'surveillance', name: 'Trade Surveillance', color: '#63615e', strokeWidth: 2.5 },
    { id: 'cripto', name: 'Criptoativos', color: '#3cb371', strokeWidth: 2.5 },
  ];

  const getPolyline = (key: 'bolsa' | 'balcao' | 'surveillance' | 'cripto') => {
    return DAYS_DATA.map((d) => `${getX(d.day)},${getY(d[key])}`).join(' ');
  };

  const deadlineX = getX(45);

  return (
    <div className="border border-[#191919] bg-[#f8f6ec] p-5 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#191919] pb-4 mb-4">
        <div>
          <span className="font-mono-custom text-[11px] uppercase tracking-widest text-[#236a47] block">
            Monitoramento de Cargas — 45 Dias
          </span>
          <h4 className="font-heading font-bold text-lg text-[#191919]">
            Progresso das Cargas por Frente de Monitoramento
          </h4>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="p-3 border border-[#191919] bg-white/70">
          <span className="block text-[11px] font-mono-custom uppercase text-[#666]">Volume Total</span>
          <div className="font-heading text-xl font-bold text-[#191919]">19.320</div>
          <span className="text-[10px] font-mono-custom text-[#236a47]">alertas processados</span>
        </div>
        <div className="p-3 border border-[#191919] bg-white/70">
          <span className="block text-[11px] font-mono-custom uppercase text-[#666]">Efetividade</span>
          <div className="font-heading text-xl font-bold text-[#236a47]">97.8%</div>
          <span className="text-[10px] font-mono-custom text-[#555]">dentro dos padrões</span>
        </div>
        <div className="p-3 border border-[#191919] bg-white/70">
          <span className="block text-[11px] font-mono-custom uppercase text-[#666]">Prazo de Entrega</span>
          <div className="font-heading text-xl font-bold text-[#191919]">45 Dias</div>
          <span className="text-[10px] font-mono-custom text-[#236a47]">meta 100% atingida</span>
        </div>
        <div className="p-3 border border-[#191919] bg-white/70">
          <span className="block text-[11px] font-mono-custom uppercase text-[#666]">Frentes Ativas</span>
          <div className="font-heading text-xl font-bold text-[#191919]">4 Áreas</div>
          <span className="text-[10px] font-mono-custom text-[#555]">Bolsa, Balcão, Trade, Cripto</span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-mono-custom">
        <span className="text-[#666] uppercase text-[11px]">Filtrar frentes:</span>
        <button
          type="button"
          onClick={() => setSelectedStream('all')}
          className={`px-2 py-0.5 border ${
            selectedStream === 'all' ? 'bg-[#191919] text-white border-[#191919]' : 'bg-white/50 border-[#191919]/30'
          }`}
        >
          Todas
        </button>
        {streamsConfig.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSelectedStream(s.id as any)}
            className={`px-2 py-0.5 border flex items-center gap-1.5 ${
              selectedStream === s.id ? 'bg-[#191919] text-white border-[#191919]' : 'bg-white/50 border-[#191919]/30'
            }`}
          >
            <span className="w-2.5 h-2.5 inline-block" style={{ backgroundColor: s.color }} />
            {s.name}
          </button>
        ))}
      </div>
      <div className="relative bg-white/60 border border-[#191919]/30 p-3">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto block select-none">
          {[0, 1500, 3000, 4500, 6000, 7000].map((v) => {
            const y = getY(v);
            return (
              <g key={v} stroke="#191919" opacity="0.12">
                <line x1={padLeft} y1={y} x2={width - padRight} y2={y} />
                <text
                  x={padLeft - 8}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fontFamily="JetBrains Mono"
                  fill="#191919"
                  opacity="0.75"
                >
                  {v.toLocaleString('pt-BR')}
                </text>
              </g>
            );
          })}
          <g>
            <line
              x1={deadlineX}
              y1={padTop}
              x2={deadlineX}
              y2={height - padBottom}
              stroke="#236a47"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <text
              x={deadlineX}
              y={padTop - 8}
              textAnchor="end"
              fontSize="10"
              fontFamily="JetBrains Mono"
              fontWeight="bold"
              fill="#236a47"
            >
              PRAZO FINAL (45 DIAS)
            </text>
          </g>
          {streamsConfig.map((s) => {
            if (selectedStream !== 'all' && selectedStream !== s.id) return null;
            return (
              <g key={s.id}>
                <polyline
                  points={getPolyline(s.id as any)}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={s.strokeWidth}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {DAYS_DATA.map((d) => (
                  <circle
                    key={d.day}
                    cx={getX(d.day)}
                    cy={getY(d[s.id as keyof DayAlertData])}
                    r={hoveredDay?.day === d.day ? 5 : 3}
                    fill={s.color}
                    stroke="#ffffff"
                    strokeWidth="1.2"
                  />
                ))}
              </g>
            );
          })}
          {DAYS_DATA.map((d) => (
            <text
              key={d.day}
              x={getX(d.day)}
              y={height - padBottom + 18}
              textAnchor="middle"
              fontSize="9"
              fontFamily="JetBrains Mono"
              fill="#191919"
              opacity="0.8"
            >
              D{d.day}
            </text>
          ))}
          {DAYS_DATA.map((d) => {
            const x = getX(d.day);
            return (
              <rect
                key={d.day}
                x={x - 18}
                y={padTop}
                width={36}
                height={height - padTop - padBottom}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredDay(d)}
              />
            );
          })}
        </svg>
        {hoveredDay && (
          <div className="mt-3 p-3 bg-[#191919] text-white flex flex-wrap items-center justify-between gap-4 font-mono-custom text-xs">
            <span className="font-bold text-[#3cb371]">Progresso no Dia {hoveredDay.day}:</span>
            <div className="flex flex-wrap gap-4 text-[11px]">
              <span>Bolsa: <strong>{hoveredDay.bolsa.toLocaleString('pt-BR')}</strong></span>
              <span>Balcão: <strong>{hoveredDay.balcao.toLocaleString('pt-BR')}</strong></span>
              <span>Surveillance: <strong>{hoveredDay.surveillance.toLocaleString('pt-BR')}</strong></span>
              <span>Cripto: <strong>{hoveredDay.cripto.toLocaleString('pt-BR')}</strong></span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-2 text-[11px] font-mono-custom text-[#666]">
        Passe o cursor sobre os pontos para conferir o volume de alertas por monitoramento ao longo do prazo de 45 dias.
      </div>
    </div>
  );
}
