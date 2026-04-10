import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, X, Clock, MapPin } from 'lucide-react';
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

const branches = [
  {
    id: 'mallam',
    name: 'Mallam Branch',
    location: 'Mallam, Accra',
    services: [
      { day: 'Sunday', time: '9:00 AM - 12:00 PM', type: 'Main Service' },
      { day: 'Tuesday', time: '6:00 PM - 8:45 PM', type: 'Mid-week Service' },
      { day: 'Thursday', time: '6:00 PM - 9:00 PM', type: 'Prophetic Service' },
      { day: 'Saturday', time: '6:00 PM - 7:00 PM', type: 'Prayers' },
    ]
  },
  {
    id: 'kokrobitey',
    name: 'Kokrobitey Branch',
    location: 'Kokrobitey',
    services: [
      { day: 'Sunday', time: '7:00 AM - 9:00 AM', type: 'Morning Service' },
      { day: 'Wednesday', time: '6:30 PM - 8:30 PM', type: 'Mid-week Service' },
      { day: 'Friday', time: '7:00 PM - 9:00 PM', type: 'Prophetic Service' },
    ]
  },
  {
    id: 'langma',
    name: 'Langma Branch',
    location: 'Langma',
    services: [
      { day: 'Sunday', time: '8:30 AM - 11:00 AM', type: 'Main Service' },
      { day: 'Thursday', time: '6:30 PM - 8:30 PM', type: 'Mid-week Meeting' },
    ]
  }
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<typeof branches[0] | null>(null);

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
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-church-gold/15 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-church-lemon-green/10 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            y: [0, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-church-deep-orange/5 rounded-full blur-[140px]" 
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
            <span className="text-ios-blue">Gospel Church (Worldwide)</span>
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
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full md:w-auto h-16 px-10 bg-ios-blue text-white rounded-3xl font-black text-lg flex items-center justify-center gap-3 shadow-2xl shadow-ios-blue/30 active:scale-95 transition-all"
            >
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
          <div className="glass p-3 md:p-4 rounded-[32px] md:rounded-[40px] shadow-2xl border-white/40 lg:rotate-3 hover:rotate-0 transition-transform duration-700 h-[400px] md:h-[600px] w-full max-w-[600px] mx-auto overflow-hidden">
            <div className="relative h-full w-full rounded-[24px] md:rounded-[32px] overflow-hidden bg-black/5">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex].src}
                  alt={images[currentIndex].title}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-contain p-2"
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

      {/* Join Our Service Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsModalOpen(false);
                setSelectedBranch(null);
              }}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
            >
              <div className="p-8 border-b border-ios-separator/10 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
                <div>
                  <h2 className="text-2xl font-black text-ios-label">Choose a Branch</h2>
                  <p className="text-sm text-ios-secondary-label mt-1">Select a location to view worship times</p>
                </div>
                <button 
                  onClick={() => {
                    setIsModalOpen(false);
                    setSelectedBranch(null);
                  }}
                  className="w-10 h-10 rounded-full bg-ios-bg flex items-center justify-center text-ios-label hover:bg-ios-separator/20 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto">
                {!selectedBranch ? (
                  <div className="grid gap-4">
                    {branches.map((branch) => (
                      <button
                        key={branch.id}
                        onClick={() => setSelectedBranch(branch)}
                        className="group flex items-center justify-between p-6 bg-ios-bg rounded-3xl hover:bg-ios-blue transition-all duration-300 text-left"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-ios-blue shadow-sm group-hover:scale-110 transition-transform">
                            <MapPin size={24} />
                          </div>
                          <div>
                            <h3 className="font-black text-lg group-hover:text-white transition-colors">{branch.name}</h3>
                            <p className="text-sm text-ios-secondary-label group-hover:text-white/70 transition-colors">{branch.location}</p>
                          </div>
                        </div>
                        <ArrowRight size={20} className="text-ios-blue group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <button 
                      onClick={() => setSelectedBranch(null)}
                      className="text-ios-blue font-bold text-sm flex items-center gap-1 hover:underline mb-4"
                    >
                      ← Back to branches
                    </button>
                    
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 rounded-2xl bg-ios-blue/10 flex items-center justify-center text-ios-blue">
                        <MapPin size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-ios-label">{selectedBranch.name}</h3>
                        <p className="text-ios-secondary-label">{selectedBranch.location}</p>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {selectedBranch.services.map((service, i) => (
                        <div 
                          key={i}
                          className="flex items-center justify-between p-6 bg-ios-bg rounded-3xl border border-transparent hover:border-ios-blue/20 transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-ios-blue shadow-sm">
                              <Clock size={20} />
                            </div>
                            <div>
                              <p className="font-black text-ios-label">{service.day}</p>
                              <p className="text-xs text-ios-secondary-label font-bold uppercase tracking-widest">{service.type}</p>
                            </div>
                          </div>
                          <p className="font-bold text-ios-blue bg-ios-blue/10 px-4 py-2 rounded-xl">{service.time}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="p-8 bg-ios-bg/50 border-t border-ios-separator/10 mt-auto">
                <p className="text-center text-sm text-ios-secondary-label">
                  We look forward to worshiping with you!
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;

