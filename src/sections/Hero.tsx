import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, HeartHandshake, MapPin } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { IMAGES } from '../data/churchData';
import { trackEvent } from '../utils/analytics';
import { getNextSundayCountdown, ServiceCountdownStatus } from '../utils/serviceScheduleUtils';

const cathedralTransition = {
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1] as const,
};

const DEFAULT_CONTEXT_HEADLINE = 'Where Impossibilities Become Divine Reality';

interface HeroProps {
  onOpenBranchModal?: (branchId?: string) => void;
  onOpenGivingModal?: () => void;
  onOpenPrayerModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBranchModal,
  onOpenPrayerModal,
}) => {
  const { churchInfo, themeSettings, branches } = useChurch();
  const [countdown, setCountdown] = useState<ServiceCountdownStatus>(() => getNextSundayCountdown());

  // Next Sunday Service Countdown (Accra GMT UTC+0)
  useEffect(() => {
    const update = () => setCountdown(getNextSundayCountdown());
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  const serviceStatusText = countdown.isLiveNow
    ? 'Main Sanctuary in Session'
    : countdown.isToday
    ? `Starts in ${countdown.hours}h ${countdown.mins}m this morning`
    : `${countdown.days}d ${countdown.hours}h until Sunday Encounter`;

  const renderHeroHeadline = () => {
    const raw = themeSettings.heroHeadline?.trim();
    if (!raw) {
      return (
        <>
          Step Into the{' '}
          <span className="italic font-normal text-gold-400">Inner Court</span>{' '}
          of His Presence.
        </>
      );
    }
    if (raw === DEFAULT_CONTEXT_HEADLINE) {
      return (
        <>
          Where Impossibilities Become{' '}
          <span className="italic font-normal text-gold-400">Divine Reality.</span>
        </>
      );
    }
    return raw;
  };

  return (
    <section className="relative flex flex-col justify-between text-sanctuary-alabaster">
      {/* Dark Sanctuary Threshold Container */}
      <div className="relative min-h-[86vh] sm:min-h-[88vh] flex flex-col justify-between bg-sanctuary-950 overflow-hidden">
        {/* Atmospheric Background Layer — Warmly Graded Sanctuary Imagery */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src={IMAGES.theme || IMAGES.overseer}
            alt="Worship at Rhema Inner Court Gospel Church"
            className="w-full h-full object-cover object-center scale-105 opacity-35 filter contrast-105 saturate-75"
          />
          {/* Multi-stage editorial vignette for effortless text legibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-sanctuary-950/85 via-sanctuary-950/55 to-sanctuary-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#080B11_100%)] opacity-70" />
        </div>

        {/* Spacer for Floating Navbar */}
        <div className="h-20 sm:h-24" />

        {/* Center Editorial Statement (The Threshold) */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 py-10 md:py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={cathedralTransition}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-gold-400/30 bg-sanctuary-900/70 backdrop-blur-md mb-6 shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-gold-400 font-medium font-sans">
              {churchInfo.themeYear}: The Year of {churchInfo.themeTitle} • {churchInfo.scripturalAnchor.reference}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...cathedralTransition, delay: 0.1 }}
            className="font-serif text-5xl sm:text-6xl lg:text-[5rem] leading-[1.04] tracking-tight text-sanctuary-alabaster max-w-4xl mx-auto"
          >
            {renderHeroHeadline()}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...cathedralTransition, delay: 0.2 }}
            className="mt-5 text-base sm:text-lg text-sanctuary-alabaster/80 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {themeSettings.heroSubtitle || (
              <>
                Welcome to <strong>{churchInfo.name}</strong>, under the apostolic leadership of General Overseer <strong>Rev. Nicholas Dobeng</strong>—a sacred sanctuary where saints are perfected, territories are taken, and impossibility becomes possible.
              </>
            )}
          </motion.p>

          {/* Primary Actions — High-Contrast Alabaster & Subtle Glass */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...cathedralTransition, delay: 0.3 }}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#sanctuaries"
              onClick={() => trackEvent('interaction', 'plan_visit_clicked', 'Hero')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-sanctuary-alabaster text-sanctuary-950 font-medium text-sm tracking-wide hover:bg-gold-400 transition-colors duration-300 shadow-xl cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-gold-600" />
              <span>Plan Your Visit This Sunday</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <button
              onClick={() => {
                trackEvent('conversion', 'prayer_modal_opened', 'Hero Primary');
                onOpenPrayerModal?.();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full border border-sanctuary-alabaster/25 bg-sanctuary-alabaster/5 backdrop-blur-sm text-sanctuary-alabaster font-medium text-sm tracking-wide hover:bg-sanctuary-alabaster/15 transition-colors duration-300 cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4 text-gold-400" />
              <span>Submit a Prayer Petition</span>
            </button>
          </motion.div>
        </div>

        {/* Bottom Architectural Dock — Immediate Service Times & Live Status */}
        <div className="relative z-10 border-t border-sanctuary-alabaster/10 bg-sanctuary-950/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6 items-center">
            {/* Live / Countdown Status */}
            <div className="flex items-center gap-3 sm:col-span-3 lg:col-span-1 sm:pb-4 lg:pb-0 sm:border-b lg:border-b-0 lg:border-r border-sanctuary-alabaster/10 lg:pr-6">
              <span
                className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                  countdown.isLiveNow ? 'bg-emerald-400 animate-ping' : 'bg-gold-400'
                }`}
              />
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-sanctuary-alabaster/50 font-mono">
                  Sanctuary Status
                </p>
                <p className="text-sm font-medium text-sanctuary-alabaster tabular-nums">
                  {serviceStatusText}
                </p>
              </div>
            </div>

            {/* 3 Verified Branches Quick-Jump */}
            {branches.slice(0, 3).map((branch) => {
              const mainService = branch.services.find((s) => s.isMain) || branch.services[0];
              return (
                <button
                  key={branch.id}
                  onClick={() => {
                    trackEvent('interaction', 'branch_quick_dock_clicked', branch.name);
                    onOpenBranchModal?.(branch.id);
                  }}
                  className="group text-left flex items-center justify-between px-3 py-2 -mx-3 rounded-xl hover:bg-white/[0.05] transition-colors cursor-pointer"
                >
                  <div>
                    <p className="text-xs font-medium text-gold-400 group-hover:underline flex items-center gap-1">
                      {branch.name.split('(')[0].trim()}
                      {branch.isHeadquarters && <span className="text-[10px] text-white/50">(HQ)</span>}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </p>
                    <p className="text-sm text-sanctuary-alabaster font-light tabular-nums">
                      Sundays • {mainService ? mainService.time.split(/[-–]/)[0].trim() : '9:00 AM'} GMT
                    </p>
                    <p className="text-xs text-sanctuary-alabaster/50 truncate max-w-[220px]">
                      {branch.location}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Atmospheric Horizon Blend into Continuous Cathedral Daylight Canvas */}
      <div
        aria-hidden="true"
        className="h-14 sm:h-20 bg-gradient-to-b from-sanctuary-950 via-sanctuary-950/35 to-transparent pointer-events-none"
      />
    </section>
  );
};

export default Hero;
