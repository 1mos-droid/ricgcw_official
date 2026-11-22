import React, { useState } from 'react';
import { Calendar, Clock, MapPin, CalendarPlus, Check } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';
import { downloadEventIcs } from '../utils/calendarUtils';
import SectionHeader from '../components/SectionHeader';

interface EventsProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: (branchId?: string) => void;
}

export const Events: React.FC<EventsProps> = ({ onOpenBranchModal }) => {
  const { events } = useChurch();
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const handleDownloadIcs = (ev: {
    id: string;
    title: string;
    description: string;
    location: string;
    date: string;
    time: string;
  }) => {
    trackEvent('interaction', 'calendar_add_ics', ev.title);
    downloadEventIcs({
      title: ev.title,
      description: ev.description,
      location: ev.location,
      dateStr: ev.date,
      timeStr: ev.time,
    });
    setDownloadedId(ev.id);
    window.setTimeout(() => setDownloadedId(null), 2600);
  };

  return (
    <section
      id="events"
      aria-labelledby="events-heading"
      className="bg-public-canvas text-public-ink py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-public-border"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <SectionHeader
          headingId="events-heading"
          eyebrow="Church Calendar"
          title="Upcoming"
          accent="events"
          description="Conferences, prayer gatherings, and community outreach across our congregations (Ghana Time · GMT)."
        />

        {events.length === 0 ? (
          <div className="rounded-2xl border border-public-border bg-public-surface p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h3 className="text-xl font-bold text-public-ink">
                Regular Weekly Gatherings Continue
              </h3>
              <p className="text-base text-public-ink-muted leading-relaxed">
                No special conference is listed right now. Join us every Sunday at 09:00 AM GMT across Mallam, Kokrobitey, and Langma, or contact us for upcoming seasonal announcements.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onOpenBranchModal?.()}
                className="min-h-[44px] px-5 py-2.5 rounded-lg bg-public-ink hover:bg-public-accent text-white text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                View service times
              </button>
              <a
                href="#connect"
                className="min-h-[44px] px-5 py-2.5 rounded-lg border border-public-border bg-public-canvas hover:border-public-ink text-public-ink text-sm font-semibold inline-flex items-center justify-center transition-colors whitespace-nowrap"
              >
                Contact the church
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((ev) => {
              const isSaved = downloadedId === ev.id;
              return (
                <article
                  key={ev.id}
                  className="bg-public-surface border border-public-border rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-public-accent">
                        {ev.category}
                      </span>
                      {ev.isFeatured && (
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-public-canvas border border-public-border text-public-ink">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-public-ink">
                      {ev.title}
                    </h3>

                    <p className="text-sm sm:text-base text-public-ink-muted leading-relaxed">
                      {ev.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-public-border space-y-4">
                    <div className="space-y-1.5 text-sm text-public-ink-muted">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-public-accent shrink-0" />
                        <span className="font-medium text-public-ink">{ev.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-public-accent shrink-0" />
                        <span>{ev.time}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-public-accent shrink-0 mt-0.5" />
                        <span>{ev.location}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDownloadIcs(ev)}
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-lg border border-public-border bg-public-canvas hover:border-public-ink text-public-ink text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      {isSaved ? (
                        <>
                          <Check className="w-4 h-4 text-olive-500 shrink-0" />
                          <span>Calendar file saved</span>
                        </>
                      ) : (
                        <>
                          <CalendarPlus className="w-4 h-4 text-public-accent shrink-0" />
                          <span>Add to calendar</span>
                        </>
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;
