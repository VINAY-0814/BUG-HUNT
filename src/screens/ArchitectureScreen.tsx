import React, { useState, useEffect } from 'react';
import { ShieldCheck, Server, Database, Code2, Cpu, Users, Terminal, CheckCircle2, AlertTriangle, Layers, RefreshCw, Link2, Unlink, Check, Copy, Flame, Sparkles } from 'lucide-react';
import { SandboxInfo, MongoStatusInfo } from '../types/game';
import { api } from '../services/api';

export function cleanMongoUri(raw: string): { clean: string; wasCleaned: boolean; notes: string[] } {
  let str = (raw || '').trim();
  const notes: string[] = [];
  let wasCleaned = false;

  if (str.includes('<') || str.includes('>')) {
    wasCleaned = true;
    notes.push('Removed placeholder < > brackets');
    str = str.replace(/[<>]/g, '');
  }

  const match = str.match(/^(mongodb(?:\+srv)?:\/\/)(.*)$/i);
  if (!match) return { clean: str, wasCleaned, notes };

  const scheme = match[1];
  const rest = match[2];
  const lastAt = rest.lastIndexOf('@');

  if (lastAt !== -1) {
    const creds = rest.slice(0, lastAt);
    let host = rest.slice(lastAt + 1);
    const colon = creds.indexOf(':');
    const u = colon === -1 ? creds : creds.slice(0, colon);
    const p = colon === -1 ? '' : creds.slice(colon + 1);

    if (p.includes('@')) {
      wasCleaned = true;
      notes.push('URL-encoded "@" in password to "%40"');
    }
    if (u.includes(' ')) {
      wasCleaned = true;
      notes.push('URL-encoded space in username');
    }

    let decU = u;
    try { decU = decodeURIComponent(u); } catch {}
    let decP = p;
    try { decP = decodeURIComponent(p); } catch {}

    const encU = encodeURIComponent(decU.trim());
    const encP = encodeURIComponent(decP);

    if (!host.includes('/') || host.endsWith('/')) {
      host = host.replace(/\/+$/, '') + '/bughunt?retryWrites=true&w=majority';
      wasCleaned = true;
      notes.push('Appended default database /bughunt');
    }

    return {
      clean: `${scheme}${encU}:${encP}@${host}`,
      wasCleaned,
      notes
    };
  }

  return { clean: str, wasCleaned, notes };
}

export const ArchitectureScreen: React.FC = () => {
  const [sandboxInfo, setSandboxInfo] = useState<SandboxInfo | null>(null);
  const [mongoStatus, setMongoStatus] = useState<MongoStatusInfo | null>(null);
  const [mongoUriInput, setMongoUriInput] = useState('');
  const [dbNameInput, setDbNameInput] = useState('bughunt');
  const [passwordHelperInput, setPasswordHelperInput] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [actionFeedback, setActionFeedback] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [activeSchemaTab, setActiveSchemaTab] = useState<'users' | 'sessions' | 'solutions'>('users');
  const [copiedEnv, setCopiedEnv] = useState(false);
  const [copiedIp, setCopiedIp] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const [info, mStatus] = await Promise.all([
          api.getSandboxInfo().catch(() => null),
          api.getMongoStatus().catch(() => null)
        ]);
        if (info) setSandboxInfo(info);
        if (mStatus) {
          setMongoStatus(mStatus);
          if (mStatus.suggestedUris && mStatus.suggestedUris.length > 0) {
            setMongoUriInput(prev => prev || mStatus.suggestedUris![0].uri);
          }
        }
      } catch (err) {
        console.error('Failed to load system architecture data', err);
      }
    }
    loadData();
  }, []);

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    let raw = mongoUriInput.trim();
    if (!raw) {
      setActionFeedback({ type: 'error', message: 'Please enter a valid MongoDB connection URI' });
      return;
    }

    // Check if URI contains template password placeholder
    if (raw.includes('<db_password>') || raw.includes('<password>')) {
      if (passwordHelperInput.trim()) {
        const encodedPass = encodeURIComponent(passwordHelperInput.trim());
        raw = raw.replace(/<db_password>|<password>/gi, encodedPass);
        setMongoUriInput(raw);
      } else {
        setActionFeedback({
          type: 'error',
          message: 'Notice: Your URI contains placeholder "<db_password>". Please enter your Atlas database password in the Password field below.'
        });
        return;
      }
    }

    const { clean, wasCleaned, notes } = cleanMongoUri(raw);

    if (!clean.startsWith('mongodb://') && !clean.startsWith('mongodb+srv://')) {
      setActionFeedback({
        type: 'error',
        message: 'Invalid scheme: expected connection string to start with "mongodb://" or "mongodb+srv://". Example: mongodb+srv://<username>:<password>@cluster0.mongodb.net/bughunt'
      });
      return;
    }

    if (wasCleaned) {
      setMongoUriInput(clean);
    }

    setIsConnecting(true);
    setActionFeedback(null);
    try {
      const res = await api.connectMongo(clean, dbNameInput.trim());
      setMongoStatus(res.status);
      if (res.success) {
        setActionFeedback({ 
          type: 'success', 
          message: wasCleaned 
            ? `Connected! Auto-formatted: ${notes.join(', ')}` 
            : res.message || 'Successfully connected to MongoDB cluster!' 
        });
      } else {
        setActionFeedback({ 
          type: 'error', 
          message: res.error || res.message || 'Connection failed' 
        });
      }
    } catch (err: any) {
      setActionFeedback({ type: 'error', message: err.message || 'Failed to connect to MongoDB cluster' });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      const res = await api.disconnectMongo();
      setMongoStatus(res.status);
      setActionFeedback({ type: 'success', message: 'Disconnected from MongoDB. Reverted to local storage.' });
    } catch (err: any) {
      setActionFeedback({ type: 'error', message: err.message || 'Failed to disconnect' });
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setActionFeedback(null);
    try {
      const res = await api.syncMongo();
      setMongoStatus(res.status);
      setActionFeedback({ type: 'success', message: `Synced ${res.count} records into MongoDB successfully!` });
    } catch (err: any) {
      setActionFeedback({ type: 'error', message: err.message || 'Sync failed' });
    } finally {
      setIsSyncing(false);
    }
  };

  const copyEnvSnippet = () => {
    navigator.clipboard.writeText('MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/bughunt?retryWrites=true&w=majority"');
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      {/* Header */}
      <div>
        <div className="text-xs font-mono text-lime-400 font-bold uppercase tracking-wider mb-1 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-lime-400" />
          <span>System Whitepaper & Technical Specification</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-100 tracking-tight">
          Full-Stack Architecture & MongoDB Integration
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-2xl">
          Detailed technical breakdown of the Node.js Express backend, native MongoDB Driver v6 collections, code execution sandbox, and live persistence state.
        </p>
      </div>

      {/* 3 Tier Architecture Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Frontend Tier */}
        <div className="p-5 bg-[#072217] border border-[#164632] rounded-2xl space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-lime-500/20 text-lime-400 border border-lime-500/30 flex items-center justify-center">
            <Code2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-100 text-sm">1. Reactive Client Tier</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Gamified UI with syntax-highlighted code editor, gutter bug tagging, Web Audio API 8-bit sound synthesizer, and live test runner feedback.
          </p>
          <div className="pt-2 border-t border-[#164632] text-[11px] font-mono text-lime-400">
            Vite · React 19 · Tailwind CSS
          </div>
        </div>

        {/* Backend Tier */}
        <div className="p-5 bg-[#072217] border border-[#164632] rounded-2xl space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-100 text-sm">2. Express REST API Tier</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Node.js HTTP service hosting token authentication, salt-hashed credentials, challenge evaluation, leaderboard calculation, and progression validation.
          </p>
          <div className="pt-2 border-t border-[#164632] text-[11px] font-mono text-orange-400">
            Express 4.21 · Node.js 22 · TypeScript
          </div>
        </div>

        {/* Database Tier */}
        <div className="p-5 bg-[#072217] border border-[#164632] rounded-2xl space-y-3 shadow-lg">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-100 text-sm flex items-center justify-between">
            <span>3. MongoDB Data Tier</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${mongoStatus?.connected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-lime-500/10 text-lime-400 border border-lime-500/30'}`}>
              {mongoStatus?.connected ? 'MongoDB Live' : 'Driver Ready'}
            </span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Official MongoDB client driver persistence for Users, Sessions, Challenge Logs, and Badges, with seamless automatic fallback to resilient disk storage.
          </p>
          <div className="pt-2 border-t border-[#164632] text-[11px] font-mono text-emerald-400">
            MongoDB Driver v6 · BSON Collections
          </div>
        </div>
      </div>

      {/* MongoDB Live Management & Connection Panel */}
      <div className="p-6 bg-[#072217] border border-[#1d523a] rounded-2xl shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#164632] pb-5">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
              mongoStatus?.connected 
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' 
                : 'bg-lime-500/10 text-lime-400 border-lime-500/30'
            }`}>
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-100 text-base">MongoDB Database Status</h3>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                  mongoStatus?.connected
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700/60'
                    : 'bg-[#061b12] text-lime-400 border border-[#1d523a]'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${mongoStatus?.connected ? 'bg-emerald-400 animate-pulse' : 'bg-lime-400'}`}></span>
                  {mongoStatus?.connected ? 'Connected to MongoDB' : 'Ready (Local Fallback Active)'}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {mongoStatus?.connected
                  ? `Database: ${mongoStatus.databaseName} · Synchronized live with MongoDB Atlas / server`
                  : 'Official MongoDB driver installed and initialized. You can connect to MongoDB Atlas or custom clusters below.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {mongoStatus?.connected ? (
              <>
                <button
                  onClick={handleSync}
                  disabled={isSyncing}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#061b12] hover:bg-[#0c2f21] border border-[#1d523a] text-lime-400 text-xs font-bold rounded-lg transition disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? 'Syncing...' : 'Sync Data'}
                </button>
                <button
                  onClick={handleDisconnect}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 text-rose-300 text-xs font-bold rounded-lg transition"
                >
                  <Unlink className="w-3.5 h-3.5" />
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={copyEnvSnippet}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#061b12] hover:bg-[#0c2f21] border border-[#1d523a] text-lime-300 text-xs font-bold rounded-lg transition"
              >
                {copiedEnv ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedEnv ? 'Copied MONGODB_URI!' : 'Copy .env Config'}
              </button>
            )}
          </div>
        </div>

        {/* Feedback message banner */}
        {actionFeedback && (
          <div className={`p-3.5 rounded-xl border text-xs flex items-center justify-between ${
            actionFeedback.type === 'success'
              ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300'
              : actionFeedback.type === 'info'
              ? 'bg-sky-950/60 border-sky-800 text-sky-300'
              : 'bg-rose-950/60 border-rose-800 text-rose-300'
          }`}>
            <span>{actionFeedback.message}</span>
            <button onClick={() => setActionFeedback(null)} className="text-slate-400 hover:text-slate-200 text-xs ml-3 font-mono">×</button>
          </div>
        )}

        {/* MongoDB Atlas Setup & Firewall Guidance Card */}
        <div className="p-4 bg-[#0a1f16] border border-[#1e583d] rounded-xl space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              <span>MongoDB Atlas Configuration & Network Access Checklist</span>
            </div>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Atlas Cloud Integration
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            If your connection reports <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300 font-mono">SSL alert number 80</code> or <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300 font-mono">tlsv1 alert internal error</code>, the MongoDB Atlas firewall is blocking incoming connections until an IP whitelist entry is added.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-3 bg-[#05130d] border border-[#164632] rounded-lg space-y-1">
              <div className="text-[11px] font-bold text-lime-400">1. Remove &lt; &gt; Brackets</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Atlas connection templates use <code className="text-slate-300">&lt;username&gt;</code> as placeholder markers. Our system automatically strips them.
              </p>
            </div>
            <div className="p-3 bg-[#05130d] border border-[#164632] rounded-lg space-y-1">
              <div className="text-[11px] font-bold text-cyan-400">2. Encode @ in Passwords</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                If your password has <code className="text-slate-300">@</code> (e.g. <code className="text-slate-300">bughunt@123</code>), it is automatically encoded as <code className="text-cyan-300">%40</code>.
              </p>
            </div>
            <div className="p-3 bg-[#05130d] border border-[#164632] rounded-lg space-y-1">
              <div className="text-[11px] font-bold text-amber-400 flex items-center justify-between">
                <span>3. Whitelist IP in Atlas</span>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText('0.0.0.0/0');
                    setCopiedIp(true);
                    setTimeout(() => setCopiedIp(false), 2000);
                  }}
                  className="text-[10px] text-amber-300 hover:text-amber-200 underline flex items-center gap-1 font-mono"
                >
                  {copiedIp ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedIp ? 'Copied!' : 'Copy 0.0.0.0/0'}
                </button>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                In Atlas: <strong>Security</strong> → <strong>Network Access</strong> → <strong>Add IP Address</strong> → <strong>Allow Access from Anywhere</strong> (<code className="text-amber-300">0.0.0.0/0</code>).
              </p>
            </div>
          </div>
        </div>

        {/* MongoDB Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-[#04140d] border border-[#164632] rounded-xl space-y-1">
            <div className="text-[10px] uppercase font-mono text-slate-400">Driver</div>
            <div className="text-sm font-bold text-lime-400 font-mono">mongodb v6.x</div>
            <div className="text-[10px] text-slate-500">Native Node.js SDK</div>
          </div>
          <div className="p-3 bg-[#04140d] border border-[#164632] rounded-xl space-y-1">
            <div className="text-[10px] uppercase font-mono text-slate-400">Database</div>
            <div className="text-sm font-bold text-slate-200 font-mono">{mongoStatus?.databaseName || 'bughunt'}</div>
            <div className="text-[10px] text-slate-500">Default Target DB</div>
          </div>
          <div className="p-3 bg-[#04140d] border border-[#164632] rounded-xl space-y-1">
            <div className="text-[10px] uppercase font-mono text-slate-400">Users Collection</div>
            <div className="text-sm font-bold text-cyan-400 font-mono">{mongoStatus?.collections?.usersCount ?? 4} docs</div>
            <div className="text-[10px] text-slate-500">Accounts & Stats</div>
          </div>
          <div className="p-3 bg-[#04140d] border border-[#164632] rounded-xl space-y-1">
            <div className="text-[10px] uppercase font-mono text-slate-400">Missions Indexed</div>
            <div className="text-sm font-bold text-orange-400 font-mono">{mongoStatus?.collections?.challengesCount ?? 106} challenges</div>
            <div className="text-[10px] text-slate-500">5 Difficulty Tiers (106 Total)</div>
          </div>
        </div>

        {/* MongoDB Connection Form */}
        <div className="p-4 bg-[#04140d] border border-[#184b35] rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-lime-300">
            <Link2 className="w-4 h-4 text-lime-400" />
            <span>Connect to MongoDB Atlas or Custom Cluster</span>
          </div>
          <p className="text-xs text-slate-400">
            Paste your MongoDB connection string below to connect and sync with MongoDB:
          </p>

          <form onSubmit={handleConnect} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-3">
                <input
                  type="text"
                  placeholder="mongodb+srv://<username>:<password>@cluster0.mongodb.net/bughunt"
                  value={mongoUriInput}
                  onChange={(e) => setMongoUriInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#020b07] border border-[#1d523a] rounded-lg text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-lime-400"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Database (default: bughunt)"
                  value={dbNameInput}
                  onChange={(e) => setDbNameInput(e.target.value)}
                  className="w-full px-3 py-2 bg-[#020b07] border border-[#1d523a] rounded-lg text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-lime-400"
                />
              </div>
            </div>

            {/* Optional Atlas Password Helper row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 bg-[#03100a] border border-[#133c2a] rounded-lg">
              <div className="text-[11px] font-mono text-lime-400 flex items-center gap-1.5 whitespace-nowrap">
                <span>Atlas Password:</span>
              </div>
              <input
                type="text"
                placeholder="Enter password to replace <db_password> (e.g. bughunt@123)"
                value={passwordHelperInput}
                onChange={(e) => setPasswordHelperInput(e.target.value)}
                className="flex-1 px-2.5 py-1.5 bg-[#010805] border border-[#174631] rounded text-xs font-mono text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-lime-400"
              />
              <button
                type="button"
                onClick={() => {
                  if (!passwordHelperInput.trim()) {
                    setActionFeedback({ type: 'error', message: 'Enter a password first to inject into the URI' });
                    return;
                  }
                  const encodedPass = encodeURIComponent(passwordHelperInput.trim());
                  if (mongoUriInput.includes('<db_password>') || mongoUriInput.includes('<password>')) {
                    setMongoUriInput(mongoUriInput.replace(/<db_password>|<password>/gi, encodedPass));
                  } else {
                    // Try replacing between : and @
                    const updated = mongoUriInput.replace(/(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@.+)/, `$1${encodedPass}$3`);
                    setMongoUriInput(updated);
                  }
                  setActionFeedback({ type: 'info', message: 'Injected encoded password into connection URI!' });
                }}
                className="px-3 py-1.5 bg-[#082b1d] hover:bg-[#123e2b] border border-[#1d523a] text-lime-300 rounded text-xs font-mono transition"
              >
                Apply to URI
              </button>
            </div>

            {/* Quick Fill Suggestions & Auto-Formatter */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="text-[10px] text-slate-400 uppercase font-mono">Quick Fill:</span>
              <button
                type="button"
                onClick={() => setMongoUriInput('mongodb+srv://bughunt:<db_password>@cluster0.rebyb4m.mongodb.net/?compressors=zlib')}
                className="px-2 py-0.5 bg-[#092b1d] hover:bg-[#123e2b] border border-[#1d523a] text-lime-300 rounded text-[11px] font-mono transition"
              >
                Cluster0 (Template)
              </button>
              <button
                type="button"
                onClick={() => setMongoUriInput('mongodb+srv://bughunt:bughunt%40123@cluster0.rebyb4m.mongodb.net/bughunt?retryWrites=true&w=majority')}
                className="px-2 py-0.5 bg-[#092b1d] hover:bg-[#123e2b] border border-[#1d523a] text-emerald-300 rounded text-[11px] font-mono transition"
              >
                bughunt:bughunt@123
              </button>
              <button
                type="button"
                onClick={() => {
                  const { clean, wasCleaned, notes } = cleanMongoUri(mongoUriInput);
                  if (wasCleaned) {
                    setMongoUriInput(clean);
                    setActionFeedback({ type: 'info', message: `Formatted: ${notes.join(', ')}` });
                  } else {
                    setActionFeedback({ type: 'info', message: 'URI is already properly formatted!' });
                  }
                }}
                className="px-2 py-0.5 bg-[#0c243a] hover:bg-[#153552] border border-[#1d4c72] text-cyan-300 rounded text-[11px] font-mono transition ml-auto"
              >
                ✨ Clean & Format Input
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
              <div className="text-[11px] text-slate-400 font-mono">
                Supports: <span className="text-lime-300">mongodb+srv://</span> (Atlas) or <span className="text-cyan-300">mongodb://localhost:27017</span>
              </div>
              <button
                type="submit"
                disabled={isConnecting}
                className="px-4 py-2 bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-500 hover:to-emerald-500 text-slate-950 font-bold text-xs rounded-lg transition shadow-md disabled:opacity-50 flex items-center gap-1.5"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isConnecting ? 'animate-spin' : ''}`} />
                {isConnecting ? 'Testing & Connecting...' : 'Connect & Sync MongoDB'}
              </button>
            </div>
          </form>
        </div>

        {/* MongoDB Document Schema Inspector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>MongoDB BSON Collections & Document Schema</span>
            </div>
            <div className="flex items-center gap-1 bg-[#04140d] p-0.5 rounded-lg border border-[#164632]">
              {(['users', 'sessions', 'solutions'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveSchemaTab(tab)}
                  className={`px-2.5 py-1 text-[11px] font-mono rounded-md transition ${
                    activeSchemaTab === tab
                      ? 'bg-lime-500/20 text-lime-300 border border-lime-500/40'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab === 'users' ? 'users' : tab === 'sessions' ? 'sessions' : 'challenge_solutions'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#020b07] border border-[#164632] rounded-xl p-4 font-mono text-[11px] text-slate-300 overflow-x-auto shadow-inner">
            {activeSchemaTab === 'users' && (
              <pre className="text-emerald-300/90 leading-relaxed">{`// Collection: db.collection("users")
{
  "_id": "usr_neo",                       // Primary Key (String)
  "username": "Neo_Hacker",               // Unique Index
  "email": "neo@matrix.cyber",            // Unique Index
  "passwordHash": "a8f5e1... (SHA-256)",  // Salt-Hashed credential
  "salt": "cyber_salt_2026",
  "avatarSeed": "neo_matrix",
  "createdAt": "2026-10-01T08:00:00.000Z",
  "badges": ["first_blood", "syntax_sentinel", "speed_demon"],
  "stats": {
    "score": 6420,
    "coins": 850,
    "xp": 6420,
    "lives": 3,
    "maxLives": 3,
    "streak": 12,
    "unlockedLevel": 5,
    "solvedChallengeIds": ["l1_c1", "l1_c2", "l2_c1", ...],
    "hintsUsedCount": 4,
    "totalSubmissions": 35,
    "perfectFixesCount": 18,
    "lastPlayedDate": "2026-10-15T01:30:00.000Z"
  }
}`}</pre>
            )}

            {activeSchemaTab === 'sessions' && (
              <pre className="text-cyan-300/90 leading-relaxed">{`// Collection: db.collection("sessions")
{
  "_id": "tok_9f81a7b64c0e...",            // Auth Token (Primary Index)
  "token": "tok_9f81a7b64c0e...",
  "userId": "usr_neo",                    // Foreign Key -> users._id
  "createdAt": "2026-10-15T01:25:00.000Z",
  "lastActive": "2026-10-15T01:35:00.000Z"
}`}</pre>
            )}

            {activeSchemaTab === 'solutions' && (
              <pre className="text-orange-300/90 leading-relaxed">{`// Collection: db.collection("challenge_solutions")
{
  "_id": ObjectId("670dec..."),           // Auto-generated BSON ObjectId
  "userId": "usr_neo",
  "challengeId": "l3_c1_off_by_one",
  "pointsEarned": 185,
  "hintsUsedCount": 0,
  "timeRemainingSeconds": 48,
  "timestamp": "2026-10-15T01:36:22.000Z"
}`}</pre>
            )}
          </div>
        </div>
      </div>

      {/* Code Sandbox Execution Specification */}
      <div className="p-6 bg-[#072217] border border-[#164632] rounded-2xl shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-lime-300">
          <ShieldCheck className="w-5 h-5 text-lime-400" />
          <span>Code Execution Sandbox & Security Policy</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          In strict compliance with the security specification, <strong>player-submitted code is never executed directly with native server permissions</strong>. All submissions undergo multi-tiered isolation:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 bg-[#04140d] rounded-xl border border-[#184b35] space-y-2">
            <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Static AST Token Firewall</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Before compilation, submissions are scanned against forbidden keywords:
              <code className="block mt-1 p-1.5 bg-[#020b07] rounded text-[11px] text-rose-300 font-mono">
                process, child_process, fs, eval, Function, require, import, fetch, WebSocket, global
              </code>
            </p>
          </div>

          <div className="p-4 bg-[#04140d] rounded-xl border border-[#184b35] space-y-2">
            <div className="text-xs font-bold text-slate-200 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Lexical Closure & Timeout Jail</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Functions execute inside a sealed scope with masked global objects and intercepted console output. Infinite loops and recursive runaway are terminated via execution clocks.
            </p>
          </div>
        </div>

        {sandboxInfo && (
          <div className="p-3 bg-[#020b07] rounded-lg border border-[#184b35] text-[11px] font-mono text-slate-400 space-y-1">
            <div>Engine: <span className="text-lime-300">{sandboxInfo.engine}</span></div>
            <div>Time Limit: <span className="text-lime-300">{sandboxInfo.timeoutLimitMs}ms per assertion</span></div>
            <div>Network Access: <span className="text-rose-400">DENIED (0 egress sockets)</span></div>
            <div>Notice: <span className="text-slate-300">{sandboxInfo.securityNotice}</span></div>
          </div>
        )}
      </div>

      {/* Multiplayer Architecture Roadmap & Limitation Statement */}
      <div className="p-6 bg-[#072217] border border-[#164632] rounded-2xl space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-sm font-bold text-orange-300">
          <Users className="w-5 h-5 text-orange-400" />
          <span>Multiplayer Competition Architecture & Roadmap</span>
        </div>

        <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
          <div className="p-3.5 bg-orange-950/30 border border-orange-800/60 rounded-xl text-orange-200">
            <strong>Platform Implementation Note:</strong> Single-player campaign mode with 34 missions, daily challenges, and global asynchronous leaderboard competition is <strong>fully functional and playable immediately</strong>. Live real-time multiplayer 1v1 bug dueling requires persistent bi-directional WebSocket connections.
          </div>

          <h4 className="font-bold text-slate-100 text-xs">Production Multiplayer Architecture Plan:</h4>
          <ol className="list-decimal pl-5 space-y-1.5 text-slate-400 text-xs font-mono">
            <li><strong>WebSocket Server Gateway:</strong> Node.js `ws` or `Socket.io` cluster managing room matchmaking queues (`/ws/duel`).</li>
            <li><strong>Lockstep State Synchronization:</strong> Players receive identical obfuscated buggy snippets simultaneously.</li>
            <li><strong>Live Ghost Progress:</strong> Broadcasts opponents' passing test count (e.g. "Opponent passed 2/3 test cases!") in real-time.</li>
            <li><strong>Elo Rating System:</strong> Matchmaking rating adjustments based on time-to-first-flawless-patch.</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
