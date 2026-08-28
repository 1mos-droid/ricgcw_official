import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Navigation, Phone, Mail, Sparkles, Check, Church, ChevronRight } from 'lucide-react';
import { BRANCHES, Branch } from '../data/churchData';

interface BranchesSchedulesProps {
  onOpenBranchModal?: () => void;
}

export const BranchesSchedules = ({ onOpenBranchModal }: BranchesSchedulesProps) => {
  const [activeBranchId, setActiveBranchId] = useState<string>(BRANCHES[0].id);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const activeBranch = BRANCHES.find((b) => b.id === activeBranchId) || BRANCHES[0];

  const handleCopySchedule = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <section id="branches" className="relative py-28 px-4 sm:px-6 md:px-8 bg-slate-900/60 border-b border-amber-500/15 overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-sacred-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <Church className="w-3.5 h-3.5" /> Gather With Us
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight">
              Church Sanctuaries & Service Times
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
              Experience the power of God in any of our 3 regional branches across Greater Accra, Ghana.
            </p>
          </div>

          <button
            onClick={onOpenBranchModal}
            className="px-6 py-3.5 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center gap-2 self-start md:self-auto transition-all cursor-pointer"
          >
            <MapPin className="w-4 h-4" /> Full Branch Directory
          </button>
        </div>

        {/* Branch Interactive Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BRANCHES.map((branch) => {
            const isActive = activeBranchId === branch.id;
            return (
              <button
                key={branch.id}
                onClick={() => setActiveBranchId(branch.id)}
                className={`p-6 rounded-3xl text-left transition-all relative overflow-hidden group cursor-pointer border ${
                  isActive
                    ? 'bg-gradient-to-b from-slate-850 to-slate-900 border-amber-500/50 shadow-2xl shadow-amber-500/10'
                    : 'bg-slate-950/70 border-white/10 hover:border-white/20 hover:bg-slate-900/60'
                }`}
              >
                {/* Active Indicator bar */}
                {isActive && (
                  <motion.div
                    layoutId="active-branch-indicator"
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500"
                  />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isActive ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-white/5 text-amber-400'}`}>
                    <Church className="w-5 h-5" />
                  </div>
                  {branch.isHeadquarters && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      Headquarters
                    </span>
                  )}
                </div>

                <h3 className={`font-bold font-serif text-lg ${isActive ? 'text-white' : 'text-slate-200'}`}>
                  {branch.name.split('(')[0]}
                </h3>
                <p className="text-xs text-amber-400/90 font-medium mt-0.5">{branch.location}</p>
                <p className="text-xs text-slate-400 mt-2 line-clamp-2">{branch.tagline}</p>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-amber-300 font-bold">
                    Sunday: {branch.services[0].time.split('–')[0]}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-amber-400 translate-x-1' : 'text-slate-600'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Branch Detailed Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeBranch.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="rounded-[36px] bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 border border-amber-500/30 p-6 sm:p-8 md:p-10 shadow-2xl space-y-8"
          >
            {/* Top Branch Info */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400/15 text-amber-300 border border-amber-400/30">
                    {activeBranch.tagline}
                  </span>
                  <span className="text-xs text-slate-400">Led by: <strong className="text-white">{activeBranch.pastor}</strong></span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white">{activeBranch.name}</h3>
                <p className="text-sm text-slate-300 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{activeBranch.address}</span>
                </p>
                <p className="text-xs text-slate-400 italic">{activeBranch.directions}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(activeBranch.name + ', ' + activeBranch.location)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 active:scale-95"
                >
                  <Navigation className="w-4 h-4" /> Open in Google Maps
                </a>
                <a
                  href={`tel:${activeBranch.phone}`}
                  className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-all flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" /> Call Sanctuary
                </a>
              </div>
            </div>

            {/* Service Schedules Grid */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Clock className="w-4 h-4" /> Weekly Gatherings & Ministrations
              </h4>

              <div className="grid md:grid-cols-2 gap-4">
                {activeBranch.services.map((svc, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-2xl border transition-all ${
                      svc.isMain
                        ? 'bg-gradient-to-r from-amber-500/15 via-slate-800 to-slate-800/90 border-amber-500/40 shadow-lg'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-md">
                            {svc.day}
                          </span>
                          {svc.isMain && (
                            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                              Main Service
                            </span>
                          )}
                        </div>
                        <h5 className="font-bold text-base text-white pt-1">{svc.name}</h5>
                        <p className="text-xs text-slate-300 leading-relaxed">{svc.description}</p>
                      </div>

                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="text-xs font-mono font-bold text-amber-300 bg-black/50 px-3 py-1.5 rounded-xl border border-amber-500/20">
                          {svc.time}
                        </span>
                        <button
                          onClick={() => handleCopySchedule(`${activeBranch.name} | ${svc.day} (${svc.time}) - ${svc.name}`)}
                          className="text-[10px] text-slate-400 hover:text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          {copiedText === `${activeBranch.name} | ${svc.day} (${svc.time}) - ${svc.name}` ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" /> Copied
                            </>
                          ) : (
                            'Copy Time'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Pastoral Helpline banner */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-slate-300 flex items-center gap-2 text-center sm:text-left">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                First time visitor? Our ushering and protocol team will be delighted to welcome and host you!
              </span>
              <button
                onClick={onOpenBranchModal}
                className="text-amber-300 font-bold hover:underline shrink-0 cursor-pointer"
              >
                Learn What to Expect →
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
