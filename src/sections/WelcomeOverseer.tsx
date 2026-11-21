import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, MessageCircle, ArrowRight, Shield, Scroll } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { IMAGES } from '../data/churchData';
import { trackEvent } from '../utils/analytics';
import { toWhatsAppUrl } from '../utils/phoneUtils';

const cathedralTransition = {
  duration: 0.85,
  ease: [0.22, 1, 0.36, 1] as const,
};

interface WelcomeOverseerProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: (branchId?: string) => void;
}

export const WelcomeOverseer: React.FC<WelcomeOverseerProps> = ({
  onOpenPrayerModal,
}) => {
  const { churchInfo, churchColors } = useChurch();
  const [selectedColorIndex, setSelectedColorIndex] = useState(1); // Default to Gold

  const definitions = churchInfo.definitions || [];
  const selectedColor = churchColors[selectedColorIndex] || churchColors[0];

  return (
    <section id="about" className="py-12 lg:py-16 px-4 sm:px-6 md:px-8 bg-transparent text-ink-primary">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* =====================================================================
            12-COLUMN EDITORIAL MAGAZINE SPREAD
        ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left 5 Columns: Editorial Portrait with Offset Parchment Frame */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={cathedralTransition}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-sanctuary-parchment/80 relative z-10 shadow-lg border border-sanctuary-stone">
              <img
                src={IMAGES.couple1 || IMAGES.couple2 || IMAGES.overseer}
                alt="Rev. Nicholas Dobeng and First Lady Mrs. Sandra Dobeng"
                className="w-full h-full object-cover object-top hover:scale-102 transition-transform duration-700"
              />
            </div>
            {/* Architectural Offset Frame (Limestone / Gold hairline) */}
            <div className="hidden sm:block absolute -bottom-5 -left-5 w-full h-full rounded-3xl border border-gold-500/25 -z-0 bg-sanctuary-parchment/55 backdrop-blur-xs" />

            <div className="mt-6 flex items-baseline justify-between border-b border-sanctuary-stone pb-4">
              <div>
                <p className="font-serif text-2xl font-bold text-ink-primary">
                  Rev. &amp; Mrs. Nicholas Dobeng
                </p>
                <p className="text-xs uppercase tracking-[0.16em] text-ink-muted mt-0.5">
                  General Overseer &amp; Founding Family
                </p>
              </div>
              <span className="font-serif italic text-sm text-gold-600">Esther 5:1</span>
            </div>
          </motion.div>

          {/* Right 7 Columns: Uncluttered Editorial Typography */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ ...cathedralTransition, delay: 0.15 }}
            className="lg:col-span-7 lg:pl-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sanctuary-parchment/80 backdrop-blur-sm border border-sanctuary-stone text-gold-600 text-xs font-semibold uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Apostolic Welcome &amp; Shepherding</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] leading-[1.08] text-ink-primary">
              &ldquo;You were never meant to remain in the outer court. God has prepared a place of{' '}
              <span className="italic font-normal text-gold-600">intimate grace</span> for you.&rdquo;
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-ink-secondary leading-relaxed font-light">
              <p>
                At Rhema Inner Court Gospel Church Worldwide, our heartbeat is simple yet eternal:
                <strong className="font-medium text-ink-primary">
                  {' '}&ldquo;{churchInfo.vision}&rdquo;
                </strong>
              </p>
              <p>
                Whether you are walking through the doors of our Mallam Headquarters, worshipping by
                the coast in Kokrobitey, gathering in Langma, or joining our global broadcast from across the nations,
                you are stepping into a family built on the spoken Word of God (<em>Rhema</em>),
                sacrificial worship, and the delivering power of the Holy Spirit.
              </p>
            </div>

            {/* The Three-Part Motto — Architectural Hairline Columns */}
            <div className="mt-8 pt-6 border-t border-sanctuary-stone grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-gold-600">
                  01 • Eph 4:12
                </span>
                <h3 className="mt-1 font-serif text-lg font-bold text-ink-primary">Perfecting the Saints</h3>
                <p className="mt-1 text-xs text-ink-secondary leading-relaxed">
                  Equipping every believer through sound Rhema teaching for mature Kingdom service.
                </p>
              </div>

              <div className="sm:border-l sm:border-sanctuary-stone sm:pl-5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-gold-600">
                  02 • Josh 1:3
                </span>
                <h3 className="mt-1 font-serif text-lg font-bold text-ink-primary">Taking Territories</h3>
                <p className="mt-1 text-xs text-ink-secondary leading-relaxed">
                  Advancing the light of Christ across business, family, and global communities.
                </p>
              </div>

              <div className="sm:border-l sm:border-sanctuary-stone sm:pl-5">
                <span className="text-[11px] font-mono uppercase tracking-widest text-gold-600">
                  03 • Luke 1:37
                </span>
                <h3 className="mt-1 font-serif text-lg font-bold text-ink-primary">Impossibility Possible</h3>
                <p className="mt-1 text-xs text-ink-secondary leading-relaxed">
                  An altar of prophetic breakthrough where heaven responds to the sacrifices of faith.
                </p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  trackEvent('conversion', 'prayer_modal_opened', 'Welcome Overseer');
                  onOpenPrayerModal?.();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink-primary text-sanctuary-alabaster text-xs uppercase tracking-wider font-medium hover:bg-gold-600 transition-colors cursor-pointer"
              >
                <span>Send Personal Prayer to Overseer</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={toWhatsAppUrl(churchInfo.contact.phone, 'Shalom General Overseer, I am reaching out from the RICGCW official website.')}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sanctuary-parchment/85 backdrop-blur-sm border border-sanctuary-stone hover:bg-sanctuary-stone text-ink-primary text-xs font-medium uppercase tracking-wider transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-olive-500" />
                <span>Pastoral WhatsApp</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* =====================================================================
            COVENANT IDENTITY & TABERNACLE LEDGER (Merged & Clean)
        ===================================================================== */}
        <motion.div
          id="identity"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={cathedralTransition}
          className="pt-10 border-t border-sanctuary-stone/80 space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-gold-600 font-semibold block mb-1">
                Biblical Roots &amp; Temple Symbolism
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-ink-primary">
                The Covenant Identity of <span className="italic font-normal text-gold-600">Inner Court</span>
              </h3>
            </div>
            <p className="text-xs text-ink-secondary max-w-md font-light">
              Grounded in the Greek revelation of <em>Rhema</em> and the sacred colors of the Old &amp; New Covenant tabernacle.
            </p>
          </div>

          {/* Interactive Ledger Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Left 6 Cols: Etymology of R-H-E-M-A */}
            <div className="lg:col-span-6 bg-sanctuary-parchment/75 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-sanctuary-stone/90 space-y-6 shadow-xs">
              <div className="flex items-center gap-2.5 pb-4 border-b border-sanctuary-stone">
                <Scroll className="w-5 h-5 text-gold-600" />
                <h4 className="font-serif text-xl font-bold text-ink-primary">
                  Etymology of RICGCW
                </h4>
              </div>

              <div className="space-y-4">
                {definitions.map((def, idx) => (
                  <div key={idx} className="pb-3 border-b border-sanctuary-stone last:border-0 last:pb-0">
                    <p className="text-xs uppercase font-bold tracking-wider text-gold-600">
                      {def.term}
                    </p>
                    <p className="text-sm text-ink-secondary mt-0.5 leading-relaxed">
                      {def.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 6 Cols: The 5 Sacred Tabernacle Colors (Interactive Cross-Fade) */}
            <div className="lg:col-span-6 bg-sanctuary-parchment/75 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-sanctuary-stone/90 flex flex-col justify-between space-y-6 shadow-xs">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 pb-4 border-b border-sanctuary-stone">
                  <Shield className="w-5 h-5 text-gold-600" />
                  <h4 className="font-serif text-xl font-bold text-ink-primary">
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
                        className={`p-2 sm:p-3 rounded-2xl flex flex-col items-center gap-1.5 sm:gap-2 border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white border-gold-500 shadow-sm ring-2 ring-gold-500/20'
                            : 'bg-sanctuary-alabaster/80 border-sanctuary-stone hover:bg-white'
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full border border-black/15 shadow-inner"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-ink-primary truncate max-w-full">
                          {color.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Color Detail Panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedColor.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  style={{ borderLeftColor: selectedColor.hex }}
                  className="bg-white/95 rounded-2xl p-6 border border-sanctuary-stone border-l-4 space-y-3 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-gold-600">
                      {selectedColor.name} • {selectedColor.biblicalReference}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-ink-muted">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-black/15 inline-block"
                        style={{ backgroundColor: selectedColor.hex }}
                      />
                      {selectedColor.hex}
                    </span>
                  </div>
                  <h5 className="font-serif text-2xl font-bold text-ink-primary">
                    {selectedColor.name}
                  </h5>
                  <p className="text-sm text-ink-secondary leading-relaxed">
                    {selectedColor.spiritualMeaning}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WelcomeOverseer;
