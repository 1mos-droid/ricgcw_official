import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Heart, Flame, Music, Baby, Globe, Clock, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { MINISTRIES } from '../data/churchData';

interface MinistriesProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: () => void;
}

const iconMap: Record<string, any> = {
  Shield: Users,
  Heart: Heart,
  Flame: Flame,
  Music: Music,
  Baby: Baby,
  Globe: Globe,
};

export const Ministries = ({ onOpenPrayerModal, onOpenBranchModal }: MinistriesProps) => {
  const [selectedMinistry, setSelectedMinistry] = useState(MINISTRIES[0]);

  return (
    <section id="ministries" className="relative py-28 px-4 sm:px-6 md:px-8 bg-slate-900/60 border-b border-amber-500/15 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Users className="w-3.5 h-3.5" /> Growth & Fellowship
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight">
            Find Your Community & Ministry
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            From men and women to youth and children, there is a dedicated spiritual family waiting to welcome and disciple you.
          </p>
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MINISTRIES.map((min, idx) => {
            const IconComponent = iconMap[min.iconName] || Users;
            return (
              <motion.div
                key={min.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-7 rounded-[32px] bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-white/10 hover:border-amber-500/40 shadow-xl hover:shadow-2xl transition-all group flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  {/* Top Row: Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-7 h-7" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${min.badgeColor}`}>
                      Active Fellowship
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl font-bold font-serif text-white group-hover:text-amber-300 transition-colors">
                      {min.name}
                    </h3>
                    <p className="text-xs text-amber-400/90 font-medium mt-0.5">{min.tagline}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {min.description}
                  </p>
                </div>

                {/* Bottom Schedule & Action */}
                <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="font-mono text-[11px]">{min.schedule}</span>
                  </div>

                  <button
                    onClick={onOpenPrayerModal}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-slate-300 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:bg-amber-500/20 group-hover:text-amber-300"
                  >
                    <span>Connect with Ministry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-xl font-bold font-serif text-white">Have a special calling or gift to serve?</h4>
            <p className="text-xs sm:text-sm text-slate-400">Join our levites choir, ushering protocol, tech & media, or welfare team.</p>
          </div>
          <button
            onClick={onOpenPrayerModal}
            className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 shrink-0 cursor-pointer"
          >
            Volunteer & Serve
          </button>
        </div>

      </div>
    </section>
  );
};

export default Ministries;
