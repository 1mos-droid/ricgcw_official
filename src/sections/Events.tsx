import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar as CalendarIcon, MapPin, Clock, ArrowRight, Sparkles, CheckCircle2, Bookmark } from 'lucide-react';
import { UPCOMING_EVENTS } from '../data/churchData';

interface EventsProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: () => void;
}

export const Events = ({ onOpenPrayerModal, onOpenBranchModal }: EventsProps) => {
  const [registeredEventId, setRegisteredEventId] = useState<string | null>(null);

  const handleRegister = (eventId: string) => {
    setRegisteredEventId(eventId);
    setTimeout(() => setRegisteredEventId(null), 3000);
  };

  return (
    <section id="events" className="relative py-28 px-4 sm:px-6 md:px-8 bg-[#070c18] border-b border-amber-500/15 overflow-hidden">
      {/* Ambient glowing background */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <CalendarIcon className="w-3.5 h-3.5" /> Holy Gatherings
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight">
              Calendar of Divine Glory
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl">
              Mark your calendar and prepare for life-altering spiritual conferences, revival vigils, and outreach initiatives.
            </p>
          </div>

          <button
            onClick={onOpenBranchModal}
            className="px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider flex items-center gap-2 self-start md:self-auto transition-all cursor-pointer"
          >
            <span>View Weekly Schedules</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        </div>

        {/* Featured Main Event Card */}
        {UPCOMING_EVENTS.filter((e) => e.isFeatured).map((fev) => (
          <motion.div
            key={fev.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/40 shadow-2xl space-y-6 relative overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest bg-amber-500 text-slate-950 shadow-md">
                Featured Flagship Conference
              </span>
              <span className="text-xs font-mono font-bold text-amber-300 bg-black/40 px-3 py-1 rounded-xl border border-amber-500/20">
                {fev.date}
              </span>
            </div>

            <div className="space-y-3 max-w-3xl">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white leading-tight">
                {fev.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                {fev.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/10">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Time:</strong> {fev.time}</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/10">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Location:</strong> {fev.location}</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-black/40 border border-white/10 sm:col-span-2 lg:col-span-1">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>Host:</strong> Rev. Nicholas Dobeng</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-amber-300/80 font-medium">Free admission • Open to the general public</span>
              <button
                onClick={() => handleRegister(fev.id)}
                className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
              >
                {registeredEventId === fev.id ? <CheckCircle2 className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                <span>{registeredEventId === fev.id ? 'Interest Registered!' : 'Save The Date & Attend'}</span>
              </button>
            </div>
          </motion.div>
        ))}

        {/* Other Upcoming Events Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {UPCOMING_EVENTS.filter((e) => !e.isFeatured).map((ev, i) => (
            <motion.div
              key={ev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-3xl bg-slate-900 border border-white/10 hover:border-amber-500/30 shadow-xl flex flex-col justify-between space-y-6 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                    {ev.category}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-slate-400">
                    {ev.date}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold font-serif text-lg text-white group-hover:text-amber-300 transition-colors">
                    {ev.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {ev.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{ev.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">{ev.location}</span>
                </div>

                <button
                  onClick={() => handleRegister(ev.id)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-slate-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {registeredEventId === ev.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : null}
                  <span>{registeredEventId === ev.id ? 'Registered!' : 'Register Attendance'}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Events;
