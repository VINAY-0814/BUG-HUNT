import React, { useEffect } from 'react';
import { Trophy, Coins, Zap, ShieldAlert, RotateCcw, ArrowRight, BookOpen, AlertOctagon, Heart, Sparkles, Compass } from 'lucide-react';
import { Challenge, Badge } from '../types/game';
import { soundManager } from '../utils/audio';

interface VictoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNextChallenge?: () => void;
  pointsEarned: number;
  coinsEarned: number;
  xpEarned: number;
  newBadges?: Badge[];
  explanation?: Challenge['explanation'];
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  isOpen,
  onClose,
  onNextChallenge,
  pointsEarned,
  coinsEarned,
  xpEarned,
  newBadges = [],
  explanation,
}) => {
  useEffect(() => {
    if (isOpen) {
      soundManager.playSpecimenTrapped();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-xl bg-[#072418] border-2 border-lime-500/50 rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-6 bg-gradient-to-b from-[#0e3b28] to-[#072418] border-b border-[#1b533b] text-center">
          <div className="relative w-20 h-20 mx-auto mb-3 flex items-center justify-center">
            {/* Glowing Jar SVG */}
            <svg viewBox="0 0 60 70" className="w-full h-full drop-shadow-[0_0_20px_rgba(132,204,22,0.6)]">
              <rect x="10" y="14" width="40" height="52" rx="10" fill="#063824" stroke="#84cc16" strokeWidth="2.5" />
              <rect x="12" y="32" width="36" height="32" rx="8" fill="#84cc16" fillOpacity="0.4" />
              <rect x="16" y="6" width="28" height="10" rx="3" fill="#ca8a04" stroke="#fef08a" strokeWidth="1.5" />
              {/* Captured glowing bug */}
              <circle cx="30" cy="44" r="6" fill="#bef264" />
              <circle cx="27" cy="42" r="1.5" fill="#042214" />
              <circle cx="33" cy="42" r="1.5" fill="#042214" />
              <ellipse cx="22" cy="40" rx="5" ry="3" fill="#38bdf8" opacity="0.8" />
              <ellipse cx="38" cy="40" rx="5" ry="3" fill="#38bdf8" opacity="0.8" />
            </svg>
          </div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">Bug Trapped! · Specimen Secured</h2>
          <p className="text-xs text-lime-300 mt-1 font-mono font-bold">All test assertions passed. Specimen cataloged in jar.</p>
        </div>

        {/* Rewards Bar */}
        <div className="grid grid-cols-3 divide-x divide-[#164632] bg-[#051a11] border-b border-[#164632] text-center py-3.5">
          <div>
            <div className="text-[10px] uppercase font-mono text-emerald-400 font-bold">Score Gained</div>
            <div className="text-base font-black text-lime-400 font-mono">+{pointsEarned}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-emerald-400 font-bold">XP Gained</div>
            <div className="text-base font-black text-emerald-300 font-mono">+{xpEarned}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase font-mono text-emerald-400 font-bold">Coins Looted</div>
            <div className="text-base font-black text-amber-400 font-mono">+{coinsEarned}</div>
          </div>
        </div>

        {/* Badges Unlocked Section */}
        {newBadges.length > 0 && (
          <div className="p-4 bg-orange-950/30 border-b border-orange-900/40">
            <div className="text-xs font-bold text-orange-300 flex items-center gap-1.5 mb-2">
              <Zap className="w-4 h-4 text-orange-400" />
              <span>New Explorer Medals Unlocked!</span>
            </div>
            <div className="space-y-1.5">
              {newBadges.map(badge => (
                <div key={badge.id} className="flex items-center gap-2 p-2 bg-[#05170f] rounded-xl border border-orange-800/40 text-xs">
                  <div className="font-bold text-orange-200">{badge.name}</div>
                  <span className="text-emerald-700">·</span>
                  <div className="text-emerald-300/80 text-[11px]">{badge.description}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Educational Bug Explanation */}
        {explanation && (
          <div className="p-6 space-y-3.5 max-h-[300px] overflow-y-auto">
            <div className="flex items-center gap-2 text-xs font-extrabold text-lime-400 uppercase tracking-wider font-mono">
              <BookOpen className="w-4 h-4 text-lime-400" />
              <span>Specimen Post-Mortem & Explanation</span>
            </div>

            <div className="p-4 bg-[#051810] rounded-2xl border border-[#164632] text-xs space-y-2.5">
              <div>
                <span className="text-emerald-300 font-bold block text-[11px] uppercase">Root Cause:</span>
                <p className="text-emerald-100/90 leading-relaxed font-sans mt-0.5">{explanation.rootCause}</p>
              </div>

              <div>
                <span className="text-emerald-300 font-bold block text-[11px] uppercase">How the Fix Works:</span>
                <p className="text-emerald-100/90 leading-relaxed font-sans mt-0.5">{explanation.fixDetails}</p>
              </div>

              <div className="pt-2 border-t border-[#123827]">
                <span className="text-lime-400 font-bold block text-[11px] uppercase">Key Takeaway for Students:</span>
                <p className="text-lime-200/90 leading-relaxed font-sans mt-0.5">{explanation.takeaway}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#04120b] border-t border-[#14422e]">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-bold text-emerald-300 hover:text-emerald-100 hover:bg-[#0c2f21] rounded-xl transition-colors cursor-pointer"
          >
            Return to Map
          </button>

          {onNextChallenge && (
            <button
              onClick={onNextChallenge}
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-black text-slate-950 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 rounded-xl shadow-lg shadow-orange-950/60 transition-all cursor-pointer uppercase tracking-wider"
            >
              <span>Next Specimen</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

interface GameOverModalProps {
  isOpen: boolean;
  onRevive: () => void;
  onRestart: () => void;
  userCoins: number;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  onRevive,
  onRestart,
  userCoins,
}) => {
  if (!isOpen) return null;

  const canAffordRevive = userCoins >= 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="w-full max-w-md bg-[#091a13] border-2 border-orange-600/60 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="px-6 py-6 bg-gradient-to-b from-[#2a0e0e] to-[#091a13] border-b border-orange-900/60 text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-orange-500/20 border-2 border-orange-500 flex items-center justify-center text-orange-400 shadow-[0_0_25px_rgba(249,115,22,0.4)]">
            <AlertOctagon className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-black text-slate-100 tracking-tight">Expedition Overrun · No Lives Left</h2>
          <p className="text-xs text-orange-400 mt-1 font-mono font-bold">You have run out of safari hearts (0/3 remaining).</p>
        </div>

        <div className="p-6 space-y-4 text-xs text-emerald-200/80">
          <p className="leading-relaxed font-sans">
            Incorrect test runs damaged your field equipment. Restock your expedition kit using Cyber Coins or reboot the scanner.
          </p>

          <div className="p-3.5 bg-[#05170f] rounded-2xl border border-[#164632] flex items-center justify-between font-mono">
            <span className="text-emerald-400">Your Coin Balance:</span>
            <span className="text-amber-400 font-extrabold flex items-center gap-1.5 text-sm">
              <Coins className="w-4 h-4" /> {userCoins}
            </span>
          </div>

          <div className="space-y-2 pt-2">
            <button
              onClick={onRevive}
              disabled={!canAffordRevive}
              className={`w-full py-3 px-4 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer uppercase tracking-wider ${
                canAffordRevive
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 shadow-lg shadow-orange-950/50'
                  : 'bg-[#082016] text-emerald-800 cursor-not-allowed border border-[#123827]'
              }`}
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Revive Explorer (-100 Coins)</span>
            </button>

            <button
              onClick={onRestart}
              className="w-full py-3 px-4 bg-[#0c2e1f] hover:bg-[#12402b] text-emerald-200 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer border border-[#1c553d]"
            >
              <RotateCcw className="w-4 h-4 text-emerald-400" />
              <span>Free Camp Restart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
