import { useState, useEffect } from 'react';
import { Heart, Globe, Users, ArrowRight, Gift, Calendar, Sparkles, ShieldCheck, Lock } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { GivingModal } from '../components/GivingModal';
import { BranchModal } from '../components/BranchModal';
import { PrayerModal } from '../components/PrayerModal';
import { MobileQuickBar } from '../components/MobileQuickBar';
import { useChurch } from '../context/ChurchContext';
import { trackPageView, trackEvent } from '../utils/analytics';
import { usePageTitle } from '../utils/usePageTitle';

const ICON_MAP = {
  Users,
  Gift,
  Globe,
  Calendar,
  Heart,
  Sparkles,
  ShieldCheck,
};

export const Sponsorship = () => {
  usePageTitle('Kingdom Partnership & Missions Sponsorship');
  const { projects, sponsorshipStats, sponsorshipSettings } = useChurch();
  const [isGivingModalOpen, setIsGivingModalOpen] = useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [selectedGivingCategory, setSelectedGivingCategory] = useState<string>('Sanctuary Expansion & Building');

  useEffect(() => {
    trackPageView('Sponsorship');
  }, []);

  const handleOpenSponsor = (category: string) => {
    trackEvent('conversion', 'sponsorship_click', category);
    setSelectedGivingCategory(category);
    setIsGivingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-amber-500 selection:text-slate-950 pb-16 md:pb-0">
      <Navbar
        onOpenBranchModal={() => setIsBranchModalOpen(true)}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
        onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
      />

      <main className="pt-36 pb-24 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-20">
          
          {/* Header Banner */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-widest">
              <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
              <span>{sponsorshipSettings?.badge || 'Kingdom Partnership & Sponsorship'}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-slate-950 tracking-tight leading-tight whitespace-pre-line">
              {sponsorshipSettings?.headline || "Partner with God's Work to Touch Lives Worldwide."}
            </h1>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {sponsorshipSettings?.subtitle || 'Your financial seeds and sponsorship empower us to spread the Gospel, provide welfare to orphanages, support rural crusades, and expand church sanctuaries across Ghana and beyond.'}
            </p>
          </div>

          {/* Impact Stats Row (Dynamically managed) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {(sponsorshipStats || []).map((stat) => {
              const Icon = (stat.iconName && ICON_MAP[stat.iconName as keyof typeof ICON_MAP]) || Heart;
              const colorClass = stat.color || 'text-amber-600 bg-amber-50 border-amber-200';
              return (
                <div
                  key={stat.id || stat.label}
                  className="p-6 rounded-3xl bg-slate-50 border border-slate-200 text-center space-y-2 shadow-sm"
                >
                  <div className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center border ${colorClass}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black font-mono text-slate-950">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-slate-500 uppercase font-bold tracking-wider">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Secure Online Payment Gateway Card */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" /> {sponsorshipSettings?.gatewayBadge || 'Paystack Instant Gateway'}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white">
                {sponsorshipSettings?.gatewayTitle || 'One-Click Online Giving & Project Sponsorship'}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
                {sponsorshipSettings?.gatewaySubtitle || 'Send tithes, offerings, covenant seeds, and project donations securely in seconds using MTN Mobile Money, Telecel Cash, AT Money, Visa, Mastercard, or Apple Pay.'}
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => handleOpenSponsor('Sanctuary Expansion & Building')}
                className="px-8 py-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-slate-950" />
                <span>{sponsorshipSettings?.ctaButtonText || 'Give Online Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Sponsorship Projects Grid */}
          <div className="space-y-8">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-3xl font-bold font-serif text-slate-950">Active Kingdom Projects</h2>
              <p className="text-xs sm:text-sm text-slate-600">Select a specific mission project to sponsor</p>
            </div>

            {(!projects || projects.length === 0) ? (
              <div className="p-12 text-center rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
                <Heart className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-lg font-serif font-bold text-slate-800">No Projects Currently Active</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  New kingdom projects will be published soon. In the meantime, you can donate directly using our online giving gateway.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-7 rounded-3xl bg-slate-50 border border-slate-200 hover:border-amber-300 hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                          {proj.category}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-900">{proj.percent}% Funded</span>
                      </div>

                      <h3 className="font-serif font-bold text-xl text-slate-950">{proj.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-slate-600">
                          <span>Raised: <strong>{proj.raised}</strong></span>
                          <span>Target: <strong>{proj.target}</strong></span>
                        </div>
                        <div className="h-2 rounded-xl bg-slate-200 overflow-hidden">
                          <div
                            style={{ width: `${Math.min(100, Math.max(0, proj.percent))}%` }}
                            className="h-full bg-amber-500 rounded-xl transition-all duration-500"
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-slate-200/80">
                        <span className="text-[11px] text-slate-500 truncate max-w-[180px] sm:max-w-xs">✨ {proj.impact}</span>
                        <button
                          onClick={() => handleOpenSponsor(proj.title)}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
                        >
                          <span>Sponsor</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer
        onOpenBranchModal={() => setIsBranchModalOpen(true)}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
        onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
      />

      <MobileQuickBar
        onOpenBranchModal={() => setIsBranchModalOpen(true)}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
      />

      <BranchModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
      />
      <GivingModal
        isOpen={isGivingModalOpen}
        onClose={() => setIsGivingModalOpen(false)}
        defaultCategory={selectedGivingCategory}
      />
      <PrayerModal
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
      />
    </div>
  );
};

export default Sponsorship;
