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
    <section
      id="events"
      className="bg-sanctuary-parchment text-ink-primary py-20 lg:py-28 px-4 sm:px-6 lg:px-10 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <SectionHeader
          index="06"
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
              className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-transparent border border-sanctuary-stone-strong text-ink-primary text-caption uppercase tracking-[0.14em] font-semibold hover:bg-sanctuary-950 hover:text-sanctuary-alabaster hover:border-sanctuary-950 transition-colors cursor-pointer"
            >
              <span>View Weekly Sanctuaries</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          }
        />

        {/* Always-mounted timeline container for safe useScroll hydration */}
        <div ref={timelineRef} className="relative">
          {events.length === 0 ? (
            <div className="space-y-8">
              <Reveal className="pb-6 border-b border-sanctuary-stone-strong/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-sm bg-gold-500/15 border border-gold-500/35 text-gold-700 flex items-center justify-center shrink-0">
                    <CalendarIcon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-ink-primary">
                      Upcoming Holy Gatherings Announced Soon
                    </h3>
                    <p className="text-body text-ink-secondary max-w-2xl leading-relaxed">
                      Special conventions and revival vigils are currently being scheduled by the Pastoral Council. Join any of our regular weekly worship gatherings across our three sanctuaries.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Mobile Horizontal Snap Exhibition Cards (<md) */}
              <div className="md:hidden relative -mx-4 px-4">
                <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-2">
                  {branches.slice(0, 3).map((b, idx) => {
                    const mainSrv = b.services.find((s) => s.isMain) || b.services[0];
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => {
                          trackEvent('interaction', 'branch_modal_opened', `Events Empty ${b.name}`);
                          onOpenBranchModal?.(b.id);
                        }}
                        className="snap-center shrink-0 w-[82vw] sm:w-[62vw] p-6 rounded-sm bg-white border border-sanctuary-stone hover:border-gold-500 text-left space-y-2.5 cursor-pointer"
                      >
                        <span className="text-eyebrow font-mono uppercase tracking-[0.18em] text-gold-600 block">
                          0{idx + 1} · Every Sunday
                        </span>
                        <p className="font-serif text-2xl text-ink-primary">
                          {b.name.split('(')[0].trim()}
                        </p>
                        <p className="text-caption font-mono text-ink-muted tabular-nums">
                          {mainSrv?.time || '9:00 AM GMT'}
                        </p>
                        <span className="inline-flex items-center gap-1.5 text-caption font-semibold text-gold-700 pt-2">
                          <span>View Schedule</span>
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Desktop Vertical Scroll-Linked Calendar Spine (md+) */}
              <div className="hidden md:block relative pl-10">
                <div
                  aria-hidden="true"
                  className="absolute left-3 top-3 bottom-3 w-px bg-sanctuary-stone-strong/70"
                />
                <m.div
                  aria-hidden="true"
                  style={prefersReduced ? { scaleY: 1 } : { scaleY: scrollYProgress }}
                  className="origin-top absolute left-3 top-3 bottom-3 w-[2px] bg-gradient-to-b from-globe-royal via-gold-500 to-sanctuary-950"
                />

                <div className="divide-y divide-sanctuary-stone-strong/60 border-t border-b border-sanctuary-stone-strong/60">
                  {branches.slice(0, 3).map((b, idx) => {
                    const mainSrv = b.services.find((s) => s.isMain) || b.services[0];
                    return (
                      <div key={b.id} className="relative py-6 grid grid-cols-12 gap-6 items-center">
                        <span
                          aria-hidden="true"
                          className="absolute -left-[33px] w-3.5 h-3.5 rounded-full bg-sanctuary-parchment border-2 border-gold-600"
                        />

                        <m.div
                          initial={prefersReduced ? { opacity: 0 } : { rotateX: -18, opacity: 0 }}
                          whileInView={{ rotateX: 0, opacity: 1 }}
                          viewport={VIEWPORT_ONCE}
                          transition={{
                            duration: prefersReduced ? 0.15 : 0.6,
                            delay: prefersReduced ? 0 : idx * 0.08,
                            ease: CATHEDRAL_EASE,
                          }}
                          style={{ transformPerspective: 800 }}
                          className="col-span-3 space-y-0.5"
                        >
                          <span className="text-eyebrow font-mono uppercase tracking-[0.2em] text-gold-600 block">
                            Every Sunday
                          </span>
                          <span className="font-serif text-3xl text-ink-primary tabular-nums block">
                            {mainSrv ? mainSrv.time.split(/[-–]/)[0].trim() : '9:00 AM'}
                          </span>
                        </m.div>

                        <button
                          type="button"
                          onClick={() => {
                            trackEvent('interaction', 'branch_modal_opened', `Events Empty ${b.name}`);
                            onOpenBranchModal?.(b.id);
                          }}
                          className="col-span-9 text-left flex items-center justify-between gap-6 group cursor-pointer py-1"
                        >
                          <div>
                            <h4 className="font-serif text-2xl sm:text-3xl text-ink-primary group-hover:text-gold-600 transition-colors">
                              {b.name}
                            </h4>
                            <p className="text-caption text-ink-secondary mt-1">
                              {mainSrv?.name} · {b.location}
                            </p>
                          </div>
                          <span className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2 rounded-sm bg-sanctuary-950 group-hover:bg-gold-600 text-sanctuary-alabaster text-caption font-semibold uppercase tracking-[0.14em] transition-colors shrink-0">
                            <span>Details</span>
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Mobile Horizontal Snap Carousel (<md) */}
              <div className="md:hidden relative -mx-4 px-4">
                <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-4 pb-2">
                  {events.map((ev) => {
                    const isSaved = downloadedEventId === ev.id;
                    return (
                      <div
                        key={ev.id}
                        className="snap-center shrink-0 w-[85vw] sm:w-[68vw] p-6 rounded-sm bg-white border border-sanctuary-stone flex flex-col justify-between gap-4"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2 text-eyebrow font-mono uppercase tracking-[0.16em]">
                            <span className="text-gold-600 font-semibold">{ev.date}</span>
                            <span className="text-ink-muted">{ev.category}</span>
                          </div>
                          <h3 className="font-serif text-2xl text-ink-primary">{ev.title}</h3>
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
                          className={`w-full min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm text-caption uppercase tracking-[0.14em] font-semibold transition-colors cursor-pointer ${
                            isSaved ? 'bg-olive-500 text-white' : 'bg-sanctuary-950 hover:bg-gold-600 text-sanctuary-alabaster'
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

              {/* Desktop Vertical Scroll-Linked Spine & Architectural Rows (md+) */}
              <div className="hidden md:block relative pl-10">
                <div
                  aria-hidden="true"
                  className="absolute left-3 top-4 bottom-4 w-px bg-sanctuary-stone-strong/70"
                />
                <m.div
                  aria-hidden="true"
                  style={prefersReduced ? { scaleY: 1 } : { scaleY: scrollYProgress }}
                  className="origin-top absolute left-3 top-4 bottom-4 w-[2px] bg-gradient-to-b from-globe-royal via-gold-500 to-sanctuary-950"
                />

                <div className="divide-y divide-sanctuary-stone-strong/60 border-t border-b border-sanctuary-stone-strong/60">
                  {events.map((ev, index) => {
                    const isSaved = downloadedEventId === ev.id;
                    return (
                      <div key={ev.id} className="relative py-6 grid grid-cols-12 gap-6 items-center">
                        <span
                          aria-hidden="true"
                          className="absolute -left-[33px] w-3.5 h-3.5 rounded-full bg-sanctuary-parchment border-2 border-gold-600"
                        />

                        <m.div
                          initial={prefersReduced ? { opacity: 0 } : { rotateX: -18, opacity: 0 }}
                          whileInView={{ rotateX: 0, opacity: 1 }}
                          viewport={VIEWPORT_ONCE}
                          transition={{
                            duration: prefersReduced ? 0.15 : 0.6,
                            delay: prefersReduced ? 0 : index * 0.08,
                            ease: CATHEDRAL_EASE,
                          }}
                          style={{ transformPerspective: 800 }}
                          className="col-span-3 space-y-0.5"
                        >
                          <span className="font-serif text-2xl sm:text-3xl text-ink-primary block">
                            {ev.date}
                          </span>
                          <span className="text-eyebrow font-mono uppercase tracking-[0.18em] text-gold-600 block">
                            {ev.category}
                          </span>
                        </m.div>

                        <div className="col-span-9 flex items-center justify-between gap-6">
                          <div className="space-y-1">
                            {ev.isFeatured && (
                              <span className="text-[10px] font-mono uppercase tracking-[0.18em] px-2 py-0.5 bg-gold-500/20 text-gold-700 font-semibold inline-block mb-1">
                                Featured Gathering
                              </span>
                            )}
                            <h3 className="font-serif text-2xl sm:text-3xl text-ink-primary">{ev.title}</h3>
                            <div className="flex flex-wrap items-center gap-4 text-caption text-ink-secondary">
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4 text-gold-600" /> {ev.time}
                              </span>
                              <span>·</span>
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-4 h-4 text-gold-600" /> {ev.location}
                              </span>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDownloadCalendar(ev)}
                            className={`min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-sm text-caption uppercase tracking-[0.14em] font-semibold transition-colors cursor-pointer shrink-0 ${
                              isSaved
                                ? 'bg-olive-500 text-white'
                                : 'bg-sanctuary-950 hover:bg-gold-600 text-sanctuary-alabaster'
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Events;
