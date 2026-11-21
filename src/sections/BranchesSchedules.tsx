import React, { useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation, ArrowUpRight, Church, Copy, Check } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';
import { toTelUrl, toInternationalDisplay } from '../utils/phoneUtils';
import { CATHEDRAL_EASE, SPRING_TACTILE } from '../components/motion';
import SectionHeader from '../components/SectionHeader';

interface BranchesSchedulesProps {
  onOpenBranchModal?: (branchId?: string) => void;
}

export const BranchesSchedules: React.FC<BranchesSchedulesProps> = ({
  onOpenBranchModal,
}) => {
  const { branches } = useChurch();
  const [activeBranchId, setActiveBranchId] = useState<string>(branches[0]?.id || 'mallam');
  const [copiedAddress, setCopiedAddress] = useState(false);
  const prefersReduced = useReducedMotion();

  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="sanctuaries" className="py-14 lg:py-20 px-4 sm:px-6 md:px-8 bg-transparent text-ink-primary">
      <div className="max-w-7xl mx-auto space-y-8">
        <SectionHeader
          eyebrow="Gathering Places & Timetables"
          title="Worship Across Our"
          accent="Three Sanctuaries"
          rightSlot={
            <button
              type="button"
              onClick={() => {
                trackEvent('interaction', 'branch_modal_opened', 'Sanctuaries Section');
                onOpenBranchModal?.(activeBranch.id);
              }}
              className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink-primary text-sanctuary-alabaster text-caption uppercase tracking-wider font-semibold hover:bg-gold-600 transition-colors cursor-pointer"
            >
              <Church className="w-4 h-4 text-gold-400" />
              <span>Full Directory &amp; Map Locator</span>
            </button>
          }
        />

        {/* Split Architectural Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column (5 Cols): Tactile Branch Segmented Selector with layoutId Pill */}
          <div
            role="tablist"
            aria-label="Church sanctuary locations"
            className="lg:col-span-5 space-y-3"
          >
            {branches.map((branch, index) => {
              const isActive = activeBranchId === branch.id;
              const indexStr = String(index + 1).padStart(2, '0');
              const mainSundayService = branch.services.find((s) => s.isMain) || branch.services[0];

              return (
                <button
                  key={branch.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveBranchId(branch.id);
                    trackEvent('interaction', 'branch_tab_selected', branch.name);
                  }}
                  className={`relative w-full min-h-[44px] text-left p-5 rounded-2xl transition-colors cursor-pointer border flex items-start justify-between group overflow-hidden ${
                    isActive
                      ? 'border-gold-500 shadow-sm'
                      : 'bg-sanctuary-parchment/85 border-sanctuary-stone hover:bg-white/95 hover:border-sanctuary-stone-strong'
                  }`}
                >
                  {isActive && (
                    <m.span
                      layoutId="branch-active-pill"
                      transition={SPRING_TACTILE}
                      aria-hidden="true"
                      className="absolute inset-0 bg-white ring-2 ring-gold-500/20 -z-0"
                    />
                  )}

                  <div className="relative z-10 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-caption font-mono font-bold text-gold-600">
                        {indexStr}.
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink-primary">
                        {branch.name.split('(')[0].trim()}
                      </h3>
                      {branch.isHeadquarters && (
                        <span className="text-eyebrow font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-700 border border-gold-500/30">
                          HQ
                        </span>
                      )}
                    </div>

                    <p className="text-caption text-ink-muted flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-600 shrink-0" />
                      <span>{branch.location}</span>
                    </p>

                    <p className="text-caption font-semibold text-ink-primary pt-0.5 tabular-nums">
                      Sunday: {mainSundayService ? mainSundayService.time : '9:00 AM GMT'}
                    </p>
                  </div>

                  <div
                    className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 ${
                      isActive ? 'bg-ink-primary text-white' : 'bg-transparent text-ink-muted group-hover:text-ink-primary'
                    }`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column (7 Cols): PopLayout Cross-Fade Detail View */}
          <div className="lg:col-span-7 bg-white/85 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-sanctuary-stone shadow-[0_12px_36px_-16px_rgba(20,22,25,0.09)] relative overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <m.div
                key={activeBranch.id}
                initial={{ opacity: 0, x: prefersReduced ? 0 : 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: prefersReduced ? 0 : -12 }}
                transition={{ duration: prefersReduced ? 0.12 : 0.28, ease: CATHEDRAL_EASE }}
                className="space-y-6"
              >
                {/* Header Information */}
                <div className="space-y-2.5 pb-5 border-b border-sanctuary-stone">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-eyebrow uppercase tracking-[0.2em] text-gold-600 font-semibold">
                      {activeBranch.tagline}
                    </span>
                    <span className="text-caption text-ink-muted">
                      Resident Leader: <strong className="text-ink-primary font-semibold">{activeBranch.pastor}</strong>
                    </span>
                  </div>

                  <h3 className="font-serif text-h3 sm:text-3xl font-bold text-ink-primary">
                    {activeBranch.name}
                  </h3>

                  <div className="space-y-1.5 text-body text-ink-secondary pt-1">
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-1" />
                      <span className="font-medium text-ink-primary">{activeBranch.address}</span>
                    </p>
                    <p className="text-caption text-ink-muted pl-6 italic">
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
                      className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink-primary text-white text-caption uppercase tracking-wider font-semibold hover:bg-gold-600 transition-colors cursor-pointer"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Open in Google Maps</span>
                    </a>

                    <a
                      href={toTelUrl(activeBranch.phone)}
                      onClick={() => trackEvent('conversion', 'call_hotline', activeBranch.name)}
                      className="min-h-[44px] inline-flex items-center gap-2 px-5 py-3 rounded-full bg-sanctuary-parchment hover:bg-sanctuary-stone border border-sanctuary-stone text-ink-primary text-caption font-mono font-semibold tabular-nums transition-colors"
                    >
                      <Phone className="w-4 h-4 text-gold-600" />
                      <span>{toInternationalDisplay(activeBranch.phone)}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => handleCopy(activeBranch.address)}
                      className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-sanctuary-alabaster border border-sanctuary-stone text-caption text-ink-secondary hover:text-ink-primary transition-colors cursor-pointer"
                      title="Copy Address"
                    >
                      {copiedAddress ? <Check className="w-4 h-4 text-olive-500" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedAddress ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Staggered Weekly Timetable */}
                <div className="space-y-4">
                  <h4 className="text-eyebrow uppercase tracking-[0.2em] text-ink-muted font-semibold flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold-600" />
                    <span>Weekly Gathering Timetable</span>
                  </h4>

                  <div className="space-y-3">
                    {activeBranch.services.map((srv, idx) => (
                      <m.div
                        key={`${activeBranch.id}-${srv.day}-${idx}`}
                        initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: prefersReduced ? 0.1 : 0.35,
                          delay: prefersReduced ? 0 : idx * 0.065,
                          ease: CATHEDRAL_EASE,
                        }}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                          srv.isMain
                            ? 'bg-sanctuary-alabaster border-gold-500/50 ring-1 ring-gold-500/35 shadow-[0_0_24px_-6px_rgba(184,134,11,0.22)]'
                            : 'bg-sanctuary-parchment/75 border-sanctuary-stone'
                        }`}
                      >
                        <div className="flex items-center justify-between text-eyebrow font-bold text-gold-600 tracking-wider uppercase mb-1">
                          <span className="flex items-center gap-2">
                            {srv.day}
                            {srv.isMain && (
                              <span className="bg-gold-600 text-white px-2.5 py-0.5 rounded-full">
                                Main Gathering
                              </span>
                            )}
                          </span>
                          <span className="tabular-nums text-ink-primary font-mono text-caption">{srv.time}</span>
                        </div>
                        <p className="font-serif text-lg sm:text-xl text-ink-primary font-bold">{srv.name}</p>
                        <p className="text-caption text-ink-secondary mt-1">{srv.description}</p>
                      </m.div>
                    ))}
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchesSchedules;
