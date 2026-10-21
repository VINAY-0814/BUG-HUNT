import React, { useState, useEffect } from 'react';
import { Shield, Award, Flame, Heart, Coins, CheckCircle2, Lock, Sparkles, User as UserIcon, Compass } from 'lucide-react';
import { User, Badge } from '../types/game';
import { api } from '../services/api';

interface ProfileScreenProps {
  user: User | null;
  onOpenAuth: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ user, onOpenAuth }) => {
  const [badges, setBadges] = useState<Badge[]>([]);

  useEffect(() => {
    async function fetchBadges() {
      try {
        const res = await api.getBadges();
        setBadges(res.badges);
      } catch (err) {
        console.error('Failed to load badges', err);
      }
    }
    fetchBadges();
  }, []);

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center space-y-4 bg-[#04140d]">
        <Compass className="w-12 h-12 text-lime-400 mx-auto" />
        <h2 className="text-2xl font-black text-slate-100">Explorer Dossier Locked</h2>
        <p className="text-xs text-emerald-300/80">
          Sign in or create an explorer profile to track your safari rank, trapped specimens, and achievement medals.
        </p>
        <button
          onClick={onOpenAuth}
          className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer uppercase tracking-wider"
        >
          Sign In to Access Dossier
        </button>
      </div>
    );
  }

  const userBadgeIds = new Set(user.badges);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8 bg-[#04140d]">
      {/* Dossier Header Card */}
      <div className="p-6 bg-[#082216] border-2 border-[#164632] rounded-3xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-lime-500 to-orange-500 p-0.5 shadow-lg shadow-orange-950/40">
            <div className="w-full h-full bg-[#05170f] rounded-[14px] flex items-center justify-center text-lime-400 text-2xl font-black font-mono">
              {user.username.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-100">{user.username}</h1>
              <span className="text-xs font-mono font-bold text-lime-400 bg-lime-950/80 border border-lime-800/80 px-2.5 py-0.5 rounded-full">
                Safari Rank: Zone {user.stats.unlockedLevel}
              </span>
            </div>
            <div className="text-xs text-emerald-300/70 font-mono">
              <span>Explorer ID: {user.id}</span>
              <span className="mx-2 text-emerald-700">·</span>
              <span>Enlisted: {new Date(user.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        {/* Currency & Lives Quick HUD */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="p-3 bg-[#05170f] rounded-2xl border border-[#164632] text-center min-w-[80px]">
            <div className="text-emerald-500 font-bold text-[10px] uppercase">LIVES</div>
            <div className="text-rose-400 font-extrabold text-sm flex items-center justify-center gap-1">
              <Heart className="w-3.5 h-3.5 fill-rose-500" />
              <span>{user.stats.lives}/{user.stats.maxLives}</span>
            </div>
          </div>

          <div className="p-3 bg-[#05170f] rounded-2xl border border-[#164632] text-center min-w-[80px]">
            <div className="text-emerald-500 font-bold text-[10px] uppercase">COINS</div>
            <div className="text-amber-400 font-extrabold text-sm flex items-center justify-center gap-1">
              <Coins className="w-3.5 h-3.5" />
              <span>{user.stats.coins}</span>
            </div>
          </div>

          <div className="p-3 bg-[#05170f] rounded-2xl border border-[#164632] text-center min-w-[80px]">
            <div className="text-emerald-500 font-bold text-[10px] uppercase">STREAK</div>
            <div className="text-orange-400 font-extrabold text-sm flex items-center justify-center gap-1">
              <Flame className="w-3.5 h-3.5 fill-orange-400" />
              <span>{user.stats.streak}d</span>
            </div>
          </div>
        </div>
      </div>

      {/* Operative Telemetry Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-[#082216] border border-[#164632] rounded-2xl">
          <div className="text-xs text-emerald-400 font-mono uppercase font-bold">Total XP Score</div>
          <div className="text-2xl font-black font-mono text-lime-400 mt-1">{user.stats.score.toLocaleString()}</div>
        </div>
        <div className="p-4 bg-[#082216] border border-[#164632] rounded-2xl">
          <div className="text-xs text-emerald-400 font-mono uppercase font-bold">Bugs Trapped</div>
          <div className="text-2xl font-black font-mono text-emerald-300 mt-1">{user.stats.solvedChallengeIds.length}</div>
        </div>
        <div className="p-4 bg-[#082216] border border-[#164632] rounded-2xl">
          <div className="text-xs text-emerald-400 font-mono uppercase font-bold">Flawless Solves</div>
          <div className="text-2xl font-black font-mono text-orange-400 mt-1">{user.stats.perfectFixesCount}</div>
        </div>
        <div className="p-4 bg-[#082216] border border-[#164632] rounded-2xl">
          <div className="text-xs text-emerald-400 font-mono uppercase font-bold">Clues Consulted</div>
          <div className="text-2xl font-black font-mono text-amber-400 mt-1">{user.stats.hintsUsedCount}</div>
        </div>
      </div>

      {/* Badges & Achievements Catalog */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-slate-100 tracking-tight">Safari Medals & Honors</h2>
            <p className="text-xs text-emerald-300/80">Medals earned for code exploits and specimen captures.</p>
          </div>
          <div className="text-xs font-mono font-bold text-lime-400">
            {user.badges.length} / {badges.length} Medals Unlocked
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge) => {
            const isUnlocked = userBadgeIds.has(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${
                  isUnlocked
                    ? 'bg-[#09291b] border-lime-500/50 shadow-[0_0_15px_rgba(132,204,22,0.1)]'
                    : 'bg-[#05170f] border-[#0e3122] opacity-60'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                    isUnlocked
                      ? 'bg-lime-500/20 text-lime-400 border border-lime-500/40 shadow-sm'
                      : 'bg-[#05170f] text-emerald-800 border border-[#103525]'
                  }`}
                >
                  {isUnlocked ? <Award className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs text-emerald-100">{badge.name}</span>
                    {isUnlocked && (
                      <span className="text-[10px] text-lime-400 font-mono font-bold">UNLOCKED</span>
                    )}
                  </div>
                  <p className="text-xs text-emerald-200/70 leading-relaxed">{badge.description}</p>
                  <div className="text-[10px] text-emerald-500 font-mono font-semibold">
                    Criteria: {badge.criteria}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
