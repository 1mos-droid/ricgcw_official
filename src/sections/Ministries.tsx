import React from 'react';
import { ArrowUpRight, Clock, Shield, Heart, Flame, Music, Baby, Globe } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';
import { Stagger, StaggerItem } from '../components/motion';
import SectionHeader from '../components/SectionHeader';

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

  const handleConnect = (ministryName: string) => {
    trackEvent('interaction', 'ministry_connect_clicked', ministryName);
    if (onConnectMinistry) {
      onConnectMinistry(ministryName);
    } else {
      onOpenPrayerModal?.();
    }
  };

  const handleSpotlightMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
  };

  return (
    <section id="ministries" className="py-14 lg:py-20 px-4 sm:px-6 md:px-8 bg-transparent text-ink-primary">
      <div className="max-w-7xl mx-auto space-y-8">
        <SectionHeader
          eyebrow="Kingdom Ministries & Fellowships"
          title="Find Your Spiritual"
          accent="Family"
          description="Consecrated fellowships designed to disciple, nurture, and release believers into their God-given destiny."
        />

        {/* Asymmetric Editorial Bento Grid with Zero-Render CSS Cursor Spotlight */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ministries.map((min, index) => {
            const indexStr = String(index + 1).padStart(2, '0');
            const IconComponent = MINISTRY_ICONS[min.iconName] || Heart;
            const isFeaturedLead = index === 0 && ministries.length > 1;
            const isClosingWide = ministries.length === 6 && index === 5;

            const spanClass = isFeaturedLead
              ? 'md:col-span-2'
              : isClosingWide
              ? 'md:col-span-2 lg:col-span-3'
              : '';

            return (
              <StaggerItem key={min.id} className={spanClass}>
                <div
                  role="button"
                  tabIndex={0}
                  onPointerMove={handleSpotlightMove}
                  onClick={() => handleConnect(min.name)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleConnect(min.name);
                    }
                  }}
                  aria-label={`Connect with ${min.name} department`}
                  className={`group relative overflow-hidden h-full p-6 sm:p-7 rounded-2xl border transition-all duration-300 cursor-pointer shadow-xs hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-16px_rgba(184,134,11,0.18)] flex flex-col justify-between gap-5 ${
                    isFeaturedLead
                      ? 'bg-white/92 border-gold-500/35 hover:border-gold-500'
                      : 'bg-sanctuary-parchment/88 hover:bg-white/95 border-sanctuary-stone hover:border-gold-500/50'
                  } ${isClosingWide ? 'lg:flex-row lg:items-center lg:gap-8' : ''}`}
                >
                  {/* Cursor Spotlight Radial Halo (CSS vars only) */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        'radial-gradient(360px circle at var(--x, -999px) var(--y, -999px), rgba(184,134,11,0.14), transparent 70%)',
                    }}
                  />

                  <div className="relative z-10 space-y-3.5 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gold-500/12 border border-gold-500/25 text-gold-600 flex items-center justify-center shrink-0 group-hover:rotate-12 group-hover:scale-105 transition-transform duration-300">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="font-mono text-caption font-bold text-gold-600">
                          {indexStr}.
                        </span>
                      </div>

                      <span className="text-eyebrow font-mono uppercase tracking-widest text-ink-muted">
                        {isFeaturedLead ? 'Featured Fellowship' : 'Active Fellowship'}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-h3 font-bold text-ink-primary group-hover:text-gold-600 transition-colors">
                        {min.name}
                      </h3>
                      <p className="text-caption text-gold-600 font-semibold tracking-wide mt-0.5">
                        {min.tagline}
                      </p>
                    </div>

                    <p className="text-body text-ink-secondary leading-relaxed max-w-prose">
                      {min.description}
                    </p>
                  </div>

                  <div
                    className={`relative z-10 pt-4 border-t border-sanctuary-stone/80 flex flex-col gap-3 ${
                      isClosingWide ? 'lg:pt-0 lg:border-t-0 lg:border-l lg:pl-8 lg:min-w-[260px]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-2 text-caption text-ink-muted">
                      <Clock className="w-4 h-4 text-gold-600 shrink-0" />
                      <span className="font-mono">{min.schedule}</span>
                    </div>

                    <div className="min-h-[44px] w-full py-2.5 px-5 rounded-full bg-white group-hover:bg-ink-primary text-ink-primary group-hover:text-white border border-sanctuary-stone group-hover:border-ink-primary text-caption font-semibold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-2xs">
                      <span>Connect with Department</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
};

export default Ministries;
