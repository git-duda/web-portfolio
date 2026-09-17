import React from 'react';

export function LaptopGraphic({ className = '' }: { className?: string }) {
  return (
    <div className={`relative w-full overflow-hidden bg-[#e8e4d8] border border-[#191919] ${className}`}>
      <svg
        viewBox="0 0 1000 680"
        className="w-full h-auto block select-none"
        aria-label="Notebook com visualização de dados em uma composição editorial em preto e branco."
        role="img"
      >
        <defs>
          <linearGradient id="desk-light" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4f1e8" />
            <stop offset="50%" stopColor="#e3dfd3" />
            <stop offset="100%" stopColor="#cfcbbe" />
          </linearGradient>

          <linearGradient id="wall-light" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ece8dc" />
            <stop offset="100%" stopColor="#d1cdc0" />
          </linearGradient>
          <linearGradient id="window-shadow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#191919" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#191919" stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="screen-glare" x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="70%" stopColor="#f7f6f1" />
            <stop offset="100%" stopColor="#eceae1" />
          </linearGradient>

          <linearGradient id="laptop-metal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d8d5cc" />
            <stop offset="50%" stopColor="#f0ede5" />
            <stop offset="100%" stopColor="#b8b5ab" />
          </linearGradient>

          <linearGradient id="laptop-base" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c5c2b8" />
            <stop offset="50%" stopColor="#9a978e" />
            <stop offset="100%" stopColor="#5a5852" />
          </linearGradient>
        </defs>
        <rect width="1000" height="380" fill="url(#wall-light)" />
        <polygon points="0,350 1000,320 1000,680 0,680" fill="url(#desk-light)" />
        <polygon points="400,0 680,0 350,680 120,680" fill="url(#window-shadow)" />
        <polygon points="760,0 950,0 720,680 540,680" fill="url(#window-shadow)" />
        <g id="plant-composition" transform="translate(10, 80)">
          <ellipse cx="60" cy="420" rx="45" ry="18" fill="#1e1d1b" opacity="0.3" />
          <path d="M 25 240 L 95 240 L 88 420 L 32 420 Z" fill="#b0aba0" />
          <ellipse cx="60" cy="240" rx="35" ry="10" fill="#989389" />
          <ellipse cx="60" cy="240" rx="31" ry="8" fill="#58544d" />
          <path d="M 50 242 L 46 418" stroke="#d5d0c5" strokeWidth="6" opacity="0.6" />
          <path d="M 80 242 L 78 418" stroke="#48443e" strokeWidth="8" opacity="0.4" />
          <path d="M 60 240 Q 75 140 120 40" stroke="#252422" strokeWidth="4.5" fill="none" strokeLinecap="round" />
          <path d="M 60 240 Q 40 160 30 70" stroke="#252422" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 60 240 Q 100 180 160 110" stroke="#252422" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M 120 40 Q 145 35 150 55 Q 130 65 120 40 Z" fill="#2d2b27" />
          <path d="M 105 75 Q 135 70 142 90 Q 115 100 105 75 Z" fill="#3a3833" />
          <path d="M 85 110 Q 115 105 120 125 Q 95 135 85 110 Z" fill="#2d2b27" />
          <path d="M 30 70 Q 10 65 5 85 Q 25 95 30 70 Z" fill="#35332e" />
          <path d="M 38 105 Q 12 100 8 120 Q 32 130 38 105 Z" fill="#44413b" />
          <path d="M 45 145 Q 20 140 18 160 Q 40 170 45 145 Z" fill="#2d2b27" />
          <path d="M 155 115 Q 185 115 190 135 Q 165 145 155 115 Z" fill="#383631" />
        </g>
        <g id="mug" transform="translate(900, 360)">
          <ellipse cx="40" cy="200" rx="55" ry="16" fill="#141312" opacity="0.35" />
          <path d="M 0 40 L 80 40 L 75 195 L 5 195 Z" fill="#22201e" />
          <ellipse cx="40" cy="40" rx="40" ry="10" fill="#3d3b37" />
          <ellipse cx="40" cy="40" rx="35" ry="8" fill="#181716" />
          <path d="M 20 42 L 22 193" stroke="#4a4742" strokeWidth="6" opacity="0.5" />
        </g>
        <g id="pen" transform="translate(420, 580) rotate(-18)">
          <rect x="0" y="0" width="130" height="7" rx="3.5" fill="#191919" />
          <polygon points="130,1 145,3.5 130,6" fill="#757269" />
          <circle cx="145" cy="3.5" r="1" fill="#191919" />
          <ellipse cx="70" cy="16" rx="65" ry="3" fill="#191919" opacity="0.25" />
        </g>
        <g id="bowl" transform="translate(440, 485)">
          <ellipse cx="30" cy="22" rx="35" ry="12" fill="#191919" opacity="0.35" />
          <path d="M 0 10 Q 30 35 60 10 Q 55 0 30 0 Q 5 0 0 10 Z" fill="#252422" />
          <ellipse cx="30" cy="8" rx="28" ry="7" fill="#3a3834" />
          <ellipse cx="30" cy="8" rx="24" ry="5.5" fill="#1a1918" />
        </g>
        <g id="laptop">
          <polygon points="340,540 820,530 890,560 360,600" fill="#141312" opacity="0.3" />
          <polygon points="360,510 790,500 860,545 400,580" fill="url(#laptop-metal)" />
          <polygon points="400,580 860,545 860,553 400,588" fill="url(#laptop-base)" />
          <polygon points="360,510 400,580 400,588 360,518" fill="#7d7a71" />
          <polygon points="560,535 700,523 725,548 580,562" fill="#dfdcd3" stroke="#b0aca0" strokeWidth="1" />
          <polygon points="410,515 765,505 785,530 425,542" fill="#1f1e1d" />
          <line x1="430" y1="520" x2="760" y2="510" stroke="#33312e" strokeWidth="2" />
          <line x1="428" y1="526" x2="768" y2="516" stroke="#33312e" strokeWidth="2" />
          <line x1="425" y1="532" x2="778" y2="522" stroke="#33312e" strokeWidth="2" />
          <line x1="422" y1="538" x2="782" y2="528" stroke="#33312e" strokeWidth="2" />
          <polygon points="340,165 795,140 830,512 375,528" fill="#1a1918" />
          <polygon points="338,162 797,137 799,141 340,166" fill="#d2cec4" />
          <polygon points="348,172 787,148 820,502 381,518" fill="#0d0d0c" />
          <circle cx="567" cy="160" r="2" fill="#2d2c2a" />
          <polygon points="360,182 775,158 808,492 393,508" fill="url(#screen-glare)" />
          <g opacity="0.25" stroke="#191919" strokeWidth="1">
            <line x1="380" y1="230" x2="785" y2="208" strokeDasharray="3 3" />
            <line x1="385" y1="290" x2="790" y2="268" strokeDasharray="3 3" />
            <line x1="390" y1="350" x2="795" y2="328" strokeDasharray="3 3" />
            <line x1="395" y1="410" x2="800" y2="388" strokeDasharray="3 3" />
            <line x1="400" y1="470" x2="805" y2="448" />
          </g>
          <polygon
            points="
              400,470
              400,455
              430,450
              460,430
              490,442
              520,395
              550,380
              580,410
              610,360
              640,345
              670,360
              700,300
              730,270
              760,290
              785,185
              785,455
            "
            fill="#236a47"
            opacity="0.1"
          />
          <path
            d="
              M 400 455
              C 415 455, 420 445, 430 450
              C 445 455, 450 435, 465 430
              C 480 425, 485 448, 500 440
              C 512 435, 515 400, 530 395
              C 545 390, 545 385, 560 380
              C 575 375, 575 415, 595 405
              C 610 398, 620 365, 635 360
              C 648 355, 655 350, 668 345
              C 680 340, 685 365, 700 358
              C 715 350, 720 310, 735 295
              C 748 285, 755 275, 768 285
              C 778 292, 782 230, 785 185
            "
            fill="none"
            stroke="#236a47"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="785" cy="185" r="4.5" fill="#236a47" />
          <circle cx="785" cy="185" r="8" fill="#236a47" opacity="0.3" />
          <polygon points="360,182 520,172 390,360 360,330" fill="#ffffff" opacity="0.15" />
        </g>
      </svg>
    </div>
  );
}
