import React from 'react';
import { Users, Heart, Flame, Music, Baby, Globe, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';

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
  const { ministries } = useChurch();

  return (
    <section id="ministries" className="relative py-24 px-4 sm:px-6 md:px-8 bg-slate-50 text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-widest">
            <Users className="w-3.5 h-3.5 text-amber-600" /> Growth &amp; Fellowship
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-950 tracking-tight">
            Find Your Community &amp; Ministry
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            From men and women to youth and children, there is a dedicated spiritual family waiting to welcome and disciple you.
          </p>
        </div>

        {/* Ministries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((min) => {
            const IconComponent = iconMap[min.iconName] || Users;
            return (
              <div
                key={min.id}
                className="p-7 rounded-3xl bg-white border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Top Row: Icon & Tag */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                      Active Fellowship
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl font-bold font-serif text-slate-950 group-hover:text-amber-700 transition-colors">
                      {min.name}
                    </h3>
                    <p className="text-xs text-amber-700 font-semibold mt-0.5">{min.tagline}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {min.description}
                  </p>
                </div>

                {/* Bottom Schedule & Action */}
                <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-mono text-[11px] font-medium">{min.schedule}</span>
                  </div>

                  <button
                    onClick={() => {
                      trackEvent('interaction', 'ministry_connect_clicked', min.name);
                      onOpenPrayerModal?.();
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-800 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Connect with Ministry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Ministries;
