import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User as UserIcon, 
  Shield, 
  Sparkles, 
  Key, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Compass, 
  AlertCircle 
} from 'lucide-react';
import { api } from '../services/api';
import { User } from '../types/game';
import { soundManager } from '../utils/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
  onOpenFullLoginPage?: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  onAuthSuccess,
  onOpenFullLoginPage
}) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (tab === 'login') {
        const identifier = username.trim() || email.trim();
        if (!identifier) throw new Error('Codename or email is required.');
        if (!password) throw new Error('Passphrase is required.');

        const res = await api.login(identifier, password);
        soundManager.playSuccess();
        onAuthSuccess(res.user);
        onClose();
      } else {
        if (!username.trim()) throw new Error('Codename is required.');
        if (!email.trim() || !email.includes('@')) throw new Error('Valid email address is required.');
        if (password.length < 6) throw new Error('Passphrase must be at least 6 characters.');

        const res = await api.register(username.trim(), email.trim(), password);
        soundManager.playSuccess();
        onAuthSuccess(res.user);
        onClose();
      }
    } catch (err: any) {
      soundManager.playError();
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoUserId: string) => {
    setError(null);
    setLoading(true);
    soundManager.playKey();
    try {
      const res = await api.demoLogin(demoUserId);
      soundManager.playSuccess();
      onAuthSuccess(res.user);
      onClose();
    } catch (err: any) {
      soundManager.playError();
      setError(err.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#020906]/85 backdrop-blur-md">
      <div className="w-full max-w-lg bg-[#05170f] border-2 border-[#184b35] rounded-3xl shadow-[0_0_50px_rgba(4,20,13,0.9)] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#020b07] border-b border-[#143e2c]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#08281b] border border-lime-500/40 flex items-center justify-center text-lime-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="font-mono font-bold text-slate-100 text-sm block">OPERATIVE ACCESS TERMINAL</span>
              <span className="font-mono text-[10px] text-emerald-400/80">BUG HUNT EXPEDITION // 106 SPECIMENS</span>
            </div>
          </div>
          <button
            onClick={() => {
              soundManager.playKey();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-100 rounded-lg hover:bg-[#0c2e1f] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex p-1.5 bg-[#020b07]/70 border-b border-[#143e2c]">
          <button
            onClick={() => {
              soundManager.playKey();
              setTab('login');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
              tab === 'login' 
                ? 'bg-gradient-to-r from-lime-600 to-emerald-600 text-slate-950 shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Terminal Sign In</span>
          </button>
          <button
            onClick={() => {
              soundManager.playKey();
              setTab('register');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs font-mono font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
              tab === 'register' 
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>New Operative</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 text-xs font-mono bg-rose-950/70 border border-rose-800 text-rose-300 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-mono text-emerald-300/90 mb-1">
                {tab === 'login' ? 'Operative Codename or Email' : 'Operative Codename'}
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-2.5 text-emerald-600" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={tab === 'login' ? 'e.g. Neo_Hacker or neo@matrix.cyber' : 'e.g. Cipher_Ghost'}
                  className="w-full pl-9 pr-3 py-2 bg-[#020a06] border border-[#1b533b] rounded-xl text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-lime-400"
                />
              </div>
            </div>

            {tab === 'register' && (
              <div>
                <label className="block text-xs font-mono text-emerald-300/90 mb-1">Secure Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-2.5 text-emerald-600" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="operative@bughunt.cyber"
                    className="w-full pl-9 pr-3 py-2 bg-[#020a06] border border-[#1b533b] rounded-xl text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-orange-400"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-mono text-emerald-300/90">Passphrase</label>
                {tab === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setUsername('Neo_Hacker');
                      setPassword('matrix123');
                    }}
                    className="text-[10px] font-mono text-lime-400 hover:text-lime-300 underline"
                  >
                    Use Neo test pass
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-2.5 text-emerald-600" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2 bg-[#020a06] border border-[#1b533b] rounded-xl text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-lime-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-200 transition-colors p-0.5 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 text-xs font-mono font-bold rounded-xl transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 ${
                tab === 'login'
                  ? 'bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 text-slate-950 shadow-[0_0_15px_rgba(132,204,22,0.3)]'
                  : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 shadow-[0_0_15px_rgba(249,115,22,0.3)]'
              }`}
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>{tab === 'login' ? 'Access Terminal' : 'Create Operative Dossier'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Logins with stats */}
          <div className="pt-3 border-t border-[#143e2c]">
            <div className="text-[11px] font-mono text-slate-400 mb-2 flex items-center justify-between">
              <span>Quick Test Access (Pre-Seeded Profiles):</span>
              <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('usr_neo')}
                className="p-2.5 bg-[#030e09] hover:bg-[#092b1d] border border-orange-500/30 hover:border-orange-400 rounded-xl text-left transition-colors cursor-pointer"
              >
                <div className="text-xs font-bold font-mono text-orange-400">Neo</div>
                <div className="text-[10px] text-slate-400 font-mono">Zone 5 · 9.4k XP</div>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('usr_ada')}
                className="p-2.5 bg-[#030e09] hover:bg-[#092b1d] border border-cyan-500/30 hover:border-cyan-400 rounded-xl text-left transition-colors cursor-pointer"
              >
                <div className="text-xs font-bold font-mono text-cyan-400">Ada</div>
                <div className="text-[10px] text-slate-400 font-mono">Zone 4 · 6.2k XP</div>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('usr_cipher')}
                className="p-2.5 bg-[#030e09] hover:bg-[#092b1d] border border-lime-500/30 hover:border-lime-400 rounded-xl text-left transition-colors cursor-pointer"
              >
                <div className="text-xs font-bold font-mono text-lime-400">Cipher</div>
                <div className="text-[10px] text-slate-400 font-mono">Zone 3 · 3.4k XP</div>
              </button>
            </div>
          </div>

          {/* Dedicated Login Page Link */}
          {onOpenFullLoginPage && (
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => {
                  soundManager.playKey();
                  onClose();
                  onOpenFullLoginPage();
                }}
                className="text-[11px] font-mono text-emerald-400 hover:text-lime-300 underline cursor-pointer"
              >
                Open Full Dedicated Login Page →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
