import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation, ArrowUpRight, Church, Copy, Check } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';
import { toTelUrl, toInternationalDisplay } from '../utils/phoneUtils';

interface BranchesSchedulesProps {
  onOpenBranchModal?: (branchId?: string) => void;
}

export const BranchesSchedules: React.FC<BranchesSchedulesProps> = ({
  onOpenBranchModal,
}) => {
  const { branches } = useChurch();
  const [activeBranchId, setActiveBranchId] = useState<string>(branches[0]?.id || 'mallam');
  const [copiedAddress, setCopiedAddress] = useState(false);

  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="sanctuaries" className="py-12 lg:py-16 px-4 sm:px-6 md:px-8 bg-transparent text-ink-primary">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-sanctuary-stone/80 pb-5">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-gold-600 font-semibold block mb-1">
              Gathering Places &amp; Timetables
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-ink-primary">
              Worship Across Our <span className="italic font-normal text-gold-600">Three Sanctuaries</span>
            </h2>
          </div>
          <button
            onClick={() => {
              trackEvent('interaction', 'branch_modal_opened', 'Sanctuaries Section');
              onOpenBranchModal?.(activeBranch.id);
            }}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink-primary text-sanctuary-alabaster text-xs uppercase tracking-wider font-medium hover:bg-gold-600 transition-colors cursor-pointer"
          >
            <Church className="w-4 h-4 text-gold-400" />
            <span>Full Directory &amp; Map Locator</span>
          </button>
        </div>

        {/* Split Architectural Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column (5 Cols): Large Interactive Branch Selector */}
          <div className="lg:col-span-5 space-y-2.5">
            {branches.map((branch, index) => {
              const isActive = activeBranchId === branch.id;
              const indexStr = String(index + 1).padStart(2, '0');
              const mainSundayService = branch.services.find((s) => s.isMain) || branch.services[0];

              return (
                <button
                  key={branch.id}
                  onClick={() => {
                    setActiveBranchId(branch.id);
                    trackEvent('interaction', 'branch_tab_selected', branch.name);
                  }}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all cursor-pointer border flex items-start justify-between group ${
                    isActive
                      ? 'bg-white/95 backdrop-blur-md border-gold-500 shadow-sm ring-2 ring-gold-500/20'
                      : 'bg-sanctuary-parchment/72 backdrop-blur-md border-sanctuary-stone/90 hover:bg-white/90 hover:border-sanctuary-stone-strong'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gold-600">
                        {indexStr}.
                      </span>
                      <h3 className="font-serif text-xl font-bold text-ink-primary">
                        {branch.name.split('(')[0].trim()}
                      </h3>
                      {branch.isHeadquarters && (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-700 border border-gold-500/30">
                          HQ
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-ink-muted flex items-center gap-1.5 font-light">
                      <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span>{branch.location}</span>
                    </p>

                    <p className="text-xs font-medium text-ink-primary pt-0.5 tabular-nums">
                      Sunday: {mainSundayService ? mainSundayService.time : '9:00 AM GMT'}
                    </p>
                  </div>

                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isActive ? 'bg-ink-primary text-white' : 'bg-transparent text-ink-muted group-hover:text-ink-primary'
                    }`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column (7 Cols): Dynamic Detail View */}
          <div className="lg:col-span-7 bg-white/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-sanctuary-stone/90 shadow-[0_12px_36px_-16px_rgba(20,22,25,0.09)] space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeBranch.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {/* Header Information */}
                <div className="space-y-2 pb-4 border-b border-sanctuary-stone">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs uppercase tracking-[0.2em] text-gold-600 font-semibold">
                      {activeBranch.tagline}
                    </span>
                    <span className="text-xs text-ink-muted">
                      Resident Leader: <strong className="text-ink-primary font-medium">{activeBranch.pastor}</strong>
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-ink-primary">
                    {activeBranch.name}
                  </h3>

                  <div className="space-y-1.5 text-sm text-ink-secondary pt-2">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-ink-primary">{activeBranch.address}</span>
                    </p>
                    <p className="text-xs text-ink-muted pl-6 italic">
                      Landmark: {activeBranch.directions}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-4">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(activeBranch.name + ', ' + activeBranch.location)}`}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent('interaction', 'branch_directions', activeBranch.name)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink-primary text-white text-xs uppercase tracking-wider font-medium hover:bg-gold-600 transition-colors cursor-pointer"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Open in Google Maps</span>
                    </a>

                    <a
                      href={toTelUrl(activeBranch.phone)}
                      onClick={() => trackEvent('conversion', 'call_hotline', activeBranch.name)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sanctuary-parchment/90 hover:bg-sanctuary-stone border border-sanctuary-stone text-ink-primary text-xs font-mono font-medium tabular-nums transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-gold-600" />
                      <span>{toInternationalDisplay(activeBranch.phone)}</span>
                    </a>

                    <button
                      onClick={() => handleCopy(activeBranch.address)}
                      className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-sanctuary-alabaster border border-sanctuary-stone text-xs text-ink-muted hover:text-ink-primary transition-colors cursor-pointer"
                      title="Copy Address"
                    >
                      {copiedAddress ? <Check className="w-3.5 h-3.5 text-olive-500" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedAddress ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Tabular Timetable */}
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-ink-muted font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold-600" />
                    <span>Weekly Gathering Timetable</span>
                  </h4>

                  <div className="space-y-3">
                    {activeBranch.services.map((srv, idx) => (
                      <div
                        key={idx}
                        className={`p-4 rounded-2xl border transition-all ${
                          srv.isMain
                            ? 'bg-sanctuary-alabaster/95 border-gold-500/40 shadow-xs'
                            : 'bg-sanctuary-parchment/65 border-sanctuary-stone'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-semibold text-gold-600 tracking-wider uppercase mb-1">
                          <span className="flex items-center gap-2">
                            {srv.day}
                            {srv.isMain && (
                              <span className="text-[9px] font-bold bg-gold-600 text-white px-2 py-0.5 rounded-full">
                                Main
                              </span>
                            )}
                          </span>
                          <span className="tabular-nums text-ink-primary font-mono">{srv.time}</span>
                        </div>
                        <p className="font-serif text-lg text-ink-primary font-bold">{srv.name}</p>
                        <p className="text-xs text-ink-muted mt-0.5">{srv.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchesSchedules;
