import React, { useMemo } from 'react';
import { ArrowRight, Calendar, MapPin, Play } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { PICTURES, IMAGE_DIMENSIONS } from '../data/churchData';
import { ResponsiveImage } from '../components/ResponsiveImage';
import { getNextSundayCountdown } from '../utils/serviceScheduleUtils';

interface HeroProps {
  onOpenBranchModal?: (branchId?: string) => void;
  onOpenGivingModal?: () => void;
  onOpenPrayerModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBranchModal }) => {
  const { churchInfo, themeSettings } = useChurch();
  const countdown = useMemo(() => getNextSundayCountdown(), []);

  const headline =
    themeSettings.heroHeadline?.trim() || 'Touching Lives, Transforming Nations.';
  const subtitle =
    themeSettings.heroSubtitle?.trim() ||
    `Welcome to ${churchInfo.name}. Join us for Christ-centered worship, practical biblical teaching, and vibrant community across Mallam, Kokrobitey, and Langma.`;

  const themeLine = churchInfo.themeTitle
    ? `${churchInfo.themeYear}: ${churchInfo.themeTitle}`
    : churchInfo.themeYear;

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="bg-public-canvas text-public-ink pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24 border-b border-public-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Direct Invitation, Hierarchy & Primary Actions */}
          <div className="lg:col-span-6 space-y-6 min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-public-accent tracking-[0.12em] uppercase">
              {themeLine}
            </p>

            <h1
              id="hero-heading"
              className="font-sans text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.06] font-extrabold tracking-tight text-public-ink break-words"
            >
              {headline}
            </h1>

            <p className="text-base sm:text-lg text-public-ink-muted leading-relaxed max-w-xl">
              {subtitle}
            </p>

            {/* Primary & Secondary Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onOpenBranchModal?.()}
                className="min-h-[48px] px-6 py-3 rounded-lg bg-public-ink hover:bg-public-accent text-white font-semibold text-base inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Plan your visit</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <a
                href="#media"
                className="min-h-[48px] px-6 py-3 rounded-lg border border-public-border bg-public-surface hover:border-public-ink text-public-ink font-semibold text-base inline-flex items-center justify-center gap-2 transition-colors"
              >
                <Play className="w-4 h-4 text-public-accent shrink-0" />
                <span>Watch messages</span>
              </a>
            </div>

            {/* Quiet Service Times & Sanctuary Summary Strip */}
            <div className="pt-5 border-t border-public-border flex flex-wrap items-center justify-between gap-x-6 gap-y-2.5 text-sm text-public-ink-muted">
              <div className="flex items-center gap-2 min-w-0">
                <Calendar className="w-4 h-4 text-public-accent shrink-0" />
                <span>
                  <strong className="font-semibold text-public-ink">Sundays 09:00 AM GMT</strong>
                  {' · '}
                  <span>{countdown.label}</span>
                </span>
              </div>

              <a
                href="#sanctuaries"
                className="inline-flex items-center gap-1.5 font-semibold text-public-ink hover:text-public-accent transition-colors min-h-[44px] sm:min-h-0 whitespace-nowrap"
              >
                <MapPin className="w-4 h-4 text-public-accent shrink-0" />
                <span>Mallam, Kokrobitey &amp; Langma</span>
              </a>
            </div>
          </div>

          {/* Right Column: Clean Full-Bleed Church Photography */}
          <div className="lg:col-span-6 space-y-2.5 min-w-0">
            <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-public-muted border border-public-border">
              <ResponsiveImage
                src={PICTURES.pastors}
                alt="Pastoral leadership team of Rhema Inner Court Gospel Church (Worldwide)"
                width={IMAGE_DIMENSIONS.pastors.width}
                height={IMAGE_DIMENSIONS.pastors.height}
                sizes="(min-width: 1024px) 48vw, 100vw"
                priority
                className="w-full h-full object-cover object-[50%_20%]"
              />
            </div>
            <p className="text-xs text-public-ink-muted">
              {churchInfo.name} · Led by {churchInfo.founder.name}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
