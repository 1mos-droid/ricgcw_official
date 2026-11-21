import React, { useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';
import { CATHEDRAL_EASE, Reveal, DrawRule } from '../components/motion';
import SectionHeader from '../components/SectionHeader';

interface MinistriesProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: (branchId?: string) => void;
  onConnectMinistry?: (ministryName: string) => void;
}

export const Ministries: React.FC<MinistriesProps> = ({
  onOpenPrayerModal,
  onConnectMinistry,
}) => {
  const { ministries } = useChurch();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const prefersReduced = useReducedMotion();

  const handleConnect = (ministryName: string) => {
    trackEvent('interaction', 'ministry_connect_clicked', ministryName);
    if (onConnectMinistry) {
      onConnectMinistry(ministryName);
    } else {
      onOpenPrayerModal?.();
    }
  };

  return (
    <section
      id="ministries"
      className="bg-sanctuary-alabaster paper-grain text-ink-primary py-20 lg:py-28 px-4 sm:px-6 lg:px-10"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <SectionHeader
          index="04"
          eyebrow="Kingdom Ministries & Fellowships"
          title="Find Your Spiritual"
          accent="Family"
          description="Select any fellowship below to inspect gathering rhythms and connect directly with departmental leadership."
        />

        {/* Editorial Interactive Typographic Index (Zero Bento Boxes) */}
        <div className="border-t border-sanctuary-stone divide-y divide-sanctuary-stone">
          {ministries.map((min, index) => {
            const indexStr = String(index + 1).padStart(2, '0');
            const isOpen = activeIndex === index;

            return (
              <div
                key={min.id}
                onMouseEnter={() => setActiveIndex(index)}
                className="relative"
              >
                <div
                  className={`transition-colors duration-300 ${
                    isOpen
                      ? 'bg-sanctuary-950 text-sanctuary-alabaster'
                      : 'bg-transparent text-ink-primary hover:bg-sanctuary-parchment/70'
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setActiveIndex(index)}
                    className="w-full text-left px-4 sm:px-8 py-6 sm:py-7 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 items-center cursor-pointer"
                  >
                    <div className="md:col-span-1 text-caption font-mono tabular-nums text-gold-600 font-semibold">
                      <span className={isOpen ? 'text-gold-400' : 'text-gold-600'}>
                        {indexStr}
                      </span>
                    </div>

                    <div className="md:col-span-6">
                      <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight">
                        {min.name}
                      </h3>
                    </div>

                    <div className="md:col-span-4 flex items-center gap-2 text-caption font-mono">
                      <Clock className={`w-4 h-4 shrink-0 ${isOpen ? 'text-gold-400' : 'text-gold-600'}`} />
                      <span className={isOpen ? 'text-sanctuary-alabaster/80' : 'text-ink-muted'}>
                        {min.schedule}
                      </span>
                    </div>

                    <div className="md:col-span-1 hidden md:flex justify-end">
                      <span
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-transform duration-300 ${
                          isOpen
                            ? 'border-gold-400 bg-gold-500 text-sanctuary-950 rotate-45'
                            : 'border-sanctuary-stone-strong text-ink-primary'
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    </div>
                  </button>

                  {/* Smooth Accordion Drawer inside Active Emerald Curtain */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <m.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: prefersReduced ? 0.12 : 0.34, ease: CATHEDRAL_EASE }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-8 pb-7 pt-1 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-end">
                          <div className="hidden md:block md:col-span-1" />
                          <div className="md:col-span-7 space-y-2">
                            <p className="text-eyebrow font-mono uppercase tracking-[0.2em] text-gold-400">
                              {min.tagline}
                            </p>
                            <p className="text-body text-sanctuary-alabaster/80 leading-relaxed max-w-prose">
                              {min.description}
                            </p>
                          </div>
                          <div className="md:col-span-4 flex md:justify-end">
                            <button
                              type="button"
                              onClick={() => handleConnect(min.name)}
                              className="min-h-[44px] inline-flex items-center gap-2 px-6 py-2.5 rounded-sm bg-gold-500 hover:bg-gold-400 text-sanctuary-950 text-caption uppercase tracking-[0.14em] font-semibold transition-colors cursor-pointer"
                            >
                              <span>Connect with Department</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
          <DrawRule />
        </div>

        <Reveal y={10} className="flex flex-wrap items-center justify-between gap-4 pt-2 text-caption text-ink-muted">
          <span>Every department welcomes new members after any Sunday service.</span>
          <button
            type="button"
            onClick={() => onOpenPrayerModal?.()}
            className="text-ink-primary font-semibold underline underline-offset-4 hover:text-gold-600 transition-colors cursor-pointer"
          >
            Not sure where to serve? Speak with our secretariat
          </button>
        </Reveal>
      </div>
    </section>
  );
};

export default Ministries;
