import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Lock, 
  Mail, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  Sparkles, 
  ArrowRight, 
  Database, 
  CheckCircle2, 
  AlertCircle, 
  ChevronLeft, 
  Terminal, 
  Key, 
  Compass, 
  Flame, 
  Cpu, 
  Zap,
  Radio
} from 'lucide-react';
import { api } from '../services/api';
import { User } from '../types/game';
import { soundManager } from '../utils/audio';
import { BugHuntLogo } from '../components/BugHuntLogo';

interface LoginScreenProps {
  onAuthSuccess: (user: User) => void;
  onCancel: () => void;
  onNavigateToArchitecture?: () => void;
  initialTab?: 'login' | 'register';
}

interface DemoProfile {
  id: string;
  codename: string;
  handle: string;
  role: string;
  level: number;
  xp: number;
  coins: number;
  accentColor: string;
  borderAccent: string;
  badge: string;
}

const DEMO_PROFILES: DemoProfile[] = [
  {
    id: 'usr_neo',
    codename: 'Neo_Hacker',
    handle: 'neo@matrix.cyber',
    role: 'Zone 5 Daemon Architect',
    level: 5,
    xp: 9450,
    coins: 880,
    accentColor: 'text-orange-400',
    borderAccent: 'border-orange-500/40 hover:border-orange-400',
    badge: 'Elite'
  },
  {
    id: 'usr_ada',
    codename: 'Ada_Lovelace',
    handle: 'ada@cyber.net',
    role: 'Zone 4 Logic Specialist',
    level: 4,
    xp: 6200,
    coins: 520,
    accentColor: 'text-cyan-400',
    borderAccent: 'border-cyan-500/40 hover:border-cyan-400',
    badge: 'Master'
  },
  {
    id: 'usr_cipher',
    codename: 'Cipher_Ghost',
    handle: 'cipher@shadow.org',
    role: 'Zone 3 Shadow Hunter',
    level: 3,
    xp: 3400,
    coins: 260,
    accentColor: 'text-lime-400',
    borderAccent: 'border-lime-500/40 hover:border-lime-400',
    badge: 'Veteran'
  },
  {
    id: 'usr_glitch',
    codename: 'Glitch_Hunter',
    handle: 'glitch@safari.io',
    role: 'Zone 2 Bug Scout',
    level: 2,
    xp: 1200,
    coins: 140,
    accentColor: 'text-emerald-400',
    borderAccent: 'border-emerald-500/40 hover:border-emerald-400',
    badge: 'Scout'
  }
];

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onAuthSuccess,
  onCancel,
  onNavigateToArchitecture,
  initialTab = 'login'
}) => {
  const [tab, setTab] = useState<'login' | 'register'>(initialTab);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dbStatus, setDbStatus] = useState<{ connected: boolean; dbName: string; challengesCount: number } | null>(null);

  // Load database metadata for the security terminal header
  useEffect(() => {
    let isMounted = true;
    api.getMongoStatus()
      .then(res => {
        if (isMounted && res) {
          setDbStatus({
            connected: res.connected,
            dbName: res.databaseName || 'bughunt',
            challengesCount: res.collections?.challengesCount || 106
          });
        }
      })
      .catch(() => {});
    return () => { isMounted = false; };
  }, []);

  // Password strength calculation for registration
  const calculatePasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'None', color: 'bg-slate-700' };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 1) return { score: 1, label: 'Weak Cipher', color: 'bg-rose-500' };
    if (score <= 3) return { score: 2, label: 'Standard Passkey', color: 'bg-amber-500' };
    if (score === 4) return { score: 3, label: 'Strong Encryption', color: 'bg-lime-500' };
    return { score: 4, label: 'Military-Grade SHA256', color: 'bg-emerald-400' };
  };

  const strength = calculatePasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (tab === 'login') {
        const identifier = username.trim() || email.trim();
        if (!identifier) {
          throw new Error('Please enter your operative codename or email.');
        }
        if (!password) {
          throw new Error('Please enter your passphrase.');
        }

        const res = await api.login(identifier, password);
        soundManager.playSuccess();
        onAuthSuccess(res.user);
      } else {
        if (!username.trim()) throw new Error('Codename is required for operative registration.');
        if (!email.trim() || !email.includes('@')) throw new Error('Valid security email address is required.');
        if (password.length < 6) throw new Error('Passphrase must be at least 6 characters.');

        const res = await api.register(username.trim(), email.trim(), password);
        soundManager.playSuccess();
        onAuthSuccess(res.user);
      }
    } catch (err: any) {
      soundManager.playError();
      setError(err.message || 'Authentication sequence failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoDeploy = async (demoId: string) => {
    setError(null);
    setLoading(true);
    soundManager.playKey();

    try {
      const res = await api.demoLogin(demoId);
      soundManager.playSuccess();
      onAuthSuccess(res.user);
    } catch (err: any) {
      soundManager.playError();
      setError(err.message || 'Demo operative deployment failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-[#030f0a] text-slate-100 flex flex-col justify-center px-4 py-8 overflow-hidden">
      {/* Background Cyber Jungle Radar Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#164632_1.5px,transparent_1.5px)] [background-size:28px_28px] opacity-35 pointer-events-none"></div>

      {/* Atmospheric Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        {/* Top Navigation & Return */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              soundManager.playKey();
              onCancel();
            }}
            className="flex items-center gap-1.5 text-xs font-mono text-emerald-400/90 hover:text-lime-300 transition-colors py-1 px-2.5 rounded-lg hover:bg-[#072418] border border-transparent hover:border-[#1b533b] cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Expedition Map</span>
          </button>

          {/* Database link status indicator */}
          <div className="flex items-center gap-2 text-[11px] font-mono">
            <span className={`w-2 h-2 rounded-full ${dbStatus?.connected ? 'bg-emerald-400 animate-pulse' : 'bg-lime-400'}`}></span>
            <span className="text-slate-400">Database:</span>
            {dbStatus?.connected ? (
              <span className="text-emerald-300 font-bold">MongoDB Atlas ({dbStatus.dbName})</span>
            ) : (
              <span className="text-lime-400 font-bold">Local High-Speed Engine</span>
            )}
            {onNavigateToArchitecture && (
              <button
                onClick={() => {
                  soundManager.playKey();
                  onNavigateToArchitecture();
                }}
                className="text-[10px] text-emerald-500 hover:text-lime-300 underline ml-1 cursor-pointer"
              >
                Config DB
              </button>
            )}
          </div>
        </div>

        {/* Main Grid: Authentication Console + Pre-Seeded Operatives */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Primary Login / Register Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#05170f] border-2 border-[#174b34] rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            {/* Top Security Terminal Header */}
            <div className="border-b border-[#143e2c] pb-4 mb-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#092b1d] border border-lime-500/40 flex items-center justify-center text-lime-400 shadow-md">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h1 className="text-base font-extrabold text-slate-100 font-mono tracking-tight flex items-center gap-2">
                      <span>OPERATIVE AUTHENTICATION</span>
                    </h1>
                    <div className="text-[11px] font-mono text-emerald-400/80">
                      SECURE EXPEDITION TERMINAL // 106 BUG SPECIMENS
                    </div>
                  </div>
                </div>

                <div className="text-right hidden sm:block">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">STATUS</span>
                  <span className="text-xs font-mono font-bold text-lime-400">READY</span>
                </div>
              </div>

              {/* Segmented Mode Selector */}
              <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-[#020b07] border border-[#143e2c] rounded-xl">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playKey();
                    setTab('login');
                    setError(null);
                  }}
                  className={`py-2 px-3 text-xs font-mono font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    tab === 'login'
                      ? 'bg-gradient-to-r from-lime-600 to-emerald-600 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Key className="w-3.5 h-3.5" />
                  <span>Terminal Sign In</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playKey();
                    setTab('register');
                    setError(null);
                  }}
                  className={`py-2 px-3 text-xs font-mono font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    tab === 'register'
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>New Operative</span>
                </button>
              </div>
            </div>

            {/* Error Notification Banner */}
            {error && (
              <div className="p-3 mb-4 text-xs font-mono bg-rose-950/70 border border-rose-800 text-rose-300 rounded-xl flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1 leading-relaxed">{error}</div>
                <button
                  onClick={() => setError(null)}
                  className="text-rose-400 hover:text-rose-200 font-mono text-xs"
                >
                  ×
                </button>
              </div>
            )}

            {/* Authentication Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Codename or Email Field */}
              <div>
                <label className="block text-xs font-mono text-emerald-300/90 mb-1.5 flex items-center justify-between">
                  <span>{tab === 'login' ? 'Operative Codename or Email' : 'Operative Codename'}</span>
                  <span className="text-[10px] text-slate-500 font-normal">REQUIRED</span>
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3.5 top-3 text-emerald-600" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={tab === 'login' ? 'e.g. Neo_Hacker or neo@matrix.cyber' : 'e.g. Cipher_Ghost'}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#020a06] border border-[#1b533b] rounded-xl text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/40 transition-colors"
                  />
                </div>
              </div>

              {/* Extra Email Field for Registration */}
              {tab === 'register' && (
                <div>
                  <label className="block text-xs font-mono text-emerald-300/90 mb-1.5 flex items-center justify-between">
                    <span>Secure Comms Channel (Email)</span>
                    <span className="text-[10px] text-slate-500 font-normal">VERIFIED</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-3 text-emerald-600" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="operative@bughunt.safari"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#020a06] border border-[#1b533b] rounded-xl text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/40 transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Passphrase Field */}
              <div>
                <label className="block text-xs font-mono text-emerald-300/90 mb-1.5 flex items-center justify-between">
                  <span>Security Passphrase</span>
                  {tab === 'register' && (
                    <span className="text-[10px] font-mono text-slate-400">Min 6 characters</span>
                  )}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3 text-emerald-600" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-[#020a06] border border-[#1b533b] rounded-xl text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400/40 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-200 transition-colors p-0.5 cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator (Register mode) */}
                {tab === 'register' && password.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-slate-400">Cipher Strength:</span>
                      <span className="font-bold text-slate-200">{strength.label}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 h-1.5 bg-[#020b07] rounded-full overflow-hidden">
                      <div className={`h-full ${strength.score >= 1 ? strength.color : 'bg-transparent'}`}></div>
                      <div className={`h-full ${strength.score >= 2 ? strength.color : 'bg-transparent'}`}></div>
                      <div className={`h-full ${strength.score >= 3 ? strength.color : 'bg-transparent'}`}></div>
                      <div className={`h-full ${strength.score >= 4 ? strength.color : 'bg-transparent'}`}></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Options row */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-mono text-[11px]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-[#020b07] border-[#1b533b] text-lime-500 focus:ring-0 focus:ring-offset-0"
                  />
                  <span>Maintain Persistent Session</span>
                </label>

                {tab === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setUsername('Neo_Hacker');
                      setPassword('matrix123');
                      soundManager.playKey();
                    }}
                    className="text-[11px] font-mono text-lime-400 hover:text-lime-300 underline cursor-pointer"
                  >
                    Auto-fill Neo test credentials
                  </button>
                )}
              </div>

              {/* Submit CTA Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 px-4 font-mono font-bold text-xs rounded-xl transition-all shadow-lg cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider ${
                  tab === 'login'
                    ? 'bg-gradient-to-r from-lime-500 via-emerald-500 to-teal-500 hover:from-lime-400 hover:to-teal-400 text-slate-950 shadow-[0_0_20px_rgba(132,204,22,0.35)]'
                    : 'bg-gradient-to-r from-orange-500 via-amber-500 to-lime-500 hover:from-orange-400 hover:to-lime-400 text-slate-950 shadow-[0_0_20px_rgba(249,115,22,0.35)]'
                } disabled:opacity-50`}
              >
                {loading ? (
                  <span>AUTHENTICATING CIPHER...</span>
                ) : (
                  <>
                    <span>{tab === 'login' ? 'ACCESS EXPEDITION TERMINAL' : 'INITIALIZE NEW DOSSIER'}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>

            {/* Guest Sandbox Access */}
            <div className="mt-5 pt-4 border-t border-[#143e2c] flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Want to inspect missions first?</span>
              <button
                onClick={() => {
                  soundManager.playKey();
                  onCancel();
                }}
                className="text-emerald-400 hover:text-lime-300 font-bold underline cursor-pointer flex items-center gap-1"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Play as Guest Operative</span>
              </button>
            </div>
          </div>

          {/* Right Column: Pre-Seeded Operative Profiles (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#05170f] border border-[#174b34] rounded-2xl p-5 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-lime-400" />
                  <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
                    Pre-Seeded Operative Dossiers
                  </h2>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 bg-[#0a2c1d] border border-[#1b533b] px-2 py-0.5 rounded">
                  1-Click Deploy
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/70 mb-4 leading-relaxed font-mono">
                Click any pre-seeded profile below to instantly authenticate and test high-tier features without typing credentials:
              </p>

              {/* Profiles List */}
              <div className="space-y-2.5">
                {DEMO_PROFILES.map((p) => (
                  <div
                    key={p.id}
                    className={`p-3 bg-[#030e09] border rounded-xl transition-all duration-200 flex items-center justify-between gap-3 ${p.borderAccent}`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-bold font-mono ${p.accentColor}`}>{p.codename}</span>
                        <span className="text-[9px] px-1.5 py-0.2 bg-[#082417] border border-[#1a4a34] text-slate-300 rounded font-mono">
                          {p.badge}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono truncate">{p.role}</div>
                      <div className="text-[10px] text-emerald-400/80 font-mono">
                        Level {p.level} · {p.xp} XP · {p.coins} Coins
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => handleDemoDeploy(p.id)}
                      className="px-3 py-1.5 bg-[#092b1d] hover:bg-[#123e2b] border border-[#1d523a] hover:border-lime-400 text-lime-300 hover:text-lime-200 text-xs font-mono font-bold rounded-lg transition-all shrink-0 cursor-pointer shadow-sm disabled:opacity-50"
                    >
                      Deploy
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Security Specs Box */}
            <div className="p-4 bg-[#030e09] border border-[#143e2c] rounded-xl font-mono text-[10px] text-emerald-400/70 space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-300 font-bold">
                <Terminal className="w-3.5 h-3.5 text-lime-400" />
                <span>TERMINAL SECURITY SPECIFICATION</span>
              </div>
              <div>• SHA-256 salted password hashing & isolation</div>
              <div>• Token-based session authentication with auto-refresh</div>
              <div>• Seamless local fallback storage with 106 debugging missions</div>
              <div>• Real-time synchronization to MongoDB Atlas cluster</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
