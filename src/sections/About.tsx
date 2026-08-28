import { motion } from 'framer-motion';
import { Heart, Globe2, ShieldCheck, Sparkles, Star, Target, Quote, Gavel, BookOpen } from 'lucide-react';
import { CHURCH_INFO, IMAGES } from '../data/churchData';

export const About = () => {
  const coreValues = [
    {
      icon: Heart,
      title: 'Passionate Worship',
      desc: 'Passionate and authentic praise that ushers believers directly into the tangible glory of God’s inner court.',
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    },
    {
      icon: Globe2,
      title: 'Global Evangelism',
      desc: 'Reaching the unreached, planting vibrant churches, and carrying the Gospel to the ends of the earth.',
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
    },
    {
      icon: ShieldCheck,
      title: 'Biblical Integrity',
      desc: 'Living a consecrated life of godly character, marital faithfulness, and uncompromised Christian ethics.',
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      icon: Target,
      title: 'Taking Territories',
      desc: 'Empowering saints to dominate in their careers, businesses, leadership, and kingdom assignments.',
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    },
  ];

  return (
    <section className="relative py-28 px-4 sm:px-6 md:px-8 bg-[#070c18] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Top Story / Identity Section */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Block */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
                <BookOpen className="w-3.5 h-3.5" /> Our Divine Foundation
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight leading-tight">
                Rooted in Scripture. <br />
                <span className="text-gold-gradient font-serif italic">Empowered by the Spoken Word.</span>
              </h2>
            </div>

            {/* Scriptural Anchor Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                <Star className="w-4 h-4 text-amber-400" /> Scriptural Anchor
              </div>
              <p className="text-base sm:text-lg font-serif italic text-white leading-relaxed">
                "{CHURCH_INFO.scripturalAnchor.verse}"
              </p>
              <p className="text-xs font-bold text-amber-400 uppercase font-mono tracking-wider">
                — {CHURCH_INFO.scripturalAnchor.reference}
              </p>
            </div>

            {/* Motto & Slogan */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <Quote className="w-4 h-4" /> Kingdom Motto
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Perfecting the saints</strong> (Ephesians 4:12)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Taking territories</strong> (Joshua 1:3)</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <span><strong>Where impossibility becomes possible</strong> (Luke 1:37)</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" /> Prophetic Slogan
                </div>
                <p className="text-sm font-bold text-white leading-snug">
                  "Inner court – where sacrifices made to heaven!!!"
                </p>
                <div className="pt-2 border-t border-white/10">
                  <p className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Our Vision</p>
                  <p className="text-xs text-slate-400 mt-0.5">{CHURCH_INFO.vision}</p>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Image Composition */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md">
              <div className="aspect-[4/5] rounded-[36px] overflow-hidden p-3 bg-gradient-to-b from-white/10 via-slate-800 to-slate-900 border border-amber-500/30 shadow-2xl shadow-black/80">
                <img
                  src={IMAGES.pastors}
                  alt="RICGCW Pastors & Council"
                  className="w-full h-full object-cover rounded-[28px]"
                />
              </div>

              {/* Floating Quote Card */}
              <div className="absolute -bottom-8 -left-6 max-w-xs p-5 rounded-3xl bg-slate-900/90 border border-amber-500/40 shadow-2xl backdrop-blur-xl space-y-2">
                <p className="text-xs font-serif italic text-slate-200 leading-relaxed">
                  "In the inner court, royalty meets the Holy Spirit and destinies are consecrated."
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <div className="w-6 h-6 rounded-full overflow-hidden border border-amber-400">
                    <img src={IMAGES.overseer} alt="Overseer" className="w-full h-full object-cover" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Rev. Nicholas Dobeng</span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 4 Core Values Grid */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400">Kingdom Pillars</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">What We Stand For</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-amber-500/30 shadow-xl space-y-4 group transition-all"
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${val.color} group-hover:scale-110 transition-transform`}>
                  <val.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold font-serif text-lg text-white group-hover:text-amber-300 transition-colors">{val.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ecclesiastical Authority Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-amber-500/30 shadow-2xl text-center space-y-6 max-w-4xl mx-auto"
        >
          <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
            <Gavel className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-400">Spiritual Governance</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">Ecclesiastical Authority</h3>
          </div>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            As a consecrated body of Christian believers, we hold to a shared creed and observe sacred rites, acknowledging a distinct ecclesiastical authority that guides our spiritual journey and kingdom governance, separate from worldly systems.
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
