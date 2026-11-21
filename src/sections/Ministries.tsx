import React from 'react';
import { ArrowUpRight, Clock, Shield, Heart, Flame, Music, Baby, Globe } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';

interface MinistriesProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: (branchId?: string) => void;
  onConnectMinistry?: (ministryName: string) => void;
}

const MINISTRY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Heart,
  Flame,
  Music,
  Baby,
  Globe,
};

export const Ministries: React.FC<MinistriesProps> = ({
  onOpenPrayerModal,
  onConnectMinistry,
}) => {
  const { ministries } = useChurch();

  return (
    <section id="ministries" className="py-12 lg:py-16 px-4 sm:px-6 md:px-8 bg-transparent text-[#141619]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E6E0D3]/80 pb-5">
          <div>
            <span className="text-[11px] uppercase tracking-[0.22em] text-[#B8860B] font-semibold block mb-1 font-sans">
              Kingdom Ministries &amp; Fellowships
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-[#141619]">
              Find Your Spiritual <span className="italic font-normal text-[#B8860B]">Family</span>
            </h2>
          </div>
          <p className="text-xs text-[#4A5058] max-w-md font-light">
            Consecrated fellowships designed to disciple, nurture, and release believers into their God-given destiny.
          </p>
        </div>

        {/* Editorial Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ministries.map((min, index) => {
            const indexStr = String(index + 1).padStart(2, '0');
            const IconComponent = MINISTRY_ICONS[min.iconName] || Heart;

            return (
              <div
                key={min.id}
                className="p-5 sm:p-6 rounded-2xl bg-[#F3EFE6]/74 backdrop-blur-md hover:bg-white/88 border border-[#E6E0D3]/90 hover:border-[#B8860B]/50 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-16px_rgba(184,134,11,0.16)] transition-all duration-300 flex flex-col justify-between group space-y-4 shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#B8860B]/12 border border-[#B8860B]/25 text-[#B8860B] flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs font-bold text-[#B8860B]">
                        {indexStr}.
                      </span>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#787F87]">
                      Active Fellowship
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#141619] group-hover:text-[#B8860B] transition-colors">
                      {min.name}
                    </h3>
                    <p className="text-xs text-[#B8860B] font-medium tracking-wide mt-0.5">
                      {min.tagline}
                    </p>
                  </div>

                  <p className="text-xs text-[#4A5058] font-light leading-relaxed">
                    {min.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E6E0D3] space-y-3">
                  <div className="flex items-center gap-2 text-xs text-[#787F87]">
                    <Clock className="w-3.5 h-3.5 text-[#B8860B] shrink-0" />
                    <span className="font-mono">{min.schedule}</span>
                  </div>

                  <button
                    onClick={() => {
                      trackEvent('interaction', 'ministry_connect_clicked', min.name);
                      if (onConnectMinistry) {
                        onConnectMinistry(min.name);
                      } else {
                        onOpenPrayerModal?.();
                      }
                    }}
                    className="w-full py-3 px-4 rounded-full bg-white/95 hover:bg-[#141619] text-[#141619] hover:text-white border border-[#E6E0D3] text-xs font-medium uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <span>Connect with Department</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
