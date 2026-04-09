import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import themeImg from '../assets/church/this_year_theme/IMG-20260408-WA0064.jpg';
import pastorsImg from '../assets/church/all_church_pastors/IMG-20260301-WA0187.jpg';
import pastorImg1 from '../assets/church/pastor/IMG-20260408-WA0061.jpg';
import pastorImg2 from '../assets/church/pastor/IMG-20260408-WA0062.jpg';
import coupleImg1 from '../assets/church/pastor_and_wife/IMG-20260408-WA0060.jpg';
import coupleImg2 from '../assets/church/pastor_and_wife/IMG-20260408-WA0063.jpg';

const images = [
  { src: themeImg, title: "Theme of the Year", subtitle: "Divine Manifestation" },
  { src: pastorsImg, title: "Our Pastors", subtitle: "Unified Leadership" },
  { src: pastorImg1, title: "Overseer", subtitle: "Rev. Nicholas Dobeng" },
  { src: coupleImg1, title: "Leadership", subtitle: "Rev. & Mrs. Dobeng" },
  { src: pastorImg2, title: "Ministry", subtitle: "A Heart for People" },
  { src: coupleImg2, title: "Family", subtitle: "Example in Love" }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden px-6">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-ios-blue/10 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-ios-red/5 rounded-full blur-[100px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8 shadow-sm border-white/40"
          >
            <Sparkles size={16} className="text-ios-blue" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ios-blue">Touching Lives Worldwide</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="ios-title md:text-[72px] mb-8"
          >
            Rhema Inner Court <br className="hidden md:block" /> 
            <span className="text-ios-blue">Gospel Church</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="ios-body text-xl md:text-2xl text-ios-secondary-label max-w-2xl mx-auto lg:mx-0 mb-12"
          >
            A community of believers dedicated to worship, transformation, and the global spread of the Gospel.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <button className="w-full md:w-auto h-16 px-10 bg-ios-blue text-white rounded-3xl font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-ios-blue/30 active:scale-95 transition-all">
              Join Our Service
              <ArrowRight size={20} />
            </button>
            <button className="w-full md:w-auto h-16 px-10 glass border-white/40 text-ios-label rounded-3xl font-black text-lg active:scale-95 transition-all">
              Learn More
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative w-full mt-12 lg:mt-0"
        >
          <div className="glass p-3 md:p-4 rounded-[32px] md:rounded-[40px] shadow-2xl border-white/40 lg:rotate-3 hover:rotate-0 transition-transform duration-700 h-[400px] md:h-[600px] w-full max-w-[450px] mx-auto overflow-hidden">
            <div className="relative h-full w-full rounded-[24px] md:rounded-[32px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex].src}
                  alt={images[currentIndex].title}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute -bottom-4 md:-bottom-6 -right-4 md:-right-6 glass px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl shadow-xl border-white/40"
              >
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-ios-blue mb-1">{images[currentIndex].title}</p>
                <p className="font-bold text-base md:text-lg">{images[currentIndex].subtitle}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

