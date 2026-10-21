import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Flame, Shield, ArrowUp, Star, Award, Compass } from 'lucide-react';
import { LeaderboardEntry, User } from '../types/game';
import { api } from '../services/api';

interface LeaderboardScreenProps {
  currentUser: User | null;
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ currentUser }) => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'global' | 'streaks'>('global');

  useEffect(() => {
    async function load() {
      try {
        const res = await api.getLeaderboard();
        setEntries(res.leaderboard);
      } catch (err) {
        console.error('Failed to load leaderboard', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const sortedEntries = [...entries].sort((a, b) => {
    if (activeTab === 'streaks') {
      return b.streak - a.streak;
    }
    return b.score - a.score;
  });

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-8 bg-[#04140d]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-lime-400 font-extrabold uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-orange-400" />
            <span>Safari Expedition Hall of Fame</span>
          </div>
          <h1 className="text-3xl font-black text-slate-100 tracking-tight">Master Bug Hunters</h1>
          <p className="text-xs text-emerald-300/80 mt-1">
            Top explorers ranked by trapped specimens, flawless first-runs, and safari expedition streaks.
          </p>
        </div>

        {/* Tab Filter */}
        <div className="flex items-center gap-1 p-1 bg-[#082216] border border-[#164632] rounded-2xl">
          <button
            onClick={() => setActiveTab('global')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
              activeTab === 'global' ? 'bg-[#0e3b29] text-lime-300 shadow-sm' : 'text-emerald-400/70 hover:text-emerald-200'
            }`}
          >
            All-Time XP
          </button>
          <button
            onClick={() => setActiveTab('streaks')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
              activeTab === 'streaks' ? 'bg-[#0e3b29] text-orange-400 shadow-sm' : 'text-emerald-400/70 hover:text-emerald-200'
            }`}
          >
            Longest Streaks
          </button>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="bg-[#082216] border-2 border-[#164632] rounded-3xl overflow-hidden shadow-2xl">
        {loading ? (
          <div className="py-16 text-center text-emerald-500 font-mono text-xs">
            Scanning regional safari ranger stations...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="bg-[#04120b] border-b border-[#14422e] text-emerald-400/70 uppercase text-[11px] font-bold">
                  <th className="py-4 px-5 w-16">Rank</th>
                  <th className="py-4 px-5">Explorer Codename</th>
                  <th className="py-4 px-5">Safari Zone</th>
                  <th className="py-4 px-5 text-center">Bugs Trapped</th>
                  <th className="py-4 px-5 text-center">Streak</th>
                  <th className="py-4 px-5 text-right">Total Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#123827]">
                {sortedEntries.map((entry, index) => {
                  const isCurrent = currentUser && currentUser.id === entry.userId;
                  const rank = index + 1;

                  return (
                    <tr
                      key={entry.userId}
                      className={`transition-colors ${
                        isCurrent
                          ? 'bg-lime-950/40 border-l-4 border-l-lime-400'
                          : 'hover:bg-[#0c2f21]'
                      }`}
                    >
                      <td className="py-4 px-5 font-bold text-slate-300">
                        {rank === 1 ? (
                          <span className="text-amber-400 flex items-center gap-1 font-black">
                            <Trophy className="w-4 h-4 fill-amber-400" /> #1
                          </span>
                        ) : rank === 2 ? (
                          <span className="text-slate-300 flex items-center gap-1 font-bold">
                            <Medal className="w-4 h-4 fill-slate-300" /> #2
                          </span>
                        ) : rank === 3 ? (
                          <span className="text-amber-600 flex items-center gap-1 font-bold">
                            <Medal className="w-4 h-4 fill-amber-600" /> #3
                          </span>
                        ) : (
                          <span className="text-emerald-600 font-bold">#{rank}</span>
                        )}
                      </td>

                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-[#092b1d] border border-[#1b5038] flex items-center justify-center text-lime-400 font-black uppercase text-xs shadow-sm">
                            {entry.username.charAt(0)}
                          </div>
                          <div>
                            <div className="font-extrabold text-emerald-100 flex items-center gap-1.5">
                              <span>{entry.username}</span>
                              {isCurrent && (
                                <span className="text-[10px] text-lime-400 bg-lime-950 px-2 py-0.2 rounded-full border border-lime-800 font-bold">
                                  YOU
                                </span>
                              )}
                            </div>
                            {entry.topBadge && (
                              <div className="text-[10px] text-emerald-400/80 font-sans">{entry.topBadge}</div>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-5">
                        <span className="text-emerald-300 font-bold">Zone {entry.currentLevel}</span>
                      </td>

                      <td className="py-4 px-5 text-center tabular-nums text-emerald-200 font-bold">
                        {entry.solvedCount}
                      </td>

                      <td className="py-4 px-5 text-center">
                        <span className="text-orange-400 font-black flex items-center justify-center gap-1">
                          <Flame className="w-3.5 h-3.5 fill-orange-400" /> {entry.streak}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-right tabular-nums font-black text-lime-400 text-sm">
                        {entry.score.toLocaleString()} XP
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
