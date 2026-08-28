import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Play, Volume2, VolumeX, Sparkles, Share2, Check, ExternalLink, Flame, Mic2 } from 'lucide-react';
import { CHURCH_INFO } from '../data/churchData';
import { YoutubeIcon } from '../components/Icons';

export const MediaHub = () => {
  const [isPlayingRadio, setIsPlayingRadio] = useState(false);
  const [copiedScripture, setCopiedScripture] = useState(false);

  const scriptureOfTheDay = {
    verse: "For I know the thoughts that I think toward you, says the Lord, thoughts of peace and not of evil, to give you a future and a hope.",
    reference: "Jeremiah 29:11",
    theme: "Divine Prosperity & Peace",
  };

  const handleShareScripture = () => {
    const text = `"${scriptureOfTheDay.verse}" — ${scriptureOfTheDay.reference} (Rhema Inner Court Gospel Church)`;
    if (navigator.share) {
      navigator.share({ title: 'Scripture of the Day', text });
    } else {
      navigator.clipboard.writeText(text);
      setCopiedScripture(true);
      setTimeout(() => setCopiedScripture(false), 2000);
    }
  };

  return (
    <section id="media" className="relative py-28 px-4 sm:px-6 md:px-8 bg-slate-950 border-b border-amber-500/15 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest">
            <Radio className="w-3.5 h-3.5" /> Broadcasts & Sermons
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight">
            Media Hub & Digital Sanctuary
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            Experience the unfiltered preaching of God's Word, high praise, and prophetic ministration from anywhere in the world.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Radio Broadcast Player & YouTube Channel */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            
            {/* Live Streaming Sanctuary Card */}
            <div className="p-8 rounded-[36px] bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-amber-500/30 shadow-2xl relative overflow-hidden space-y-6">
              
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
                  Non-stop apostolic sermons, soul-stirring worship, declarations, and live service broadcasts direct from the Mallam Sanctuary.
                </p>
              </div>

              {/* Player UI */}
              <div className="p-5 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <Mic2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Live Ministration Stream</p>
                    <p className="text-[10px] text-slate-400">Rev. Nicholas Dobeng — Word Feast</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsPlayingRadio(!isPlayingRadio)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  {isPlayingRadio ? <VolumeX className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
                  <span>{isPlayingRadio ? 'Pause Stream' : 'Tune In Live'}</span>
                </button>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-orange-400" /> Over 10,000 global listeners weekly
                </span>
                <a
                  href={CHURCH_INFO.contact.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-300 font-bold hover:underline flex items-center gap-1"
                >
                  Visit YouTube Channel <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* YouTube Direct Link Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/40 via-slate-900 to-slate-900 border border-red-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0">
                  <YoutubeIcon className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base">Watch Full Video Sermons</h4>
                  <p className="text-xs text-slate-400">Subscribe for Sunday live-streams, conferences, and testimonies</p>
                </div>
              </div>
              <a
                href={CHURCH_INFO.contact.youtube}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 shadow-lg shadow-red-600/20"
              >
                <span>Subscribe on YouTube</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Verse of the Day & Devotional */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-[36px] bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 shadow-2xl space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-400">
                  <Sparkles className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-widest">Daily Bread & Inspiration</span>
                </div>
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {scriptureOfTheDay.theme}
                </span>
              </div>

              <blockquote className="text-xl sm:text-2xl font-serif italic text-white leading-relaxed">
                "{scriptureOfTheDay.verse}"
              </blockquote>

              <p className="text-sm font-bold uppercase tracking-wider text-amber-400 font-mono">
                — {scriptureOfTheDay.reference}
              </p>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-xs text-slate-300 leading-relaxed">
                <strong className="text-white block mb-1">Today's Pastoral Word:</strong>
                Whatever difficulty you may face today, stand firm in the inner court of grace. The Lord has orchestrated a glorious manifestation of peace and favor in your life.
              </div>
            </div>

            <button
              onClick={handleShareScripture}
              className="w-full py-3.5 rounded-xl bg-white/10 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-white/10 cursor-pointer"
            >
              {copiedScripture ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedScripture ? 'Scripture Copied to Clipboard!' : 'Share Today’s Scripture'}</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default MediaHub;
