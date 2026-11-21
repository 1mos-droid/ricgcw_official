import React from 'react';
import { Play, ArrowUpRight, HeartHandshake, Sparkles, Phone } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { YoutubeIcon } from '../components/Icons';
import { trackEvent } from '../utils/analytics';
import { toTelUrl, toInternationalDisplay } from '../utils/phoneUtils';

interface MediaHubProps {
  onOpenPrayerModal?: () => void;
}

export const MediaHub: React.FC<MediaHubProps> = ({ onOpenPrayerModal }) => {
  const { churchInfo } = useChurch();

  const featuredSermon = {
    title: '2026 Divine Manifestation Mandate',
    preacher: churchInfo.founder?.name || 'Rev. Nicholas Dobeng',
    theme: 'Apostolic Declaration',
    description: 'The prophetic blueprint and covenant positioning for total supernatural breakthrough, perfection of the saints, and taking territories in 2026.',
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
    <section id="media" className="py-12 lg:py-16 px-4 sm:px-6 md:px-8 bg-transparent text-[#141619]">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#080B11]/95 backdrop-blur-xl text-[#FAF8F5] rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#E6E0D3]/20 ring-1 ring-[#DFC57B]/15 shadow-[0_24px_64px_-20px_rgba(8,11,17,0.42)] relative overflow-hidden space-y-8">
          {/* Background ambient lighting */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#B8860B]/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#DFC57B] font-semibold block mb-1 font-sans">
                The Living Word &amp; Prayer Altar
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-tight text-white">
                Immerse in the <span className="italic font-normal text-[#DFC57B]">Living Rhema</span>
              </h2>
            </div>
            <a
              href={churchInfo.contact.youtube}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('conversion', 'social_click', 'YouTube Channel')}
              className="self-start md:self-auto inline-flex items-center gap-2 text-xs text-[#DFC57B] hover:underline tracking-wide font-sans cursor-pointer"
            >
              <YoutubeIcon className="w-4 h-4 text-red-500" />
              <span>Official YouTube Archive</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Cinematic 12-Column Grid */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column (7 Cols): Featured Sermon & Vinyl Tracklist */}
            <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
              {/* Featured Message Theater Card */}
              <div className="bg-[#0F1420] rounded-2xl border border-white/10 overflow-hidden shadow-lg relative group">
                <div className="p-6 sm:p-8 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest font-sans">
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      Featured Broadcast
                    </div>
                    <span className="text-xs text-[#DFC57B] font-mono tracking-wider">
                      {featuredSermon.scripture}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-white leading-tight">
                    {featuredSermon.title}
                  </h3>

                  <p className="text-white/70 text-sm font-light leading-relaxed">
                    {featuredSermon.description}
                  </p>

                  <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                    <span className="text-xs text-white/50">
                      Apostolic Ministration • {featuredSermon.preacher}
                    </span>

                    <a
                      href={featuredSermon.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent('conversion', 'watch_sermon', featuredSermon.title)}
                      className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#DFC57B] hover:bg-white text-[#080B11] text-xs uppercase tracking-wider font-bold transition-all shadow-lg active:scale-95 cursor-pointer"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                      <span>Watch Full Ministration</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Vinyl Tracklist: Recent Messages (Clean Horizontal Rows) */}
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-white/40 font-mono mb-4">
                  Recent Sanctuary Ministrations
                </p>

                <div className="space-y-2">
                  {tracklistSermons.map((sermon, idx) => (
                    <a
                      key={idx}
                      href={sermon.link}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => trackEvent('conversion', 'sermon_series_click', sermon.title)}
                      className="p-4 sm:p-5 rounded-2xl bg-[#0F1420]/65 hover:bg-[#0F1420] border border-white/5 hover:border-[#DFC57B]/40 transition-all flex items-center justify-between gap-4 group cursor-pointer"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 text-xs text-[#DFC57B]">
                          <span className="font-mono text-[10px] uppercase">{sermon.date}</span>
                          <span>•</span>
                          <span className="font-mono text-[10px] text-white/50">{sermon.scripture}</span>
                        </div>
                        <p className="font-serif text-lg text-white group-hover:text-[#DFC57B] transition-colors">
                          {sermon.title}
                        </p>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-xs text-white/40 font-mono hidden sm:inline">{sermon.duration}</span>
                        <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#DFC57B] group-hover:text-[#080B11] transition-all">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (5 Cols): The Inner Court Prayer Altar */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#141B2A] to-[#0F1420] rounded-3xl p-8 sm:p-10 border border-[#DFC57B]/30 flex flex-col justify-between space-y-8 shadow-2xl relative overflow-hidden">
              <div className="space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFC57B]/15 border border-[#DFC57B]/30 text-[#DFC57B] text-[10px] font-bold uppercase tracking-widest font-sans">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>Intercessory Altar</span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-white">
                  Place Your Petition Before the King
                </h3>

                <p className="text-white/70 text-sm font-light leading-relaxed">
                  &ldquo;The Lord hear thee in the day of trouble; the name of the God of Jacob defend thee; send thee help from the sanctuary, and strengthen thee out of Zion.&rdquo;
                </p>
                <p className="text-xs font-serif italic text-[#DFC57B]">
                  — Psalm 20:1-2
                </p>

                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-white/80">
                  <p className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#DFC57B]" />
                    Confidential Pastoral Covering
                  </p>
                  <p className="font-light leading-relaxed text-white/70">
                    Every request submitted to this altar is prayed over by General Overseer Rev. Nicholas Dobeng and our intercessors. We will never disclose your details.
                  </p>
                </div>
              </div>

              {/* Action CTA */}
              <div className="pt-4 border-t border-white/10 space-y-3 relative z-10">
                <button
                  onClick={() => {
                    trackEvent('conversion', 'prayer_modal_opened', 'Media Hub Altar');
                    onOpenPrayerModal?.();
                  }}
                  className="w-full py-4 rounded-full bg-[#DFC57B] hover:bg-white text-[#080B11] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg active:scale-95 cursor-pointer"
                >
                  <HeartHandshake className="w-4 h-4 fill-current" />
                  <span>Submit Confidential Prayer Petition</span>
                </button>

                <p className="text-[11px] text-center text-white/55">
                  Immediate prayer emergency?{' '}
                  <a
                    href={toTelUrl(churchInfo.contact.phone)}
                    onClick={() => trackEvent('conversion', 'call_hotline', 'Media Hub Altar')}
                    className="inline-flex items-center gap-1 text-[#DFC57B] hover:underline font-mono font-semibold tabular-nums"
                  >
                    <Phone className="w-3 h-3" />
                    {toInternationalDisplay(churchInfo.contact.phone)}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaHub;
