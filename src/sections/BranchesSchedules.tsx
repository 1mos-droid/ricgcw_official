import React, { useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MapPin, Phone, Navigation, Church, Copy, Check } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { PICTURES, IMAGE_DIMENSIONS } from '../data/churchData';
import { trackEvent } from '../utils/analytics';
import { toTelUrl, toInternationalDisplay } from '../utils/phoneUtils';
import { CATHEDRAL_EASE, SPRING_TACTILE, ParallaxFrame, DrawRule } from '../components/motion';
import SectionHeader from '../components/SectionHeader';
import ResponsiveImage from '../components/ResponsiveImage';

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
    <section
      id="sanctuaries"
      className="relative logo-globe-bg bg-navy-pattern text-sanctuary-alabaster py-20 lg:py-28 px-4 sm:px-6 lg:px-10 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <SectionHeader
          variant="dark"
          index="03"
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
              className="min-h-[44px] inline-flex items-center gap-2.5 px-6 py-2.5 rounded-sm bg-gold-500 hover:bg-gold-400 text-sanctuary-950 text-caption uppercase tracking-[0.14em] font-semibold transition-colors cursor-pointer"
            >
              <Church className="w-4 h-4" />
              <span>Full Directory &amp; Map Locator</span>
            </button>
          }
        />

        {/* Horizontal Architectural Index Tabs with Sliding Brass Underline */}
        <div
          role="tablist"
          aria-label="Church sanctuary locations"
          className="flex flex-wrap items-center gap-6 sm:gap-10 border-b border-white/15 pb-1"
        >
          {branches.map((branch, index) => {
            const isActive = activeBranchId === branch.id;
            const indexStr = String(index + 1).padStart(2, '0');
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
                className={`relative min-h-[48px] py-3 text-left flex items-baseline gap-2.5 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-gold-400'
                    : 'text-sanctuary-alabaster/65 hover:text-sanctuary-alabaster'
                }`}
              >
                <span className="text-eyebrow font-mono tabular-nums text-gold-400/80">
                  {indexStr}
                </span>
                <span className="font-serif text-2xl sm:text-3xl tracking-tight">
                  {branch.name.split('(')[0].trim()}
                </span>
                {branch.isHeadquarters && (
                  <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-gold-400/80">
                    [HQ]
                  </span>
                )}

                {isActive && (
                  <m.span
                    layoutId="branch-underline"
                    transition={SPRING_TACTILE}
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-[5px] h-[2px] bg-gold-400"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Hairline Detail View (Zero Boxed White Card) */}
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={activeBranch.id}
            initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: prefersReduced ? 0 : -10 }}
            transition={{ duration: prefersReduced ? 0.12 : 0.3, ease: CATHEDRAL_EASE }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-2"
          >
            {/* Left 5 Cols: Address, Landmark & Actions */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-eyebrow font-mono uppercase tracking-[0.22em] text-gold-400 block">
                  {activeBranch.tagline}
                </span>
                <h3 className="font-serif text-h2 font-normal text-sanctuary-alabaster">
                  {activeBranch.name}
                </h3>
                <p className="text-caption text-sanctuary-alabaster/70">
                  Resident Shepherd:{' '}
                  <strong className="text-sanctuary-alabaster font-medium">
                    {activeBranch.pastor}
                  </strong>
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/12 text-body">
                <p className="flex items-start gap-2.5 text-sanctuary-alabaster">
                  <MapPin className="w-4 h-4 text-globe-azure shrink-0 mt-1" />
                  <span>{activeBranch.address}</span>
                </p>
                <p className="text-caption text-sanctuary-alabaster/65 pl-6 italic">
                  Landmark: {activeBranch.directions}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(activeBranch.name + ', ' + activeBranch.location)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('interaction', 'branch_directions', activeBranch.name)}
                  className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-sanctuary-alabaster hover:bg-gold-400 text-sanctuary-950 text-caption uppercase tracking-[0.14em] font-semibold transition-colors cursor-pointer"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open in Maps</span>
                </a>

                <a
                  href={toTelUrl(activeBranch.phone)}
                  onClick={() => trackEvent('conversion', 'call_hotline', activeBranch.name)}
                  className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-white/20 hover:border-gold-400 text-sanctuary-alabaster text-caption font-mono tabular-nums transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold-400" />
                  <span>{toInternationalDisplay(activeBranch.phone)}</span>
                </a>

                <button
                  type="button"
                  onClick={() => handleCopy(activeBranch.address)}
                  className="min-h-[44px] inline-flex items-center gap-1.5 px-4 py-2.5 rounded-sm border border-white/15 hover:border-white/40 text-sanctuary-alabaster/80 hover:text-white text-caption transition-colors cursor-pointer"
                  title="Copy Address"
                >
                  {copiedAddress ? <Check className="w-4 h-4 text-olive-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedAddress ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Right 7 Cols: Architectural Weekly Timetable Ledger */}
            <div className="lg:col-span-7 border-t border-white/15 divide-y divide-white/12">
              {activeBranch.services.map((srv, idx) => (
                <m.div
                  key={`${activeBranch.id}-${srv.day}-${idx}`}
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: prefersReduced ? 0.1 : 0.36,
                    delay: prefersReduced ? 0 : idx * 0.06,
                    ease: CATHEDRAL_EASE,
                  }}
                  className={`py-5 pl-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline ${
                    srv.isMain ? 'border-l-2 border-l-gold-400 bg-white/[0.03]' : ''
                  }`}
                >
                  <div className="sm:col-span-4 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-eyebrow font-mono uppercase tracking-[0.18em] text-gold-400 font-semibold">
                        {srv.day}
                      </span>
                      {srv.isMain && (
                        <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-sanctuary-950 bg-gold-400 px-1.5 py-0.5 font-semibold">
                          Main
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-caption text-sanctuary-alabaster/80 tabular-nums">
                      {srv.time}
                    </p>
                  </div>

                  <div className="sm:col-span-8 space-y-1">
                    <h4 className="font-serif text-2xl text-sanctuary-alabaster font-normal">
                      {srv.name}
                    </h4>
                    <p className="text-caption text-sanctuary-alabaster/70 leading-relaxed">
                      {srv.description}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>
        </AnimatePresence>

        {/* Full-Width Panoramic Church Family Interlude */}
        <div className="pt-4 space-y-4">
          <DrawRule variant="dark" />
          <div className="relative border border-gold-400/25 overflow-hidden bg-sanctuary-900">
            <ParallaxFrame offsetY={22} zoomFrom={1.06} className="aspect-[16/10] sm:aspect-[21/9]">
              <ResponsiveImage
                src={PICTURES.pastors}
                alt="Pastoral Council and Ministerial Family of Rhema Inner Court Gospel Church"
                width={IMAGE_DIMENSIONS.pastors.width}
                height={IMAGE_DIMENSIONS.pastors.height}
                priority
                sizes="100vw"
                pictureClassName="w-full h-full block"
                className="w-full h-full object-cover object-[50%_20%]"
              />
            </ParallaxFrame>

            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-sanctuary-950 via-sanctuary-950/60 to-transparent pointer-events-none"
            />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <p className="font-serif italic text-xl sm:text-2xl text-sanctuary-alabaster">
                One Prophetic Family · Mallam · Kokrobitey · Langma
              </p>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-gold-400">
                Pastoral Council &amp; Ministerial Fellowship
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchesSchedules;
