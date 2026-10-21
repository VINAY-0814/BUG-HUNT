import React, { useState } from 'react';
import { Play, Shield, Terminal, Zap, Bug, CheckCircle2, Award, ArrowRight, Code2, Flame, Compass, Sparkles } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { BugHuntLogo } from '../components/BugHuntLogo';

interface LandingScreenProps {
  onStartGame: () => void;
  onSelectChallenge: (challengeId: string) => void;
  onOpenVivarium?: () => void;
  onOpenLogin?: () => void;
}

export const LandingScreen: React.FC<LandingScreenProps> = ({ 
  onStartGame, 
  onSelectChallenge, 
  onOpenVivarium,
  onOpenLogin 
}) => {
  // Live teaser snippet interactive demo
  const [demoCode, setDemoCode] = useState(`functon captureBug(specimenId) {\n  const jar = "SPECIMEN_" + specimenId;\n  return jar;\n}`);
  const [demoPassed, setDemoPassed] = useState<boolean | null>(null);

  const handleRunDemo = () => {
    soundManager.playRun();
    if (demoCode.includes('function captureBug')) {
      setDemoPassed(true);
      soundManager.playSuccess();
    } else {
      setDemoPassed(false);
      soundManager.playError();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#04140d] text-slate-100">
      {/* Hero Section */}
      <section className="relative px-6 pt-10 pb-20 max-w-7xl mx-auto w-full">
        {/* Subtle Jungle Tech Radar Background Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#164632_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-40 pointer-events-none"></div>

        {/* Ambient Foliage Glow Orbs */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center space-y-6 pt-4">
          {/* Logo Showcase Hero Badge */}
          <div className="transform hover:scale-102 transition-transform duration-300">
            <BugHuntLogo size="hero" showSubtitle={true} />
          </div>

          <p className="text-base sm:text-lg text-emerald-200/90 leading-relaxed max-w-2xl [text-wrap:balance]">
            Equip your safari net, scan corrupted subroutines with high-tech radar, and trap every coding defect in your specimen jar. Master programming logic across 5 wild expedition zones!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                soundManager.playKey();
                onStartGame();
              }}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-lime-500 hover:from-orange-400 hover:to-lime-400 active:scale-95 text-slate-950 font-black rounded-2xl transition-all shadow-[0_0_30px_rgba(234,88,12,0.45)] cursor-pointer text-sm uppercase tracking-wider"
            >
              <span>Start Bug Hunt!</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>

            <button
              onClick={() => {
                soundManager.playKey();
                onSelectChallenge('b1_syntax_declaration');
              }}
              className="flex items-center gap-2 px-6 py-4 bg-[#0a271c] hover:bg-[#123829] text-lime-300 border border-[#1b533b] rounded-2xl transition-colors cursor-pointer text-sm font-bold shadow-lg"
            >
              <Compass className="w-4 h-4 text-lime-400" />
              <span>Catch First Bug (Demo)</span>
            </button>

            {onOpenVivarium && (
              <button
                onClick={() => {
                  soundManager.playKey();
                  onOpenVivarium();
                }}
                className="flex items-center gap-2 px-6 py-4 bg-[#0a271c] hover:bg-[#123829] text-amber-300 border border-[#1b533b] rounded-2xl transition-colors cursor-pointer text-sm font-bold shadow-lg"
              >
                <span className="text-base">🏺</span>
                <span>Bug Vivarium</span>
              </button>
            )}

            {onOpenLogin && (
              <button
                onClick={() => {
                  soundManager.playKey();
                  onOpenLogin();
                }}
                className="flex items-center gap-2 px-6 py-4 bg-[#05170f] hover:bg-[#0c2a1c] text-emerald-300 border border-[#164632] hover:border-lime-500/50 rounded-2xl transition-colors cursor-pointer text-sm font-mono font-bold shadow-lg"
              >
                <Shield className="w-4 h-4 text-lime-400" />
                <span>Operative Sign In</span>
              </button>
            )}
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-3 gap-8 pt-6 border-t border-[#143e2c] max-w-lg w-full">
            <div>
              <div className="text-3xl font-extrabold font-mono text-lime-400 tabular-nums">106</div>
              <div className="text-xs text-emerald-300/70 font-semibold uppercase mt-0.5">Bug Specimens</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold font-mono text-orange-400 tabular-nums">5 Zones</div>
              <div className="text-xs text-emerald-300/70 font-semibold uppercase mt-0.5">Safari Tiers</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold font-mono text-cyan-400 tabular-nums">100%</div>
              <div className="text-xs text-emerald-300/70 font-semibold uppercase mt-0.5">Safe Sandbox</div>
            </div>
          </div>
        </div>

        {/* Live Interactive Bug Catching Teaser */}
        <div className="relative z-10 max-w-2xl mx-auto mt-14">
          <div className="bg-[#092217] border-2 border-[#1c553d] rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#05170f] border-b border-[#164632]">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-300">
                <Bug className="w-4 h-4 text-lime-400" />
                <span>field_scanner.js</span>
              </div>
              <span className="text-[11px] font-mono text-orange-400 bg-orange-950/60 px-2.5 py-0.5 rounded-full border border-orange-800/80 font-bold">
                Bug Spotted on Line 1!
              </span>
            </div>

            <div className="p-5 bg-[#071a12] font-mono text-xs">
              <textarea
                value={demoCode}
                onChange={(e) => {
                  setDemoCode(e.target.value);
                  setDemoPassed(null);
                }}
                rows={5}
                spellCheck={false}
                className="w-full bg-[#04120b] p-3.5 rounded-xl border border-[#1b4d36] text-lime-300 focus:outline-none focus:border-lime-400 leading-relaxed resize-none selection:bg-lime-500/30 font-mono text-sm"
              />

              <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                <div className="text-xs">
                  {demoPassed === true && (
                    <span className="text-lime-400 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-lime-400" /> Bug Trapped in Jar! Syntax Clean.
                    </span>
                  )}
                  {demoPassed === false && (
                    <span className="text-orange-400 flex items-center gap-1 font-bold">
                      SyntaxError: `functon` is invalid. Fix spelling to `function`.
                    </span>
                  )}
                  {demoPassed === null && (
                    <span className="text-emerald-400/60">Correct `functon` on Line 1 and click Trap Bug</span>
                  )}
                </div>

                <button
                  onClick={handleRunDemo}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl transition-all cursor-pointer shadow-md shadow-orange-950/50 uppercase"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Trap Bug</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Safari Expedition Zones */}
      <section className="px-6 py-16 bg-[#030f0a] border-t border-[#123827]">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              5 Expedition Zones
            </h2>
            <p className="text-xs sm:text-sm text-emerald-300/80">
              Journey from the sunlit Savannah into the Deep Jungle to hunt down every bug class.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="p-5 bg-[#072016] border border-[#164632] rounded-2xl space-y-2 hover:border-lime-500/40 transition-colors">
              <div className="text-xs font-mono text-lime-400 font-extrabold uppercase">Zone 01</div>
              <h3 className="font-bold text-slate-100 text-sm">Beginner Grasslands</h3>
              <p className="text-xs text-emerald-200/70 leading-relaxed">
                Syntax typos, identifier casing mismatches, template literals, and missing return values.
              </p>
            </div>

            <div className="p-5 bg-[#072016] border border-[#164632] rounded-2xl space-y-2 hover:border-emerald-500/40 transition-colors">
              <div className="text-xs font-mono text-emerald-400 font-extrabold uppercase">Zone 02</div>
              <h3 className="font-bold text-slate-100 text-sm">Savannah Gates</h3>
              <p className="text-xs text-emerald-200/70 leading-relaxed">
                Single equals assignment traps, boundary comparisons, inverted ternary operands, and switch fallthroughs.
              </p>
            </div>

            <div className="p-5 bg-[#072016] border border-[#164632] rounded-2xl space-y-2 hover:border-cyan-500/40 transition-colors">
              <div className="text-xs font-mono text-cyan-400 font-extrabold uppercase">Zone 03</div>
              <h3 className="font-bold text-slate-100 text-sm">Canyon Loops</h3>
              <p className="text-xs text-emerald-200/70 leading-relaxed">
                Off-by-one array iterations, infinite while counters, variable shadowing, and input mutations.
              </p>
            </div>

            <div className="p-5 bg-[#072016] border border-[#164632] rounded-2xl space-y-2 hover:border-amber-500/40 transition-colors">
              <div className="text-xs font-mono text-amber-400 font-extrabold uppercase">Zone 04</div>
              <h3 className="font-bold text-slate-100 text-sm">Deep Jungle</h3>
              <p className="text-xs text-emerald-200/70 leading-relaxed">
                Recursive stack overflow base cases, shallow object copies, binary search floats, and accumulators.
              </p>
            </div>

            <div className="p-5 bg-[#072016] border border-[#164632] rounded-2xl space-y-2 hover:border-orange-500/40 transition-colors">
              <div className="text-xs font-mono text-orange-400 font-extrabold uppercase">Zone 05</div>
              <h3 className="font-bold text-slate-100 text-sm">Volcano Core (Bosses)</h3>
              <p className="text-xs text-emerald-200/70 leading-relaxed">
                Multi-bug systems, memoization falsy bugs, 2D matrix transpositions, and rate limiters.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
