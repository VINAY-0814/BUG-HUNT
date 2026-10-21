import React, { useState } from 'react';
import { Lock, CheckCircle2, Play, Calendar, Zap, Shield, Sparkles, AlertCircle, ArrowRight, Map, LayoutGrid, Skull, ShoppingCart, Compass } from 'lucide-react';
import { Challenge, User } from '../types/game';
import { soundManager } from '../utils/audio';

interface DashboardScreenProps {
  user: User | null;
  challenges: (Challenge & { isUnlocked: boolean; isSolved: boolean })[];
  unlockedLevel: number;
  onSelectChallenge: (challengeId: string) => void;
  onOpenAuth: () => void;
  onOpenShop?: () => void;
  onOpenVivarium?: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  user,
  challenges,
  unlockedLevel,
  onSelectChallenge,
  onOpenAuth,
  onOpenShop,
  onOpenVivarium,
}) => {
  const [selectedLevelTab, setSelectedLevelTab] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'map' | 'grid'>('map');

  const levelInfo: Record<number, { name: string; sector: string; desc: string; color: string; bgBorder: string }> = {
    1: { name: 'Beginner', sector: 'Zone 01: Grassland Trail', desc: 'Syntax errors, typos, variable declarations & semicolons', color: 'text-lime-400', bgBorder: 'border-lime-500/40' },
    2: { name: 'Easy', sector: 'Zone 02: Savannah Gates', desc: 'Conditionals, boolean logic, comparison traps & switches', color: 'text-emerald-400', bgBorder: 'border-emerald-500/40' },
    3: { name: 'Intermediate', sector: 'Zone 03: Canyon Loops', desc: 'Loops, scope shadowing, closures & reference mutation leaks', color: 'text-cyan-400', bgBorder: 'border-cyan-500/40' },
    4: { name: 'Advanced', sector: 'Zone 04: Deep Jungle Canopy', desc: 'Recursion limits, shallow copies, binary search & array reducers', color: 'text-amber-400', bgBorder: 'border-amber-500/40' },
    5: { name: 'Expert', sector: 'Zone 05: Volcano Core (Bosses)', desc: 'Multi-bug systems, memoization falsy bugs & algorithm transpositions', color: 'text-orange-400', bgBorder: 'border-orange-500/40' },
  };

  const dailyChallenge = challenges.find(c => c.isDaily);
  const regularChallenges = challenges.filter(c => !c.isDaily);
  const filteredChallenges = regularChallenges.filter(c => c.level === selectedLevelTab);

  const solvedCountInLevel = filteredChallenges.filter(c => c.isSolved).length;
  const isTabUnlocked = selectedLevelTab <= unlockedLevel;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8 bg-[#04140d]">
      {/* Daily Debugging Mission Spotlight */}
      {dailyChallenge && (
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#092c1e] via-[#0c3826] to-[#12281c] border-2 border-[#1c553d] p-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-400 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-800/80">
                <Calendar className="w-3.5 h-3.5" />
                <span>DAILY SPECIMEN EXPEDITION · +250 XP BONUS</span>
              </div>
              <h2 className="text-xl font-extrabold text-slate-100">{dailyChallenge.title}</h2>
              <p className="text-xs text-emerald-200/80 max-w-xl">{dailyChallenge.story}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {onOpenVivarium && (
                <button
                  onClick={onOpenVivarium}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#061b12] hover:bg-[#0c2f21] border border-[#1d523a] text-lime-400 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  <span className="text-sm">🏺</span>
                  <span>Bug Vivarium</span>
                </button>
              )}

              {onOpenShop && (
                <button
                  onClick={onOpenShop}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#061b12] hover:bg-[#0c2f21] border border-[#1d523a] text-orange-400 text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-md"
                >
                  <ShoppingCart className="w-4 h-4 text-orange-400" />
                  <span>Explorer Gear</span>
                </button>
              )}

              {dailyChallenge.isSolved ? (
                <div className="flex items-center gap-1.5 px-4 py-2 bg-emerald-950/80 border border-emerald-600 rounded-xl text-emerald-300 text-xs font-bold font-mono">
                  <CheckCircle2 className="w-4 h-4 text-lime-400" />
                  <span>Specimen Captured</span>
                </div>
              ) : (
                <button
                  onClick={() => {
                    soundManager.playKey();
                    onSelectChallenge(dailyChallenge.id);
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-[0_0_20px_rgba(234,88,12,0.4)] cursor-pointer uppercase tracking-wider"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Hunt Daily Bug</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Level Tabs & Mode Switch Bar */}
      <div className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2">
              <Compass className="w-6 h-6 text-lime-400" />
              <span>Safari Expedition Map</span>
            </h1>
            <p className="text-xs text-emerald-300/70">Navigate terrain sectors, capture exotic bugs, and defeat giant boss daemons.</p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center p-1 bg-[#071d13] border border-[#164632] rounded-xl text-xs font-mono">
              <button
                onClick={() => {
                  soundManager.playKey();
                  setViewMode('map');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'map' ? 'bg-[#0f3a28] text-lime-300 font-bold shadow-sm' : 'text-emerald-400/60 hover:text-emerald-200'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                <span>Radar Trail</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playKey();
                  setViewMode('grid');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-[#0f3a28] text-lime-300 font-bold shadow-sm' : 'text-emerald-400/60 hover:text-emerald-200'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Specimen Grid</span>
              </button>
            </div>

            {/* Level Selector Tabs */}
            <div className="flex items-center gap-1 p-1 bg-[#071d13] border border-[#164632] rounded-xl overflow-x-auto max-w-full">
              {[1, 2, 3, 4, 5].map((lvl) => {
                const unlocked = lvl <= unlockedLevel;
                const active = selectedLevelTab === lvl;

                return (
                  <button
                    key={lvl}
                    onClick={() => {
                      soundManager.playKey();
                      setSelectedLevelTab(lvl);
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      active
                        ? 'bg-[#0e3b29] text-lime-300 border border-lime-500/40 shadow-sm'
                        : unlocked
                        ? 'text-emerald-300/70 hover:text-emerald-100'
                        : 'text-emerald-800 hover:text-emerald-700'
                    }`}
                  >
                    {!unlocked && <Lock className="w-3 h-3 text-emerald-800" />}
                    <span>Z{lvl}: {levelInfo[lvl].name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Current Tab District Banner */}
        <div className="p-4 bg-[#082216] border border-[#174b34] rounded-2xl flex items-center justify-between flex-wrap gap-3">
          <div>
            <div className="text-sm font-bold text-slate-200 flex items-center gap-2">
              <span className={`font-mono text-xs uppercase font-extrabold ${levelInfo[selectedLevelTab].color}`}>
                {levelInfo[selectedLevelTab].sector}
              </span>
              <span className="text-emerald-700">·</span>
              <span className="text-xs font-normal text-emerald-200/80">{levelInfo[selectedLevelTab].desc}</span>
            </div>
          </div>

          <div className="text-xs font-mono text-emerald-300/80 flex items-center gap-3">
            <span>Captured in Zone: <strong className="text-lime-400">{solvedCountInLevel}</strong>/{filteredChallenges.length} Specimens</span>
            {!isTabUnlocked && (
              <span className="text-orange-400 flex items-center gap-1 font-bold">
                <Lock className="w-3.5 h-3.5" /> Requires clearing earlier zones
              </span>
            )}
          </div>
        </div>
      </div>

      {/* VIEW 1: INTERACTIVE CYBER RADAR NODE MAP */}
      {viewMode === 'map' && (
        <div className="relative bg-[#05170f] border-2 border-[#164632] rounded-3xl p-8 overflow-hidden min-h-[380px] shadow-2xl flex flex-col justify-center">
          {/* Radar Background Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#1b5038_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-35 pointer-events-none"></div>

          {/* Node Connection Matrix */}
          <div className="relative z-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-y-8 gap-x-4 my-auto py-4">
            {filteredChallenges.map((challenge, idx) => {
              const isUnlocked = challenge.isUnlocked;
              const isSolved = challenge.isSolved;
              const isBoss = challenge.isBoss;

              return (
                <div key={challenge.id} className="relative flex flex-col items-center group">

                  {/* Node Button Orb */}
                  <button
                    onClick={() => {
                      if (isUnlocked) {
                        soundManager.playKey();
                        onSelectChallenge(challenge.id);
                      }
                    }}
                    disabled={!isUnlocked}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 relative cursor-pointer ${
                      isBoss
                        ? isSolved
                          ? 'bg-[#2a0e0e] border-2 border-orange-500 shadow-[0_0_25px_rgba(249,115,22,0.6)] text-orange-400'
                          : isUnlocked
                          ? 'bg-[#180a0a] border-2 border-orange-500 hover:scale-110 shadow-[0_0_20px_rgba(249,115,22,0.5)] text-orange-400 animate-pulse'
                          : 'bg-[#0b1f15] border border-[#143d2b] text-emerald-900 opacity-60'
                        : isSolved
                        ? 'bg-[#0c3321] border-2 border-lime-400 text-lime-300 shadow-[0_0_20px_rgba(132,204,22,0.5)]'
                        : isUnlocked
                        ? 'bg-[#082216] border-2 border-[#1f5a3e] hover:border-lime-400 hover:scale-110 text-emerald-200 shadow-lg'
                        : 'bg-[#05170f] border border-[#0d3121] text-emerald-900 opacity-60'
                    }`}
                  >
                    {isSolved ? (
                      <CheckCircle2 className="w-6 h-6 text-lime-400" />
                    ) : isBoss ? (
                      <Skull className="w-6 h-6 text-orange-400" />
                    ) : isUnlocked ? (
                      <Play className="w-5 h-5 fill-current" />
                    ) : (
                      <Lock className="w-4 h-4 text-emerald-800" />
                    )}

                    {/* Orbiting Badge Tag */}
                    <span className="absolute -top-2.5 px-2 py-0.2 bg-[#04120b] border border-[#1b4d36] rounded text-[10px] font-mono font-bold text-lime-400 shadow-sm">
                      {isBoss ? 'BOSS' : `N${idx + 1}`}
                    </span>
                  </button>

                  {/* Node Info Label */}
                  <div className="text-center mt-3 max-w-[130px] space-y-0.5">
                    <div className="text-xs font-bold text-emerald-100 truncate font-mono">
                      {challenge.title.split(':')[0]}
                    </div>
                    <div className="text-[10px] text-emerald-400/70 font-mono font-semibold">
                      {challenge.points} PTS · {challenge.timeLimit}s
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: SPECIMEN LIST GRID */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredChallenges.map((challenge, index) => {
            const isUnlocked = challenge.isUnlocked;
            const isSolved = challenge.isSolved;
            const isBoss = challenge.isBoss;

            return (
              <div
                key={challenge.id}
                className={`p-5 rounded-2xl border-2 flex flex-col justify-between transition-all ${
                  isBoss
                    ? 'bg-[#1a0a07] border-orange-700/60 hover:border-orange-500'
                    : isSolved
                    ? 'bg-[#082317] border-emerald-700/50 hover:border-emerald-500'
                    : isUnlocked
                    ? 'bg-[#071f15] border-[#164632] hover:border-lime-500/60 hover:shadow-[0_0_20px_rgba(132,204,22,0.15)]'
                    : 'bg-[#05140d] border-[#0c2b1d] opacity-60'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-emerald-400/80 uppercase font-bold tracking-wider flex items-center gap-1.5">
                      {isBoss && <Skull className="w-3.5 h-3.5 text-orange-400" />}
                      <span>{isBoss ? 'ZONE BOSS DAEMON' : `SPECIMEN #${index + 1}`} · {challenge.category}</span>
                    </span>
                    {isSolved ? (
                      <span className="text-lime-400 flex items-center gap-1 font-mono text-xs font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" /> Trapped
                      </span>
                    ) : isUnlocked ? (
                      <span className="text-emerald-300 font-mono text-xs font-bold">In Range</span>
                    ) : (
                      <span className="text-emerald-800 flex items-center gap-1 font-mono text-xs">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-100 text-sm leading-snug">{challenge.title}</h3>
                  <p className="text-xs text-emerald-200/70 line-clamp-2 leading-relaxed">{challenge.story}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#123827] flex items-center justify-between">
                  <div className="text-xs font-mono text-emerald-300/80">
                    <span className="text-lime-400 font-extrabold">{challenge.points} PTS</span>
                    <span className="mx-1 text-emerald-700">·</span>
                    <span>{challenge.timeLimit}s</span>
                  </div>

                  {isUnlocked ? (
                    <button
                      onClick={() => {
                        soundManager.playKey();
                        onSelectChallenge(challenge.id);
                      }}
                      className={`flex items-center gap-1.5 px-4 py-2 text-xs font-black rounded-xl transition-all cursor-pointer uppercase ${
                        isBoss
                          ? 'bg-gradient-to-r from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-slate-950 shadow-md shadow-orange-950/60'
                          : isSolved
                          ? 'bg-[#0f3a28] hover:bg-[#164f37] text-lime-300'
                          : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 shadow-md shadow-orange-950/40'
                      }`}
                    >
                      <span>{isBoss ? 'Fight Boss' : isSolved ? 'Replay' : 'Hunt Bug'}</span>
                      <ArrowRight className="w-3 h-3 stroke-[3]" />
                    </button>
                  ) : (
                    <div className="text-xs text-emerald-800 flex items-center gap-1 font-mono">
                      <Lock className="w-3 h-3" /> Clearance Needed
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
