import React, { useMemo } from 'react';
import { ArrowRight, ArrowDown, MapPin, Play } from 'lucide-react';
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
  const { churchInfo, themeSettings, branches } = useChurch();
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
    <section id="hero" aria-labelledby="hero-heading" className="bg-public-ink text-white pt-16">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-10 sm:pt-14 lg:pt-16">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/20 pb-5 text-xs font-semibold tracking-[0.12em] uppercase">
          <p className="max-w-xl text-white/85">{churchInfo.name}</p>
          <p className="text-public-accent-light">{themeLine}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center py-10 lg:py-14">
          <div className="min-w-0 space-y-7 lg:py-6">
            <p className="flex items-center gap-2 text-sm text-public-accent-light">
              <span className="h-2 w-2 rounded-full bg-public-accent-light" aria-hidden="true" />
              A place to belong. A faith to live.
            </p>
            <h1 id="hero-heading" className="text-[clamp(2.75rem,5.4vw,5.5rem)] leading-[1.01] font-extrabold tracking-[-0.055em] break-words text-balance">
              {headline}
            </h1>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-lg">{subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button type="button" onClick={() => onOpenBranchModal?.()} className="min-h-[52px] px-6 py-3.5 rounded-full bg-public-accent-light hover:bg-white text-public-ink font-bold inline-flex items-center justify-center gap-5 transition-colors cursor-pointer">
                Plan your visit <ArrowRight className="w-5 h-5 shrink-0" />
              </button>
              <a href="#media" className="min-h-[52px] px-6 py-3.5 rounded-full border border-white/35 hover:bg-white/10 text-white font-semibold inline-flex items-center justify-center gap-3 transition-colors">
                <Play className="w-4 h-4 shrink-0" /> Watch messages
              </a>
            </div>
          </div>

          <figure className="min-w-0 w-full self-center flex flex-col">
            <div className="overflow-hidden rounded-t-[8rem] sm:rounded-t-[12rem] bg-white/5">
              <ResponsiveImage src={PICTURES.pastors} alt="Pastoral leadership team of Rhema Inner Court Gospel Church (Worldwide)" width={IMAGE_DIMENSIONS.pastors.width} height={IMAGE_DIMENSIONS.pastors.height} sizes="(min-width: 1024px) 48vw, 100vw" priority pictureClassName="block" className="w-full h-auto" />
            </div>
            <figcaption className="flex justify-between gap-3 pt-4 text-xs text-white/70">
              <span>Faith. Family. Purpose.</span>
              <span>Led by {churchInfo.founder.name}</span>
            </figcaption>
          </figure>
        </div>
      </div>

      <div className="bg-public-accent-light text-public-ink">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <ArrowDown className="w-5 h-5 shrink-0" aria-hidden="true" />
            <div><p className="font-bold">Your Sunday starts here.</p><p className="text-sm">{countdown.label} · Ghana Time (GMT)</p></div>
          </div>
          <a href="#sanctuaries" className="min-h-[44px] inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4">
            <MapPin className="w-4 h-4 shrink-0" />
            <span>{branches.length ? branches.map(branch => branch.name.split(' ')[0]).join(' · ') : 'Explore our locations'}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
