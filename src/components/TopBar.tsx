import React, { useState } from 'react';
import { Volume2, VolumeX, Heart, Coins, User as UserIcon, LogOut, ShoppingCart, Zap, Tv, Music, Compass } from 'lucide-react';
import { User } from '../types/game';
import { soundManager } from '../utils/audio';
import { BugHuntLogo } from './BugHuntLogo';

interface TopBarProps {
  currentScreen: 'landing' | 'dashboard' | 'arena' | 'arcade' | 'vivarium' | 'leaderboard' | 'profile' | 'architecture' | 'login';
  onNavigate: (screen: 'landing' | 'dashboard' | 'arena' | 'arcade' | 'vivarium' | 'leaderboard' | 'profile' | 'architecture' | 'login') => void;
  user: User | null;
  onOpenAuth: () => void;
  onOpenShop: () => void;
  onLogout: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isCrtEnabled: boolean;
  onToggleCrt: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentScreen,
  onNavigate,
  user,
  onOpenAuth,
  onOpenShop,
  onLogout,
  isMuted,
  onToggleMute,
  isCrtEnabled,
  onToggleCrt,
}) => {
  const [isMusicActive, setIsMusicActive] = useState(soundManager.getMusicOn());

  const handleToggleMusic = () => {
    const active = soundManager.toggleMusic();
    setIsMusicActive(active);
    soundManager.playKey();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#061710]/95 backdrop-blur-md border-b border-[#164632]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 px-6 py-2.5">
        {/* Zone 1: Brand wordmark / Logo */}
        <button
          onClick={() => onNavigate(user ? 'dashboard' : 'landing')}
          className="flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer whitespace-nowrap shrink-0"
        >
          <BugHuntLogo size="sm" />
        </button>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-emerald-200/80">
          <button
            onClick={() => onNavigate('dashboard')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:text-lime-300 ${
              currentScreen === 'dashboard' ? 'text-lime-400 font-bold drop-shadow-[0_0_8px_rgba(132,204,22,0.5)]' : ''
            }`}
          >
            Expedition Map
          </button>
          <button
            onClick={() => onNavigate('vivarium')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:text-lime-300 ${
              currentScreen === 'vivarium' ? 'text-lime-400 font-bold drop-shadow-[0_0_8px_rgba(132,204,22,0.5)]' : ''
            }`}
          >
            <span className="text-sm">🏺</span>
            <span>Bug Vivarium</span>
          </button>
          <button
            onClick={() => onNavigate('arcade')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:text-orange-300 ${
              currentScreen === 'arcade' ? 'text-orange-400 font-bold drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]' : ''
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-orange-400" />
            <span>Bug Blitz</span>
          </button>
          <button
            onClick={() => onNavigate('leaderboard')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:text-lime-300 ${
              currentScreen === 'leaderboard' ? 'text-lime-400 font-bold drop-shadow-[0_0_8px_rgba(132,204,22,0.5)]' : ''
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:text-lime-300 ${
              currentScreen === 'profile' ? 'text-lime-400 font-bold drop-shadow-[0_0_8px_rgba(132,204,22,0.5)]' : ''
            }`}
          >
            Explorer Dossier
          </button>
          <button
            onClick={() => onNavigate('architecture')}
            className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer hover:text-lime-300 ${
              currentScreen === 'architecture' ? 'text-lime-400 font-bold drop-shadow-[0_0_8px_rgba(132,204,22,0.5)]' : ''
            }`}
          >
            <span>Architecture</span>
            <span className="text-[9px] px-1.5 py-0.5 bg-[#082b1d] border border-emerald-600/50 text-emerald-400 rounded font-mono font-bold tracking-tight">
              MongoDB
            </span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action / user cluster */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Chiptune Safari Adventure BGM Toggle */}
          <button
            onClick={handleToggleMusic}
            title={isMusicActive ? 'Mute Safari Adventure Chiptune Music' : 'Play Safari Adventure Chiptune Music'}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isMusicActive
                ? 'bg-lime-950 text-lime-400 border border-lime-500/50 shadow-[0_0_10px_rgba(132,204,22,0.3)] animate-pulse'
                : 'text-emerald-500 hover:text-emerald-200 hover:bg-[#0c2b1e]'
            }`}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* CRT Scanline Retro Mode Toggle */}
          <button
            onClick={() => {
              onToggleCrt();
              soundManager.playKey();
            }}
            title={isCrtEnabled ? 'Disable CRT Scanlines' : 'Enable CRT Arcade Scanlines'}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              isCrtEnabled ? 'bg-emerald-950 text-lime-400 border border-lime-500/40' : 'text-emerald-500 hover:text-emerald-200 hover:bg-[#0c2b1e]'
            }`}
          >
            <Tv className="w-4 h-4" />
          </button>

          {/* Sound FX Mute Toggle */}
          <button
            onClick={() => {
              onToggleMute();
              soundManager.playKey();
            }}
            title={isMuted ? 'Unmute game sounds' : 'Mute game sounds'}
            className="p-2 text-emerald-500 hover:text-emerald-200 hover:bg-[#0c2b1e] rounded-lg transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-emerald-700" /> : <Volume2 className="w-4 h-4 text-lime-400" />}
          </button>

          {/* Cyber Shop Quick Button */}
          {user && (
            <button
              onClick={() => {
                soundManager.playKey();
                onOpenShop();
              }}
              title="Open Explorer Gear Shop"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/40 rounded-lg text-orange-400 text-xs font-mono font-bold transition-all cursor-pointer shadow-[0_0_10px_rgba(249,115,22,0.2)]"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Gear</span>
            </button>
          )}

          {/* User Status / Auth CTA */}
          {user ? (
            <div className="flex items-center gap-2.5">
              {/* Clean unboxed stats */}
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-emerald-300/80">
                <span className="flex items-center gap-1 text-rose-400">
                  <Heart className="w-3.5 h-3.5 fill-rose-500" />
                  <span className="tabular-nums font-bold">{user.stats.lives}/{user.stats.maxLives}</span>
                </span>
                <span aria-hidden="true" className="text-emerald-700">·</span>
                <span className="flex items-center gap-1 text-amber-400">
                  <Coins className="w-3.5 h-3.5" />
                  <span className="tabular-nums font-bold">{user.stats.coins}</span>
                </span>
              </div>

              {/* Profile Avatar / Codename */}
              <button
                onClick={() => onNavigate('profile')}
                className="flex items-center gap-2 px-3 py-1.5 bg-[#0b271b] hover:bg-[#113827] border border-[#1b533b] rounded-lg text-xs font-mono text-emerald-200 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <UserIcon className="w-3.5 h-3.5 text-lime-400" />
                <span className="truncate max-w-[80px] font-bold">{user.username}</span>
              </button>

              <button
                onClick={onLogout}
                title="Disconnect terminal (Sign Out)"
                className="p-1.5 text-emerald-600 hover:text-rose-400 hover:bg-[#0b271b] rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                soundManager.playKey();
                onNavigate('login');
              }}
              className="px-4 py-2 text-xs font-extrabold text-slate-950 bg-gradient-to-r from-orange-500 via-amber-500 to-lime-500 hover:from-orange-400 hover:to-lime-400 active:scale-95 rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-[0_0_18px_rgba(234,88,12,0.4)]"
            >
              Explorer Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
