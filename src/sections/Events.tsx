import React, { useState, useRef } from 'react';
import { m, useScroll, useReducedMotion } from 'framer-motion';
import { Calendar as CalendarIcon, MapPin, Clock, CalendarPlus, CheckCircle2, ArrowRight } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';
import { downloadEventIcs } from '../utils/calendarUtils';
import { CATHEDRAL_EASE, VIEWPORT_ONCE, Reveal } from '../components/motion';
import SectionHeader from '../components/SectionHeader';

interface EventsProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: (branchId?: string) => void;
}

export const Events: React.FC<EventsProps> = ({ onOpenBranchModal }) => {
  const { events, branches } = useChurch();
  const [downloadedEventId, setDownloadedEventId] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 60%'],
  });

  const handleDownloadCalendar = (ev: {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
  }) => {
    trackEvent('interaction', 'event_add_calendar', ev.title);
    downloadEventIcs({
      title: ev.title,
      description: `${ev.description}\nTime: ${ev.time}`,
      location: ev.location,
      dateStr: ev.date,
      timeStr: ev.time,
    });
    setDownloadedEventId(ev.id);
    setTimeout(() => setDownloadedEventId(null), 3000);
  };

  return (
    <section id="events" className="py-14 lg:py-20 px-4 sm:px-6 md:px-8 bg-transparent text-ink-primary">
      <div className="max-w-7xl mx-auto space-y-8">
        <SectionHeader
          eyebrow="Sacred Gatherings & Conventions"
          title="Upcoming"
          accent="Calendar Ledger"
          rightSlot={
            <button
              type="button"
              onClick={() => {
                trackEvent('interaction', 'branch_modal_opened', 'Events Ledger');
                onOpenBranchModal?.();
              }}
              className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sanctuary-parchment border border-sanctuary-stone text-ink-primary text-caption uppercase tracking-wider font-semibold hover:bg-white transition-colors cursor-pointer"
            >
              <span>View Weekly Sanctuaries</span>
              <ArrowRight className="w-4 h-4 text-gold-600" />
            </button>
          }
        />

        {/* Always-mounted timeline container for safe useScroll hydration */}
        <div ref={timelineRef} className="relative">
          {events.length === 0 ? (
            <div className="space-y-6">
              <Reveal className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/85 border border-sanctuary-stone shadow-xs">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/12 border border-gold-500/25 text-gold-600 flex items-center justify-center shrink-0">
                    <CalendarIcon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-h3 font-bold text-ink-primary">
                      Upcoming Holy Gatherings Announced Soon
                    </h3>
                    <p className="text-body text-ink-secondary max-w-2xl leading-relaxed">
                      Special conventions and revival vigils are currently being scheduled by the Pastoral Council. Join any of our regular weekly worship gatherings across our three sanctuaries below.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Mobile Horizontal Snap Carousel (<md) */}
              <div className="md:hidden relative -mx-4 px-4">
                <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-2">
                  {branches.slice(0, 3).map((b) => {
                    const mainSrv = b.services.find((s) => s.isMain) || b.services[0];
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          trackEvent('interaction', 'branch_modal_opened', `Events Empty ${b.name}`);
                          onOpenBranchModal?.(b.id);
                        }}
                        className="snap-center shrink-0 w-[82vw] sm:w-[62vw] p-5 rounded-2xl bg-white/95 border border-sanctuary-stone hover:border-gold-500 text-left space-y-2 shadow-xs cursor-pointer"
                      >
                        <span className="text-eyebrow font-mono font-bold uppercase tracking-wider text-gold-600 block">
                          Every Sunday
                        </span>
                        <p className="font-serif text-xl font-bold text-ink-primary">
                          {b.name.split('(')[0].trim()}
                        </p>
                        <p className="text-caption font-mono text-ink-muted tabular-nums">
                          {mainSrv?.time || '9:00 AM GMT'}
                        </p>
                        <span className="inline-flex items-center gap-1 text-caption font-semibold text-gold-600 pt-1">
                          <span>View Schedule</span>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Desktop Vertical Timeline with Scroll-Linked Gold Spine (md+) */}
              <div className="hidden md:block relative pl-10 space-y-5">
                <div
                  aria-hidden="true"
                  className="absolute left-3 top-3 bottom-3 w-0.5 bg-sanctuary-stone/80 rounded-full"
                />
                <m.div
                  aria-hidden="true"
                  style={prefersReduced ? { scaleY: 1 } : { scaleY: scrollYProgress }}
                  className="origin-top absolute left-3 top-3 bottom-3 w-0.5 bg-gradient-to-b from-gold-500 via-gold-400 to-gold-600 rounded-full"
                />

                {branches.slice(0, 3).map((b, idx) => {
                  const mainSrv = b.services.find((s) => s.isMain) || b.services[0];
                  return (
                    <div key={b.id} className="relative flex items-center gap-6">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[34px] w-4 h-4 rounded-full bg-sanctuary-alabaster border-2 border-gold-500 shadow-xs"
                      />

                      {/* Flipping Date/Day Tile */}
                      <m.div
                        initial={prefersReduced ? { opacity: 0 } : { rotateX: -20, opacity: 0 }}
                        whileInView={{ rotateX: 0, opacity: 1 }}
                        viewport={VIEWPORT_ONCE}
                        transition={{
                          duration: prefersReduced ? 0.15 : 0.6,
                          delay: prefersReduced ? 0 : idx * 0.08,
                          ease: CATHEDRAL_EASE,
                        }}
                        style={{ transformPerspective: 800 }}
                        className="w-40 shrink-0 p-4 rounded-2xl bg-white border border-sanctuary-stone text-center shadow-2xs"
                      >
                        <span className="text-eyebrow font-mono font-bold uppercase tracking-wider text-gold-600 block">
                          Every Sunday
                        </span>
                        <span className="font-mono text-caption font-bold text-ink-primary tabular-nums mt-0.5 block">
                          {mainSrv ? mainSrv.time.split(/[-–]/)[0].trim() : '9:00 AM'}
                        </span>
                      </m.div>

                      <button
                        type="button"
                        onClick={() => {
                          trackEvent('interaction', 'branch_modal_opened', `Events Empty ${b.name}`);
                          onOpenBranchModal?.(b.id);
                        }}
                        className="flex-1 p-5 rounded-2xl bg-sanctuary-parchment/85 hover:bg-white border border-sanctuary-stone hover:border-gold-500/60 transition-all text-left flex items-center justify-between gap-4 group cursor-pointer shadow-xs"
                      >
                        <div>
                          <h4 className="font-serif text-xl font-bold text-ink-primary group-hover:text-gold-600 transition-colors">
                            {b.name}
                          </h4>
                          <p className="text-caption text-ink-secondary mt-0.5">
                            {mainSrv?.name} • {b.location}
                          </p>
                        </div>
                        <span className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2 rounded-full bg-ink-primary group-hover:bg-gold-600 text-sanctuary-alabaster text-caption font-semibold uppercase tracking-wider transition-colors shrink-0">
                          <span>Details</span>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Mobile Horizontal Snap Carousel (<md) */}
              <div className="md:hidden relative -mx-4 px-4">
                <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-2">
                  {events.map((ev) => {
                    const isSaved = downloadedEventId === ev.id;
                    return (
                      <div
                        key={ev.id}
                        className="snap-center shrink-0 w-[85vw] sm:w-[68vw] p-5 rounded-2xl bg-sanctuary-parchment/90 border border-sanctuary-stone flex flex-col justify-between gap-4 shadow-xs"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-3 py-1 rounded-full bg-white border border-sanctuary-stone font-mono text-eyebrow font-bold uppercase tracking-wider text-gold-600">
                              {ev.date}
                            </span>
                            <span className="text-eyebrow font-mono uppercase tracking-widest text-ink-muted">
                              {ev.category}
                            </span>
                          </div>
                          <h3 className="font-serif text-2xl font-bold text-ink-primary">{ev.title}</h3>
                          <div className="space-y-1 text-caption text-ink-secondary">
                            <p className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-gold-600 shrink-0" /> {ev.time}
                            </p>
                            <p className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-gold-600 shrink-0" /> {ev.location}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDownloadCalendar(ev)}
                          className={`w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-caption uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                            isSaved ? 'bg-olive-500 text-white' : 'bg-ink-primary hover:bg-gold-600 text-sanctuary-alabaster'
                          }`}
                        >
                          {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <CalendarPlus className="w-4 h-4 text-gold-400" />}
                          <span>{isSaved ? 'Saved (.ics)' : 'Add to Calendar'}</span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Desktop Vertical Timeline with Scroll-Linked Spine & Flipping Date Tiles (md+) */}
              <div className="hidden md:block relative pl-10 space-y-5">
                <div
                  aria-hidden="true"
                  className="absolute left-3 top-4 bottom-4 w-0.5 bg-sanctuary-stone/80 rounded-full"
                />
                <m.div
                  aria-hidden="true"
                  style={prefersReduced ? { scaleY: 1 } : { scaleY: scrollYProgress }}
                  className="origin-top absolute left-3 top-4 bottom-4 w-0.5 bg-gradient-to-b from-gold-500 via-gold-400 to-gold-600 rounded-full"
                />

                {events.map((ev, index) => {
                  const isSaved = downloadedEventId === ev.id;
                  return (
                    <div key={ev.id} className="relative flex items-center gap-5">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[34px] w-4 h-4 rounded-full bg-sanctuary-alabaster border-2 border-gold-500 shadow-xs"
                      />

                      {/* Flipping Date Tile */}
                      <m.div
                        initial={prefersReduced ? { opacity: 0 } : { rotateX: -20, opacity: 0 }}
                        whileInView={{ rotateX: 0, opacity: 1 }}
                        viewport={VIEWPORT_ONCE}
                        transition={{
                          duration: prefersReduced ? 0.15 : 0.6,
                          delay: prefersReduced ? 0 : index * 0.08,
                          ease: CATHEDRAL_EASE,
                        }}
                        style={{ transformPerspective: 800 }}
                        className="w-36 px-3.5 py-4 rounded-2xl bg-white border border-sanctuary-stone text-center shrink-0 shadow-2xs"
                      >
                        <span className="font-mono text-caption font-bold uppercase tracking-wider text-gold-600 block">
                          {ev.date}
                        </span>
                      </m.div>

                      <div className="flex-1 p-5 rounded-2xl bg-sanctuary-parchment/85 border border-sanctuary-stone hover:border-gold-500/50 transition-all flex items-center justify-between gap-4 shadow-xs">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-eyebrow font-mono uppercase tracking-widest text-ink-muted">
                              {ev.category}
                            </span>
                            {ev.isFeatured && (
                              <span className="text-eyebrow font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-gold-500/15 text-gold-700">
                                Featured
                              </span>
                            )}
                          </div>
                          <h3 className="font-serif text-2xl font-bold text-ink-primary">{ev.title}</h3>
                          <div className="flex flex-wrap items-center gap-4 text-caption text-ink-secondary pt-0.5">
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4 text-gold-600" /> {ev.time}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 text-gold-600" /> {ev.location}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDownloadCalendar(ev)}
                          className={`min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-caption uppercase tracking-wider font-semibold transition-all cursor-pointer shrink-0 ${
                            isSaved
                              ? 'bg-olive-500 text-white'
                              : 'bg-ink-primary hover:bg-gold-600 text-sanctuary-alabaster'
                          }`}
                        >
                          {isSaved ? (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              <span>Saved (.ics)</span>
                            </>
                          ) : (
                            <>
                              <CalendarPlus className="w-4 h-4 text-gold-400" />
                              <span>Add to Calendar (.ics)</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Events;
