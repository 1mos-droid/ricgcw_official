import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
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

      <div className="max-w-4xl mx-auto text-center">
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
          Inner Court <br className="hidden md:block" /> 
          <span className="text-ios-blue">Gospel Church</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="ios-body text-xl md:text-2xl text-ios-secondary-label max-w-2xl mx-auto mb-12"
        >
          A community of believers dedicated to worship, transformation, and the global spread of the Gospel.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
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
    </section>
  );
};

export default Hero;
