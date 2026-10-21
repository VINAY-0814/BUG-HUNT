import React from 'react';

interface BugHuntLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubtitle?: boolean;
  className?: string;
}

export const BugHuntLogo: React.FC<BugHuntLogoProps> = ({
  size = 'md',
  showSubtitle = false,
  className = '',
}) => {
  // Dimensions
  const dimensions = {
    sm: { width: 150, height: 44, scale: 0.28 },
    md: { width: 240, height: 72, scale: 0.45 },
    lg: { width: 360, height: 110, scale: 0.7 },
    hero: { width: 540, height: 165, scale: 1 },
  }[size];

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      <svg
        viewBox="0 0 540 165"
        width={dimensions.width}
        height={dimensions.height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
      >
        <defs>
          {/* Radar Background Glow */}
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#064e3b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#022c22" stopOpacity="0.95" />
          </radialGradient>

          {/* Lime Green "BUG" Gradients */}
          <linearGradient id="bugGreen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#bef264" />
            <stop offset="35%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#4d7c0f" />
          </linearGradient>

          <linearGradient id="bugGreenExtrude" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#365314" />
            <stop offset="100%" stopColor="#142605" />
          </linearGradient>

          {/* Fiery Terracotta Orange "HUNT!" Gradients */}
          <linearGradient id="huntOrange" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fed7aa" />
            <stop offset="20%" stopColor="#fb923c" />
            <stop offset="70%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#9a3412" />
          </linearGradient>

          <linearGradient id="huntOrangeExtrude" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7c2d12" />
            <stop offset="100%" stopColor="#431407" />
          </linearGradient>

          {/* Cyan Glow for Bug Net & Scanner */}
          <linearGradient id="cyanNet" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>

          {/* Iridescent Bug Wings */}
          <linearGradient id="wingGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>

          {/* Gold Outline Stroke Filter */}
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#fde047" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* ======================================================== */}
        {/* 1. BACKGROUND RADAR TARGET RETICLE & JUNGLE LEAVES       */}
        {/* ======================================================== */}
        <g transform="translate(195, 68)">
          {/* Radar Base Circle */}
          <circle cx="0" cy="0" r="76" fill="url(#radarGlow)" stroke="#10b981" strokeWidth="4" />
          <circle cx="0" cy="0" r="54" stroke="#10b981" strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
          <circle cx="0" cy="0" r="32" stroke="#34d399" strokeWidth="1.5" opacity="0.5" />
          <circle cx="0" cy="0" r="12" stroke="#6ee7b7" strokeWidth="2" fill="#047857" opacity="0.8" />
          
          {/* Crosshairs & Ticks */}
          <line x1="-76" y1="0" x2="76" y2="0" stroke="#34d399" strokeWidth="1.5" opacity="0.4" />
          <line x1="0" y1="-76" x2="0" y2="76" stroke="#34d399" strokeWidth="1.5" opacity="0.4" />
          
          {/* Radar sweep line */}
          <path d="M 0 0 L 52 -52" stroke="#6ee7b7" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          
          {/* Jungle Leaves Frame Behind Radar (Left & Top) */}
          <path d="M -80 -30 C -110 -50, -110 -10, -75 0 Z" fill="#15803d" stroke="#14532d" strokeWidth="2" />
          <path d="M -70 -55 C -95 -85, -60 -80, -50 -45 Z" fill="#22c55e" stroke="#166534" strokeWidth="2" />
          <path d="M -30 -80 C -40 -115, 0 -100, -15 -65 Z" fill="#16a34a" stroke="#14532d" strokeWidth="2" />
          <path d="M 40 -70 C 65 -95, 90 -65, 55 -45 Z" fill="#15803d" stroke="#14532d" strokeWidth="2" />
        </g>

        {/* ======================================================== */}
        {/* 2. THE CUTE GLOWING BUG (Sitting on top of "G")          */}
        {/* ======================================================== */}
        <g transform="translate(245, 12)">
          {/* Left Wing */}
          <ellipse cx="-18" cy="8" rx="16" ry="8" transform="rotate(-30, -18, 8)" fill="url(#wingGradient)" stroke="#fde047" strokeWidth="1.5" opacity="0.9" />
          {/* Right Wing */}
          <ellipse cx="18" cy="8" rx="16" ry="8" transform="rotate(30, 18, 8)" fill="url(#wingGradient)" stroke="#fde047" strokeWidth="1.5" opacity="0.9" />
          
          {/* Antennae */}
          <path d="M -4 -8 Q -12 -18 -16 -16" stroke="#38bdf8" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="-16" cy="-16" r="2.5" fill="#fde047" />
          <path d="M 4 -8 Q 12 -18 16 -16" stroke="#38bdf8" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="16" cy="-16" r="2.5" fill="#fde047" />

          {/* Chubby Bug Body */}
          <ellipse cx="0" cy="12" rx="14" ry="12" fill="#22c55e" stroke="#14532d" strokeWidth="2" />
          <ellipse cx="0" cy="12" rx="10" ry="7" fill="#84cc16" />
          <ellipse cx="0" cy="3" rx="11" ry="8" fill="#06b6d4" stroke="#083344" strokeWidth="1.5" />
          
          {/* Big Adorable Eyes */}
          <circle cx="-5" cy="2" r="4.5" fill="#1e1b4b" />
          <circle cx="-4" cy="0.5" r="1.8" fill="#ffffff" />
          <circle cx="-6" cy="3" r="0.8" fill="#ffffff" />

          <circle cx="5" cy="2" r="4.5" fill="#1e1b4b" />
          <circle cx="6" cy="0.5" r="1.8" fill="#ffffff" />
          <circle cx="4" cy="3" r="0.8" fill="#ffffff" />

          {/* Tiny Smiling Mouth */}
          <path d="M -2 7 Q 0 9 2 7" stroke="#083344" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>

        {/* ======================================================== */}
        {/* 3. "BUG" 3D LETTERS (Juicy, Bubbly Lime Green)           */}
        {/* ======================================================== */}
        <g id="bug-letters" transform="translate(130, 48)">
          {/* === LETTER B === */}
          {/* 3D Extrusion Shadow */}
          <path
            d="M 12 4 C 5 4, 0 10, 0 18 L 0 56 C 0 64, 6 68, 14 68 L 36 68 C 48 68, 56 60, 56 50 C 56 43, 52 38, 45 36 C 50 33, 53 28, 53 21 C 53 10, 44 4, 32 4 Z"
            fill="url(#bugGreenExtrude)"
            transform="translate(4, 8)"
          />
          {/* Front Face */}
          <path
            d="M 12 4 C 5 4, 0 10, 0 18 L 0 56 C 0 64, 6 68, 14 68 L 36 68 C 48 68, 56 60, 56 50 C 56 43, 52 38, 45 36 C 50 33, 53 28, 53 21 C 53 10, 44 4, 32 4 Z"
            fill="url(#bugGreen)"
            stroke="#fef08a"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* B Inner Cutouts */}
          <rect x="15" y="14" width="16" height="15" rx="5" fill="#365314" opacity="0.9" />
          <rect x="15" y="39" width="18" height="18" rx="6" fill="#365314" opacity="0.9" />
          {/* Spot Textures */}
          <circle cx="10" cy="28" r="3.5" fill="#4d7c0f" opacity="0.6" />
          <circle cx="38" cy="56" r="3" fill="#4d7c0f" opacity="0.6" />
          <circle cx="34" cy="12" r="2.5" fill="#bef264" opacity="0.8" />

          {/* === LETTER U === */}
          <g transform="translate(68, 0)">
            <path
              d="M 4 4 C 4 4, 0 10, 0 18 L 0 45 C 0 60, 12 68, 28 68 C 44 68, 56 60, 56 45 L 56 18 C 56 10, 52 4, 52 4 L 38 4 C 38 4, 40 10, 40 18 L 40 42 C 40 50, 35 53, 28 53 C 21 53, 16 50, 16 42 L 16 18 C 16 10, 18 4, 18 4 Z"
              fill="url(#bugGreenExtrude)"
              transform="translate(4, 8)"
            />
            <path
              d="M 4 4 C 4 4, 0 10, 0 18 L 0 45 C 0 60, 12 68, 28 68 C 44 68, 56 60, 56 45 L 56 18 C 56 10, 52 4, 52 4 L 38 4 C 38 4, 40 10, 40 18 L 40 42 C 40 50, 35 53, 28 53 C 21 53, 16 50, 16 42 L 16 18 C 16 10, 18 4, 18 4 Z"
              fill="url(#bugGreen)"
              stroke="#fef08a"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Spots */}
            <circle cx="8" cy="35" r="3.5" fill="#4d7c0f" opacity="0.6" />
            <circle cx="48" cy="32" r="3" fill="#4d7c0f" opacity="0.6" />
            <circle cx="28" cy="60" r="3.5" fill="#4d7c0f" opacity="0.6" />
          </g>

          {/* === LETTER G === */}
          <g transform="translate(136, 0)">
            <path
              d="M 52 20 C 52 8, 40 4, 28 4 C 12 4, 0 16, 0 36 C 0 56, 12 68, 30 68 C 46 68, 54 58, 54 44 L 54 36 L 28 36 L 28 48 L 38 48 L 38 52 C 36 55, 33 56, 29 56 C 20 56, 16 48, 16 36 C 16 24, 21 16, 29 16 C 36 16, 40 20, 40 24 Z"
              fill="url(#bugGreenExtrude)"
              transform="translate(4, 8)"
            />
            <path
              d="M 52 20 C 52 8, 40 4, 28 4 C 12 4, 0 16, 0 36 C 0 56, 12 68, 30 68 C 46 68, 54 58, 54 44 L 54 36 L 28 36 L 28 48 L 38 48 L 38 52 C 36 55, 33 56, 29 56 C 20 56, 16 48, 16 36 C 16 24, 21 16, 29 16 C 36 16, 40 20, 40 24 Z"
              fill="url(#bugGreen)"
              stroke="#fef08a"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Spots */}
            <circle cx="10" cy="22" r="3.5" fill="#4d7c0f" opacity="0.6" />
            <circle cx="10" cy="50" r="3.5" fill="#4d7c0f" opacity="0.6" />
            <circle cx="46" cy="46" r="3" fill="#bef264" opacity="0.8" />
          </g>
        </g>

        {/* ======================================================== */}
        {/* 4. "HUNT!" 3D LETTERS (Fiery Chunky Textured Terracotta)  */}
        {/* ======================================================== */}
        <g id="hunt-letters" transform="translate(100, 95)">
          {/* === LETTER H === */}
          <path
            d="M 0 0 L 16 0 L 16 20 L 34 20 L 34 0 L 50 0 L 50 56 L 34 56 L 34 34 L 16 34 L 16 56 L 0 56 Z"
            fill="url(#huntOrangeExtrude)"
            transform="translate(4, 8)"
          />
          <path
            d="M 0 0 L 16 0 L 16 20 L 34 20 L 34 0 L 50 0 L 50 56 L 34 56 L 34 34 L 16 34 L 16 56 L 0 56 Z"
            fill="url(#huntOrange)"
            stroke="#fef08a"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Stone Texture Cracks */}
          <path d="M 6 8 L 10 14 L 7 18" stroke="#7c2d12" strokeWidth="1.2" fill="none" />
          <path d="M 42 38 L 38 44 L 41 48" stroke="#7c2d12" strokeWidth="1.2" fill="none" />

          {/* === LETTER U === */}
          <g transform="translate(58, 0)">
            <path
              d="M 0 0 L 16 0 L 16 36 C 16 42, 20 44, 25 44 C 30 44, 34 42, 34 36 L 34 0 L 50 0 L 50 36 C 50 50, 39 56, 25 56 C 11 56, 0 50, 0 36 Z"
              fill="url(#huntOrangeExtrude)"
              transform="translate(4, 8)"
            />
            <path
              d="M 0 0 L 16 0 L 16 36 C 16 42, 20 44, 25 44 C 30 44, 34 42, 34 36 L 34 0 L 50 0 L 50 36 C 50 50, 39 56, 25 56 C 11 56, 0 50, 0 36 Z"
              fill="url(#huntOrange)"
              stroke="#fef08a"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path d="M 8 22 L 12 28" stroke="#7c2d12" strokeWidth="1.2" fill="none" />
          </g>

          {/* === LETTER N === */}
          <g transform="translate(116, 0)">
            <path
              d="M 0 0 L 15 0 L 34 32 L 34 0 L 49 0 L 49 56 L 34 56 L 15 24 L 15 56 L 0 56 Z"
              fill="url(#huntOrangeExtrude)"
              transform="translate(4, 8)"
            />
            <path
              d="M 0 0 L 15 0 L 34 32 L 34 0 L 49 0 L 49 56 L 34 56 L 15 24 L 15 56 L 0 56 Z"
              fill="url(#huntOrange)"
              stroke="#fef08a"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path d="M 22 24 L 26 30 L 23 34" stroke="#7c2d12" strokeWidth="1.2" fill="none" />
          </g>

          {/* === LETTER T === */}
          <g transform="translate(173, 0)">
            <path
              d="M 0 0 L 48 0 L 48 15 L 32 15 L 32 56 L 16 56 L 16 15 L 0 15 Z"
              fill="url(#huntOrangeExtrude)"
              transform="translate(4, 8)"
            />
            <path
              d="M 0 0 L 48 0 L 48 15 L 32 15 L 32 56 L 16 56 L 16 15 L 0 15 Z"
              fill="url(#huntOrange)"
              stroke="#fef08a"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path d="M 24 28 L 20 34" stroke="#7c2d12" strokeWidth="1.2" fill="none" />
          </g>

          {/* === EXCLAMATION POINT ! === */}
          <g transform="translate(228, 0)">
            <path
              d="M 2 0 L 18 0 L 15 38 L 5 38 Z M 3 44 L 17 44 L 17 56 L 3 56 Z"
              fill="url(#huntOrangeExtrude)"
              transform="translate(4, 8)"
            />
            <path
              d="M 2 0 L 18 0 L 15 38 L 5 38 Z M 3 44 L 17 44 L 17 56 L 3 56 Z"
              fill="url(#huntOrange)"
              stroke="#fef08a"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </g>
        </g>

        {/* ======================================================== */}
        {/* 5. SAFARI EXPLORER BOY WITH FLASHLIGHT & GLOWING NET      */}
        {/* ======================================================== */}
        <g id="explorer-boy" transform="translate(382, 34)">
          {/* Flashlight Beam Cone */}
          <polygon points="-12,50 -90,75 -90,30" fill="#fef08a" opacity="0.35" />

          {/* Glowing Cyan Bug Net (Behind or held) */}
          <g transform="translate(35, -5)">
            {/* Pole */}
            <line x1="-12" y1="50" x2="16" y2="-8" stroke="#ca8a04" strokeWidth="4" strokeLinecap="round" />
            {/* Net Rim */}
            <ellipse cx="20" cy="-14" rx="18" ry="24" transform="rotate(25, 20, -14)" stroke="url(#cyanNet)" strokeWidth="4" fill="none" filter="url(#goldGlow)" />
            {/* Net Mesh Bag */}
            <path d="M 8 -24 Q 45 -4 28 14 Q 5 2 8 -24" fill="#06b6d4" opacity="0.35" />
            <path d="M 12 -18 Q 30 -6 20 6" stroke="#22d3ee" strokeWidth="1" strokeDasharray="2 2" fill="none" opacity="0.8" />
          </g>

          {/* Boy Body & Arm */}
          <rect x="-8" y="44" width="28" height="26" rx="6" fill="#a16207" stroke="#451a03" strokeWidth="2" />
          <rect x="-3" y="44" width="18" height="26" fill="#fef08a" />
          
          {/* Boy Head */}
          <ellipse cx="6" cy="30" rx="17" ry="16" fill="#fed7aa" stroke="#7c2d12" strokeWidth="1.8" />

          {/* Eyes (Determined, Friendly) */}
          <ellipse cx="2" cy="30" rx="4" ry="5" fill="#0f172a" />
          <circle cx="3" cy="28.5" r="1.5" fill="#ffffff" />
          
          <ellipse cx="14" cy="30" rx="4" ry="5" fill="#0f172a" />
          <circle cx="15" cy="28.5" r="1.5" fill="#ffffff" />

          {/* Smirk Smile */}
          <path d="M 4 39 Q 8 43 12 39" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" fill="none" />

          {/* Safari Pith Helmet */}
          <path d="M -18 20 C -18 6, 28 6, 28 20 Z" fill="#ca8a04" stroke="#451a03" strokeWidth="2" />
          <path d="M -22 20 Q 6 15 32 20 L 32 24 Q 6 19 -22 24 Z" fill="#a16207" stroke="#451a03" strokeWidth="1.5" />
          <rect x="-16" y="16" width="42" height="4" fill="#713f12" />

          {/* Left Hand Holding Flashlight */}
          <g transform="translate(-10, 48)">
            <rect x="-8" y="-3" width="12" height="6" rx="2" fill="#475569" />
            <circle cx="-8" cy="0" r="4" fill="#fef08a" />
            <circle cx="2" cy="0" r="4" fill="#fed7aa" stroke="#7c2d12" strokeWidth="1.5" />
          </g>
        </g>

        {/* ======================================================== */}
        {/* 6. GLOWING SPECIMEN JAR (Bottom Right)                   */}
        {/* ======================================================== */}
        <g id="specimen-jar" transform="translate(425, 96)">
          {/* Glass Jar Body */}
          <rect x="0" y="8" width="34" height="42" rx="8" fill="#14b8a6" fillOpacity="0.25" stroke="#22d3ee" strokeWidth="2" />
          {/* Jar Lid */}
          <rect x="3" y="2" width="28" height="8" rx="3" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
          {/* Glow Inside */}
          <circle cx="17" cy="30" r="10" fill="#a3e635" opacity="0.4" />
          {/* Trapped Glowing Bug */}
          <ellipse cx="17" cy="30" rx="6" ry="7" fill="#0284c7" stroke="#082f49" strokeWidth="1" />
          <circle cx="17" cy="24" r="3.5" fill="#f97316" />
          <path d="M 12 30 Q 17 32 22 30" stroke="#fde047" strokeWidth="1" />
        </g>

        {/* ======================================================== */}
        {/* 7. HANDHELD RADAR SCANNER (Left Side)                    */}
        {/* ======================================================== */}
        <g id="scanner-device" transform="translate(56, 75)">
          <rect x="0" y="8" width="30" height="44" rx="6" fill="#334155" stroke="#0f172a" strokeWidth="2" />
          <rect x="4" y="12" width="22" height="20" rx="3" fill="#082f49" stroke="#0ea5e9" strokeWidth="1" />
          {/* Oscilloscope Wave */}
          <path d="M 6 22 Q 10 16 15 26 T 24 20" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
          {/* Controls */}
          <circle cx="10" cy="39" r="3" fill="#22c55e" />
          <circle cx="20" cy="39" r="3" fill="#f97316" />
          {/* Antenna */}
          <line x1="8" y1="8" x2="4" y2="-8" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="4" cy="-8" r="3" fill="#ef4444" />
        </g>

        {/* ======================================================== */}
        {/* 8. AMBIENT GLOWING FIREFLY PARTICLES                     */}
        {/* ======================================================== */}
        <g id="particles" opacity="0.85">
          <circle cx="45" cy="45" r="3" fill="#fde047" filter="url(#goldGlow)" />
          <circle cx="48" cy="98" r="2" fill="#bef264" />
          <circle cx="95" cy="32" r="2.5" fill="#fde047" />
          <circle cx="340" cy="25" r="3" fill="#38bdf8" />
          <circle cx="490" cy="70" r="2.5" fill="#fde047" />
          <circle cx="475" cy="130" r="2" fill="#bef264" />
          <circle cx="280" cy="155" r="2" fill="#fb923c" />
        </g>
      </svg>

      {showSubtitle && (
        <div className="mt-1 flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-lime-400">
          <span>Find & Fix</span>
          <span className="text-amber-400">·</span>
          <span className="text-orange-400">Safari Edition</span>
        </div>
      )}
    </div>
  );
};
