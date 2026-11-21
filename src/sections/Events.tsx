import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, CalendarPlus, CheckCircle2, ArrowRight } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';
import { downloadEventIcs } from '../utils/calendarUtils';

interface EventsProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: (branchId?: string) => void;
}

export const Events: React.FC<EventsProps> = ({ onOpenBranchModal }) => {
  const { events, branches } = useChurch();
  const [downloadedEventId, setDownloadedEventId] = useState<string | null>(null);

  const handleDownloadCalendar = (ev: { id: string; title: string; description: string; location: string; date: string; time: string }) => {
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
    <section id="events" className="py-12 lg:py-16 px-4 sm:px-6 md:px-8 bg-transparent text-[#141619]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E6E0D3]/80 pb-5">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#B8860B] font-semibold block mb-1 font-sans">
              Sacred Gatherings &amp; Conventions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-[#141619]">
              Upcoming <span className="italic font-normal text-[#B8860B]">Calendar Ledger</span>
            </h2>
          </div>
          <button
            onClick={() => {
              trackEvent('interaction', 'branch_modal_opened', 'Events Ledger');
              onOpenBranchModal?.();
            }}
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#F3EFE6]/80 backdrop-blur-sm border border-[#E6E0D3] text-[#141619] text-xs uppercase tracking-wider font-medium hover:bg-white transition-colors cursor-pointer"
          >
            <span>View Weekly Sanctuaries</span>
            <ArrowRight className="w-4 h-4 text-[#B8860B]" />
          </button>
        </div>

        {/* Ledger Rows */}
        {events.length === 0 ? (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F3EFE6]/74 backdrop-blur-md border border-[#E6E0D3]/90 space-y-6 shadow-xs">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#B8860B]/12 border border-[#B8860B]/25 text-[#B8860B] flex items-center justify-center shrink-0">
                  <CalendarIcon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-[#141619]">
                    Upcoming Holy Gatherings Announced Soon
                  </h3>
                  <p className="text-xs text-[#4A5058] max-w-xl font-light leading-relaxed">
                    Special conventions and revival vigils are currently being scheduled by the Pastoral Council. Join any of our vibrant weekly services across our sanctuaries below.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#E6E0D3]/80">
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
                    className="p-4 rounded-xl bg-white/80 hover:bg-white border border-[#E6E0D3] hover:border-[#B8860B]/50 text-left transition-all cursor-pointer flex items-center justify-between gap-2 group"
                  >
                    <div>
                      <p className="font-serif text-base font-bold text-[#141619] group-hover:text-[#B8860B] transition-colors">
                        {b.name.split('(')[0].trim()}
                      </p>
                      <p className="text-[11px] font-mono text-[#787F87] tabular-nums mt-0.5">
                        Sunday • {mainSrv?.time || '9:00 AM GMT'}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#B8860B] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((ev) => {
              const isSaved = downloadedEventId === ev.id;
              return (
                <div
                  key={ev.id}
                  className="p-4 sm:p-5 rounded-2xl bg-[#F3EFE6]/74 backdrop-blur-md border border-[#E6E0D3]/90 hover:border-[#B8860B]/50 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                    {/* Date Badge */}
                    <div className="px-3.5 py-2 rounded-xl bg-white/95 border border-[#E6E0D3] text-center shrink-0 w-fit">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#B8860B] block">
                        {ev.date}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#787F87]">
                          {ev.category}
                        </span>
                        {ev.isFeatured && (
                          <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#B8860B]/15 text-[#7B4F0B]">
                            Featured
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-2xl font-bold text-[#141619]">
                        {ev.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-[#787F87] pt-1">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#B8860B]" /> {ev.time}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#B8860B]" /> {ev.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Add to Calendar Button */}
                  <div className="shrink-0 pt-2 lg:pt-0">
                    <button
                      onClick={() => handleDownloadCalendar(ev)}
                      className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                        isSaved
                          ? 'bg-[#3B6E4C] text-white'
                          : 'bg-[#141619] hover:bg-[#B8860B] text-[#FAF8F5]'
                      }`}
                    >
                      {isSaved ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Saved (.ics)</span>
                        </>
                      ) : (
                        <>
                          <CalendarPlus className="w-4 h-4 text-[#DFC57B]" />
                          <span>Add to Calendar (.ics)</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
