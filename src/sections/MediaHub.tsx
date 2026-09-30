import { Radio, Play, ExternalLink, Video, Sparkles, BookOpen, Volume2 } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { YoutubeIcon } from '../components/Icons';
import { trackEvent } from '../utils/analytics';

export const MediaHub = () => {
  const { churchInfo, branches } = useChurch();
  const mainBranch = branches.find((b) => b.isHeadquarters) || branches[0];

  const featuredMessages = [
    {
      title: '2026 Divine Manifestation Mandate',
      speaker: churchInfo.founder?.name || 'Rev. Nicholas Dobeng',
      theme: 'Year Theme Declaration',
      description: 'The prophetic blueprint and covenant positioning for total supernatural breakthrough and taking territories.',
      link: churchInfo.contact.youtube,
    },
    {
      title: 'Consecration & Apostolic Order',
      speaker: 'Rev. Nicholas Dobeng',
      theme: 'Liturgy & Consecration',
      description: 'Understanding divine appointment, spiritual mantle, and the order of the priesthood in the local church.',
      link: churchInfo.contact.youtube,
    },
    {
      title: 'Walking in Supernatural Authority',
      speaker: 'Rev. Nicholas Dobeng',
      theme: 'Sunday Worship Ministration',
      description: 'Demolishing spiritual barriers and walking as kings and priests in accordance with Revelation 5:10.',
      link: churchInfo.contact.youtube,
    },
  ];

  return (
    <section id="media" className="relative py-24 px-4 sm:px-6 md:px-8 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-widest">
            <Video className="w-3.5 h-3.5 text-amber-700" /> Broadcasts &amp; Apostolic Ministration
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-950 tracking-tight">
            Media Hub &amp; Digital Sanctuary
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Access anointed teachings, Sunday worship replays, and prophetic declarations from General Overseer Rev. Nicholas Dobeng wherever you are.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Official Broadcast & YouTube Stream */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            
            {/* Live Streaming Sanctuary Card */}
            <div className="p-8 rounded-3xl bg-slate-950 text-white shadow-xl relative overflow-hidden space-y-6 border border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-400 rounded-md border border-red-500/30">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Official Broadcast Channel</span>
                </div>
                <span className="text-xs text-amber-300 font-mono font-bold">Inner Court Worldwide</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                  Live Service &amp; Sermon Replays
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Join our weekly Sunday services and special conventions live streamed directly from {mainBranch?.name || churchInfo.name}. Full video recordings, altar calls, and worship moments are archived on our verified YouTube channel.
                </p>
              </div>

              {/* Action Callout */}
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
                    <YoutubeIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">RICGCW YouTube Channel</p>
                    <p className="text-[11px] text-slate-400">@innercourtgospelchurchworl2293</p>
                  </div>
                </div>

                <a
                  href={churchInfo.contact.youtube}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('conversion', 'watch_sermon', 'Media Hub Primary')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Watch Stream Live</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
                </a>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 border-t border-white/10">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" /> Every Sunday from 09:00 GMT (Accra)
                </span>
                <a
                  href={churchInfo.contact.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="text-slate-300 hover:text-white hover:underline flex items-center gap-1 font-bold"
                >
                  <span>Browse All Sermons &amp; Playlists</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Curated Key Sermons Grid */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-600" />
                Key Apostolic Ministration Series
              </h4>
              <div className="grid gap-3">
                {featuredMessages.map((msg, idx) => (
                  <a
                    key={idx}
                    href={msg.link}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('conversion', 'sermon_series_click', msg.title)}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-amber-400 hover:bg-amber-50/30 transition-all flex items-center justify-between gap-4 group cursor-pointer"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 px-2 py-0.5 rounded bg-amber-500/10">
                          {msg.theme}
                        </span>
                        <span className="text-xs text-slate-500">• {msg.speaker}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-950 group-hover:text-amber-800 transition-colors">
                        {msg.title}
                      </p>
                      <p className="text-xs text-slate-600 line-clamp-1">{msg.description}</p>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 group-hover:bg-amber-500 group-hover:text-slate-950 group-hover:border-amber-500 flex items-center justify-center text-slate-600 transition-all shrink-0">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Connect & Social Channels */}
          <div className="lg:col-span-5">
            <div className="h-full p-8 rounded-3xl bg-slate-950 text-white border border-slate-800 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                  <Volume2 className="w-5 h-5 text-amber-400" />
                  <h3 className="font-serif font-bold text-lg text-white">Broadcast Channels</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Subscribe and follow RICGCW across all platforms to stay spiritually refreshed with live declarations, service reminders, and ministry updates.
                </p>

                <div className="space-y-3 pt-2">
                  <a
                    href={churchInfo.contact.youtube}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('conversion', 'social_click', 'YouTube')}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                  >
                    <YoutubeIcon className="w-5 h-5 text-red-400 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white">YouTube</p>
                      <p className="text-[10px] text-slate-400">Live services &amp; sermon archives</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 ml-auto shrink-0" />
                  </a>

                  <a
                    href={churchInfo.contact.facebook}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('conversion', 'social_click', 'Facebook')}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                  >
                    <div className="w-5 h-5 text-blue-400 font-black text-sm flex items-center justify-center shrink-0">f</div>
                    <div>
                      <p className="text-xs font-bold text-white">Facebook</p>
                      <p className="text-[10px] text-slate-400">Live streams &amp; fellowship notices</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 ml-auto shrink-0" />
                  </a>

                  <a
                    href={churchInfo.contact.instagram}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('conversion', 'social_click', 'Instagram')}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
                  >
                    <div className="w-5 h-5 text-pink-400 font-black text-sm flex items-center justify-center shrink-0">ig</div>
                    <div>
                      <p className="text-xs font-bold text-white">Instagram</p>
                      <p className="text-[10px] text-slate-400">Touching lives ministry moments</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 ml-auto shrink-0" />
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-1 text-center">
                <p className="text-xs font-bold text-amber-300">
                  {churchInfo.name}
                </p>
                <p className="text-[11px] text-slate-400">
                  Taking territories &amp; perfecting the saints worldwide
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
