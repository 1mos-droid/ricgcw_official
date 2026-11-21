import React, { useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { PICTURES, IMAGE_DIMENSIONS } from '../data/churchData';
import { trackEvent } from '../utils/analytics';
import { toWhatsAppUrl } from '../utils/phoneUtils';
import {
  CATHEDRAL_EASE,
  SPRING_GENTLE,
  VIEWPORT_ONCE,
  Reveal,
  CurtainReveal,
  ParallaxFrame,
  DrawRule,
} from '../components/motion';
import SectionHeader from '../components/SectionHeader';
import ResponsiveImage from '../components/ResponsiveImage';

interface WelcomeOverseerProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: (branchId?: string) => void;
}

function isLightHex(hex: string): boolean {
  const clean = hex.replace('#', '');
  if (clean.length !== 6) return false;
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  // Relative luminance heuristic for crisp text contrast on pigment blocks
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.56;
}

export const WelcomeOverseer: React.FC<WelcomeOverseerProps> = ({
  onOpenPrayerModal,
}) => {
  const { churchInfo, churchColors } = useChurch();
  const [selectedColorIndex, setSelectedColorIndex] = useState(1);
  const prefersReduced = useReducedMotion();

  const definitions = churchInfo.definitions || [];
  const mottoItems = [
    { num: '01', ref: 'Ephesians 4:12', title: 'Perfecting the Saints', copy: 'Equipping every believer through sound Rhema teaching for mature Kingdom stewardship.' },
    { num: '02', ref: 'Joshua 1:3', title: 'Taking Territories', copy: 'Advancing the light of Christ across families, commerce, leadership, and communities.' },
    { num: '03', ref: 'Luke 1:37', title: 'Impossibility Possible', copy: 'A living altar of prophetic breakthrough where heaven answers sacrifices of faith.' },
  ];

  return (
    <section
      id="about"
      className="relative bg-sanctuary-alabaster paper-grain text-ink-primary py-20 lg:py-28 px-4 sm:px-6 lg:px-10"
    >
      <div className="max-w-7xl mx-auto space-y-24 lg:space-y-32">
        {/* =====================================================================
            CHAPTER 01: STICKY MONOGRAPH SPREAD — OVERSEER WELCOME
        ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left 5 Columns: Sticky Clean Studio Portrait of General Overseer */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="relative">
              {/* Architectural Brass Corner Framing Ticks */}
              <div aria-hidden="true" className="hidden sm:block absolute -top-2.5 -left-2.5 w-6 h-6 border-t-2 border-l-2 border-gold-500 z-20 pointer-events-none" />
              <div aria-hidden="true" className="hidden sm:block absolute -bottom-2.5 -right-2.5 w-6 h-6 border-b-2 border-r-2 border-gold-500 z-20 pointer-events-none" />

              <CurtainReveal className="bg-sanctuary-parchment border border-sanctuary-stone shadow-lg">
                <ParallaxFrame offsetY={24} zoomFrom={1.06} className="aspect-[3/4]">
                  <ResponsiveImage
                    src={PICTURES.pastor2}
                    alt="Rev. Nicholas Dobeng — General Overseer of RICGCW"
                    width={IMAGE_DIMENSIONS.pastor2.width}
                    height={IMAGE_DIMENSIONS.pastor2.height}
                    priority
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    pictureClassName="w-full h-full block"
                    className="w-full h-full object-cover object-top"
                  />
                </ParallaxFrame>
              </CurtainReveal>
            </div>

            {/* Monograph Figure Caption */}
            <m.div
              initial={{ opacity: 0, y: prefersReduced ? 0 : 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: prefersReduced ? 0.15 : 0.65, delay: 0.2, ease: CATHEDRAL_EASE }}
              className="mt-5 pt-4 border-t border-sanctuary-stone flex items-baseline justify-between gap-4"
            >
              <div>
                <p className="font-serif text-2xl text-ink-primary">
                  Rev. Nicholas Dobeng
                </p>
                <p className="text-eyebrow font-mono uppercase tracking-[0.18em] text-ink-muted mt-0.5">
                  General Overseer &amp; Founder
                </p>
              </div>
              <span className="font-serif italic text-lg text-gold-600 shrink-0">
                Esther 5:1
              </span>
            </m.div>
          </div>

          {/* Right 7 Columns: Editorial Statement, Hand-Drawn Underline & Hairline Motto Ledger */}
          <div className="lg:col-span-7 space-y-10">
            <Reveal y={10}>
              <div className="flex items-center gap-3 text-eyebrow font-mono uppercase tracking-[0.24em] text-gold-600 font-semibold">
                <span>01</span>
                <span aria-hidden="true" className="w-8 h-px bg-gold-600/50" />
                <span>Apostolic Welcome &amp; Shepherding</span>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="font-serif text-h1 tracking-tight font-normal text-ink-primary">
                &ldquo;You were never meant to remain in the outer court. God has prepared a place of{' '}
                <span className="relative inline-block italic text-gold-600">
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
                      whileInView={{ pathLength: 1, opacity: 0.9 }}
                      viewport={VIEWPORT_ONCE}
                      transition={{
                        duration: prefersReduced ? 0.1 : 0.9,
                        delay: prefersReduced ? 0 : 0.3,
                        ease: CATHEDRAL_EASE,
                      }}
                    />
                  </svg>
                </span>{' '}
                for you.&rdquo;
              </h2>
            </Reveal>

            <Reveal delay={0.12} className="space-y-4 text-body sm:text-base text-ink-secondary leading-relaxed max-w-prose">
              <p>
                At Rhema Inner Court Gospel Church Worldwide, our commission endures:{' '}
                <strong className="font-semibold text-ink-primary">
                  &ldquo;{churchInfo.vision}&rdquo;
                </strong>
              </p>
              <p>
                Whether you walk through the doors of our Mallam Headquarters, worship by the coast in Kokrobitey, gather in Langma, or join our global stream across continents, you step into a consecrated family built on the spoken Word of God (<em>Rhema</em>), sacrificial praise, and the liberating power of the Holy Spirit.
              </p>
            </Reveal>

            {/* 3-Row Architectural Hairline Motto Ledger (Zero Box Cards) */}
            <div className="border-t border-sanctuary-stone divide-y divide-sanctuary-stone">
              {mottoItems.map((item, idx) => (
                <Reveal
                  key={item.num}
                  delay={idx * 0.06}
                  y={12}
                  className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline"
                >
                  <div className="sm:col-span-3 flex items-baseline gap-2.5 text-eyebrow font-mono uppercase tracking-[0.16em] text-gold-600 font-semibold">
                    <span>{item.num}</span>
                    <span className="text-ink-muted">· {item.ref}</span>
                  </div>
                  <h3 className="sm:col-span-4 font-serif text-2xl text-ink-primary font-normal">
                    {item.title}
                  </h3>
                  <p className="sm:col-span-5 text-caption text-ink-secondary leading-relaxed">
                    {item.copy}
                  </p>
                </Reveal>
              ))}
            </div>

            {/* Action Bar */}
            <Reveal delay={0.16} className="pt-2 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={() => {
                  trackEvent('conversion', 'prayer_modal_opened', 'Welcome Overseer');
                  onOpenPrayerModal?.();
                }}
                className="min-h-[48px] inline-flex items-center gap-2.5 px-7 py-3 rounded-sm bg-sanctuary-950 hover:bg-gold-600 text-sanctuary-alabaster text-caption uppercase tracking-[0.14em] font-semibold transition-colors cursor-pointer"
              >
                <span>Send Personal Prayer to Overseer</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={toWhatsAppUrl(churchInfo.contact.phone, 'Shalom General Overseer, I am reaching out from the RICGCW official website.')}
                target="_blank"
                rel="noreferrer"
                className="min-h-[48px] inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-transparent border border-sanctuary-stone-strong hover:border-ink-primary text-ink-primary text-caption font-semibold uppercase tracking-[0.14em] transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-olive-500" />
                <span>Pastoral WhatsApp</span>
              </a>
            </Reveal>
          </div>
        </div>

        {/* =====================================================================
            CHAPTER 02: TABERNACLE PIGMENTS MONOLITHS & RHEMA LEXICON
        ===================================================================== */}
        <div id="identity" className="space-y-12">
          <SectionHeader
            index="02"
            eyebrow="Biblical Roots & Temple Symbolism"
            title="The Covenant Identity of"
            accent="Inner Court"
            description="Select any of the five sacred Tabernacle pigments below to explore its scriptural theology, alongside the Greek lexicon of Rhema."
          />

          {/* Interactive 5-Column Sacred Pigment Wall */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:h-[380px] border border-sanctuary-stone overflow-hidden">
              {churchColors.map((color, idx) => {
                const isSelected = selectedColorIndex === idx;
                const lightSurface = isLightHex(color.hex);
                const textPrimary = lightSurface ? 'text-ink-primary' : 'text-sanctuary-alabaster';
                const textMuted = lightSurface ? 'text-ink-muted' : 'text-gold-300/90';
                const borderSubtle = lightSurface ? 'border-ink-primary/15' : 'border-white/20';

                return (
                  <m.button
                    key={color.name}
                    layout={!prefersReduced}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => setSelectedColorIndex(idx)}
                    transition={SPRING_GENTLE}
                    style={{ backgroundColor: color.hex }}
                    className={`relative text-left p-5 sm:p-6 flex flex-col justify-between transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 ${textPrimary} ${
                      idx > 0 ? `border-t md:border-t-0 md:border-l ${borderSubtle}` : ''
                    } ${
                      isSelected
                        ? 'md:flex-[3.2]'
                        : 'md:flex-[0.85] opacity-95 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[11px] font-mono uppercase tracking-[0.18em] ${textMuted}`}>
                        0{idx + 1}
                      </span>
                      <span className={`text-[11px] font-mono uppercase tracking-wider ${textMuted}`}>
                        {color.hex}
                      </span>
                    </div>

                    <div className="mt-4 md:mt-auto space-y-2.5">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-serif text-2xl sm:text-3xl font-normal">
                          {color.name}
                        </h3>
                        {isSelected && (
                          <Sparkles className={`w-4 h-4 shrink-0 ${lightSurface ? 'text-gold-600' : 'text-gold-400'}`} />
                        )}
                      </div>

                      <AnimatePresence initial={false}>
                        {isSelected && (
                          <m.div
                            initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: CATHEDRAL_EASE }}
                            className={`space-y-2 pt-3 border-t ${borderSubtle}`}
                          >
                            <p className={`text-eyebrow font-mono uppercase tracking-[0.18em] ${textMuted}`}>
                              {color.biblicalReference}
                            </p>
                            <p className="text-body leading-relaxed max-w-md">
                              {color.spiritualMeaning}
                            </p>
                          </m.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </m.button>
                );
              })}
            </div>
          </div>

          {/* Rhema Etymology Lexicon — 2-Column Editorial Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4 items-start">
            <div className="lg:col-span-4 space-y-2">
              <p className="font-serif italic text-6xl sm:text-7xl text-gold-600/20 leading-none select-none" aria-hidden="true">
                ῥῆμα
              </p>
              <h3 className="font-serif text-h3 text-ink-primary">
                Etymology of RICGCW
              </h3>
              <p className="text-caption text-ink-secondary max-w-xs leading-relaxed">
                Every syllable in our mandate points to an immediate encounter with the spoken Word and the royal inner sanctuary.
              </p>
            </div>

            <div className="lg:col-span-8 divide-y divide-sanctuary-stone border-t border-sanctuary-stone">
              {definitions.map((def, idx) => (
                <div key={idx}>
                  <Reveal
                    delay={idx * 0.04}
                    y={10}
                    className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline"
                  >
                    <p className="sm:col-span-4 font-serif text-xl sm:text-2xl text-gold-600">
                      {def.term}
                    </p>
                    <p className="sm:col-span-8 text-body text-ink-secondary leading-relaxed">
                      {def.meaning}
                    </p>
                  </Reveal>
                </div>
              ))}
              <DrawRule />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeOverseer;
