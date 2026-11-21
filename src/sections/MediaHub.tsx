import React, { useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Play, ArrowUpRight, HeartHandshake, Sparkles, Phone, X } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { PICTURES, IMAGE_DIMENSIONS } from '../data/churchData';
import { YoutubeIcon } from '../components/Icons';
import { trackEvent } from '../utils/analytics';
import { toTelUrl, toInternationalDisplay } from '../utils/phoneUtils';
import { SPRING_TACTILE, Reveal, Stagger, StaggerItem } from '../components/motion';
import SectionHeader from '../components/SectionHeader';
import ResponsiveImage from '../components/ResponsiveImage';

interface MediaHubProps {
  onOpenPrayerModal?: () => void;
}

export const MediaHub: React.FC<MediaHubProps> = ({ onOpenPrayerModal }) => {
  const { churchInfo } = useChurch();
  const [isPlayerActive, setIsPlayerActive] = useState(false);
  const prefersReduced = useReducedMotion();

  // Optional YouTube video ID can be attached once a specific sermon broadcast ID is provided
  const featuredVideoId: string | undefined = undefined;

  const featuredSermon = {
    title: '2026 Divine Manifestation Mandate',
    preacher: churchInfo.founder?.name || 'Rev. Nicholas Dobeng',
    description:
      'The prophetic blueprint and covenant positioning for total supernatural breakthrough, perfection of the saints, and taking territories in 2026.',
    scripture: 'Esther 5:1 • Isaiah 60:1-3',
    link: churchInfo.contact.youtube,
  };

  const tracklistSermons = [
    {
      title: 'Consecration & The Royal Priesthood',
      date: 'Consecration Service',
      scripture: 'Hebrews 5:1-10',
      duration: '1 hr 12m',
      link: churchInfo.contact.youtube,
    },
    {
      title: 'Walking in Supernatural Authority',
      date: 'Sunday Word Feast',
      scripture: 'Revelation 5:10',
      duration: '58 mins',
      link: churchInfo.contact.youtube,
    },
    {
      title: 'Breaking Territorial Altars by Fire',
      date: 'Prophetic Encounter',
      scripture: 'Joshua 1:3 • Luke 1:37',
      duration: '1 hr 25m',
      link: churchInfo.contact.youtube,
    },
  ];

  return (
    <section id="media" className="py-14 lg:py-20 px-4 sm:px-6 md:px-8 bg-transparent text-ink-primary">
      <div className="max-w-7xl mx-auto">
        <div className="bg-sanctuary-950/95 backdrop-blur-xl text-sanctuary-alabaster rounded-3xl p-6 sm:p-8 lg:p-10 border border-sanctuary-stone/20 ring-1 ring-gold-400/15 shadow-[0_24px_64px_-20px_rgba(8,11,17,0.42)] relative overflow-hidden space-y-8">
          {/* Header */}
          <SectionHeader
            variant="dark"
            eyebrow="The Living Word & Prayer Altar"
            title="Immerse in the"
            accent="Living Rhema"
            rightSlot={
              <a
                href={churchInfo.contact.youtube}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('conversion', 'social_click', 'YouTube Channel')}
                className="min-h-[44px] inline-flex items-center gap-2 text-caption text-gold-400 hover:underline tracking-wide font-sans font-medium cursor-pointer"
              >
                <YoutubeIcon className="w-4 h-4 text-red-500" />
                <span>Official YouTube Archive</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            }
          />

          {/* Cinematic 12-Column Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column (7 Cols): Featured Sermon Preview & Staggered Tracklist */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              {/* Featured Message Theater Card */}
              <Reveal className="bg-sanctuary-900 rounded-2xl border border-white/10 overflow-hidden shadow-lg">
                {/* Click-to-Load Visual Thumbnail Stage (Zero initial iframe cost) */}
                <div className="relative aspect-[16/9] bg-sanctuary-950 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {isPlayerActive ? (
                      <m.div
                        key="player-active"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-br from-sanctuary-900 via-sanctuary-950 to-sanctuary-850"
                      >
                        {featuredVideoId ? (
                          <iframe
                            title={featuredSermon.title}
                            src={`https://www.youtube-nocookie.com/embed/${featuredVideoId}?autoplay=1&rel=0`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full rounded-xl border-0"
                          />
                        ) : (
                          <>
                            <div className="flex items-center justify-between gap-3">
                              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-400/35 text-gold-400 text-eyebrow font-bold uppercase tracking-wider">
                                Sanctuary Broadcast Ready
                              </span>
                              <button
                                type="button"
                                onClick={() => setIsPlayerActive(false)}
                                aria-label="Close sermon preview"
                                className="min-w-[40px] min-h-[40px] rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="space-y-2 text-center max-w-md mx-auto">
                              <p className="font-serif text-2xl sm:text-3xl text-white">
                                {featuredSermon.title}
                              </p>
                              <p className="text-caption text-sanctuary-alabaster/75">
                                Open the official YouTube sanctuary archive to watch full services and prophetic messages.
                              </p>
                            </div>
                            <div className="flex justify-center">
                              <a
                                href={featuredSermon.link}
                                target="_blank"
                                rel="noreferrer"
                                onClick={() => trackEvent('conversion', 'watch_sermon', featuredSermon.title)}
                                className="min-h-[44px] inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold-400 hover:bg-white text-sanctuary-950 text-caption font-bold uppercase tracking-wider transition-colors"
                              >
                                <YoutubeIcon className="w-4 h-4 text-red-600" />
                                <span>Launch Broadcast on YouTube</span>
                                <ArrowUpRight className="w-4 h-4" />
                              </a>
                            </div>
                          </>
                        )}
                      </m.div>
                    ) : (
                      <m.div
                        key="thumbnail-preview"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="relative w-full h-full group cursor-pointer"
                        onClick={() => {
                          trackEvent('conversion', 'watch_sermon', featuredSermon.title);
                          setIsPlayerActive(true);
                        }}
                      >
                        <ResponsiveImage
                          src={PICTURES.pastors}
                          alt="Ministry leadership and congregation broadcast preview"
                          width={IMAGE_DIMENSIONS.pastors.width}
                          height={IMAGE_DIMENSIONS.pastors.height}
                          sizes="(min-width: 1024px) 52vw, 100vw"
                          pictureClassName="w-full h-full block"
                          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-sanctuary-950 via-sanctuary-950/35 to-sanctuary-950/20" />

                        <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2">
                          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/90 backdrop-blur-md text-white text-eyebrow font-bold uppercase tracking-widest">
                            <span className="w-2 h-2 rounded-full bg-white" />
                            <span>Featured Broadcast</span>
                          </div>
                          <span className="px-3 py-1 rounded-full bg-sanctuary-950/75 backdrop-blur-sm text-eyebrow text-gold-400 font-mono tracking-wider border border-white/10">
                            {featuredSermon.scripture}
                          </span>
                        </div>

                        {/* Centered Pulsing Play Trigger */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            type="button"
                            aria-label="Play featured broadcast preview"
                            onClick={(e) => {
                              e.stopPropagation();
                              trackEvent('conversion', 'watch_sermon', featuredSermon.title);
                              setIsPlayerActive(true);
                            }}
                            className="relative w-16 h-16 rounded-full flex items-center justify-center cursor-pointer"
                          >
                            {!prefersReduced && (
                              <span
                                aria-hidden="true"
                                className="animate-ping absolute inset-0 rounded-full bg-gold-400/45"
                              />
                            )}
                            <span className="relative z-10 w-16 h-16 rounded-full bg-gold-400 hover:bg-white text-sanctuary-950 flex items-center justify-center shadow-2xl transition-transform group-hover:scale-105">
                              <Play className="w-6 h-6 fill-current ml-0.5" />
                            </span>
                          </button>
                        </div>
                      </m.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Message Metadata Body */}
                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="font-serif text-2xl sm:text-3xl text-white leading-tight font-bold">
                    {featuredSermon.title}
                  </h3>

                  <p className="text-white/80 text-body leading-relaxed">
                    {featuredSermon.description}
                  </p>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                    <span className="text-caption text-white/65">
                      Apostolic Ministration • {featuredSermon.preacher}
                    </span>

                    <a
                      href={featuredSermon.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent('conversion', 'watch_sermon', featuredSermon.title)}
                      className="min-h-[44px] inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gold-400 hover:bg-white text-sanctuary-950 text-caption uppercase tracking-wider font-bold transition-all shadow-lg active:scale-95 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                      <span>Watch Full Ministration</span>
                    </a>
                  </div>
                </div>
              </Reveal>

              {/* Staggered Tracklist Rows with Hover Slide + Gold Left Accent */}
              <div className="space-y-3">
                <p className="text-eyebrow uppercase tracking-[0.2em] text-white/55 font-mono mb-3">
                  Recent Sanctuary Ministrations
                </p>

                <Stagger className="space-y-2.5">
                  {tracklistSermons.map((sermon, idx) => (
                    <StaggerItem key={idx}>
                      <a
                        href={sermon.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackEvent('conversion', 'sermon_series_click', sermon.title)}
                        className="relative overflow-hidden p-4 sm:p-5 rounded-2xl bg-sanctuary-900/75 hover:bg-sanctuary-900 border border-white/10 hover:border-gold-400/40 hover:translate-x-1 transition-all duration-300 flex items-center justify-between gap-4 group cursor-pointer"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-2 bottom-2 w-1 rounded-full bg-gold-400 opacity-0 group-hover:opacity-100 transition-opacity"
                        />

                        <div className="space-y-0.5 pl-1">
                          <div className="flex items-center gap-2 text-eyebrow text-gold-400 font-mono">
                            <span className="uppercase">{sermon.date}</span>
                            <span>•</span>
                            <span className="text-white/60">{sermon.scripture}</span>
                          </div>
                          <p className="font-serif text-lg sm:text-xl text-white group-hover:text-gold-400 transition-colors font-semibold">
                            {sermon.title}
                          </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-caption text-white/55 font-mono hidden sm:inline">
                            {sermon.duration}
                          </span>
                          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-gold-400 group-hover:text-sanctuary-950 transition-all">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </div>
                        </div>
                      </a>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>
            </div>

            {/* Right Column (5 Cols): The Inner Court Prayer Altar */}
            <Reveal
              delay={0.12}
              className="lg:col-span-5 bg-gradient-to-br from-sanctuary-850 to-sanctuary-900 rounded-3xl p-7 sm:p-9 border border-gold-400/30 flex flex-col justify-between space-y-8 shadow-2xl relative overflow-hidden"
            >
              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-400/15 border border-gold-400/30 text-gold-400 text-eyebrow font-bold uppercase tracking-widest font-sans">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Intercessory Altar</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-white font-bold">
                  Place Your Petition Before the King
                </h3>

                <p className="text-white/80 text-body leading-relaxed">
                  &ldquo;The Lord hear thee in the day of trouble; the name of the God of Jacob defend thee; send thee help from the sanctuary, and strengthen thee out of Zion.&rdquo;
                </p>
                <p className="text-caption font-serif italic text-gold-400">
                  — Psalm 20:1-2
                </p>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <p className="text-eyebrow font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                    <span>Confidential Pastoral Covering</span>
                  </p>
                  <p className="text-caption leading-relaxed text-white/75">
                    Every request submitted to this altar is prayed over by General Overseer Rev. Nicholas Dobeng and our intercessors. We will never disclose your details.
                  </p>
                </div>
              </div>

              {/* Action CTA */}
              <div className="pt-4 border-t border-white/10 space-y-3 relative z-10">
                <m.button
                  type="button"
                  whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                  transition={SPRING_TACTILE}
                  onClick={() => {
                    trackEvent('conversion', 'prayer_modal_opened', 'Media Hub Altar');
                    onOpenPrayerModal?.();
                  }}
                  className="w-full min-h-[48px] py-4 px-6 rounded-full bg-gold-400 hover:bg-white text-sanctuary-950 font-bold text-caption uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <HeartHandshake className="w-4 h-4 fill-current" />
                  <span>Submit Confidential Prayer Petition</span>
                </m.button>

                <p className="text-caption text-center text-white/65">
                  Immediate prayer emergency?{' '}
                  <a
                    href={toTelUrl(churchInfo.contact.phone)}
                    onClick={() => trackEvent('conversion', 'call_hotline', 'Media Hub Altar')}
                    className="inline-flex items-center gap-1.5 text-gold-400 hover:underline font-mono font-semibold tabular-nums"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    {toInternationalDisplay(churchInfo.contact.phone)}
                  </a>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaHub;
