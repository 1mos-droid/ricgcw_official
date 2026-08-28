import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Globe, Users, ArrowRight, DollarSign, Gift, Calendar, Check, Copy, Sparkles, Building2, Smartphone, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { GivingModal } from '../components/GivingModal';
import { BranchModal } from '../components/BranchModal';
import { PrayerModal } from '../components/PrayerModal';
import { CHURCH_INFO, SPONSORSHIP_PROJECTS } from '../data/churchData';

export const Sponsorship = () => {
  const [isGivingModalOpen, setIsGivingModalOpen] = useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [selectedGivingCategory, setSelectedGivingCategory] = useState<string>('Tithe & Offering');
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleOpenSponsor = (category: string) => {
    setSelectedGivingCategory(category);
    setIsGivingModalOpen(true);
  };

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070c18] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar
        onOpenBranchModal={() => setIsBranchModalOpen(true)}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
        onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
      />

      <main className="pt-36 pb-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Header Banner */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest"
            >
              <Heart className="w-3.5 h-3.5 fill-amber-400" />
              <span>Kingdom Partnership & Sponsorship</span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-white tracking-tight leading-tight">
              Partner with God's Work to <br />
              <span className="text-gold-gradient font-serif italic">Touch Lives Worldwide.</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
              Your financial seeds and sponsorship empower us to spread the Gospel, provide welfare to orphanages, support rural crusades, and expand church sanctuaries across Ghana and beyond.
            </p>
          </div>

          {/* Impact Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: 'Lives Impacted Yearly', value: '10,000+', icon: Users, color: 'text-blue-400' },
              { label: 'Children on Welfare', value: '120+', icon: Gift, color: 'text-rose-400' },
              { label: 'Church Sanctuary Plants', value: '3 Active', icon: Globe, color: 'text-emerald-400' },
              { label: 'Annual Crusades & Vigils', value: '50+ Dates', icon: Calendar, color: 'text-amber-400' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-3xl bg-slate-900 border border-white/10 text-center space-y-2 shadow-xl"
              >
                <div className={`w-12 h-12 rounded-2xl bg-white/5 mx-auto flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <p className="text-2xl sm:text-3xl font-black font-mono text-white">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Direct Giving Cards (MoMo & Bank) */}
          <div className="p-8 sm:p-12 rounded-[36px] bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 shadow-2xl space-y-8">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400">Direct Giving Channels</span>
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">Give via Mobile Money or Bank Transfer</h2>
              <p className="text-xs sm:text-sm text-slate-300">All contributions directly support church projects and evangelistic outreach.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* MoMo Card */}
              <div className="p-6 rounded-3xl bg-slate-950/80 border border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">MTN Mobile Money (MoMo)</h3>
                    <p className="text-xs text-slate-400">{CHURCH_INFO.giving.momo.accountName}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">MoMo Number</p>
                    <p className="font-mono font-bold text-xl text-amber-300">{CHURCH_INFO.giving.momo.number}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(CHURCH_INFO.giving.momo.number.replace(/\s/g, ''), 'momo')}
                    className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    {copiedField === 'momo' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedField === 'momo' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Bank Card */}
              <div className="p-6 rounded-3xl bg-slate-950/80 border border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">{CHURCH_INFO.giving.bank.bankName}</h3>
                    <p className="text-xs text-slate-400">{CHURCH_INFO.giving.bank.branch}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Account Number</p>
                    <p className="font-mono font-bold text-lg text-white">{CHURCH_INFO.giving.bank.accountNumber}</p>
                  </div>
                  <button
                    onClick={() => handleCopy(CHURCH_INFO.giving.bank.accountNumber, 'bank')}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    {copiedField === 'bank' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedField === 'bank' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Active Sponsorship Initiatives */}
          <div className="space-y-12">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400">Current Needs</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white">Active Kingdom Sponsorship Projects</h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
                Select a specific cause close to your heart and partner with us in prayer and giving.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {SPONSORSHIP_PROJECTS.map((proj, idx) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 rounded-[36px] bg-slate-900 border border-white/10 hover:border-amber-500/40 shadow-xl space-y-6 flex flex-col justify-between group transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
                        {proj.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Target: {proj.target}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold font-serif text-white group-hover:text-amber-300 transition-colors">
                        {proj.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed font-light">
                        {proj.description}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-400 font-sans">Progress Raised: <strong className="text-white">{proj.raised}</strong></span>
                        <span className="text-amber-400 font-bold">{proj.percent}%</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-slate-950 overflow-hidden border border-white/5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-1000"
                          style={{ width: `${proj.percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white/5 text-xs text-amber-300/90 font-medium">
                      <Sparkles className="w-3.5 h-3.5 inline mr-1 text-amber-400" />
                      <strong>Expected Impact:</strong> {proj.impact}
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenSponsor(proj.title)}
                    className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>Sponsor This Initiative</span>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scripture Promise & Covenant */}
          <div className="p-8 sm:p-12 rounded-[36px] bg-slate-900 border border-white/10 text-center space-y-4 max-w-3xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-white">The Covenant of the Giver</h3>
            <p className="text-sm text-slate-300 italic font-serif leading-relaxed">
              "And God is able to make all grace abound toward you, that you, always having all sufficiency in all things, may have an abundance for every good work." — 2 Corinthians 9:8
            </p>
          </div>

        </div>
      </main>

      <Footer
        onOpenBranchModal={() => setIsBranchModalOpen(true)}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
        onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
      />

      <GivingModal
        isOpen={isGivingModalOpen}
        onClose={() => setIsGivingModalOpen(false)}
        defaultCategory={selectedGivingCategory}
      />
      <BranchModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
      />
      <PrayerModal
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
      />
    </div>
  );
};

export default Sponsorship;
