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
  const [selectedBranchId, setSelectedBranchId] = useState<string | undefined>(undefined);
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

  const openBranchModal = (branchId?: string) => {
    setSelectedBranchId(branchId);
    setIsBranchModalOpen(true);
  };

  const statsCount = (sponsorshipStats || []).length;
  const statsGridClass =
    statsCount <= 1
      ? 'grid-cols-1 max-w-sm mx-auto'
      : statsCount === 2
      ? 'grid-cols-2 max-w-2xl mx-auto'
      : statsCount === 3
      ? 'grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto'
      : 'grid-cols-2 md:grid-cols-4';

  return (
    <div className="relative isolate min-h-screen bg-sanctuary-alabaster text-ink-primary selection:bg-gold-600 selection:text-sanctuary-alabaster pb-16 md:pb-0 overflow-x-clip">
      {/* Subtle Constant Cathedral Daylight Canvas */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-subtle-pattern opacity-35" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[820px] h-[540px] bg-[radial-gradient(ellipse_at_center,rgba(184,134,11,0.14)_0%,transparent_70%)] blur-[90px]" />
        <div className="absolute bottom-10 right-1/4 w-[620px] h-[520px] bg-[radial-gradient(ellipse_at_center,rgba(223,197,123,0.12)_0%,transparent_70%)] blur-[100px]" />
      </div>

      <Navbar
        onOpenBranchModal={openBranchModal}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
        onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
      />

      <main className="relative z-10 pt-32 sm:pt-36 pb-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Header Banner */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sanctuary-parchment border border-sanctuary-stone text-gold-600 text-xs font-semibold uppercase tracking-[0.2em]">
              <Heart className="w-3.5 h-3.5 text-gold-600 fill-gold-500" />
              <span>{sponsorshipSettings?.badge || 'Kingdom Partnership & Sponsorship'}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif text-ink-primary tracking-tight leading-[1.08] whitespace-pre-line">
              {sponsorshipSettings?.headline || "Partner with God's Work to Touch Lives Worldwide."}
            </h1>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed font-light">
              {sponsorshipSettings?.subtitle || 'Your financial seeds and sponsorship empower us to spread the Gospel, provide welfare to orphanages, support rural crusades, and expand church sanctuaries across Ghana and beyond.'}
            </p>
          </div>

          {/* Impact Stats Row (Dynamically centered) */}
          <div className={`grid gap-4 sm:gap-6 ${statsGridClass}`}>
            {(sponsorshipStats || []).map((stat) => {
              const Icon = (stat.iconName && ICON_MAP[stat.iconName as keyof typeof ICON_MAP]) || Heart;
              return (
                <div
                  key={stat.id || stat.label}
                  className="p-6 rounded-3xl bg-sanctuary-parchment/80 backdrop-blur-md border border-sanctuary-stone text-center space-y-2 shadow-xs"
                >
                  <div className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center border border-gold-500/25 bg-gold-500/10 text-gold-600">
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black font-mono tabular-nums text-ink-primary">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-ink-muted uppercase font-bold tracking-wider">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Secure Online Payment Gateway Card (Obsidian Contrast Accent) */}
          <div className="p-8 sm:p-12 rounded-3xl bg-sanctuary-950 text-sanctuary-alabaster border border-sanctuary-stone/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-gold-500/15 rounded-full blur-[90px] pointer-events-none" />
            <div className="space-y-3 text-center md:text-left relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/20 border border-gold-500/35 text-gold-400 text-xs font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5" /> {sponsorshipSettings?.gatewayBadge || 'Paystack Instant Gateway'}
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-sanctuary-alabaster">
                {sponsorshipSettings?.gatewayTitle || 'One-Click Online Giving & Project Sponsorship'}
              </h2>
              <p className="text-sanctuary-alabaster/75 text-xs sm:text-sm max-w-xl leading-relaxed font-light">
                {sponsorshipSettings?.gatewaySubtitle || 'Send tithes, offerings, covenant seeds, and project donations securely in seconds using MTN Mobile Money, Telecel Cash, AT Money, Visa, Mastercard, or Apple Pay.'}
              </p>
            </div>

            <div className="shrink-0 relative z-10">
              <button
                onClick={() => handleOpenSponsor('Sanctuary Expansion & Building')}
                className="px-8 py-4 rounded-full bg-gold-400 hover:bg-white text-sanctuary-950 font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-sanctuary-950" />
                <span>{sponsorshipSettings?.ctaButtonText || 'Give Online Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Sponsorship Projects Grid */}
          <div className="space-y-8">
            <div className="space-y-2 text-center md:text-left border-b border-sanctuary-stone/80 pb-4">
              <h2 className="text-3xl font-bold font-serif text-ink-primary">Active Kingdom Projects</h2>
              <p className="text-xs sm:text-sm text-ink-secondary font-light">Select a specific mission project to sponsor</p>
            </div>

            {!projects || projects.length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-sanctuary-parchment/78 backdrop-blur-md border border-sanctuary-stone space-y-3 shadow-xs">
                <Heart className="w-10 h-10 text-gold-500/60 mx-auto" />
                <h3 className="text-lg font-serif font-bold text-ink-primary">No Projects Currently Active</h3>
                <p className="text-xs text-ink-secondary max-w-md mx-auto">
                  New kingdom projects will be published soon. In the meantime, you can donate directly using our online giving gateway.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-7 rounded-3xl bg-sanctuary-parchment/78 backdrop-blur-md border border-sanctuary-stone hover:border-gold-500/50 hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gold-500/10 text-gold-700 border border-gold-500/25">
                          {proj.category}
                        </span>
                        <span className="text-xs font-mono font-bold tabular-nums text-ink-primary">{proj.percent}% Funded</span>
                      </div>

                      <h3 className="font-serif font-bold text-xl text-ink-primary">{proj.title}</h3>
                      <p className="text-xs text-ink-secondary leading-relaxed">{proj.description}</p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-ink-secondary tabular-nums">
                          <span>Raised: <strong className="text-ink-primary">{proj.raised}</strong></span>
                          <span>Target: <strong className="text-ink-primary">{proj.target}</strong></span>
                        </div>
                        <div className="h-2 rounded-full bg-sanctuary-stone overflow-hidden">
                          <div
                            style={{ width: `${Math.min(100, Math.max(0, proj.percent))}%` }}
                            className="h-full bg-gold-600 rounded-full transition-all duration-500"
                          />
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-sanctuary-stone">
                        <span className="text-[11px] text-ink-muted truncate max-w-[180px] sm:max-w-xs">{proj.impact}</span>
                        <button
                          onClick={() => handleOpenSponsor(proj.title)}
                          className="px-4 py-2 rounded-full bg-ink-primary hover:bg-gold-600 text-sanctuary-alabaster font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
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

      <div className="relative z-10">
        <Footer
          onOpenBranchModal={openBranchModal}
          onOpenGivingModal={() => setIsGivingModalOpen(true)}
          onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
        />
      </div>

      <MobileQuickBar
        onOpenBranchModal={openBranchModal}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
      />

      <BranchModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        defaultBranchId={selectedBranchId}
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
