import React, { useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, MessageCircle, ArrowRight, Shield, Scroll } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { PICTURES, IMAGE_DIMENSIONS } from '../data/churchData';
import { trackEvent } from '../utils/analytics';
import { toWhatsAppUrl } from '../utils/phoneUtils';
import { CATHEDRAL_EASE, VIEWPORT_ONCE, Reveal, Stagger, StaggerItem } from '../components/motion';
import SectionHeader from '../components/SectionHeader';
import ResponsiveImage from '../components/ResponsiveImage';

interface WelcomeOverseerProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: (branchId?: string) => void;
}

export const WelcomeOverseer: React.FC<WelcomeOverseerProps> = ({
  onOpenPrayerModal,
}) => {
  const { churchInfo, churchColors } = useChurch();
  const [selectedColorIndex, setSelectedColorIndex] = useState(1); // Default to Gold
  const prefersReduced = useReducedMotion();

  const definitions = churchInfo.definitions || [];
  const selectedColor = churchColors[selectedColorIndex] || churchColors[0];

  return (
    <section id="about" className="py-14 lg:py-20 px-4 sm:px-6 md:px-8 bg-transparent text-ink-primary">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* =====================================================================
            12-COLUMN EDITORIAL MAGAZINE SPREAD
        ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left 5 Columns: Clip-Path Portrait Wipe + Counter-Scale + Delayed Signature */}
          <div className="lg:col-span-5 relative">
            <m.div
              initial={
                prefersReduced
                  ? { opacity: 0 }
                  : { clipPath: 'inset(0 0 100% 0)', opacity: 0.7 }
              }
              whileInView={
                prefersReduced
                  ? { opacity: 1 }
                  : { clipPath: 'inset(0 0 0% 0)', opacity: 1 }
              }
              viewport={VIEWPORT_ONCE}
              transition={{ duration: prefersReduced ? 0.15 : 0.9, ease: CATHEDRAL_EASE }}
              className="aspect-[4/5] rounded-3xl overflow-hidden bg-sanctuary-parchment/80 relative z-10 shadow-lg border border-sanctuary-stone"
            >
              <m.div
                initial={prefersReduced ? false : { scale: 1.08 }}
                whileInView={prefersReduced ? undefined : { scale: 1 }}
                viewport={VIEWPORT_ONCE}
                transition={{ duration: 1.05, ease: CATHEDRAL_EASE }}
                className="w-full h-full"
              >
                <ResponsiveImage
                  src={PICTURES.couple1}
                  alt="Rev. Nicholas Dobeng and First Lady Mrs. Sandra Dobeng"
                  width={IMAGE_DIMENSIONS.couple1.width}
                  height={IMAGE_DIMENSIONS.couple1.height}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  pictureClassName="w-full h-full block"
                  className="w-full h-full object-cover object-top"
                />
              </m.div>
            </m.div>

            {/* Architectural Offset Frame */}
            <div className="hidden sm:block absolute -bottom-5 -left-5 w-full h-full rounded-3xl border border-gold-500/25 -z-0 bg-sanctuary-parchment/55" />

            {/* Overseer Signature — fades in last */}
            <m.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{
                duration: prefersReduced ? 0.15 : 0.65,
                delay: prefersReduced ? 0 : 0.45,
                ease: CATHEDRAL_EASE,
              }}
              className="mt-6 flex items-baseline justify-between border-b border-sanctuary-stone pb-4"
            >
              <div>
                <p className="font-serif text-h3 font-bold text-ink-primary">
                  Rev. &amp; Mrs. Nicholas Dobeng
                </p>
                <p className="text-eyebrow uppercase tracking-[0.16em] text-ink-muted mt-0.5">
                  General Overseer &amp; Founding Family
                </p>
              </div>
              <span className="font-serif italic text-base text-gold-600 font-medium">Esther 5:1</span>
            </m.div>
          </div>

          {/* Right 7 Columns: Editorial Typography with Animated SVG Quote Underline */}
          <div className="lg:col-span-7 lg:pl-6 space-y-6">
            <Reveal y={14}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sanctuary-parchment/85 border border-sanctuary-stone text-gold-600 text-eyebrow font-semibold uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Apostolic Welcome &amp; Shepherding</span>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <h2 className="font-serif text-h2 tracking-tight text-ink-primary">
                &ldquo;You were never meant to remain in the outer court. God has prepared a place of{' '}
                <span className="relative inline-block italic font-normal text-gold-600">
                  intimate grace
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 220 12"
                    fill="none"
                    className="absolute -bottom-1.5 left-0 w-full h-3 overflow-visible pointer-events-none"
                  >
                    <m.path
                      d="M 2 9 Q 110 2 218 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: prefersReduced ? 1 : 0, opacity: prefersReduced ? 1 : 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.85 }}
                      viewport={VIEWPORT_ONCE}
                      transition={{
                        duration: prefersReduced ? 0.1 : 0.85,
                        delay: prefersReduced ? 0 : 0.35,
                        ease: CATHEDRAL_EASE,
                      }}
                    />
                  </svg>
                </span>{' '}
                for you.&rdquo;
              </h2>
            </Reveal>

            <Reveal delay={0.14} className="space-y-4 text-body sm:text-base text-ink-secondary leading-relaxed">
              <p>
                At Rhema Inner Court Gospel Church Worldwide, our heartbeat is simple yet eternal:{' '}
                <strong className="font-semibold text-ink-primary">
                  &ldquo;{churchInfo.vision}&rdquo;
                </strong>
              </p>
              <p>
                Whether you are walking through the doors of our Mallam Headquarters, worshipping by
                the coast in Kokrobitey, gathering in Langma, or joining our global broadcast from across the nations,
                you are stepping into a family built on the spoken Word of God (<em>Rhema</em>),
                sacrificial worship, and the delivering power of the Holy Spirit.
              </p>
            </Reveal>

            {/* The Three-Part Motto — Architectural Hairline Columns */}
            <Stagger className="mt-8 pt-6 border-t border-sanctuary-stone grid grid-cols-1 sm:grid-cols-3 gap-5">
              <StaggerItem>
                <span className="text-eyebrow font-mono uppercase tracking-widest text-gold-600 font-semibold">
                  01 • Eph 4:12
                </span>
                <h3 className="mt-1 font-serif text-h3 font-bold text-ink-primary">Perfecting the Saints</h3>
                <p className="mt-1 text-caption text-ink-secondary leading-relaxed">
                  Equipping every believer through sound Rhema teaching for mature Kingdom service.
                </p>
              </StaggerItem>

              <StaggerItem className="sm:border-l sm:border-sanctuary-stone sm:pl-5">
                <span className="text-eyebrow font-mono uppercase tracking-widest text-gold-600 font-semibold">
                  02 • Josh 1:3
                </span>
                <h3 className="mt-1 font-serif text-h3 font-bold text-ink-primary">Taking Territories</h3>
                <p className="mt-1 text-caption text-ink-secondary leading-relaxed">
                  Advancing the light of Christ across business, family, and global communities.
                </p>
              </StaggerItem>

              <StaggerItem className="sm:border-l sm:border-sanctuary-stone sm:pl-5">
                <span className="text-eyebrow font-mono uppercase tracking-widest text-gold-600 font-semibold">
                  03 • Luke 1:37
                </span>
                <h3 className="mt-1 font-serif text-h3 font-bold text-ink-primary">Impossibility Possible</h3>
                <p className="mt-1 text-caption text-ink-secondary leading-relaxed">
                  An altar of prophetic breakthrough where heaven responds to the sacrifices of faith.
                </p>
              </StaggerItem>
            </Stagger>

            {/* Action Bar */}
            <Reveal delay={0.18} className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  trackEvent('conversion', 'prayer_modal_opened', 'Welcome Overseer');
                  onOpenPrayerModal?.();
                }}
                className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-full bg-ink-primary text-sanctuary-alabaster text-caption uppercase tracking-wider font-semibold hover:bg-gold-600 transition-colors cursor-pointer"
              >
                <span>Send Personal Prayer to Overseer</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={toWhatsAppUrl(churchInfo.contact.phone, 'Shalom General Overseer, I am reaching out from the RICGCW official website.')}
                target="_blank"
                rel="noreferrer"
                className="min-h-[44px] inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sanctuary-parchment/90 border border-sanctuary-stone hover:bg-sanctuary-stone text-ink-primary text-caption font-semibold uppercase tracking-wider transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-olive-500" />
                <span>Pastoral WhatsApp</span>
              </a>
            </Reveal>
          </div>
        </div>

        {/* =====================================================================
            COVENANT IDENTITY & TABERNACLE LEDGER (Merged & Clean)
        ===================================================================== */}
        <div id="identity" className="pt-10 border-t border-sanctuary-stone/80 space-y-8">
          <SectionHeader
            eyebrow="Biblical Roots & Temple Symbolism"
            title="The Covenant Identity of"
            accent="Inner Court"
            description="Grounded in the Greek revelation of Rhema and the sacred colors of the Old & New Covenant tabernacle."
          />

          {/* Interactive Ledger Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 6 Cols: Etymology of R-H-E-M-A */}
            <Reveal className="lg:col-span-6 bg-sanctuary-parchment/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-sanctuary-stone space-y-6 shadow-xs">
              <div className="flex items-center gap-2.5 pb-4 border-b border-sanctuary-stone">
                <Scroll className="w-5 h-5 text-gold-600" />
                <h4 className="font-serif text-h3 font-bold text-ink-primary">
                  Etymology of RICGCW
                </h4>
              </div>

              <div className="space-y-4">
                {definitions.map((def, idx) => (
                  <div key={idx} className="pb-3.5 border-b border-sanctuary-stone last:border-0 last:pb-0">
                    <p className="text-eyebrow uppercase font-bold tracking-wider text-gold-600">
                      {def.term}
                    </p>
                    <p className="text-body text-ink-secondary mt-1 leading-relaxed">
                      {def.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right 6 Cols: The 5 Sacred Tabernacle Colors */}
            <Reveal delay={0.08} className="lg:col-span-6 bg-sanctuary-parchment/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-sanctuary-stone flex flex-col justify-between space-y-6 shadow-xs">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 pb-4 border-b border-sanctuary-stone">
                  <Shield className="w-5 h-5 text-gold-600" />
                  <h4 className="font-serif text-h3 font-bold text-ink-primary">
                    The 5 Sacred Temple Pigments
                  </h4>
                </div>

                {/* Color Selector Pills */}
                <div className="grid grid-cols-5 gap-1.5 sm:gap-2 pt-2">
                  {churchColors.map((color, idx) => {
                    const isSelected = selectedColorIndex === idx;
                    return (
                      <button
                        key={color.name}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => setSelectedColorIndex(idx)}
                        className={`min-h-[44px] p-2 sm:p-3 rounded-2xl flex flex-col items-center gap-1.5 sm:gap-2 border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white border-gold-500 shadow-sm ring-2 ring-gold-500/20'
                            : 'bg-sanctuary-alabaster/80 border-sanctuary-stone hover:bg-white'
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full border border-black/15 shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-eyebrow font-bold uppercase tracking-wider text-ink-primary truncate max-w-full">
                          {color.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Color Detail Panel */}
              <AnimatePresence mode="wait">
                <m.div
                  key={selectedColor.name}
                  initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReduced ? 0 : -8 }}
                  transition={{ duration: prefersReduced ? 0.1 : 0.28, ease: CATHEDRAL_EASE }}
                  style={{ borderLeftColor: selectedColor.hex }}
                  className="bg-white/95 rounded-2xl p-6 border border-sanctuary-stone border-l-4 space-y-2.5 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-eyebrow font-mono font-bold uppercase tracking-wider text-gold-600">
                      {selectedColor.name} • {selectedColor.biblicalReference}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-caption font-mono text-ink-muted">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/15 inline-block"
                        style={{ backgroundColor: selectedColor.hex }}
                      />
                      {selectedColor.hex}
                    </span>
                  </div>
                  <h5 className="font-serif text-h3 font-bold text-ink-primary">
                    {selectedColor.name}
                  </h5>
                  <p className="text-body text-ink-secondary leading-relaxed">
                    {selectedColor.spiritualMeaning}
                  </p>
                </m.div>
              </AnimatePresence>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeOverseer;
