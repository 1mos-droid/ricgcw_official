import { useState } from 'react';
import { Radio, Play, VolumeX, ExternalLink, Mic2 } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { YoutubeIcon } from '../components/Icons';
import { trackEvent } from '../utils/analytics';

export const MediaHub = () => {
  const { churchInfo, branches } = useChurch();
  const [isPlayingRadio, setIsPlayingRadio] = useState(false);
  const mainBranch = branches.find((b) => b.isHeadquarters) || branches[0];

  return (
    <section id="media" className="relative py-24 px-4 sm:px-6 md:px-8 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-700 text-xs font-bold uppercase tracking-widest">
            <Radio className="w-3.5 h-3.5 text-red-600" /> Broadcasts &amp; Sermons
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-950 tracking-tight">
            Media Hub &amp; Digital Sanctuary
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Experience the unfiltered preaching of God's Word, high praise, and prophetic ministration from anywhere in the world.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Radio Broadcast Player & YouTube Channel */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            
            {/* Live Streaming Sanctuary Card */}
            <div className="p-8 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1 bg-red-500/20 text-red-400 rounded-full border border-red-500/30">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Live Broadcast</span>
                </div>
                <span className="text-xs text-amber-300 font-mono font-bold">24/7 Spiritual Audio</span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                  Inner Court Global Radio
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Non-stop apostolic sermons, soul-stirring worship, declarations, and live service broadcasts direct from {mainBranch?.name || churchInfo.name}.
                </p>
              </div>

              {/* Player UI */}
              <div className="p-5 rounded-2xl bg-black/60 border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Mic2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Live Ministration Stream</p>
                    <p className="text-[10px] text-slate-400">RICGCW — Apostolic Broadcast</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsPlayingRadio(!isPlayingRadio);
                    trackEvent('interaction', 'radio_toggle', isPlayingRadio ? 'pause' : 'play');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  {isPlayingRadio ? <VolumeX className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
                  <span>{isPlayingRadio ? 'Pause Stream' : 'Tune In Live'}</span>
                </button>
              </div>

              <div className="pt-2 flex items-center justify-end gap-4 text-xs text-slate-400">
                <a
                  href={churchInfo.contact.youtube}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('conversion', 'watch_sermon', 'Radio Banner')}
                  className="text-amber-400 hover:underline flex items-center gap-1 font-bold"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* YouTube Direct Archive Banner */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center">
                  <YoutubeIcon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-slate-950">RICGCW YouTube Channel</h4>
                  <p className="text-xs text-slate-600">Subscribe for weekly live services &amp; deliverance recordings</p>
                </div>
              </div>
              <a
                href={churchInfo.contact.youtube}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('conversion', 'watch_sermon', 'Media Hub Archive')}
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-2"
              >
                <span>Visit Channel</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Connect & Social Links */}
          <div className="lg:col-span-5">
            <div className="h-full p-8 rounded-3xl bg-slate-900 text-white border border-slate-700 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                  <Radio className="w-5 h-5 text-amber-400" />
                  <h3 className="font-serif font-bold text-lg text-white">Stay Connected</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Follow us on social media for live service alerts, prophetic updates, event announcements, and daily devotionals.
                </p>

                <div className="space-y-3 pt-2">
                  <a
                    href={churchInfo.contact.youtube}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('conversion', 'social_click', 'YouTube')}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  >
                    <YoutubeIcon className="w-5 h-5 text-red-400 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-white">YouTube</p>
                      <p className="text-[10px] text-slate-400">Live services &amp; sermon archive</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 ml-auto shrink-0" />
                  </a>

                  <a
                    href={churchInfo.contact.facebook}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('conversion', 'social_click', 'Facebook')}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  >
                    <div className="w-5 h-5 text-blue-400 font-black text-sm flex items-center justify-center shrink-0">f</div>
                    <div>
                      <p className="text-xs font-bold text-white">Facebook</p>
                      <p className="text-[10px] text-slate-400">Community updates &amp; events</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 ml-auto shrink-0" />
                  </a>

                  <a
                    href={churchInfo.contact.instagram}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackEvent('conversion', 'social_click', 'Instagram')}
                    className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
                  >
                    <div className="w-5 h-5 text-pink-400 font-black text-sm flex items-center justify-center shrink-0">ig</div>
                    <div>
                      <p className="text-xs font-bold text-white">Instagram</p>
                      <p className="text-[10px] text-slate-400">Touching lives moments &amp; reels</p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500 ml-auto shrink-0" />
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-[11px] text-slate-400 text-center">
                  {churchInfo.name}
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
