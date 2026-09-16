import { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, CheckCircle2, Bookmark } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';

interface EventsProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: () => void;
}

export const Events = ({ onOpenPrayerModal, onOpenBranchModal }: EventsProps) => {
  const { events } = useChurch();
  const [registeredEventId, setRegisteredEventId] = useState<string | null>(null);

  const handleRegister = (eventId: string, title: string) => {
    trackEvent('interaction', 'event_rsvp', title);
    setRegisteredEventId(eventId);
    setTimeout(() => setRegisteredEventId(null), 3000);
  };

  const featuredEvent = events.find((e) => e.isFeatured) || events[0];
  const regularEvents = events.filter((e) => e.id !== featuredEvent?.id);

  return (
    <section id="events" className="relative py-24 px-4 sm:px-6 md:px-8 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-widest">
              <CalendarIcon className="w-3.5 h-3.5 text-amber-600" /> Holy Gatherings
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-950 tracking-tight">
              Calendar of Divine Glory
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl">
              Mark your calendar and prepare for life-altering spiritual conferences, revival vigils, and outreach initiatives.
            </p>
          </div>

          <button
            onClick={() => {
              trackEvent('interaction', 'branch_modal_opened', 'Events Section');
              onOpenBranchModal?.();
            }}
            className="px-5 py-3 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 text-xs font-bold uppercase tracking-wider flex items-center gap-2 self-start md:self-auto transition-colors cursor-pointer shadow-sm"
          >
            <span>Weekly Schedules</span>
            <ArrowRight className="w-4 h-4 text-amber-600" />
          </button>
        </div>

        {/* Events Content */}
        {events.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 space-y-3 shadow-sm">
            <CalendarIcon className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-xl font-serif font-bold text-slate-900">Upcoming Gatherings Coming Soon</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Special conferences and revival vigils will be announced soon. In the meantime, you are warmly invited to join any of our regular weekly worship services.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBranchModal}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                Explore Weekly Branch Schedules
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Featured Flagship Event Card */}
            {featuredEvent && (
              <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-xl space-y-6 relative overflow-hidden">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500 text-slate-950 shadow-sm">
                    Featured Flagship Conference
                  </span>
                  <span className="text-xs font-mono font-bold text-amber-300 bg-white/10 px-3 py-1 rounded-xl border border-white/10">
                    {featuredEvent.date}
                  </span>
                </div>

                <div className="space-y-3 max-w-3xl">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white leading-tight">
                    {featuredEvent.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                    {featuredEvent.description}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 pt-2 text-xs text-slate-200">
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Time:</strong> {featuredEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/10">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    <span><strong>Location:</strong> {featuredEvent.location}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-amber-300 font-medium">Free admission • Open to the general public</span>
                  <button
                    onClick={() => handleRegister(featuredEvent.id, featuredEvent.title)}
                    className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    {registeredEventId === featuredEvent.id ? <CheckCircle2 className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    <span>{registeredEventId === featuredEvent.id ? 'Saved in Reminder!' : 'Save The Date & Attend'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Regular Events 3-Grid */}
            {regularEvents.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-amber-300 hover:shadow-lg transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                          {ev.category}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-600">{ev.date}</span>
                      </div>

                      <h4 className="text-lg font-bold font-serif text-slate-950 leading-snug">
                        {ev.title}
                      </h4>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {ev.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
                      <div className="flex items-center gap-2 text-slate-600">
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{ev.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>{ev.location}</span>
                      </div>

                      <button
                        onClick={() => handleRegister(ev.id, ev.title)}
                        className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-amber-500 hover:text-slate-950 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-200"
                      >
                        {registeredEventId === ev.id ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                        <span>{registeredEventId === ev.id ? 'Attending!' : 'RSVP & Attend'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Events;
