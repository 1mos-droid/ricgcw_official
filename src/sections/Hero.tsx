import React, { useState, useEffect } from 'react';
import {
  m,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ArrowUpRight, ChevronDown, HeartHandshake, MapPin } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { PICTURES, IMAGE_DIMENSIONS } from '../data/churchData';
import { trackEvent } from '../utils/analytics';
import { getNextSundayCountdown, ServiceCountdownStatus } from '../utils/serviceScheduleUtils';
import { CATHEDRAL_EASE, SPRING_TACTILE, Magnetic } from '../components/motion';
import ResponsiveImage from '../components/ResponsiveImage';

const DEFAULT_CONTEXT_HEADLINE = 'Where Impossibilities Become Divine Reality';

interface HeroProps {
  onOpenBranchModal?: (branchId?: string) => void;
  onOpenGivingModal?: () => void;
  onOpenPrayerModal?: () => void;
}

function RollingUnit({
  value,
  unit,
  reduced,
}: {
  value: number;
  unit: string;
  reduced: boolean | null;
}) {
  const padded = String(value).padStart(2, '0');
  return (
    <span className="inline-flex items-baseline gap-0.5 tabular-nums font-mono">
      <span className="relative inline-flex h-[1.25em] overflow-hidden align-bottom">
        <AnimatePresence mode="popLayout" initial={false}>
          <m.span
            key={padded}
            initial={reduced ? { opacity: 0 } : { y: 12, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { y: -12, opacity: 0 }}
            transition={{ duration: reduced ? 0.1 : 0.3, ease: CATHEDRAL_EASE }}
            className="inline-block font-semibold text-sanctuary-alabaster"
          >
            {padded}
          </m.span>
        </AnimatePresence>
      </span>
      <span className="text-eyebrow text-gold-400/90 lowercase">{unit}</span>
    </span>
  );
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBranchModal,
  onOpenPrayerModal,
}) => {
  const { churchInfo, themeSettings, branches } = useChurch();
  const [countdown, setCountdown] = useState<ServiceCountdownStatus>(() => getNextSundayCountdown());
  const prefersReduced = useReducedMotion();

  const { scrollY } = useScroll();
  const bgParallaxY = useTransform(scrollY, [0, 600], [0, 120]);
  const fgY = useTransform(scrollY, [0, 480], [0, -40]);
  const fgOpacity = useTransform(scrollY, [0, 420], [1, 0.15]);

  // Next Sunday Service Countdown (Accra GMT UTC+0)
  useEffect(() => {
    const update = () => setCountdown(getNextSundayCountdown());
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  const rawHeadline = themeSettings.heroHeadline?.trim();
  const isDefaultHeadline = !rawHeadline || rawHeadline === DEFAULT_CONTEXT_HEADLINE;
  const leadWords =
    !rawHeadline
      ? ['Step', 'Into', 'the']
      : isDefaultHeadline
      ? ['Where', 'Impossibilities', 'Become']
      : rawHeadline.split(/\s+/);
  const accentWords =
    !rawHeadline
      ? ['Inner', 'Court', 'of', 'His', 'Presence.']
      : isDefaultHeadline
      ? ['Divine', 'Reality.']
      : [];

  return (
    <section className="relative flex flex-col justify-between text-sanctuary-alabaster">
      {/* Dark Sanctuary Threshold Container */}
      <div className="relative min-h-[88vh] sm:min-h-[92vh] flex flex-col justify-between bg-sanctuary-950 overflow-hidden">
        {/* Atmospheric Background Layer — Ken Burns + Scroll Parallax + Cathedral God Rays */}
        <m.div
          style={prefersReduced ? undefined : { y: bgParallaxY }}
          className="absolute inset-0 z-0 pointer-events-none will-change-transform"
        >
          {/* One-shot slow Ken Burns zoom (disabled when reduced motion is preferred) */}
          <m.div
            initial={prefersReduced ? false : { scale: 1.05 }}
            animate={prefersReduced ? undefined : { scale: 1.12 }}
            transition={{ duration: 20, ease: 'linear' }}
            className="w-full h-full opacity-50 filter contrast-105 saturate-90"
          >
            <ResponsiveImage
              src={PICTURES.theme}
              alt="Worship at Rhema Inner Court Gospel Church"
              width={IMAGE_DIMENSIONS.theme.width}
              height={IMAGE_DIMENSIONS.theme.height}
              priority
              sizes="100vw"
              pictureClassName="w-full h-full block"
              className="w-full h-full object-cover object-center"
            />
          </m.div>

          {/* Subtle Cathedral God Rays (Single ambient loop when motion is enabled) */}
          {!prefersReduced && (
            <div className="absolute inset-0 overflow-hidden opacity-25 mix-blend-screen" aria-hidden="true">
              <div
                className="animate-god-ray absolute -top-1/2 left-1/2 -translate-x-1/2 w-[140vmax] h-[140vmax] rounded-full blur-3xl"
                style={{
                  background:
                    'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(223,197,123,0.18) 28deg, transparent 62deg, transparent 160deg, rgba(184,134,11,0.14) 195deg, transparent 240deg)',
                }}
              />
              <div
                className="animate-god-ray-reverse absolute -top-1/3 left-1/2 -translate-x-1/2 w-[110vmax] h-[110vmax] rounded-full blur-2xl"
                style={{
                  background:
                    'conic-gradient(from 90deg at 50% 50%, transparent 0deg, rgba(254,243,199,0.12) 20deg, transparent 50deg, transparent 200deg, rgba(223,197,123,0.1) 225deg, transparent 270deg)',
                }}
              />
            </div>
          )}

          {/* Editorial Scrim & Radial Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-sanctuary-950/75 via-sanctuary-950/45 to-sanctuary-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,11,17,0.72)_100%)]" />
        </m.div>

        {/* Spacer for Floating Navbar */}
        <div className="h-20 sm:h-24" />

        {/* Center Editorial Statement (The Threshold) */}
        <m.div
          style={prefersReduced ? undefined : { y: fgY, opacity: fgOpacity }}
          className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10 py-10 md:py-16 text-center will-change-transform"
        >
          <m.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReduced ? 0.15 : 0.7, ease: CATHEDRAL_EASE }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-gold-400/30 bg-sanctuary-900/75 backdrop-blur-md mb-6 shadow-lg"
          >
            <span className="w-2 h-2 rounded-full bg-gold-400 shrink-0" />
            <span className="text-eyebrow uppercase tracking-[0.2em] text-gold-400 font-medium font-sans">
              {churchInfo.themeYear}: The Year of {churchInfo.themeTitle} • {churchInfo.scripturalAnchor.reference}
            </span>
          </m.div>

          {/* Masked Word-by-Word Hero Headline + One-Shot Light Sweep */}
          <h1 className="font-serif text-display tracking-tight text-sanctuary-alabaster max-w-4xl mx-auto">
            {leadWords.map((word, idx) => (
              <span key={`lead-${idx}`} className="inline-block overflow-hidden align-bottom mr-[0.26em]">
                <m.span
                  initial={prefersReduced ? { opacity: 0 } : { y: '108%', opacity: 0 }}
                  animate={prefersReduced ? { opacity: 1 } : { y: '0%', opacity: 1 }}
                  transition={{
                    duration: prefersReduced ? 0.15 : 0.78,
                    delay: prefersReduced ? 0 : 0.08 + idx * 0.08,
                    ease: CATHEDRAL_EASE,
                  }}
                  className="inline-block"
                >
                  {word}
                </m.span>
              </span>
            ))}

            {accentWords.map((word, idx) => {
              const totalDelay = 0.08 + (leadWords.length + idx) * 0.08;
              return (
                <span
                  key={`accent-${idx}`}
                  className="inline-block overflow-hidden align-bottom mr-[0.26em] last:mr-0"
                >
                  <m.span
                    initial={prefersReduced ? { opacity: 0 } : { y: '108%', opacity: 0 }}
                    animate={prefersReduced ? { opacity: 1 } : { y: '0%', opacity: 1 }}
                    transition={{
                      duration: prefersReduced ? 0.15 : 0.82,
                      delay: prefersReduced ? 0 : totalDelay,
                      ease: CATHEDRAL_EASE,
                    }}
                    className={`inline-block italic font-normal ${
                      prefersReduced ? 'text-gold-400' : 'text-gold-400 animate-gold-sweep'
                    }`}
                  >
                    {word}
                  </m.span>
                </span>
              );
            })}
          </h1>

          <m.p
            initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReduced ? 0.15 : 0.78,
              delay: prefersReduced ? 0 : 0.45,
              ease: CATHEDRAL_EASE,
            }}
            className="mt-6 text-base sm:text-lg text-sanctuary-alabaster/85 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            {themeSettings.heroSubtitle || (
              <>
                Welcome to <strong>{churchInfo.name}</strong>, under the apostolic leadership of General Overseer <strong>Rev. Nicholas Dobeng</strong>—a sacred sanctuary where saints are perfected, territories are taken, and impossibility becomes possible.
              </>
            )}
          </m.p>

          {/* Primary Actions — Pointer Magnetic Pull + Hover Shine + Arrow Nudge */}
          <m.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: prefersReduced ? 0.15 : 0.75,
              delay: prefersReduced ? 0 : 0.56,
              ease: CATHEDRAL_EASE,
            }}
            className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Magnetic>
              <m.a
                href="#sanctuaries"
                whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                transition={SPRING_TACTILE}
                onClick={() => trackEvent('interaction', 'plan_visit_clicked', 'Hero')}
                className="group relative overflow-hidden w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-sanctuary-alabaster text-sanctuary-950 font-semibold text-sm tracking-wide hover:bg-gold-400 transition-colors duration-300 shadow-xl cursor-pointer"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent group-hover:translate-x-[320%] transition-transform duration-700 ease-out"
                />
                <MapPin className="w-4 h-4 text-gold-600 relative z-10" />
                <span className="relative z-10">Plan Your Visit This Sunday</span>
                <ArrowUpRight className="w-4 h-4 relative z-10 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </m.a>
            </Magnetic>

            <Magnetic>
              <m.button
                type="button"
                whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                transition={SPRING_TACTILE}
                onClick={() => {
                  trackEvent('conversion', 'prayer_modal_opened', 'Hero Primary');
                  onOpenPrayerModal?.();
                }}
                className="group relative overflow-hidden w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full border border-sanctuary-alabaster/30 bg-sanctuary-alabaster/10 backdrop-blur-sm text-sanctuary-alabaster font-semibold text-sm tracking-wide hover:bg-sanctuary-alabaster/20 transition-colors duration-300 cursor-pointer"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-gold-400/25 to-transparent group-hover:translate-x-[320%] transition-transform duration-700 ease-out"
                />
                <HeartHandshake className="w-4 h-4 text-gold-400 relative z-10" />
                <span className="relative z-10">Submit a Prayer Petition</span>
              </m.button>
            </Magnetic>
          </m.div>
        </m.div>

        {/* Bottom Architectural Dock — Live Rolling Countdown + Staggered Branches + Scroll Cue */}
        <div className="relative z-10 border-t border-sanctuary-alabaster/15 bg-sanctuary-950/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 py-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6 items-center">
            {/* Live / Countdown Status with Proper Ring-Behind-Dot Beacon */}
            <div className="flex items-center gap-3 sm:col-span-3 lg:col-span-1 sm:pb-4 lg:pb-0 sm:border-b lg:border-b-0 lg:border-r border-sanctuary-alabaster/10 lg:pr-6">
              <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
                {countdown.isLiveNow && !prefersReduced && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                )}
                <span
                  className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    countdown.isLiveNow ? 'bg-emerald-400' : 'bg-gold-400'
                  }`}
                />
              </span>

              <div className="min-w-0">
                <p className="text-eyebrow uppercase tracking-[0.18em] text-sanctuary-alabaster/60 font-mono">
                  Sanctuary Status
                </p>
                {countdown.isLiveNow ? (
                  <p className="text-caption font-semibold text-emerald-300">
                    Main Sanctuary in Session
                  </p>
                ) : (
                  <div className="flex flex-wrap items-center gap-x-2 text-caption text-sanctuary-alabaster">
                    <span className="inline-flex items-baseline gap-1.5">
                      {!countdown.isToday && (
                        <>
                          <RollingUnit value={countdown.days} unit="d" reduced={prefersReduced} />
                          <span className="text-sanctuary-alabaster/35">:</span>
                        </>
                      )}
                      <RollingUnit value={countdown.hours} unit="h" reduced={prefersReduced} />
                      <span className="text-sanctuary-alabaster/35">:</span>
                      <RollingUnit value={countdown.mins} unit="m" reduced={prefersReduced} />
                    </span>
                    <span className="text-sanctuary-alabaster/70">until Worship</span>
                  </div>
                )}
              </div>
            </div>

            {/* 3 Verified Branches Quick-Jump (Staggered Reveal) */}
            {branches.slice(0, 3).map((branch, idx) => {
              const mainService = branch.services.find((s) => s.isMain) || branch.services[0];
              return (
                <m.button
                  key={branch.id}
                  type="button"
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: prefersReduced ? 0.15 : 0.6,
                    delay: prefersReduced ? 0 : 0.5 + idx * 0.08,
                    ease: CATHEDRAL_EASE,
                  }}
                  whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                  onClick={() => {
                    trackEvent('interaction', 'branch_quick_dock_clicked', branch.name);
                    onOpenBranchModal?.(branch.id);
                  }}
                  className="group min-h-[44px] text-left flex items-center justify-between px-3 py-2 -mx-3 rounded-xl hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <div>
                    <p className="text-caption font-semibold text-gold-400 group-hover:underline flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0" />
                      <span>{branch.name.split('(')[0].trim()}</span>
                      {branch.isHeadquarters && <span className="text-eyebrow text-white/60">(HQ)</span>}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </p>
                    <p className="text-body text-sanctuary-alabaster tabular-nums">
                      Sundays • {mainService ? mainService.time.split(/[-–]/)[0].trim() : '9:00 AM'} GMT
                    </p>
                    <p className="text-caption text-sanctuary-alabaster/60 truncate max-w-[220px]">
                      {branch.location}
                    </p>
                  </div>
                </m.button>
              );
            })}
          </div>

          {/* Gentle Scroll Cue */}
          <div className="hidden md:flex justify-center pb-2.5">
            <m.a
              href="#about"
              aria-label="Scroll to sanctuary welcome"
              initial={{ opacity: 0 }}
              animate={prefersReduced ? { opacity: 0.7 } : { opacity: 0.7, y: [0, 4, 0] }}
              transition={
                prefersReduced
                  ? { duration: 0.15 }
                  : { delay: 1.1, duration: 1.8, repeat: 2, ease: CATHEDRAL_EASE }
              }
              className="text-gold-400/80 hover:text-gold-400 p-1 rounded-full transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </m.a>
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
