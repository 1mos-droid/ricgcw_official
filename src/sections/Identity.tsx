import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Palette, BookOpen, Scroll, Sparkles, Check, ChevronRight } from 'lucide-react';
import { CHURCH_COLORS } from '../data/churchData';

export const Identity = () => {
  const [selectedColor, setSelectedColor] = useState<typeof CHURCH_COLORS[0]>(CHURCH_COLORS[1]); // Gold default

  const definitions = [
    {
      term: 'Rhema (ῥῆμα)',
      meaning: 'A Greek term in the New Testament referring to a specific, "spoken utterance" from God. A quickened, timely word applied directly by the Holy Spirit to transform a believer’s situation.',
    },
    {
      term: 'Inner',
      meaning: 'Inside and close to the divine center. Passing beyond the outer realm into intimate communion with the presence and majesty of the King of kings.',
    },
    {
      term: 'Court',
      meaning: 'A sacred assembly and royal throne-room where divine justice, covenants, prayers, and kingdom decrees are established.',
    },
    {
      term: 'Gospel',
      meaning: 'Glad tidings and good news concerning Jesus Christ, salvation, power, righteousness, and eternal life for all humanity.',
    },
    {
      term: 'Church (Worldwide)',
      meaning: 'The global body of consecrated believers; the royal priesthood called out of darkness to take territories across every nation.',
    },
  ];

  const templeCourts = [
    {
      title: 'The Great Outer Court',
      scripture: 'Jeremiah 19:14, 26:2',
      desc: 'Where the multitude assembled to praise, offer sacrifices, and witness the power of God.',
    },
    {
      title: 'The Sacred Inner Court',
      scripture: '1 Kings 6:36, Esther 5:1',
      desc: 'The place of deeper intimacy, priestly revelation, and royal favor before the throne.',
    },
    {
      title: 'The Court of the Priests',
      scripture: '2 Chronicles 4:9',
      desc: 'Reserved for holy service, continuous intercession, and holy consecration unto God.',
    },
  ];

  return (
    <section id="identity" className="relative py-28 px-4 sm:px-6 md:px-8 bg-slate-950 border-b border-amber-500/15 overflow-hidden">
      {/* Ambient glowing orbs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-28 relative z-10">
        
        {/* Culture of Loyalty */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
                <Shield className="w-3.5 h-3.5" /> Church Culture
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-white tracking-tight">
                A Consecrated Culture of <br />
                <span className="text-gold-gradient font-serif italic">Honor & Loyalty.</span>
              </h2>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-amber-500/30 shadow-2xl relative overflow-hidden space-y-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed italic font-serif">
                "RICGCW believes in our HEAD PASTOR and the ASSOCIATES, also the LEADERS and all the DEPARTMENTAL HEAD EXECUTIVES as well as all the MEMBERS too. We do not speak evil things and will not allow anybody from within or outside to speak evil about them — internally (inside the church) or externally (outside the church). This is the way we think and do our things as a LOYAL PEOPLE unto God."
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-amber-400 font-bold uppercase tracking-wider">
                <span>Core Value: Honor & Protection</span>
                <span>Proverbs 21:21</span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              We cultivate a godly atmosphere where mutual respect, spiritual covering, and sincere brotherly love preserve the peace and power of the Holy Spirit.
            </p>
          </motion.div>

          {/* Visual Shield Box */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 text-center space-y-6 shadow-2xl shadow-black">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/20">
                <Shield className="w-12 h-12 stroke-[2.2]" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-serif text-white">Built on Covenant</h3>
                <p className="text-xs text-amber-300 font-bold uppercase tracking-wider">1 Corinthians 13:7 • Hebrews 13:17</p>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                "Behold, how good and how pleasant it is for brethren to dwell together in unity! For there the Lord commanded the blessing..." (Psalm 133:1-3)
              </p>
            </div>
          </motion.div>
        </div>

        {/* Understanding Our Name */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5" /> Biblical Etymology
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold font-serif text-white">Understanding Our Church Name</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Every word in "Rhema Inner Court Gospel Church" carries profound theological and spiritual significance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {definitions.map((item, idx) => (
              <motion.div
                key={item.term}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 hover:border-amber-500/30 shadow-xl space-y-3 group transition-all"
              >
                <div className="w-8 h-8 rounded-xl bg-white/5 group-hover:bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h4 className="font-bold font-serif text-lg text-white group-hover:text-amber-300 transition-colors">
                  {item.term}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.meaning}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Temple Concept & Scriptures */}
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-900 border border-white/10 space-y-6">
            <div className="flex items-center gap-3">
              <Scroll className="w-6 h-6 text-amber-400" />
              <h4 className="font-bold font-serif text-xl text-white">The Architecture of the Tabernacle</h4>
            </div>
            <div className="space-y-4">
              {templeCourts.map((court, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-bold text-sm text-white">{court.title}</h5>
                    <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                      {court.scripture}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{court.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h4 className="font-bold font-serif text-2xl text-white">Scriptural Pillars of Entrance</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              Through the torn veil of Christ Jesus (Matthew 27:51), we are granted bold access into the Holiest of all. We no longer worship from afar, but draw near with full assurance of faith.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Hebrews 4:16', 'Hebrews 10:19-20', 'Matthew 27:51', 'Ezekiel 8:16', 'Acts 17:24', '1 Peter 2:9'].map((ref) => (
                <span key={ref} className="px-4 py-2 rounded-xl bg-slate-900 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold shadow-sm">
                  {ref}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Church Colors Symbolism */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest">
              <Palette className="w-3.5 h-3.5" /> Divine Symbolism
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold font-serif text-white">Spiritual Meanings of Church Colors</h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
              Every color chosen in our ministry represents a specific revelation and biblical covenant.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {CHURCH_COLORS.map((col) => {
              const isSelected = selectedColor.name === col.name;
              return (
                <div
                  key={col.name}
                  onClick={() => setSelectedColor(col)}
                  className={`p-6 rounded-3xl border transition-all cursor-pointer group space-y-4 ${
                    isSelected
                      ? 'bg-slate-900 border-amber-500 shadow-2xl shadow-amber-500/10 scale-[1.02]'
                      : 'bg-slate-950/70 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="w-12 h-12 rounded-2xl shadow-lg border border-white/20"
                      style={{ backgroundColor: col.hex }}
                    />
                    {isSelected && (
                      <span className="text-[10px] font-bold uppercase bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full">
                        Active
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold font-serif text-lg text-white">{col.name}</h4>
                    <p className="text-[11px] font-mono text-amber-400">{col.biblicalReference}</p>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{col.spiritualMeaning}</p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Identity;
