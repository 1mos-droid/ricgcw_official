import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Smartphone, Building2, Copy, Check, Sparkles, ShieldCheck } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';

interface GivingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
}

export const GivingModal = ({ isOpen, onClose, defaultCategory = 'Tithe & Offering' }: GivingModalProps) => {
  const [activeTab, setActiveTab] = useState<'momo' | 'bank'>('momo');
  const [selectedCategory, setSelectedCategory] = useState(defaultCategory);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const categories = [
    'Tithe & Offering',
    'Theme / Covenant Seed',
    'Church Expansion & Building',
    'Rural Missions & Outreach',
    'Orphanage & Welfare Support',
    'Youth & Student Education',
  ];

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl shadow-black overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 md:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold font-serif text-white">Online Giving & Covenant Seeds</h2>
                  <p className="text-xs text-amber-400/80 font-medium">Honor the Lord with your substance (Proverbs 3:9)</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close giving modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto">
              {/* Category Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Giving Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedCategory === cat
                          ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                          : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Channel Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-950 rounded-2xl border border-white/10">
                <button
                  onClick={() => setActiveTab('momo')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                    activeTab === 'momo'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4" /> Mobile Money (MoMo)
                </button>
                <button
                  onClick={() => setActiveTab('bank')}
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                    activeTab === 'bank'
                      ? 'bg-gradient-to-r from-amber-500 to-amber-400 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Building2 className="w-4 h-4" /> Bank Wire / Transfer
                </button>
              </div>

              {/* Details Tab Content */}
              {activeTab === 'momo' ? (
                <div className="space-y-4 bg-slate-950/70 p-6 rounded-2xl border border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Network</p>
                      <p className="font-bold text-white text-base">{CHURCH_INFO.giving.momo.network}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-400/15 text-amber-300 border border-amber-400/30">
                      Instant Payment
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase font-bold">MoMo Number</p>
                      <p className="font-mono font-bold text-lg text-amber-300">{CHURCH_INFO.giving.momo.number}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(CHURCH_INFO.giving.momo.number.replace(/\s/g, ''), 'momo-num')}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold transition-colors"
                    >
                      {copiedField === 'momo-num' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      {copiedField === 'momo-num' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase font-bold">Account Name</p>
                      <p className="font-bold text-white text-sm">{CHURCH_INFO.giving.momo.accountName}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(CHURCH_INFO.giving.momo.accountName, 'momo-name')}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-colors"
                    >
                      {copiedField === 'momo-name' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      {copiedField === 'momo-name' ? 'Copied' : 'Copy'}
                    </button>
                  </div>

                  <div className="text-xs text-slate-400 bg-amber-500/10 p-3.5 rounded-xl border border-amber-500/20">
                    <p className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Giving Reference Note:
                    </p>
                    Please use <span className="font-bold text-white font-mono">{selectedCategory}</span> as your transaction reference.
                  </div>
                </div>
              ) : (
                <div className="space-y-4 bg-slate-950/70 p-6 rounded-2xl border border-white/10">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <p className="text-[11px] text-slate-400 uppercase font-bold">Bank Name</p>
                      <p className="font-bold text-white text-base">{CHURCH_INFO.giving.bank.bankName}</p>
                      <p className="text-xs text-slate-400">{CHURCH_INFO.giving.bank.branch}</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-slate-400 uppercase font-bold">Account Number</p>
                        <p className="font-mono font-bold text-amber-300">{CHURCH_INFO.giving.bank.accountNumber}</p>
                      </div>
                      <button
                        onClick={() => handleCopy(CHURCH_INFO.giving.bank.accountNumber, 'bank-acc')}
                        className="p-2 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition-colors"
                      >
                        {copiedField === 'bank-acc' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase font-bold">SWIFT Code (International Transfers)</p>
                      <p className="font-mono font-bold text-white text-sm">{CHURCH_INFO.giving.bank.swiftCode}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(CHURCH_INFO.giving.bank.swiftCode, 'bank-swift')}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                    >
                      {copiedField === 'bank-swift' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Assurance / Scripture */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-950 border border-white/10 text-xs text-slate-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                <p>
                  "Give, and it will be given to you: good measure, pressed down, shaken together, and running over..." — <span className="font-bold text-white">Luke 6:38</span>
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-950 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-slate-400">God bless your generous giving!</span>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
              >
                Close & Return
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
