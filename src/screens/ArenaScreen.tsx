import React, { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Heart, Lightbulb, AlertTriangle, Shield, CheckCircle2, Bug, HelpCircle, ChevronRight, Zap, Skull, Swords, Eye, Sparkles } from 'lucide-react';
import { Challenge, TestResult, RunSubmissionResult, User } from '../types/game';
import { CodeEditor } from '../components/CodeEditor';
import { TestRunner } from '../components/TestRunner';
import { api } from '../services/api';
import { soundManager } from '../utils/audio';

interface ArenaScreenProps {
  challenge: Challenge;
  user: User | null;
  onBack: () => void;
  onSuccess: (result: RunSubmissionResult) => void;
  onGameOver: () => void;
  onOpenShop?: () => void;
  onUserUpdated?: (user: User) => void;
}

export const ArenaScreen: React.FC<ArenaScreenProps> = ({
  challenge,
  user,
  onBack,
  onSuccess,
  onGameOver,
  onOpenShop,
  onUserUpdated,
}) => {
  const [code, setCode] = useState(challenge.starterCode);
  const [timeLeft, setTimeLeft] = useState(challenge.timeLimit);
  const [timerActive, setTimerActive] = useState(true);
  const [revealedHints, setRevealedHints] = useState<number>(0);
  const [selectedBugLine, setSelectedBugLine] = useState<number | null>(null);

  // Game Feature States
  const [shieldActive, setShieldActive] = useState(false);
  const [screenGlitch, setScreenGlitch] = useState(false);
  const [duelMode, setDuelMode] = useState(false);
  const [botProgress, setBotProgress] = useState(0); // 0 to 100%
  const [botStatus, setBotStatus] = useState<'analyzing' | 'coding' | 'testing' | 'patched'>('analyzing');
  const [bossHp, setBossHp] = useState(100);

  // Test Runner state
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [passedTestsCount, setPassedTestsCount] = useState(0);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [compileError, setCompileError] = useState<string | undefined>();
  const [executionTimeTotalMs, setExecutionTimeTotalMs] = useState(0);

  // Reset state when challenge changes
  useEffect(() => {
    setCode(challenge.starterCode);
    setTimeLeft(challenge.timeLimit);
    setTimerActive(true);
    setRevealedHints(0);
    setSelectedBugLine(null);
    setHasRun(false);
    setTestResults([]);
    setPassedTestsCount(0);
    setConsoleLogs([]);
    setCompileError(undefined);
    setExecutionTimeTotalMs(0);
    setShieldActive(false);
    setBossHp(100);
    setBotProgress(0);
    setBotStatus('analyzing');

    if (challenge.isBoss) {
      soundManager.playBossAlert();
    }
  }, [challenge.id]);

  // Countdown timer effect
  useEffect(() => {
    if (!timerActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimerActive(false);
          soundManager.playError();
          return 0;
        }
        if (prev <= 10) {
          soundManager.playTone(800, 'sine', 0.03, 0.02);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerActive, timeLeft]);

  // AI Duel Rival Simulation
  useEffect(() => {
    if (!duelMode || !timerActive || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setBotProgress(prev => {
        if (prev >= 100) return 100;
        const inc = Math.floor(Math.random() * 8) + 3;
        const next = Math.min(100, prev + inc);
        if (next > 70) setBotStatus('testing');
        else if (next > 25) setBotStatus('coding');
        return next;
      });
    }, 2400);

    return () => clearInterval(interval);
  }, [duelMode, timerActive, timeLeft]);

  // Trigger glitch animation
  const triggerGlitch = () => {
    setScreenGlitch(true);
    setTimeout(() => setScreenGlitch(false), 400);
  };

  // Handle Run Tests
  const handleRunTests = async () => {
    setIsRunning(true);
    setCompileError(undefined);
    try {
      const res = await api.runCode(challenge.id, code, false, revealedHints, timeLeft);
      setHasRun(true);
      setTestResults(res.testResults || []);
      setPassedTestsCount(res.passedTestsCount || 0);
      setConsoleLogs(res.consoleLogs || []);
      setCompileError(res.compileError);
      setExecutionTimeTotalMs(res.executionTimeTotalMs || 0);

      if (res.passed) {
        soundManager.playSuccess();
        if (challenge.isBoss) {
          soundManager.playBossHit();
          setBossHp(0);
        }
      } else {
        soundManager.playError();
        triggerGlitch();
        if (challenge.isBoss) {
          const percent = challenge.testCases.length > 0
            ? Math.round(100 - (res.passedTestsCount / challenge.testCases.length) * 100)
            : 100;
          setBossHp(percent);
        }
      }
    } catch (err: any) {
      soundManager.playError();
      setCompileError(err.message || 'Execution failed.');
      setHasRun(true);
      triggerGlitch();
    } finally {
      setIsRunning(false);
    }
  };

  // Handle Submit
  const handleSubmit = async () => {
    setIsSubmitting(true);
    setCompileError(undefined);
    try {
      const res = await api.runCode(challenge.id, code, true, revealedHints, timeLeft);
      setHasRun(true);
      setTestResults(res.testResults || []);
      setPassedTestsCount(res.passedTestsCount || 0);
      setConsoleLogs(res.consoleLogs || []);
      setCompileError(res.compileError);
      setExecutionTimeTotalMs(res.executionTimeTotalMs || 0);

      if (res.passed) {
        setTimerActive(false);
        soundManager.playSuccess();
        if (challenge.isBoss) {
          soundManager.playBossHit();
          setBossHp(0);
        }
        onSuccess(res);
      } else {
        triggerGlitch();
        if (shieldActive) {
          soundManager.playTone(550, 'triangle', 0.2, 0.08);
          setShieldActive(false);
        } else {
          soundManager.playHeartLost();
          if (res.livesRemaining !== undefined && res.livesRemaining <= 0) {
            onGameOver();
          }
        }
      }
    } catch (err: any) {
      soundManager.playError();
      setCompileError(err.message || 'Submission failed');
      triggerGlitch();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRevealNextHint = () => {
    if (revealedHints < challenge.hints.length) {
      soundManager.playHint();
      setRevealedHints(prev => prev + 1);
    }
  };

  const handleResetCode = () => {
    soundManager.playKey();
    setCode(challenge.starterCode);
    setHasRun(false);
    setCompileError(undefined);
  };

  const handleSelectLine = (lineNum: number) => {
    soundManager.playKey();
    setSelectedBugLine(prev => (prev === lineNum ? null : lineNum));
  };

  // Power-up triggers
  const inventory = user?.stats.inventory || { shield: 0, overclock: 0, xray: 0 };

  const handleUseShield = async () => {
    if (shieldActive || inventory.shield <= 0 || !user) return;
    try {
      const res = await api.usePerk('shield');
      setShieldActive(true);
      soundManager.playPowerUp();
      if (onUserUpdated) onUserUpdated(res.user);
    } catch {
      // ignore
    }
  };

  const handleUseOverclock = async () => {
    if (inventory.overclock <= 0 || !user) return;
    try {
      const res = await api.usePerk('overclock');
      setTimeLeft(prev => prev + 45);
      soundManager.playPowerUp();
      if (onUserUpdated) onUserUpdated(res.user);
    } catch {
      // ignore
    }
  };

  const handleUseXRay = async () => {
    if (inventory.xray <= 0 || !user) return;
    try {
      const res = await api.usePerk('xray');
      if (challenge.buggyLineHint) {
        setSelectedBugLine(challenge.buggyLineHint);
      }
      soundManager.playPowerUp();
      if (onUserUpdated) onUserUpdated(res.user);
    } catch {
      // ignore
    }
  };

  return (
    <div className={`flex flex-col h-[calc(100vh-65px)] overflow-hidden bg-[#04140d] transition-colors duration-200 ${
      screenGlitch ? 'bg-orange-950/40 invert-[0.1]' : ''
    }`}>
      {/* Top Arena HUD Bar */}
      <div className="flex items-center justify-between px-6 py-2.5 bg-[#061a12] border-b border-[#164632] text-xs shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-3 py-1 bg-[#09291b] hover:bg-[#0f3d29] text-emerald-300 rounded-lg transition-colors cursor-pointer border border-[#1b5038]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Map</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-mono text-lime-400 font-bold uppercase">{challenge.difficulty}</span>
            <span className="text-emerald-800">/</span>
            <span className="text-emerald-100 font-semibold">{challenge.title}</span>
            {challenge.isBoss && (
              <span className="flex items-center gap-1 px-2.5 py-0.5 bg-orange-950/80 border border-orange-600 text-orange-400 text-[10px] font-extrabold font-mono rounded-full">
                <Skull className="w-3 h-3" /> BOSS DAEMON
              </span>
            )}
          </div>
        </div>

        {/* Action Controls & Meters */}
        <div className="flex items-center gap-6 font-mono">
          {/* Duel Mode Toggle */}
          <button
            onClick={() => {
              soundManager.playKey();
              setDuelMode(!duelMode);
            }}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-all cursor-pointer ${
              duelMode
                ? 'bg-orange-950/80 border-orange-500 text-orange-300 shadow-[0_0_10px_rgba(249,115,22,0.3)] font-bold'
                : 'bg-[#04120b] border-[#14422e] text-emerald-400 hover:text-emerald-200'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            <span>Duel Mode: {duelMode ? 'ON' : 'OFF'}</span>
          </button>

          {/* Countdown Clock */}
          <div className={`flex items-center gap-1.5 ${timeLeft <= 20 ? 'text-orange-400 animate-pulse font-bold' : 'text-emerald-300'}`}>
            <Clock className="w-3.5 h-3.5" />
            <span className="tabular-nums font-bold">
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
            </span>
          </div>

          {/* Operative Lives */}
          {user && (
            <div className="flex items-center gap-1 text-rose-400">
              <Heart className={`w-3.5 h-3.5 ${shieldActive ? 'fill-lime-400 text-lime-400' : 'fill-rose-500'}`} />
              <span className="font-bold tabular-nums">
                {user.stats.lives}/{user.stats.maxLives}
              </span>
              {shieldActive && (
                <span className="text-[10px] text-lime-400 font-bold ml-1 bg-lime-950 px-1 rounded border border-lime-800">
                  SHIELD
                </span>
              )}
            </div>
          )}

          {/* Points Potential */}
          <div className="text-lime-400 font-extrabold">
            +{Math.max(30, challenge.points - revealedHints * 25)} PTS
          </div>
        </div>
      </div>

      {/* Duel Progress Bar Strip */}
      {duelMode && (
        <div className="bg-[#04140d] border-b border-orange-900/50 px-6 py-2 flex items-center justify-between text-xs font-mono shrink-0">
          <div className="flex items-center gap-2 w-1/3">
            <span className="text-lime-400 font-bold truncate">YOU:</span>
            <div className="flex-1 bg-[#092217] h-2.5 rounded-full overflow-hidden border border-[#164632]">
              <div
                className="bg-lime-400 h-full transition-all duration-300"
                style={{
                  width: `${challenge.testCases.length > 0 ? (passedTestsCount / challenge.testCases.length) * 100 : 0}%`,
                }}
              ></div>
            </div>
            <span className="text-emerald-400 text-[10px]">{passedTestsCount}/{challenge.testCases.length}</span>
          </div>

          <div className="text-[11px] text-orange-400 font-bold flex items-center gap-1 animate-pulse">
            <Swords className="w-3.5 h-3.5" />
            <span>VS SAFARI RIVAL VECTOR_X ({botStatus.toUpperCase()})</span>
          </div>

          <div className="flex items-center gap-2 w-1/3 justify-end">
            <span className="text-orange-400 font-bold truncate">RIVAL:</span>
            <div className="flex-1 bg-[#092217] h-2.5 rounded-full overflow-hidden border border-[#164632]">
              <div
                className="bg-orange-500 h-full transition-all duration-500"
                style={{ width: `${botProgress}%` }}
              ></div>
            </div>
            <span className="text-emerald-400 text-[10px]">{botProgress}%</span>
          </div>
        </div>
      )}

      {/* Boss Health Bar Strip */}
      {challenge.isBoss && (
        <div className="bg-[#05170f] border-b border-orange-900/60 px-6 py-2.5 flex items-center justify-between gap-4 text-xs font-mono shrink-0">
          <div className="flex items-center gap-2 text-orange-400 font-bold shrink-0">
            <Skull className="w-4 h-4 text-orange-500 animate-bounce" />
            <span>{challenge.bossName}</span>
          </div>

          <div className="flex-1 max-w-xl flex items-center gap-3">
            <div className="flex-1 bg-[#04100a] h-3.5 rounded-full overflow-hidden border border-orange-900/60">
              <div
                className="bg-gradient-to-r from-orange-600 via-amber-500 to-lime-500 h-full transition-all duration-300 shadow-[0_0_15px_rgba(249,115,22,0.6)]"
                style={{ width: `${bossHp}%` }}
              ></div>
            </div>
            <span className="text-orange-300 font-bold text-xs">{bossHp}% HP</span>
          </div>

          <div className="text-[11px] text-emerald-400/80 hidden sm:block font-bold">
            Execute clean tests to trap daemon in jar!
          </div>
        </div>
      )}

      {/* Main Arena Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 overflow-hidden">
        {/* Left Column: Briefing, Power-Up Bar, Line Inspector, Hints */}
        <div className="lg:col-span-4 flex flex-col gap-3 overflow-y-auto pr-1">
          {/* Safari Gear Power-Ups Bar */}
          <div className="p-3 bg-[#082216] border border-[#184b35] rounded-2xl space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-200 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Safari Gear</span>
              </span>
              {onOpenShop && (
                <button
                  onClick={onOpenShop}
                  className="text-[11px] text-orange-400 hover:text-orange-300 font-bold cursor-pointer"
                >
                  Shop +
                </button>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleUseShield}
                disabled={shieldActive || inventory.shield <= 0}
                className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                  shieldActive
                    ? 'bg-lime-950 border-lime-500 text-lime-300'
                    : inventory.shield > 0
                    ? 'bg-[#05170f] border-[#184b35] hover:border-lime-500 text-emerald-200'
                    : 'bg-[#04120b] border-[#0c2b1d] text-emerald-900 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Shield className="w-3.5 h-3.5 text-lime-400" />
                  <span className="text-[10px] font-mono font-bold">{shieldActive ? 'ON' : `x${inventory.shield}`}</span>
                </div>
                <div className="text-[10px] font-semibold mt-1">Net Shield</div>
              </button>

              <button
                onClick={handleUseOverclock}
                disabled={inventory.overclock <= 0}
                className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                  inventory.overclock > 0
                    ? 'bg-[#05170f] border-[#184b35] hover:border-orange-500 text-emerald-200'
                    : 'bg-[#04120b] border-[#0c2b1d] text-emerald-900 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-[10px] font-mono font-bold">x{inventory.overclock}</span>
                </div>
                <div className="text-[10px] font-semibold mt-1">+45s Compass</div>
              </button>

              <button
                onClick={handleUseXRay}
                disabled={inventory.xray <= 0}
                className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                  inventory.xray > 0
                    ? 'bg-[#05170f] border-[#184b35] hover:border-cyan-500 text-emerald-200'
                    : 'bg-[#04120b] border-[#0c2b1d] text-emerald-900 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-[10px] font-mono font-bold">x{inventory.xray}</span>
                </div>
                <div className="text-[10px] font-semibold mt-1">Bug Torch</div>
              </button>
            </div>
          </div>

          {/* Mission Briefing Card with Live Containment Jar */}
          <div className="bg-[#082216] border border-[#184b35] rounded-2xl p-4 space-y-2.5 shadow-lg">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
              <span className="text-lime-400 font-extrabold uppercase tracking-wider">Specimen Briefing</span>
              <span className="text-emerald-500">{challenge.category}</span>
            </div>

            {/* Live Specimen Jar Containment Meter */}
            <div className="flex items-center gap-3 p-2.5 bg-[#05170f] rounded-xl border border-[#14422e]">
              <div className="relative w-10 h-12 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 40 48" className="w-full h-full drop-shadow">
                  {/* Jar body */}
                  <rect x="6" y="10" width="28" height="36" rx="6" fill="#03140c" stroke="#165037" strokeWidth="1.5" />
                  {/* Liquid fill based on passed tests */}
                  {challenge.testCases.length > 0 && passedTestsCount > 0 && (
                    <rect
                      x="7"
                      y={46 - Math.round((passedTestsCount / challenge.testCases.length) * 32)}
                      width="26"
                      height={Math.round((passedTestsCount / challenge.testCases.length) * 32)}
                      rx="4"
                      fill={passedTestsCount === challenge.testCases.length ? '#84cc16' : '#06b6d4'}
                      opacity="0.8"
                    />
                  )}
                  {/* Lid */}
                  <rect x="10" y="4" width="20" height="7" rx="2" fill="#ca8a04" stroke="#fef08a" strokeWidth="1" />
                  {/* Glowing bug silhouette if 100% */}
                  {passedTestsCount === challenge.testCases.length && challenge.testCases.length > 0 && (
                    <circle cx="20" cy="28" r="4" fill="#bef264" className="animate-ping" />
                  )}
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-emerald-300 font-bold">Containment Jar</span>
                  <span className="text-lime-400 font-bold tabular-nums">
                    {passedTestsCount}/{challenge.testCases.length} Tests
                  </span>
                </div>
                <div className="w-full h-2 bg-[#03130c] rounded-full overflow-hidden border border-[#14422e] mt-1">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 via-amber-400 to-lime-400 transition-all duration-300"
                    style={{
                      width: `${challenge.testCases.length > 0 ? (passedTestsCount / challenge.testCases.length) * 100 : 0}%`,
                    }}
                  />
                </div>
                <div className="text-[10px] text-emerald-400/70 mt-0.5 truncate">
                  {passedTestsCount === challenge.testCases.length && challenge.testCases.length > 0
                    ? '✨ Specimen Trapped! Submit to catalog'
                    : 'Execute tests to trap bug in jar'}
                </div>
              </div>
            </div>

            <p className="text-xs text-emerald-100/90 leading-relaxed font-sans">
              {challenge.story}
            </p>

            <div className="p-2.5 bg-[#05170f] rounded-xl border border-[#14422e] text-[11px] font-mono space-y-1">
              <div className="text-emerald-400/80">
                Target Routine: <strong className="text-lime-300">{challenge.functionName}()</strong>
              </div>
              <div className="text-emerald-400/80">
                Identified Defect: <span className="text-orange-400 font-semibold">{challenge.bugType}</span>
              </div>
            </div>
          </div>

          {/* Bug Identification Tool */}
          <div className="bg-[#082216] border border-[#184b35] rounded-2xl p-3.5 space-y-2 shadow-lg">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-200 flex items-center gap-1.5">
                <Bug className="w-3.5 h-3.5 text-orange-400" />
                <span>Flag Suspect Line</span>
              </span>
              {selectedBugLine && (
                <button
                  onClick={() => setSelectedBugLine(null)}
                  className="text-[10px] text-emerald-400/70 hover:text-emerald-200 cursor-pointer"
                >
                  Clear Flag
                </button>
              )}
            </div>

            <p className="text-xs text-emerald-300/70">
              Click any line number in the gutter to pinpoint where you suspect the bug exists.
            </p>

            {selectedBugLine ? (
              <div className="p-2 bg-[#05170f] rounded-xl border border-orange-900/60 text-xs font-mono flex items-center justify-between">
                <span className="text-orange-300 font-bold">Flagged Line #{selectedBugLine}</span>
                {challenge.buggyLineHint === selectedBugLine ? (
                  <span className="text-lime-400 font-extrabold text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-lime-400" /> Exact Bug Line!
                  </span>
                ) : (
                  <span className="text-emerald-500 text-[11px]">Inspect line logic</span>
                )}
              </div>
            ) : (
              <div className="text-[11px] text-emerald-600 italic">No line currently flagged.</div>
            )}
          </div>

          {/* Hint Decryption System */}
          <div className="bg-[#082216] border border-[#184b35] rounded-2xl p-3.5 space-y-2.5 shadow-lg flex-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-200">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Field Clues ({revealedHints}/{challenge.hints.length})</span>
              </div>

              {revealedHints < challenge.hints.length && (
                <button
                  onClick={handleRevealNextHint}
                  className="px-2.5 py-1 bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-mono font-bold transition-colors cursor-pointer"
                >
                  Reveal Clue {revealedHints + 1} (-25 pts)
                </button>
              )}
            </div>

            <div className="space-y-1.5">
              {challenge.hints.map((hint, idx) => {
                const isRevealed = idx < revealedHints;
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border text-xs leading-relaxed transition-all ${
                      isRevealed
                        ? 'bg-[#05170f] border-[#1d593d] text-emerald-200'
                        : 'bg-[#04120b] border-[#0d3121] text-emerald-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1 font-mono text-[10px] text-emerald-500">
                      <span>CLUE #{idx + 1}</span>
                      {!isRevealed && <span>LOCKED</span>}
                    </div>
                    {isRevealed ? (
                      <p className="font-mono text-[11px] text-emerald-300">{hint}</p>
                    ) : (
                      <p className="italic text-[11px]">Decode required. Click button above.</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Code Editor & Test Runner */}
        <div className="lg:col-span-8 flex flex-col gap-3 overflow-hidden h-full">
          {/* Top Half: Code Editor */}
          <div className="h-[55%] min-h-[250px]">
            <CodeEditor
              code={code}
              onChange={setCode}
              onRun={handleRunTests}
              onSubmit={handleSubmit}
              onReset={handleResetCode}
              isRunning={isRunning}
              isSubmitting={isSubmitting}
              onSelectLine={handleSelectLine}
              selectedBugLine={selectedBugLine}
            />
          </div>

          {/* Bottom Half: Test Runner Results & Terminal */}
          <div className="h-[45%] min-h-[200px]">
            <TestRunner
              testResults={testResults}
              passedTestsCount={passedTestsCount}
              totalTestsCount={challenge.testCases.length}
              consoleLogs={consoleLogs}
              compileError={compileError}
              executionTimeTotalMs={executionTimeTotalMs}
              hasRun={hasRun}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
