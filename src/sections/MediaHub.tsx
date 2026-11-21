import React, { useState } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Play, ArrowUpRight, HeartHandshake, Phone, X } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { PICTURES, IMAGE_DIMENSIONS } from '../data/churchData';
import { YoutubeIcon } from '../components/Icons';
import { trackEvent } from '../utils/analytics';
import { toTelUrl, toInternationalDisplay } from '../utils/phoneUtils';
import { SPRING_TACTILE, Reveal, Stagger, StaggerItem, DrawRule } from '../components/motion';
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
    scripture: 'Esther 5:1 · Isaiah 60:1-3',
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
      scripture: 'Joshua 1:3 · Luke 1:37',
      duration: '1 hr 25m',
      link: churchInfo.contact.youtube,
    },
  ];

  return (
    <section
      id="media"
      className="relative obsidian-theater-bg text-sanctuary-alabaster py-20 lg:py-28 px-4 sm:px-6 lg:px-10 overflow-x-clip"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <SectionHeader
          variant="dark"
          index="05"
          eyebrow="The Living Word & Prayer Altar"
          title="Immerse in the"
          accent="Living Rhema"
          rightSlot={
            <a
              href={churchInfo.contact.youtube}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('conversion', 'social_click', 'YouTube Channel')}
              className="min-h-[44px] inline-flex items-center gap-2.5 text-caption text-gold-400 hover:text-gold-300 font-mono uppercase tracking-[0.14em] transition-colors cursor-pointer"
            >
              <YoutubeIcon className="w-4 h-4 text-red-500" />
              <span>Official YouTube Archive</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          }
        />

        {/* Cinema Split: Left 7 Cols Broadcast Frame, Right 5 Cols Archive Tracklist & Intercessory Altar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 7 Cols: Featured Broadcast Stage */}
          <div className="lg:col-span-7 space-y-6">
            <Reveal className="border border-white/15 bg-obsidian-elevated overflow-hidden">
              <div className="relative aspect-[16/9] bg-obsidian-warm overflow-hidden">
                <AnimatePresence mode="wait">
                  {isPlayerActive ? (
                    <m.div
                      key="player-active"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8 bg-sanctuary-950"
                    >
                      {featuredVideoId ? (
                        <iframe
                          title={featuredSermon.title}
                          src={`https://www.youtube-nocookie.com/embed/${featuredVideoId}?autoplay=1&rel=0`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full border-0"
                        />
                      ) : (
                        <>
                          <div className="flex items-center justify-between gap-3 border-b border-white/12 pb-3">
                            <span className="text-eyebrow font-mono uppercase tracking-[0.2em] text-gold-400">
                              Sanctuary Broadcast Ready
                            </span>
                            <button
                              type="button"
                              onClick={() => setIsPlayerActive(false)}
                              aria-label="Close sermon preview"
                              className="min-w-[44px] min-h-[44px] border border-white/15 hover:border-gold-400 text-sanctuary-alabaster flex items-center justify-center cursor-pointer transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="space-y-2 text-center max-w-md mx-auto">
                            <p className="font-serif text-3xl sm:text-4xl text-sanctuary-alabaster">
                              {featuredSermon.title}
                            </p>
                            <p className="text-caption text-sanctuary-alabaster/75">
                              Open the official YouTube sanctuary archive to watch full services and prophetic ministrations.
                            </p>
                          </div>

                          <div className="flex justify-center">
                            <a
                              href={featuredSermon.link}
                              target="_blank"
                              rel="noreferrer"
                              onClick={() => trackEvent('conversion', 'watch_sermon', featuredSermon.title)}
                              className="min-h-[44px] inline-flex items-center gap-2.5 px-6 py-2.5 rounded-sm bg-gold-500 hover:bg-gold-400 text-sanctuary-950 text-caption font-semibold uppercase tracking-[0.14em] transition-colors"
                            >
                              <YoutubeIcon className="w-4 h-4 text-red-700" />
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
                        alt="Ministerial team and congregation of Rhema Inner Court Gospel Church"
                        width={IMAGE_DIMENSIONS.pastors.width}
                        height={IMAGE_DIMENSIONS.pastors.height}
                        priority
                        sizes="(min-width: 1024px) 52vw, 100vw"
                        pictureClassName="w-full h-full block"
                        className="w-full h-full object-cover object-[50%_24%] group-hover:scale-103 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-warm via-obsidian-warm/30 to-transparent" />

                      {/* Clean Centered Brass Play Ring */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          type="button"
                          aria-label="Play featured broadcast preview"
                          onClick={(e) => {
                            e.stopPropagation();
                            trackEvent('conversion', 'watch_sermon', featuredSermon.title);
                            setIsPlayerActive(true);
                          }}
                          className="relative w-20 h-20 rounded-full flex items-center justify-center cursor-pointer"
                        >
                          {!prefersReduced && (
                            <span
                              aria-hidden="true"
                              className="animate-ping absolute inset-1 rounded-full bg-gold-400/35"
                            />
                          )}
                          <span className="relative z-10 w-16 h-16 rounded-full border border-gold-400/70 bg-obsidian-warm/75 group-hover:bg-gold-500 text-gold-400 group-hover:text-sanctuary-950 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-105">
                            <Play className="w-6 h-6 fill-current ml-0.5" />
                          </span>
                        </button>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Clean Below-Stage Broadcast Ledger */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-eyebrow font-mono uppercase tracking-[0.18em] text-gold-400">
                  <span>Featured Broadcast</span>
                  <span>{featuredSermon.scripture}</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-sanctuary-alabaster font-normal">
                  {featuredSermon.title}
                </h3>

                <p className="text-sanctuary-alabaster/75 text-body leading-relaxed max-w-prose">
                  {featuredSermon.description}
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/12">
                  <span className="text-caption text-sanctuary-alabaster/65 font-mono">
                    Apostolic Ministration · {featuredSermon.preacher}
                  </span>

                  <a
                    href={featuredSermon.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('conversion', 'watch_sermon', featuredSermon.title)}
                    className="min-h-[44px] inline-flex items-center gap-2.5 px-6 py-2.5 rounded-sm bg-gold-500 hover:bg-gold-400 text-sanctuary-950 text-caption uppercase tracking-[0.14em] font-semibold transition-colors cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Watch Full Ministration</span>
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right 5 Cols: Sermon Archive Tracklist + Confidential Prayer Altar */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <p className="text-eyebrow uppercase tracking-[0.22em] text-gold-400 font-mono">
                Recent Sanctuary Ministrations
              </p>

              <Stagger className="border-t border-white/12 divide-y divide-white/10">
                {tracklistSermons.map((sermon, idx) => (
                  <StaggerItem key={idx}>
                    <a
                      href={sermon.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent('conversion', 'sermon_series_click', sermon.title)}
                      className="relative py-5 px-2 -mx-2 hover:px-4 hover:bg-white/[0.04] transition-all duration-300 flex items-center justify-between gap-4 group cursor-pointer"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute left-0 top-3 bottom-3 w-[2px] bg-gold-400 opacity-0 group-hover:opacity-100 transition-opacity"
                      />

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-[11px] font-mono text-gold-400/90">
                          <span className="uppercase tracking-wider">{sermon.date}</span>
                          <span className="text-white/30">·</span>
                          <span className="text-sanctuary-alabaster/60">{sermon.scripture}</span>
                        </div>
                        <p className="font-serif text-xl sm:text-2xl text-sanctuary-alabaster group-hover:text-gold-400 transition-colors">
                          {sermon.title}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-eyebrow text-sanctuary-alabaster/55 font-mono hidden sm:inline">
                          {sermon.duration}
                        </span>
                        <span className="w-9 h-9 rounded-full border border-white/15 group-hover:border-gold-400 group-hover:bg-gold-500 group-hover:text-sanctuary-950 flex items-center justify-center transition-colors">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </span>
                      </div>
                    </a>
                  </StaggerItem>
                ))}
              </Stagger>
              <DrawRule variant="dark" />
            </div>

            {/* Sharp Architectural Intercessory Altar */}
            <Reveal
              delay={0.1}
              className="border border-flame-400/35 bg-sanctuary-950 p-7 sm:p-8 space-y-6"
            >
              <div className="space-y-3">
                <p className="text-eyebrow font-mono uppercase tracking-[0.22em] text-flame-400 flex items-center gap-2">
                  <HeartHandshake className="w-4 h-4" />
                  <span>Intercessory Altar · Confidential</span>
                </p>

                <h3 className="font-serif text-3xl text-sanctuary-alabaster font-normal leading-tight">
                  Place Your Petition Before the King
                </h3>

                <blockquote className="text-body text-sanctuary-alabaster/75 italic font-serif text-xl leading-relaxed border-l-2 border-gold-400/50 pl-4">
                  &ldquo;Send thee help from the sanctuary, and strengthen thee out of Zion.&rdquo;
                  <footer className="not-italic font-mono text-[11px] uppercase tracking-[0.18em] text-gold-400 mt-1">
                    Psalm 20:1-2
                  </footer>
                </blockquote>

                <p className="text-caption text-sanctuary-alabaster/70 leading-relaxed">
                  Every prayer request is upheld directly by General Overseer Rev. Nicholas Dobeng and our consecrated intercessors.
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/12">
                <m.button
                  type="button"
                  whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                  transition={SPRING_TACTILE}
                  onClick={() => {
                    trackEvent('conversion', 'prayer_modal_opened', 'Media Hub Altar');
                    onOpenPrayerModal?.();
                  }}
                  className="w-full min-h-[48px] py-3.5 px-6 rounded-sm bg-gold-500 hover:bg-gold-400 text-sanctuary-950 font-semibold text-caption uppercase tracking-[0.16em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <HeartHandshake className="w-4 h-4 fill-current" />
                  <span>Submit Confidential Prayer Petition</span>
                </m.button>

                <p className="text-caption text-center text-sanctuary-alabaster/70">
                  Immediate pastoral emergency?{' '}
                  <a
                    href={toTelUrl(churchInfo.contact.phone)}
                    onClick={() => trackEvent('conversion', 'call_hotline', 'Media Hub Altar')}
                    className="inline-flex items-center gap-1 text-gold-400 hover:underline font-mono font-semibold tabular-nums"
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
