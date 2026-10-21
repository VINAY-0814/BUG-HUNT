/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar';
import { AuthModal } from './components/AuthModal';
import { CyberShopModal } from './components/CyberShopModal';
import { VictoryModal, GameOverModal } from './components/OutcomeModals';
import { LandingScreen } from './screens/LandingScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { ArenaScreen } from './screens/ArenaScreen';
import { ArcadeBlitzScreen } from './screens/ArcadeBlitzScreen';
import { LeaderboardScreen } from './screens/LeaderboardScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { VivariumScreen } from './screens/VivariumScreen';
import { ArchitectureScreen } from './screens/ArchitectureScreen';
import { LoginScreen } from './screens/LoginScreen';
import { api } from './services/api';
import { User, Challenge, RunSubmissionResult } from './types/game';
import { soundManager } from './utils/audio';

type Screen = 'landing' | 'dashboard' | 'arena' | 'arcade' | 'vivarium' | 'leaderboard' | 'profile' | 'architecture' | 'login';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [challenges, setChallenges] = useState<(Challenge & { isUnlocked: boolean; isSolved: boolean })[]>([]);
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isVictoryOpen, setIsVictoryOpen] = useState(false);
  const [isGameOverOpen, setIsGameOverOpen] = useState(false);
  const [lastRunResult, setLastRunResult] = useState<RunSubmissionResult | null>(null);

  // Audio mute state
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  // Retro CRT Scanline Arcade FX
  const [isCrtEnabled, setIsCrtEnabled] = useState(false);

  // Initial user & challenges bootstrap
  useEffect(() => {
    async function bootstrap() {
      // 1. Check if authenticated
      if (api.getToken()) {
        try {
          const res = await api.getMe();
          setUser(res.user);
        } catch {
          api.clearToken();
          setUser(null);
        }
      }

      // 2. Load challenges
      await loadChallenges();
    }

    bootstrap();
  }, []);

  const loadChallenges = async () => {
    try {
      const res = await api.getChallenges();
      setChallenges(res.challenges);
      setUnlockedLevel(res.unlockedLevel);
    } catch (err) {
      console.error('Failed to load challenges', err);
    }
  };

  const refreshUserData = async () => {
    if (api.getToken()) {
      try {
        const res = await api.getMe();
        setUser(res.user);
      } catch {
        // ignore
      }
    }
    await loadChallenges();
  };

  // Screen selection
  const handleNavigate = (screen: Screen) => {
    soundManager.playKey();
    setCurrentScreen(screen);
  };

  // Launch specific challenge
  const handleSelectChallenge = async (challengeId: string) => {
    try {
      const res = await api.getChallenge(challengeId);
      setActiveChallenge(res.challenge);
      setCurrentScreen('arena');
    } catch (err: any) {
      alert(err.message || 'Failed to load challenge.');
    }
  };

  // Challenge success handler
  const handleChallengeSuccess = async (result: RunSubmissionResult) => {
    setLastRunResult(result);
    setIsVictoryOpen(true);
    await refreshUserData();
  };

  // Challenge game over handler
  const handleGameOver = () => {
    setIsGameOverOpen(true);
  };

  // Revive user with coins
  const handleRevive = async () => {
    try {
      await api.reviveUser();
      soundManager.playSuccess();
      setIsGameOverOpen(false);
      await refreshUserData();
    } catch (err: any) {
      alert(err.message || 'Revive failed.');
    }
  };

  // Free restart on game over
  const handleRestart = async () => {
    try {
      await api.restartUser();
      setIsGameOverOpen(false);
      await refreshUserData();
    } catch (err: any) {
      alert(err.message || 'Restart failed.');
    }
  };

  // Next challenge trigger
  const handleNextChallenge = async () => {
    setIsVictoryOpen(false);
    if (lastRunResult?.nextChallengeId) {
      handleSelectChallenge(lastRunResult.nextChallengeId);
    } else {
      // Find next unsolved challenge
      const unsolved = challenges.find(c => c.isUnlocked && !c.isSolved && c.id !== activeChallenge?.id);
      if (unsolved) {
        handleSelectChallenge(unsolved.id);
      } else {
        setCurrentScreen('dashboard');
      }
    }
  };

  const handleToggleMute = () => {
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleCrt = () => {
    setIsCrtEnabled(!isCrtEnabled);
  };

  const handleLogout = async () => {
    await api.logout();
    setUser(null);
    setCurrentScreen('landing');
    await loadChallenges();
  };

  return (
    <div className={`min-h-screen bg-[#04140d] text-slate-100 flex flex-col font-sans relative ${
      isCrtEnabled ? 'before:pointer-events-none before:absolute before:inset-0 before:z-50 before:bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] before:[background-size:100%_4px]' : ''
    }`}>
      {/* Top Bar Contract (3 zones) */}
      <TopBar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        user={user}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenShop={() => setIsShopOpen(true)}
        onLogout={handleLogout}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isCrtEnabled={isCrtEnabled}
        onToggleCrt={handleToggleCrt}
      />

      {/* Screen Router */}
      <main className="flex-1 flex flex-col">
        {currentScreen === 'landing' && (
          <LandingScreen
            onStartGame={() => setCurrentScreen('dashboard')}
            onSelectChallenge={handleSelectChallenge}
            onOpenVivarium={() => setCurrentScreen('vivarium')}
            onOpenLogin={() => setCurrentScreen('login')}
          />
        )}

        {currentScreen === 'dashboard' && (
          <DashboardScreen
            user={user}
            challenges={challenges}
            unlockedLevel={unlockedLevel}
            onSelectChallenge={handleSelectChallenge}
            onOpenAuth={() => setIsAuthOpen(true)}
            onOpenShop={() => setIsShopOpen(true)}
            onOpenVivarium={() => setCurrentScreen('vivarium')}
          />
        )}

        {currentScreen === 'arena' && activeChallenge && (
          <ArenaScreen
            challenge={activeChallenge}
            user={user}
            onBack={() => setCurrentScreen('dashboard')}
            onSuccess={handleChallengeSuccess}
            onGameOver={handleGameOver}
            onOpenShop={() => setIsShopOpen(true)}
            onUserUpdated={(updatedUser) => setUser(updatedUser)}
          />
        )}

        {currentScreen === 'arcade' && (
          <ArcadeBlitzScreen
            user={user}
            onBack={() => setCurrentScreen('dashboard')}
            onCoinsAwarded={async () => {
              await refreshUserData();
            }}
          />
        )}

        {currentScreen === 'vivarium' && (
          <VivariumScreen
            user={user}
            challenges={challenges}
            onBack={() => setCurrentScreen('dashboard')}
            onSelectChallenge={handleSelectChallenge}
          />
        )}

        {currentScreen === 'leaderboard' && (
          <LeaderboardScreen currentUser={user} />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            user={user}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {currentScreen === 'architecture' && (
          <ArchitectureScreen />
        )}

        {currentScreen === 'login' && (
          <LoginScreen
            onAuthSuccess={async (authedUser) => {
              setUser(authedUser);
              await loadChallenges();
              setCurrentScreen('dashboard');
            }}
            onCancel={() => setCurrentScreen(user ? 'dashboard' : 'landing')}
            onNavigateToArchitecture={() => setCurrentScreen('architecture')}
          />
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onOpenFullLoginPage={() => setCurrentScreen('login')}
        onAuthSuccess={async (authedUser) => {
          setUser(authedUser);
          await loadChallenges();
          if (currentScreen === 'landing') {
            setCurrentScreen('dashboard');
          }
        }}
      />

      {/* Cyber Shop Modal */}
      <CyberShopModal
        isOpen={isShopOpen}
        onClose={() => setIsShopOpen(false)}
        user={user}
        onUserUpdated={(updated) => setUser(updated)}
      />

      {/* Victory Modal with Post-Mortem Bug Explanation */}
      <VictoryModal
        isOpen={isVictoryOpen}
        onClose={() => {
          setIsVictoryOpen(false);
          setCurrentScreen('dashboard');
        }}
        onNextChallenge={handleNextChallenge}
        pointsEarned={lastRunResult?.pointsEarned || 100}
        coinsEarned={lastRunResult?.coinsEarned || 20}
        xpEarned={lastRunResult?.xpEarned || 100}
        newBadges={lastRunResult?.newBadgesUnlocked || []}
        explanation={lastRunResult?.explanation || activeChallenge?.explanation}
      />

      {/* Game Over Modal */}
      <GameOverModal
        isOpen={isGameOverOpen}
        onRevive={handleRevive}
        onRestart={handleRestart}
        userCoins={user?.stats.coins || 0}
      />
    </div>
  );
}
