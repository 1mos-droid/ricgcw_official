import { motion } from 'framer-motion';
import { Quote, Sparkles, Heart, CheckCircle2, Phone, Mail, ArrowRight } from 'lucide-react';
import { CHURCH_INFO, LEADERSHIP, IMAGES } from '../data/churchData';

interface WelcomeOverseerProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: () => void;
}

export const WelcomeOverseer = ({ onOpenPrayerModal, onOpenBranchModal }: WelcomeOverseerProps) => {
  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 md:px-8 bg-slate-950 border-t border-b border-amber-500/15 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Section Header Tag */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5" /> Apostolic Welcome & Shepherding
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight"
          >
            Welcome to the Inner Court of the King.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto"
          >
            "We don't just build church buildings; we build people who build the kingdom of God across every sphere of life."
          </motion.p>
        </div>

        {/* Overseer Feature Card */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Photos Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md">
              {/* Primary Overseer Image Card */}
              <div className="rounded-[36px] overflow-hidden p-3 bg-gradient-to-br from-amber-500/30 via-slate-800 to-slate-900 border border-amber-500/30 shadow-2xl shadow-black/80">
                <div className="aspect-[4/5] rounded-[28px] overflow-hidden relative">
                  <img
                    src={IMAGES.overseer}
                    alt="Overseer Rev. Nicholas Dobeng"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs font-bold uppercase tracking-widest text-amber-300">General Overseer & Founder</p>
                    <h3 className="text-2xl font-bold font-serif text-white">Rev. Nicholas Dobeng</h3>
                  </div>
                </div>
              </div>

              {/* Overlapping Secondary Card: Pastor & Wife */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute -bottom-8 -right-6 w-48 sm:w-56 p-2.5 rounded-3xl bg-slate-900/90 border border-amber-500/40 shadow-2xl backdrop-blur-xl hidden sm:block"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-2">
                  <img
                    src={IMAGES.couple2}
                    alt="Rev. & Mrs. Dobeng"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-400">First Family of RICGCW</p>
                <p className="text-xs font-bold text-white">Rev. & Mrs. Dobeng</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Overseer Address / Bio Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Quote className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                    A Prophetic Mandate for Our Generation
                  </h3>
                  <p className="text-xs text-amber-400 font-medium uppercase tracking-wider">From the General Overseer's Desk</p>
                </div>
              </div>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-light">
                <p>
                  Beloved in Christ, you are heartily welcome to <strong>Rhema Inner Court Gospel Church (Worldwide)</strong>. God has uniquely positioned this ministry to be an altar of sacred encounter where ordinary men and women are transformed into royal champions of faith.
                </p>
                <p>
                  As recorded in <em>Esther 5:1</em>, when Queen Esther stepped into the inner court of the King, she obtained royal favor that altered the destiny of an entire nation. In this house, we believe in the absolute reality of God's spoken word (Rhema), the unquenchable fire of the Holy Spirit, and the power of sacrificial praise.
                </p>
                <p>
                  Whether you are seeking salvation, deeper discipleship, physical or emotional healing, marital restoration, or financial breakthrough — there is an open heaven waiting for you in any of our sanctuaries in <strong>Mallam, Kokrobitey, and Langma</strong>.
                </p>
              </div>
            </div>

            {/* Core Commitments List */}
            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {[
                'Uncompromised Biblical Gospel Preaching',
                'Prophetic Deliverance & Breakthrough Altars',
                'Warm Community & Loving Fellowship',
                'Comprehensive Care for Spiritual & Physical Needs',
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            {/* Pastoral Signature & CTAs */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="font-serif font-bold text-lg text-white">Rev. Nicholas Dobeng</p>
                <p className="text-xs text-amber-400 font-medium">General Overseer & Spiritual Father, RICGCW</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenPrayerModal}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <Heart className="w-4 h-4" /> Request Prayer
                </button>
                <button
                  onClick={onOpenBranchModal}
                  className="px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Visit a Branch</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Pastoral Council Showcase */}
        <div className="pt-12 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400">United in Purpose</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">The Pastoral Council & Leadership</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Our consecrated pastoral team and executive ministers serving the flock across all regional assemblies.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {LEADERSHIP.map((leader, i) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-3xl bg-slate-900/80 border border-white/10 hover:border-amber-500/30 p-5 space-y-4 shadow-xl transition-all group"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-950 relative">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      {leader.role}
                    </span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold font-serif text-lg text-white group-hover:text-amber-300 transition-colors">{leader.name}</h4>
                  <p className="text-xs text-amber-400/90 font-medium">{leader.title}</p>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">{leader.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
