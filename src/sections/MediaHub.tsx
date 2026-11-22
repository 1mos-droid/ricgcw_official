import React from 'react';
import { ArrowUpRight, Phone, Play, HeartHandshake } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { PICTURES, IMAGE_DIMENSIONS } from '../data/churchData';
import { trackEvent } from '../utils/analytics';
import { toTelUrl, toInternationalDisplay } from '../utils/phoneUtils';
import SectionHeader from '../components/SectionHeader';
import ResponsiveImage from '../components/ResponsiveImage';

interface MediaHubProps {
  onOpenPrayerModal?: () => void;
}

export const MediaHub: React.FC<MediaHubProps> = ({ onOpenPrayerModal }) => {
  const { churchInfo } = useChurch();

  return (
    <section
      id="media"
      aria-labelledby="media-heading"
      className="bg-public-ink text-white py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <SectionHeader
          variant="dark"
          headingId="media-heading"
          eyebrow="The Word. Wherever you are."
          title="A message for"
          accent="your everyday."
          description="Catch Sunday services, Bible teachings, and church updates directly on our verified online channels."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Official Messages & Channel Card */}
          <div className="lg:col-span-8 overflow-hidden grid grid-cols-1 sm:grid-cols-2 bg-white/5">
            <div className="aspect-[3/4] sm:aspect-auto sm:min-h-[500px] bg-black/20 overflow-hidden">
              <ResponsiveImage
                src={PICTURES.couple2}
                alt="Rev. Nicholas Dobeng and Lady Pastor Dobeng"
                width={IMAGE_DIMENSIONS.couple2.width}
                height={IMAGE_DIMENSIONS.couple2.height}
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 100vw"
                pictureClassName="w-full h-full block"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-public-accent-light">
                  Official Media Channels
                </p>
                <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
                  Sunday Services &amp; Sermons Online
                </h3>
                <p className="text-base text-white/75 leading-relaxed">
                  Watch full messages, worship moments, and announcements from {churchInfo.shortName} on our official YouTube, Facebook, and Instagram channels.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href={churchInfo.contact.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('interaction', 'youtube_channel_open', 'Media Hub')}
                  className="w-full min-h-[48px] px-5 py-3 rounded-full bg-public-accent-light hover:bg-white text-public-ink font-semibold text-base inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <Play className="w-4 h-4 shrink-0" />
                  <span>Watch on YouTube</span>
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </a>

                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href={churchInfo.contact.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-4 py-2 rounded-full border border-white/20 hover:border-white text-white text-sm font-medium inline-flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Facebook</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>

                  <a
                    href={churchInfo.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[44px] px-4 py-2 rounded-full border border-white/20 hover:border-white text-white text-sm font-medium inline-flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Instagram</span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Dedicated High-Contrast Prayer Support Card */}
          <div className="lg:col-span-4 bg-public-accent-light text-public-ink p-7 sm:p-8 flex flex-col justify-between gap-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-full border border-public-ink/30 flex items-center justify-center text-public-ink">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-public-accent">
                Pastoral Intercession
              </p>
              <h3 className="text-3xl lg:text-4xl font-bold tracking-tight text-public-ink">
                Need prayer?
              </h3>
              <p className="text-base text-public-ink-muted leading-relaxed">
                You don’t have to walk through life alone. Share a prayer petition, family need, or praise report with our pastoral team.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => onOpenPrayerModal?.()}
                className="w-full min-h-[48px] px-5 py-3 rounded-full bg-public-ink hover:bg-public-accent text-white font-semibold text-base transition-colors cursor-pointer"
              >
                Submit a prayer request
              </button>

              <a
                href={toTelUrl(churchInfo.contact.phone)}
                className="w-full min-h-[44px] py-2.5 text-public-ink text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors tabular-nums flex-wrap"
              >
                <Phone className="w-4 h-4 text-public-accent shrink-0" />
                <span>Call pastoral line: {toInternationalDisplay(churchInfo.contact.phone)}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaHub;
