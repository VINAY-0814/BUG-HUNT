import React, { useState } from 'react';
import { ArrowLeft, Sparkles, CheckCircle2, Lock, Eye, Filter, Compass, Trophy, Zap, Shield, BookOpen, Bug, Search } from 'lucide-react';
import { Challenge, User } from '../types/game';
import { soundManager } from '../utils/audio';

interface VivariumScreenProps {
  user: User | null;
  challenges: (Challenge & { isUnlocked: boolean; isSolved: boolean })[];
  onBack: () => void;
  onSelectChallenge: (challengeId: string) => void;
}

// Species classification generator for bugs
function getSpeciesData(challenge: Challenge) {
  const speciesNames: Record<string, { latin: string; family: string; rarity: string; glowColor: string; wingColor: string }> = {
    'Beginner': {
      latin: 'Scarabaeus Syntaxis',
      family: 'Syntax Scarabs',
      rarity: 'Common',
      glowColor: '#84cc16', // Lime
      wingColor: '#bef264',
    },
    'Easy': {
      latin: 'Mantodea Conditionis',
      family: 'Boolean Mantids',
      rarity: 'Uncommon',
      glowColor: '#10b981', // Emerald
      wingColor: '#34d399',
    },
    'Intermediate': {
      latin: 'Anisoptera Iteratio',
      family: 'Loop Dragonflies',
      rarity: 'Rare',
      glowColor: '#06b6d4', // Cyan
      wingColor: '#38bdf8',
    },
    'Advanced': {
      latin: 'Lepidoptera Recursio',
      family: 'Recursive Phantoms',
      rarity: 'Epic',
      glowColor: '#f59e0b', // Amber/Gold
      wingColor: '#fbbf24',
    },
    'Expert': {
      latin: 'Titanus Megabugus',
      family: 'Volcano Core Daemons',
      rarity: 'Mythic Boss',
      glowColor: '#ea580c', // Terracotta Orange
      wingColor: '#f97316',
    },
  };

  return speciesNames[challenge.difficulty] || speciesNames['Beginner'];
}

export const VivariumScreen: React.FC<VivariumScreenProps> = ({
  user,
  challenges,
  onBack,
  onSelectChallenge,
}) => {
  const [filter, setFilter] = useState<'all' | 'captured' | 'missing' | 'bosses'>('all');
  const [search, setSearch] = useState('');
  const [inspectingChallenge, setInspectingChallenge] = useState<
    (Challenge & { isUnlocked: boolean; isSolved: boolean }) | null
  >(null);

  const regularChallenges = challenges.filter(c => !c.isDaily);
  const solvedCount = regularChallenges.filter(c => c.isSolved).length;
  const totalCount = regularChallenges.length;
  const percentage = Math.round((solvedCount / (totalCount || 1)) * 100);

  const filteredChallenges = regularChallenges.filter(c => {
    if (filter === 'captured' && !c.isSolved) return false;
    if (filter === 'missing' && c.isSolved) return false;
    if (filter === 'bosses' && !c.isBoss) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.bugType.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 bg-[#04140d] text-slate-100 min-h-screen">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#164632] pb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              soundManager.playKey();
              onBack();
            }}
            className="p-2.5 rounded-xl bg-[#09271c] hover:bg-[#113a2a] text-emerald-300 border border-[#1b5039] transition-colors cursor-pointer"
            title="Back to Expedition Map"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-100 flex items-center gap-2.5">
              <span className="text-3xl">🏺</span>
              <span>Specimen Vivarium & Bug Zoo</span>
            </h1>
            <p className="text-xs text-emerald-300/80 mt-0.5">
              Live containment habitat for captured software glitches, defects, and syntax anomalies.
            </p>
          </div>
        </div>

        {/* Sanctuary Habitat Stats Bar */}
        <div className="flex items-center gap-4 bg-[#082217] border border-[#1b5239] rounded-2xl px-5 py-3 shadow-lg">
          <div>
            <div className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Containment Status</div>
            <div className="text-sm font-black text-lime-400 font-mono">
              {solvedCount} / {totalCount} Trapped ({percentage}%)
            </div>
          </div>
          <div className="w-28 h-3 bg-[#03130c] rounded-full overflow-hidden border border-[#194b34]">
            <div
              className="h-full bg-gradient-to-r from-lime-500 via-amber-500 to-orange-500 transition-all duration-500 rounded-full"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#072016] p-4 rounded-2xl border border-[#164933]">
        <div className="flex items-center gap-2 flex-wrap">
          {(
            [
              { key: 'all', label: `All Specimens (${totalCount})` },
              { key: 'captured', label: `Captured (${solvedCount})` },
              { key: 'missing', label: `In the Wild (${totalCount - solvedCount})` },
              { key: 'bosses', label: `Boss Daemons` },
            ] as const
          ).map(tab => (
            <button
              key={tab.key}
              onClick={() => {
                soundManager.playKey();
                setFilter(tab.key);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === tab.key
                  ? 'bg-lime-500 text-slate-950 font-black shadow-[0_0_15px_rgba(132,204,22,0.4)]'
                  : 'bg-[#04140d] text-emerald-300/80 hover:text-emerald-100 hover:bg-[#0a291d] border border-[#14422e]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400/60" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search specimen taxonomy..."
            className="w-full bg-[#04140d] border border-[#174632] rounded-xl pl-9 pr-3 py-1.5 text-xs text-lime-300 placeholder-emerald-600 focus:outline-none focus:border-lime-400 font-mono"
          />
        </div>
      </div>

      {/* Specimen Jar Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredChallenges.map(challenge => {
          const species = getSpeciesData(challenge);
          const isSolved = challenge.isSolved;

          return (
            <div
              key={challenge.id}
              onClick={() => {
                soundManager.playGutterClick();
                setInspectingChallenge(challenge);
              }}
              className={`group relative rounded-3xl p-5 border-2 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col items-center text-center ${
                isSolved
                  ? 'bg-gradient-to-b from-[#09291b] to-[#05180f] border-lime-500/50 hover:border-lime-400 hover:shadow-[0_0_30px_rgba(132,204,22,0.35)] hover:-translate-y-1.5'
                  : 'bg-[#051810]/70 border-[#143b2a] hover:border-[#1d563d] opacity-75 hover:opacity-100'
              }`}
            >
              {/* Rarity & Zone Badge */}
              <div className="w-full flex items-center justify-between text-[10px] font-mono mb-2">
                <span
                  className="px-2 py-0.5 rounded-full font-bold border"
                  style={{
                    backgroundColor: `${species.glowColor}15`,
                    borderColor: `${species.glowColor}50`,
                    color: species.glowColor,
                  }}
                >
                  {species.rarity}
                </span>
                <span className="text-emerald-400/80 font-bold">Zone {challenge.level}</span>
              </div>

              {/* Glowing Specimen Jar SVG */}
              <div className="relative w-28 h-36 my-2 flex items-center justify-center">
                {/* Ambient glow behind jar */}
                {isSolved && (
                  <div
                    className="absolute inset-2 rounded-full blur-xl opacity-60 animate-pulse pointer-events-none"
                    style={{ backgroundColor: species.glowColor }}
                  />
                )}

                <svg viewBox="0 0 100 130" className="w-full h-full drop-shadow-xl overflow-visible">
                  <defs>
                    <linearGradient id={`jarGlass-${challenge.id}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.3" />
                      <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.1" />
                      <stop offset="100%" stopColor="#042f2e" stopOpacity="0.45" />
                    </linearGradient>
                    <linearGradient id={`liquid-${challenge.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={species.glowColor} stopOpacity="0.45" />
                      <stop offset="100%" stopColor={species.glowColor} stopOpacity="0.8" />
                    </linearGradient>
                  </defs>

                  {/* Glass Jar Body */}
                  <rect
                    x="15"
                    y="25"
                    width="70"
                    height="95"
                    rx="16"
                    fill={isSolved ? `url(#jarGlass-${challenge.id})` : '#071d13'}
                    stroke={isSolved ? species.glowColor : '#1b4a35'}
                    strokeWidth="2.5"
                  />

                  {/* Preservative Liquid if captured */}
                  {isSolved && (
                    <rect
                      x="18"
                      y="55"
                      width="64"
                      height="62"
                      rx="12"
                      fill={`url(#liquid-${challenge.id})`}
                    />
                  )}

                  {/* Brass Screw Lid */}
                  <rect
                    x="24"
                    y="12"
                    width="52"
                    height="15"
                    rx="4"
                    fill={isSolved ? '#ca8a04' : '#334155'}
                    stroke={isSolved ? '#fef08a' : '#1e293b'}
                    strokeWidth="2"
                  />
                  <line x1="28" y1="17" x2="72" y2="17" stroke="#713f12" strokeWidth="1.5" />
                  <line x1="28" y1="21" x2="72" y2="21" stroke="#713f12" strokeWidth="1.5" />

                  {/* Glass Reflection Highlight */}
                  <path
                    d="M 22 35 Q 20 70 24 105"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity={isSolved ? 0.4 : 0.15}
                  />

                  {/* INSIDE: The Bug or Static Radar */}
                  {isSolved ? (
                    <g transform="translate(50, 72)" className="animate-bounce" style={{ animationDuration: '3s' }}>
                      {/* Wings */}
                      <ellipse cx="-10" cy="-6" rx="9" ry="5" transform="rotate(-30 -10 -6)" fill={species.wingColor} opacity="0.8" />
                      <ellipse cx="10" cy="-6" rx="9" ry="5" transform="rotate(30 10 -6)" fill={species.wingColor} opacity="0.8" />
                      {/* Antennae */}
                      <path d="M -3 -10 Q -8 -16 -10 -15" stroke="#fde047" strokeWidth="1.5" fill="none" />
                      <path d="M 3 -10 Q 8 -16 10 -15" stroke="#fde047" strokeWidth="1.5" fill="none" />
                      {/* Body */}
                      <ellipse cx="0" cy="0" rx="9" ry="11" fill={species.glowColor} stroke="#042013" strokeWidth="1.5" />
                      {/* Eyes */}
                      <circle cx="-3" cy="-4" r="2" fill="#0f172a" />
                      <circle cx="3" cy="-4" r="2" fill="#0f172a" />
                      <circle cx="-2.5" cy="-4.5" r="0.8" fill="#ffffff" />
                      <circle cx="3.5" cy="-4.5" r="0.8" fill="#ffffff" />
                      {/* Belly stripes */}
                      <line x1="-5" y1="2" x2="5" y2="2" stroke="#042013" strokeWidth="1.2" />
                      <line x1="-4" y1="5" x2="4" y2="5" stroke="#042013" strokeWidth="1.2" />
                    </g>
                  ) : (
                    <g transform="translate(50, 72)">
                      <circle cx="0" cy="0" r="16" fill="none" stroke="#164e37" strokeWidth="1.5" strokeDasharray="3 3" />
                      <line x1="-12" y1="0" x2="12" y2="0" stroke="#164e37" strokeWidth="1.5" />
                      <line x1="0" y1="-12" x2="0" y2="12" stroke="#164e37" strokeWidth="1.5" />
                      <Lock className="w-5 h-5 text-emerald-800" x="-10" y="-10" />
                    </g>
                  )}
                </svg>
              </div>

              {/* Specimen Titles */}
              <div className="space-y-1 w-full mt-1">
                <h3 className="font-extrabold text-sm text-slate-100 truncate group-hover:text-lime-300 transition-colors">
                  {challenge.title}
                </h3>
                <div className="text-[11px] font-mono italic text-emerald-400 truncate">
                  {species.latin}
                </div>
                <div className="text-[10px] text-emerald-500 font-mono">
                  Family: {species.family}
                </div>
              </div>

              {/* Status Action */}
              <div className="mt-4 w-full pt-3 border-t border-[#133d2a] flex items-center justify-between text-xs font-mono">
                {isSolved ? (
                  <span className="text-lime-400 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Trapped
                  </span>
                ) : (
                  <span className="text-emerald-600 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> In the Wild
                  </span>
                )}

                <span className="text-amber-400 font-bold">+{challenge.points} pts</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Specimen Autopsy / Detail Inspection Modal */}
      {inspectingChallenge && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="w-full max-w-xl bg-[#072418] border-2 border-lime-500/50 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#04140d] border-b border-[#164632]">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🔬</span>
                <div>
                  <h2 className="font-black text-slate-100 text-sm">{inspectingChallenge.title}</h2>
                  <div className="text-[11px] text-lime-400 font-mono italic">
                    {getSpeciesData(inspectingChallenge).latin} · {inspectingChallenge.category}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setInspectingChallenge(null)}
                className="p-1.5 text-emerald-500 hover:text-emerald-200 rounded-lg hover:bg-[#0c2b1e] transition-colors cursor-pointer text-xs font-mono"
              >
                ✕ Close
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Story & Taxonomy */}
              <div className="p-4 bg-[#04150e] rounded-2xl border border-[#164933] text-xs space-y-2">
                <span className="text-[10px] font-mono uppercase font-bold text-emerald-400 block">
                  Field Discovery Report:
                </span>
                <p className="text-emerald-100/90 leading-relaxed">{inspectingChallenge.story}</p>
                <div className="flex items-center gap-3 pt-2 text-[11px] font-mono text-emerald-300">
                  <span>Defect Vector: <b className="text-orange-400">{inspectingChallenge.bugType}</b></span>
                  <span>·</span>
                  <span>Zone: <b className="text-lime-400">{inspectingChallenge.level} ({inspectingChallenge.difficulty})</b></span>
                </div>
              </div>

              {/* Bug Explanation / Autopsy if solved */}
              {inspectingChallenge.isSolved ? (
                <div className="p-4 bg-[#051c12] rounded-2xl border border-lime-500/30 text-xs space-y-2.5">
                  <div className="flex items-center gap-1.5 font-bold text-lime-400 font-mono text-xs uppercase">
                    <BookOpen className="w-4 h-4 text-lime-400" />
                    <span>Neutralized Bug Autopsy & Solution</span>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-300 text-[11px] uppercase block">Root Defect:</span>
                    <p className="text-emerald-100/90 font-sans mt-0.5">{inspectingChallenge.explanation.rootCause}</p>
                  </div>
                  <div>
                    <span className="font-bold text-emerald-300 text-[11px] uppercase block">Cure & Patch:</span>
                    <p className="text-emerald-100/90 font-sans mt-0.5">{inspectingChallenge.explanation.fixDetails}</p>
                  </div>
                  <div className="pt-2 border-t border-[#133e29]">
                    <span className="font-bold text-lime-300 text-[11px] uppercase block">Field Guide Takeaway:</span>
                    <p className="text-lime-100/90 font-sans mt-0.5">{inspectingChallenge.explanation.takeaway}</p>
                  </div>
                </div>
              ) : (
                <div className="p-5 bg-orange-950/30 rounded-2xl border border-orange-900/40 text-center space-y-2">
                  <div className="text-amber-400 font-mono font-bold text-xs uppercase">
                    ⚠️ Wild Specimen Not Yet Contained
                  </div>
                  <p className="text-xs text-orange-200/80">
                    This coding glitch is still causing mayhem in Sector {inspectingChallenge.level}. Deploy your net to capture and study it!
                  </p>
                </div>
              )}
            </div>

            {/* Footer action */}
            <div className="p-4 bg-[#04140d] border-t border-[#164632] flex items-center justify-between">
              <span className="text-xs font-mono text-emerald-400">
                Reward: <b className="text-amber-400 font-bold">{inspectingChallenge.points} pts</b>
              </span>
              <button
                onClick={() => {
                  soundManager.playKey();
                  const targetId = inspectingChallenge.id;
                  setInspectingChallenge(null);
                  onSelectChallenge(targetId);
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-lime-500 hover:from-orange-400 hover:to-lime-400 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-lg uppercase tracking-wider"
              >
                <Compass className="w-4 h-4 fill-current" />
                <span>{inspectingChallenge.isSolved ? 'Re-inspect in Arena' : 'Hunt This Specimen'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
