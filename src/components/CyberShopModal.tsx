import React, { useState } from 'react';
import { X, Shield, Clock, Eye, ShoppingCart, Coins, Check, AlertCircle, Compass, Zap } from 'lucide-react';
import { User, PowerUp } from '../types/game';
import { api } from '../services/api';
import { soundManager } from '../utils/audio';

interface CyberShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onUserUpdated: (user: User) => void;
}

export const PERKS: PowerUp[] = [
  {
    id: 'shield',
    name: 'Reinforced Net Shield',
    description: 'Absorbs 1 failed test execution without losing an explorer life.',
    cost: 60,
    icon: 'Shield',
  },
  {
    id: 'overclock',
    name: 'Expedition Chronometer',
    description: 'Injects +45 seconds into the mission countdown clock.',
    cost: 40,
    icon: 'Clock',
  },
  {
    id: 'xray',
    name: 'Specimen Torch (X-Ray)',
    description: 'Instantly highlights the exact corrupted bug line in the code editor.',
    cost: 50,
    icon: 'Eye',
  },
];

export const CyberShopModal: React.FC<CyberShopModalProps> = ({
  isOpen,
  onClose,
  user,
  onUserUpdated,
}) => {
  const [buyingId, setBuyingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleBuy = async (perkId: 'shield' | 'overclock' | 'xray') => {
    if (!user) return;
    setError(null);
    setBuyingId(perkId);
    try {
      const res = await api.buyPerk(perkId);
      soundManager.playPowerUp();
      onUserUpdated(res.user);
    } catch (err: any) {
      soundManager.playError();
      setError(err.message || 'Purchase failed');
    } finally {
      setBuyingId(null);
    }
  };

  const inventory = user?.stats.inventory || { shield: 0, overclock: 0, xray: 0 };
  const coins = user?.stats.coins || 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-lg bg-[#072217] border-2 border-[#1c553d] rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#04140d] border-b border-[#14422e]">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-orange-400" />
            <div>
              <h2 className="font-extrabold text-slate-100 text-sm">Safari Outpost · Explorer Gear</h2>
              <div className="text-[11px] text-emerald-400/80 font-mono">Consumable tools to assist your bug hunt</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-xl text-amber-400 font-mono text-xs font-bold">
              <Coins className="w-3.5 h-3.5" />
              <span>{coins} Coins</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-emerald-500 hover:text-emerald-200 rounded-lg hover:bg-[#0c2b1e] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 text-xs bg-orange-950/50 border border-orange-800/80 text-orange-300 rounded-xl flex items-center gap-2 font-bold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-3">
            {PERKS.map((perk) => {
              const ownedCount = inventory[perk.id] || 0;
              const canAfford = coins >= perk.cost;

              return (
                <div
                  key={perk.id}
                  className="p-4 bg-[#051810] rounded-2xl border border-[#164632] flex items-center justify-between gap-4 transition-all hover:border-lime-500/40"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-[#092b1d] border border-[#1d5c3f] flex items-center justify-center text-lime-400 shrink-0 mt-0.5 shadow-md">
                      {perk.id === 'shield' && <Shield className="w-5 h-5 text-lime-400" />}
                      {perk.id === 'overclock' && <Compass className="w-5 h-5 text-amber-400" />}
                      {perk.id === 'xray' && <Eye className="w-5 h-5 text-cyan-400" />}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-emerald-100">{perk.name}</span>
                        <span className="text-[10px] text-emerald-400 font-mono font-bold bg-[#0a2f20] px-2 py-0.2 rounded-full border border-[#184f37]">
                          Owned: {ownedCount}
                        </span>
                      </div>
                      <p className="text-xs text-emerald-200/70 leading-relaxed max-w-xs">{perk.description}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBuy(perk.id)}
                    disabled={!canAfford || buyingId === perk.id}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-black transition-all shrink-0 cursor-pointer uppercase tracking-wider ${
                      canAfford
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 active:scale-95 text-slate-950 shadow-md shadow-orange-950/40'
                        : 'bg-[#092217] text-emerald-800 cursor-not-allowed border border-[#113827]'
                    }`}
                  >
                    <Coins className="w-3.5 h-3.5" />
                    <span>{perk.cost}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
