import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Phone, Mail, Navigation, Check, ChevronRight, Church } from 'lucide-react';
import { BRANCHES, Branch } from '../data/churchData';

interface BranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBranchId?: string;
}

export const BranchModal = ({ isOpen, onClose, defaultBranchId }: BranchModalProps) => {
  const [selectedBranch, setSelectedBranch] = useState<Branch>(() => {
    return BRANCHES.find((b) => b.id === defaultBranchId) || BRANCHES[0];
  });
  const [copiedTime, setCopiedTime] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTime(text);
    setTimeout(() => setCopiedTime(null), 2000);
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

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-4xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl shadow-black overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 md:p-8 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Church className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold font-serif text-white">Find a Church Sanctuary</h2>
                  <p className="text-xs text-amber-400/80 font-medium">Gather with us in worship across our 3 active branches</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Close branch modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="grid md:grid-cols-12 flex-1 overflow-y-auto">
              {/* Branch Tabs */}
              <div className="md:col-span-4 p-4 md:p-6 bg-slate-950/60 border-b md:border-b-0 md:border-r border-white/10 space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">Select Location</p>
                {BRANCHES.map((branch) => {
                  const isSelected = selectedBranch.id === branch.id;
                  return (
                    <button
                      key={branch.id}
                      onClick={() => setSelectedBranch(branch)}
                      className={`w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between group ${
                        isSelected
                          ? 'bg-gradient-to-r from-amber-500/20 to-amber-500/5 border border-amber-500/40 text-white shadow-lg shadow-amber-500/5'
                          : 'bg-white/5 hover:bg-white/10 border border-transparent text-slate-300'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{branch.name.split('(')[0]}</span>
                          {branch.isHeadquarters && (
                            <span className="text-[9px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
                              HQ
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                          {branch.location}
                        </p>
                      </div>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-amber-400 translate-x-0.5' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    </button>
                  );
                })}

                <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-2">
                  <p className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> Pastoral Helpline
                  </p>
                  <p className="text-slate-300">Need directions or have questions? Call us anytime:</p>
                  <a href="tel:+2332444857403" className="block text-amber-400 font-bold text-sm hover:underline">
                    +233 244 485 7403
                  </a>
                </div>
              </div>

              {/* Branch Details */}
              <div className="md:col-span-8 p-6 md:p-8 space-y-6 bg-slate-900/80">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/15 text-amber-300 border border-amber-400/30">
                      {selectedBranch.tagline}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-serif text-white">{selectedBranch.name}</h3>
                  <p className="text-sm text-slate-300 flex items-start gap-2 pt-1">
                    <MapPin className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span>{selectedBranch.address}</span>
                  </p>
                  <p className="text-xs text-slate-400 pl-6">{selectedBranch.directions}</p>
                </div>

                {/* Service Schedule */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400/90 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Weekly Worship & Service Times
                  </h4>
                  <div className="grid gap-3">
                    {selectedBranch.services.map((svc, i) => (
                      <div
                        key={i}
                        className={`p-4 rounded-2xl border transition-all ${
                          svc.isMain
                            ? 'bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-800/80 border-amber-500/30'
                            : 'bg-white/5 border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-md">
                                {svc.day}
                              </span>
                              <span className="font-bold text-sm text-white">{svc.name}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-1.5">{svc.description}</p>
                          </div>
                          <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                            <span className="text-xs font-bold font-mono text-amber-300 bg-black/40 px-3 py-1.5 rounded-xl border border-amber-500/20">
                              {svc.time}
                            </span>
                            <button
                              onClick={() => handleCopy(`${selectedBranch.name} - ${svc.day} (${svc.time}): ${svc.name}`)}
                              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                              title="Copy schedule"
                            >
                              {copiedTime === `${selectedBranch.name} - ${svc.day} (${svc.time}): ${svc.name}` ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Clock className="w-3.5 h-3.5" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-400" /> {selectedBranch.phone}
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-amber-400" /> {selectedBranch.email}
                    </span>
                  </div>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(selectedBranch.name + ', ' + selectedBranch.location)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 active:scale-95"
                  >
                    <Navigation className="w-4 h-4" /> Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
