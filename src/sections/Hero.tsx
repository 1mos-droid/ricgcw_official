import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin, Play, Clock, ChevronRight, Heart, Users, Shield, BookOpen } from 'lucide-react';
import { CHURCH_INFO, BRANCHES, IMAGES } from '../data/churchData';

interface HeroProps {
  onOpenBranchModal?: () => void;
  onOpenGivingModal?: () => void;
  onOpenPrayerModal?: () => void;
}

const slides = [
  {
    image: IMAGES.theme,
    tag: '2026 Theme of the Year',
    title: 'Divine Manifestation',
    subtitle: 'Touching Lives Worldwide & Experiencing the Tangible Power of God',
    caption: 'Esther 5:1 & Ephesians 4:12',
  },
  {
    image: IMAGES.overseer,
    tag: 'Apostolic Leadership',
    title: 'Rev. Nicholas Dobeng',
    subtitle: 'General Overseer & Founder leading with prophetic vision and pastoral care',
    caption: 'A heart for people, a mandate for nations',
  },
  {
    image: IMAGES.pastors,
    tag: 'Pastoral Council',
    title: 'Unified Shepherds',
    subtitle: 'Dedicated pastors and ministers across Mallam, Kokrobitey, and Langma branches',
    caption: 'Perfecting the saints for the work of ministry',
  },
  {
    image: IMAGES.couple1,
    tag: 'Family & Foundation',
    title: 'Rev. & Mrs. Dobeng',
    subtitle: 'Leading by example in love, righteousness, and spiritual mentorship',
    caption: 'Inner court – where sacrifices made to heaven',
  },
];

export const Hero = ({ onOpenBranchModal, onOpenGivingModal, onOpenPrayerModal }: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSundayCountdown, setNextSundayCountdown] = useState({ days: 0, hours: 0, mins: 0 });

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Compute countdown to next Sunday 9:00 AM
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const nextSunday = new Date();
      const dayOfWeek = now.getDay();
      const daysUntilSunday = (7 - dayOfWeek) % 7 || 7;
      
      nextSunday.setDate(now.getDate() + daysUntilSunday);
      nextSunday.setHours(9, 0, 0, 0);

      const diff = nextSunday.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        setNextSundayCountdown({ days, hours, mins });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 md:px-8 overflow-hidden bg-[#070c18]">
      {/* Background Animated Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.15, 0.25, 0.15],
            x: [0, 40, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[650px] h-[650px] bg-amber-500/20 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.2, 0.1],
            y: [0, 60, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-32 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[160px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-32 left-1/3 w-[550px] h-[550px] bg-orange-600/15 rounded-full blur-[150px]"
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative max-w-7xl mx-auto w-full z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Vision, Titles & CTAs */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Top Badge: 2026 Theme & Next Service */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest shadow-lg shadow-amber-500/5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>2026: Divine Manifestation</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-medium"
              >
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Next Sunday Service in: <strong className="text-amber-300 font-mono">{nextSundayCountdown.days}d {nextSundayCountdown.hours}h {nextSundayCountdown.mins}m</strong></span>
              </motion.div>
            </div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-serif tracking-tight text-white leading-[1.08]">
                Where The Impossibility <br />
                <span className="text-gold-gradient font-serif italic">Becomes Possible.</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed">
                Welcome to <strong className="text-white font-medium">Rhema Inner Court Gospel Church (Worldwide)</strong>. A sanctuary of spiritual transformation, fervent prayer, apostolic truth, and global impact.
              </p>
            </motion.div>

            {/* Scripture Motto Strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-2xl mx-auto lg:mx-0"
            >
              {CHURCH_INFO.motto.map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 text-left">
                  <p className="text-xs font-bold text-amber-300">{item.title}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-mono mt-0.5">{item.scripture}</p>
                </div>
              ))}
            </motion.div>

            {/* Main Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={onOpenBranchModal}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-2xl shadow-amber-500/25 flex items-center justify-center gap-3 active:scale-95 transition-all cursor-pointer"
              >
                <MapPin className="w-5 h-5" />
                <span>Join Our Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={CHURCH_INFO.contact.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm uppercase tracking-wider border border-white/10 hover:border-amber-500/30 flex items-center justify-center gap-3 transition-all cursor-pointer"
              >
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Watch Online</span>
              </a>

              <button
                onClick={onOpenGivingModal}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Heart className="w-4 h-4" />
                <span>Giving</span>
              </button>
            </motion.div>

            {/* Quick Branch Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-slate-400"
            >
              <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">Gathering Locations:</span>
              {BRANCHES.map((b) => (
                <button
                  key={b.id}
                  onClick={onOpenBranchModal}
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-amber-500/15 text-slate-300 hover:text-amber-300 border border-white/5 transition-all text-xs flex items-center gap-1 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  {b.name.split('(')[0].trim()}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Hero Visual Showcase Slider */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative mx-auto max-w-md lg:max-w-none"
            >
              {/* Glass Frame Card */}
              <div className="relative rounded-[36px] p-3 md:p-4 bg-gradient-to-b from-white/10 via-white/5 to-transparent border border-amber-500/30 shadow-2xl shadow-black/80 backdrop-blur-2xl">
                
                {/* Image Viewport */}
                <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-slate-950">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentSlide}
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].title}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.8, ease: 'easeInOut' }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                  {/* Floating Caption on Image */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2 z-10">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.4 }}
                        className="space-y-1.5"
                      >
                        <span className="inline-block px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-widest shadow-md">
                          {slides[currentSlide].tag}
                        </span>
                        <h3 className="text-xl md:text-2xl font-bold font-serif text-white leading-tight">
                          {slides[currentSlide].title}
                        </h3>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {slides[currentSlide].subtitle}
                        </p>
                        <p className="text-[10px] text-amber-300/80 font-mono pt-1">
                          {slides[currentSlide].caption}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Slider Thumbnails / Pagination Dots */}
                <div className="flex items-center justify-between px-3 pt-4">
                  <div className="flex items-center gap-2">
                    {slides.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          currentSlide === idx
                            ? 'w-8 bg-amber-400 shadow-md shadow-amber-400/50'
                            : 'w-2 bg-white/20 hover:bg-white/40'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <span className="text-[11px] font-mono font-bold text-amber-400">
                    0{currentSlide + 1} / 0{slides.length}
                  </span>
                </div>
              </div>

              {/* Floating Floating Stat Badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute -bottom-6 -left-6 bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-xl hidden sm:flex items-center gap-3.5 z-20"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-lg font-black text-white font-mono">3 Branches</p>
                  <p className="text-[10px] text-amber-300/80 uppercase font-bold tracking-wider">Accra, Ghana & Beyond</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -top-6 -right-6 bg-slate-900/90 border border-amber-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-xl hidden sm:flex items-center gap-3.5 z-20"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-lg font-black text-white font-mono">100%</p>
                  <p className="text-[10px] text-emerald-300/80 uppercase font-bold tracking-wider">Bible Believing Church</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
