import { motion } from 'framer-motion';
import { Play, Radio, Video, Sparkles, Share2 } from 'lucide-react';

const MediaHub = () => {
  return (
    <section id="media" className="py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* Live Sampler */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass-card rounded-[40px] p-10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-10">
              <div className="flex items-center gap-2 px-3 py-1 bg-ios-red/10 text-ios-red rounded-full border border-ios-red/20 animate-pulse">
                <div className="w-2 h-2 rounded-full bg-ios-red" />
                <span className="text-[10px] font-black uppercase tracking-widest">Live Now</span>
              </div>
            </div>

            <div className="relative z-10 space-y-6">
              <span className="ios-caption text-ios-blue">The Experience</span>
              <h2 className="ios-title">Join our Spiritual <br />Broadcast.</h2>
              <p className="ios-body text-ios-secondary-label max-w-md">
                Tuning into our global radio and YouTube ministrations from anywhere in the world. Experience the Word, the Power, and the Presence.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-6">
                <button className="h-14 px-8 bg-ios-blue text-white rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-ios-blue/20 active:scale-95 transition-all">
                  <Radio size={20} />
                  Listen to Radio
                </button>
                <button className="h-14 px-8 glass border-white/40 text-ios-label rounded-2xl font-black flex items-center gap-3 active:scale-95 transition-all">
                  <Video size={20} className="text-ios-red" />
                  Watch Latest
                </button>
              </div>
            </div>

            {/* Background Graphic */}
            <div className="absolute bottom-0 right-0 -mr-20 -mb-20 opacity-10 group-hover:opacity-20 transition-opacity duration-1000">
              <Radio size={400} strokeWidth={0.5} />
            </div>
          </motion.div>

          {/* Verse of the Day */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 glass-card rounded-[40px] p-10 flex flex-col justify-between bg-gradient-to-br from-ios-blue via-ios-blue to-indigo-600 border-none shadow-2xl shadow-ios-blue/20"
          >
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles size={20} className="text-white/60" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Daily Bread</span>
              </div>
              <p className="text-2xl font-black text-white leading-tight">
                "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you..."
              </p>
              <p className="text-white/80 font-black text-sm uppercase tracking-widest">— Jeremiah 29:11</p>
            </div>

            <button className="mt-8 w-full h-14 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
              <Share2 size={16} />
              Share Inspiration
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default MediaHub;
