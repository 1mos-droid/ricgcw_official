import React, { useState, useEffect, useRef } from 'react';
import {
  m,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion';
import { ArrowUpRight, HeartHandshake, MapPin } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { PICTURES, IMAGE_DIMENSIONS } from '../data/churchData';
import { trackEvent } from '../utils/analytics';
import { getNextSundayCountdown, ServiceCountdownStatus } from '../utils/serviceScheduleUtils';
import { CATHEDRAL_EASE, SPRING_TACTILE, Magnetic, ScrollBand } from '../components/motion';
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
  const heroSectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroSectionRef,
    offset: ['start start', 'end start'],
  });
  const archParallaxY = useTransform(scrollYProgress, [0, 1], [0, 64]);
  const copyParallaxY = useTransform(scrollYProgress, [0, 1], [0, -32]);

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
    <section
      ref={heroSectionRef}
      className="relative logo-obsidian-bg text-sanctuary-alabaster overflow-x-clip"
    >
      {/* Subtle architectural hairline blueprint grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-navy-pattern opacity-45 pointer-events-none"
      />

      {/* Ambient overhead seal-gold + subtle azure horizon rim */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[70%] pointer-events-none opacity-65"
        style={{
          background:
            'radial-gradient(ellipse 68% 55% at 74% 22%, rgba(228, 203, 107, 0.16), transparent 68%)',
        }}
      />

      {/* Main Split Architectural Threshold */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-24 sm:pt-28 lg:pt-32 pb-10 lg:pb-14 min-h-[88vh] flex flex-col justify-between gap-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center my-auto">
          {/* LEFT 7 COLS: Monumental Serif Statement & Crisp Hairline Hierarchy */}
          <m.div
            style={prefersReduced ? undefined : { y: copyParallaxY }}
            className="lg:col-span-7 space-y-7 will-change-transform"
          >
            {/* Editorial Chapter Datum (Zero pill container) */}
            <m.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: prefersReduced ? 0.15 : 0.65, ease: CATHEDRAL_EASE }}
              className="flex items-center gap-3 text-eyebrow font-mono uppercase tracking-[0.24em] text-gold-400"
            >
              <span>{churchInfo.themeYear}</span>
              <span aria-hidden="true" className="w-8 h-px bg-gold-400/60" />
              <span className="truncate">
                Year of {churchInfo.themeTitle} · {churchInfo.scripturalAnchor.reference}
              </span>
            </m.div>

            {/* Monumental Instrument Serif Display Headline */}
            <h1 className="font-serif text-display tracking-tight font-normal text-sanctuary-alabaster">
              {leadWords.map((word, idx) => (
                <span
                  key={`lead-${idx}`}
                  className="inline-block overflow-hidden align-bottom mr-[0.22em]"
                >
                  <m.span
                    initial={prefersReduced ? { opacity: 0 } : { y: '108%', opacity: 0 }}
                    animate={prefersReduced ? { opacity: 1 } : { y: '0%', opacity: 1 }}
                    transition={{
                      duration: prefersReduced ? 0.15 : 0.78,
                      delay: prefersReduced ? 0 : 0.08 + idx * 0.075,
                      ease: CATHEDRAL_EASE,
                    }}
                    className="inline-block"
                  >
                    {word}
                  </m.span>
                </span>
              ))}

              {accentWords.map((word, idx) => {
                const totalDelay = 0.08 + (leadWords.length + idx) * 0.075;
                return (
                  <span
                    key={`accent-${idx}`}
                    className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0"
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

            {/* Restrained Welcome Prose */}
            <m.p
              initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReduced ? 0.15 : 0.75,
                delay: prefersReduced ? 0 : 0.42,
                ease: CATHEDRAL_EASE,
              }}
              className="text-body sm:text-lg text-sanctuary-alabaster/80 max-w-xl leading-relaxed"
            >
              {themeSettings.heroSubtitle || (
                <>
                  At <strong className="text-sanctuary-alabaster font-semibold">{churchInfo.name}</strong>, under General Overseer{' '}
                  <strong className="text-sanctuary-alabaster font-semibold">Rev. Nicholas Dobeng</strong>, saints are perfected, territories are taken, and faith commands answers.
                </>
              )}
            </m.p>

            {/* Primary Architectural Actions */}
            <m.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: prefersReduced ? 0.15 : 0.72,
                delay: prefersReduced ? 0 : 0.54,
                ease: CATHEDRAL_EASE,
              }}
              className="flex flex-col sm:flex-row sm:items-center gap-3.5 pt-1"
            >
              <Magnetic>
                <m.a
                  href="#sanctuaries"
                  whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                  transition={SPRING_TACTILE}
                  onClick={() => trackEvent('interaction', 'plan_visit_clicked', 'Hero')}
                  className="group relative overflow-hidden w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-sm bg-sanctuary-alabaster text-sanctuary-950 font-semibold text-caption uppercase tracking-[0.14em] hover:bg-gold-400 transition-colors duration-300 cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-gold-700" />
                  <span>Plan Your Sunday Visit</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </m.a>
              </Magnetic>

              <Magnetic>
                <m.button
                  type="button"
                  whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                  transition={SPRING_TACTILE}
                  onClick={() => {
                    trackEvent('conversion', 'prayer_modal_opened', 'Hero Primary');
                    onOpenPrayerModal?.();
                  }}
                  className="w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-sm border border-sanctuary-alabaster/30 hover:border-gold-400 hover:bg-white/[0.06] text-sanctuary-alabaster font-medium text-caption uppercase tracking-[0.14em] transition-colors duration-300 cursor-pointer"
                >
                  <HeartHandshake className="w-4 h-4 text-gold-400" />
                  <span>Submit a Prayer Petition</span>
                </m.button>
              </Magnetic>
            </m.div>
          </m.div>

          {/* RIGHT 5 COLS: Signature Cathedral Arch Portrait Anchor */}
          <m.div
            style={prefersReduced ? undefined : { y: archParallaxY }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end will-change-transform"
          >
            <div className="relative w-full max-w-[380px] lg:max-w-[420px]">
              {/* Concentric Brass Architectural Hairline Arch */}
              <div
                aria-hidden="true"
                className="hidden sm:block absolute -inset-3 -bottom-2 arch-top border border-gold-400/35 pointer-events-none"
              />

              {/* Main Watermark-Free Studio Portrait framed inside Sanctuary Arch */}
              <m.div
                initial={
                  prefersReduced
                    ? { opacity: 0 }
                    : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.8 }
                }
                animate={
                  prefersReduced
                    ? { opacity: 1 }
                    : { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
                }
                transition={{ duration: prefersReduced ? 0.2 : 1.05, delay: 0.15, ease: CATHEDRAL_EASE }}
                className="relative aspect-[3/4] arch-top overflow-hidden bg-sanctuary-900 border border-gold-400/40 shadow-2xl"
              >
                <m.div
                  initial={prefersReduced ? false : { scale: 1.08 }}
                  animate={prefersReduced ? undefined : { scale: 1 }}
                  transition={{ duration: 1.3, ease: CATHEDRAL_EASE }}
                  className="w-full h-full"
                >
                  <ResponsiveImage
                    src={PICTURES.couple2}
                    alt="Rev. Nicholas Dobeng and Lady Pastor Sandra Dobeng"
                    width={IMAGE_DIMENSIONS.couple2.width}
                    height={IMAGE_DIMENSIONS.couple2.height}
                    priority
                    sizes="(min-width: 1024px) 34vw, 90vw"
                    pictureClassName="w-full h-full block"
                    className="w-full h-full object-cover object-[50%_14%]"
                  />
                </m.div>

                {/* Subtle base depth gradient */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-sanctuary-950 via-sanctuary-950/65 to-transparent"
                />

                {/* Pinned Brass Caption Plaque */}
                <div className="absolute inset-x-0 bottom-0 px-5 py-4 border-t border-gold-400/25 bg-sanctuary-950/85 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-serif text-lg leading-tight text-sanctuary-alabaster">
                      Rev. &amp; Lady Ps. Dobeng
                    </p>
                    <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-gold-400 mt-0.5">
                      General Overseer &amp; Founding Family
                    </p>
                  </div>
                  <span className="text-[11px] font-mono text-sanctuary-alabaster/70 shrink-0">
                    Accra, GH
                  </span>
                </div>
              </m.div>
            </div>
          </m.div>
        </div>

        {/* BOTTOM HORIZON BAR: Countdown + Inline Slash Sanctuary Links */}
        <div className="border-t border-white/15 pt-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Live Beacon + Next Worship Countdown */}
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden="true">
              {countdown.isLiveNow && !prefersReduced && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-olive-400 opacity-75" />
              )}
              <span
                className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                  countdown.isLiveNow ? 'bg-olive-400' : 'bg-gold-400'
                }`}
              />
            </span>

            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-caption">
              <span className="text-eyebrow uppercase tracking-[0.2em] text-sanctuary-alabaster/60 font-mono">
                {countdown.isLiveNow ? 'Sanctuary Live' : 'Next Sunday Worship'}
              </span>
              {countdown.isLiveNow ? (
                <span className="font-semibold text-olive-400">Main Sanctuary in Session</span>
              ) : (
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
                  <span className="text-sanctuary-alabaster/65 font-mono text-eyebrow ml-1">
                    GMT
                  </span>
                </span>
              )}
            </div>
          </div>

          {/* Inline Architectural Branch Quick-Links */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {branches.slice(0, 3).map((branch, idx) => {
              const mainService = branch.services.find((s) => s.isMain) || branch.services[0];
              const shortLabel = branch.name.split('(')[0].trim();
              return (
                <React.Fragment key={branch.id}>
                  <button
                    type="button"
                    onClick={() => {
                      trackEvent('interaction', 'branch_quick_dock_clicked', branch.name);
                      onOpenBranchModal?.(branch.id);
                    }}
                    className="group min-h-[44px] inline-flex items-center gap-2 text-left cursor-pointer hover:text-gold-400 transition-colors"
                  >
                    <span className="text-[10px] font-mono text-gold-400/70 tabular-nums">
                      0{idx + 1}
                    </span>
                    <span className="text-caption font-medium text-sanctuary-alabaster group-hover:text-gold-400 transition-colors">
                      {shortLabel}
                    </span>
                    <span className="text-eyebrow font-mono text-sanctuary-alabaster/55 tabular-nums hidden sm:inline">
                      ({mainService ? mainService.time.split(/[-–]/)[0].trim() : '9:00 AM'})
                    </span>
                  </button>
                  {idx < Math.min(branches.length, 3) - 1 && (
                    <span aria-hidden="true" className="text-white/20 hidden sm:inline">
                      /
                    </span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* KINETIC SEAL-GOLD SCROLL RIBBON BRIDGE */}
      <ScrollBand
        items={[
          'Perfecting the Saints',
          'Taking Territories',
          'Where Impossibility Becomes Possible',
          'Touching Lives Worldwide',
          'Esther 5:1 · Divine Manifestation',
        ]}
        className="logo-gold-ribbon text-sanctuary-950 border-y border-gold-700/30"
      />
    </section>
  );
};

export default Hero;
