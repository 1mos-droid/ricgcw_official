import { useState, useEffect } from 'react';
import { m, useReducedMotion } from 'framer-motion';
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
import { Reveal, Stagger, StaggerItem, SPRING_TACTILE } from '../components/motion';
import SectionHeader from '../components/SectionHeader';

const ICON_MAP = {
  Users,
  Gift,
  Globe,
  Calendar,
  Heart,
  Sparkles,
  ShieldCheck,
};

const QUICK_AMOUNTS = ['50', '100', '250', '500', '1000', '2500'] as const;

const PARTNERSHIP_TIERS = [
  {
    id: 'seed',
    name: 'Seed Partner',
    amount: '100',
    category: '2026 Theme Covenant Seed',
    desc: 'Monthly altar seed supporting daily intercession, gospel tracts, and hospitality outreach.',
    recommended: false,
  },
  {
    id: 'builder',
    name: 'Kingdom Builder',
    amount: '500',
    category: 'Sanctuary Expansion & Building',
    desc: 'Core sanctuary development, rural crusade logistics, and coastal congregation discipleship.',
    recommended: true,
  },
  {
    id: 'pillar',
    name: 'Global Pillar',
    amount: '1000',
    category: 'Rural Missions & Outreach',
    desc: 'Underwriting community medical welfare, education scholarships, and broadcasting worldwide.',
    recommended: false,
  },
] as const;

export const Sponsorship = () => {
  usePageTitle('Kingdom Partnership & Missions Sponsorship');
  const { projects, sponsorshipStats, sponsorshipSettings } = useChurch();
  const [isGivingModalOpen, setIsGivingModalOpen] = useState(false);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string | undefined>(undefined);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [selectedGivingCategory, setSelectedGivingCategory] = useState<string>('Sanctuary Expansion & Building');
  const [selectedAmount, setSelectedAmount] = useState<string>('500');
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    trackPageView('Sponsorship');
  }, []);

  const handleOpenSponsor = (category: string, amountOverride?: string) => {
    trackEvent('conversion', 'sponsorship_click', category);
    setSelectedGivingCategory(category);
    if (amountOverride) {
      setSelectedAmount(amountOverride);
    }
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
    <div className="relative min-h-screen bg-sanctuary-alabaster paper-grain text-ink-primary selection:bg-sanctuary-950 selection:text-gold-400 pb-16 md:pb-0 overflow-x-clip">
      <Navbar
        onOpenBranchModal={openBranchModal}
        onOpenGivingModal={() => handleOpenSponsor('Sanctuary Expansion & Building')}
        onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
      />

      <main id="main-content" className="relative pt-28 sm:pt-32 pb-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Editorial Monograph Header */}
          <Reveal className="text-center space-y-4 max-w-3xl mx-auto border-b border-sanctuary-stone pb-10">
            <div className="flex items-center justify-center gap-3 text-eyebrow font-mono uppercase tracking-[0.24em] text-gold-600">
              <Heart className="w-3.5 h-3.5 fill-gold-600" />
              <span>{sponsorshipSettings?.badge || 'Kingdom Partnership & Sponsorship'}</span>
            </div>
            <h1 className="text-h1 font-normal font-serif text-ink-primary tracking-tight whitespace-pre-line">
              {sponsorshipSettings?.headline || "Partner with God's Work to Touch Lives Worldwide."}
            </h1>
            <p className="text-body sm:text-base text-ink-secondary leading-relaxed max-w-2xl mx-auto">
              {sponsorshipSettings?.subtitle ||
                'Your financial seeds and sponsorship empower us to spread the Gospel, provide welfare to orphanages, support rural crusades, and expand church sanctuaries across Ghana and beyond.'}
            </p>
          </Reveal>

          {/* Impact Stats Row */}
          <Stagger className={`grid gap-6 ${statsGridClass}`}>
            {(sponsorshipStats || []).map((stat) => {
              const Icon = (stat.iconName && ICON_MAP[stat.iconName as keyof typeof ICON_MAP]) || Heart;
              return (
                <StaggerItem
                  key={stat.id || stat.label}
                  className="p-6 rounded-sm bg-white border border-sanctuary-stone text-center space-y-2 shadow-xs"
                >
                  <div className="w-11 h-11 rounded-sm mx-auto flex items-center justify-center border border-gold-500/35 bg-gold-500/10 text-gold-600">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-4xl font-serif tabular-nums text-ink-primary">{stat.value}</p>
                  <p className="text-eyebrow font-mono text-ink-muted uppercase tracking-[0.18em]">{stat.label}</p>
                </StaggerItem>
              );
            })}
          </Stagger>

          {/* Covenant Partnership Tiers + LayoutId Amount Picker */}
          <div className="space-y-8">
            <SectionHeader
              index="01"
              eyebrow="Stewardship & Covenant Partnership"
              title="Choose a"
              accent="Partnership Seed"
              rightSlot={
                <div className="flex flex-wrap items-center gap-1 bg-sanctuary-parchment p-1 rounded-sm border border-sanctuary-stone">
                  {QUICK_AMOUNTS.map((amt) => {
                    const isSelected = selectedAmount === amt;
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setSelectedAmount(amt)}
                        className={`relative min-h-[38px] px-3 py-1.5 rounded-sm font-mono text-caption font-semibold tabular-nums transition-colors cursor-pointer ${
                          isSelected ? 'text-sanctuary-alabaster' : 'text-ink-secondary hover:text-ink-primary'
                        }`}
                      >
                        {isSelected && (
                          <m.span
                            layoutId="sponsorship-amount"
                            transition={SPRING_TACTILE}
                            className="absolute inset-0 rounded-sm bg-sanctuary-950 -z-0"
                          />
                        )}
                        <span className="relative z-10">GHS {amt}</span>
                      </button>
                    );
                  })}
                </div>
              }
            />

            <Stagger className="grid md:grid-cols-3 gap-6">
              {PARTNERSHIP_TIERS.map((tier) => (
                <StaggerItem key={tier.id}>
                  <div
                    className={`h-full rounded-sm p-7 flex flex-col justify-between gap-6 transition-colors ${
                      tier.recommended
                        ? 'logo-obsidian-bg text-sanctuary-alabaster border border-gold-400/50 shadow-xl'
                        : 'bg-white border border-sanctuary-stone text-ink-primary'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-eyebrow font-mono uppercase tracking-[0.16em] ${
                            tier.recommended ? 'text-gold-400' : 'text-gold-600'
                          }`}
                        >
                          {tier.category}
                        </span>
                        {tier.recommended && (
                          <span className="px-2 py-0.5 rounded-sm bg-gold-500 text-sanctuary-950 text-[10px] font-mono font-bold uppercase tracking-wider">
                            Recommended
                          </span>
                        )}
                      </div>
                      <h3 className="font-serif text-3xl">{tier.name}</h3>
                      <p className="font-mono text-2xl font-bold tabular-nums">
                        GHS {tier.amount}
                      </p>
                      <p
                        className={`text-body leading-relaxed ${
                          tier.recommended ? 'text-sanctuary-alabaster/80' : 'text-ink-secondary'
                        }`}
                      >
                        {tier.desc}
                      </p>
                    </div>

                    <m.button
                      type="button"
                      whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                      transition={SPRING_TACTILE}
                      onClick={() => handleOpenSponsor(tier.category, tier.amount)}
                      className={`min-h-[44px] w-full py-3 px-5 rounded-sm font-semibold text-caption uppercase tracking-[0.14em] transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                        tier.recommended
                          ? 'bg-gold-500 hover:bg-gold-400 text-sanctuary-950'
                          : 'bg-sanctuary-950 hover:bg-gold-600 text-sanctuary-alabaster'
                      }`}
                    >
                      <span>Sow GHS {tier.amount}</span>
                      <ArrowRight className="w-4 h-4" />
                    </m.button>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          {/* Secure Online Payment Gateway Banner */}
          <Reveal className="p-8 sm:p-12 rounded-sm logo-obsidian-bg text-sanctuary-alabaster border border-gold-400/30 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="space-y-3 text-center md:text-left relative z-10">
              <div className="inline-flex items-center gap-2 text-gold-400 text-eyebrow font-mono uppercase tracking-[0.2em]">
                <Lock className="w-3.5 h-3.5" /> {sponsorshipSettings?.gatewayBadge || 'Paystack Instant Gateway'}
              </div>
              <h2 className="text-h2 font-normal font-serif text-sanctuary-alabaster">
                {sponsorshipSettings?.gatewayTitle || 'One-Click Online Giving & Project Sponsorship'}
              </h2>
              <p className="text-sanctuary-alabaster/80 text-body max-w-xl leading-relaxed">
                {sponsorshipSettings?.gatewaySubtitle ||
                  'Send tithes, offerings, covenant seeds, and project donations securely in seconds using MTN Mobile Money, Telecel Cash, AT Money, Visa, Mastercard, or Apple Pay.'}
              </p>
            </div>

            <div className="shrink-0 relative z-10">
              <m.button
                type="button"
                whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                transition={SPRING_TACTILE}
                onClick={() => handleOpenSponsor('Sanctuary Expansion & Building', selectedAmount)}
                className="min-h-[48px] px-8 py-4 rounded-sm bg-gold-500 hover:bg-gold-400 text-sanctuary-950 font-semibold text-caption uppercase tracking-[0.16em] transition-colors flex items-center gap-2.5 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-sanctuary-950" />
                <span>{sponsorshipSettings?.ctaButtonText || 'Give Online Now'}</span>
                <ArrowRight className="w-4 h-4" />
              </m.button>
            </div>
          </Reveal>

          {/* Active Sponsorship Projects Grid */}
          <div className="space-y-8">
            <SectionHeader
              index="02"
              eyebrow="Missions & Infrastructure"
              title="Active Kingdom"
              accent="Projects"
              description="Select a specific mission initiative below to partner toward completion."
            />

            {!projects || projects.length === 0 ? (
              <Reveal className="p-12 text-center rounded-sm bg-white border border-sanctuary-stone space-y-3">
                <Heart className="w-9 h-9 text-gold-600/70 mx-auto" />
                <h3 className="text-3xl font-serif font-normal text-ink-primary">No Projects Currently Active</h3>
                <p className="text-body text-ink-secondary max-w-md mx-auto">
                  New kingdom projects will be published soon. In the meantime, you can donate directly using our online giving gateway.
                </p>
              </Reveal>
            ) : (
              <Stagger className="grid md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <StaggerItem key={proj.id}>
                    <div className="h-full p-7 rounded-sm bg-white border border-sanctuary-stone hover:border-gold-500 transition-colors space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-eyebrow font-mono uppercase tracking-[0.16em]">
                          <span className="text-gold-600 font-semibold">{proj.category}</span>
                          <span className="font-bold tabular-nums text-ink-primary">{proj.percent}% Funded</span>
                        </div>

                        <h3 className="font-serif text-3xl text-ink-primary">{proj.title}</h3>
                        <p className="text-body text-ink-secondary leading-relaxed">{proj.description}</p>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-caption text-ink-secondary tabular-nums font-mono">
                            <span>Raised: <strong className="text-ink-primary">{proj.raised}</strong></span>
                            <span>Target: <strong className="text-ink-primary">{proj.target}</strong></span>
                          </div>
                          <div className="h-1.5 bg-sanctuary-parchment overflow-hidden">
                            <div
                              style={{ width: `${Math.min(100, Math.max(0, proj.percent))}%` }}
                              className="h-full bg-gold-600 transition-all duration-500"
                            />
                          </div>
                        </div>

                        <div className="pt-3 flex items-center justify-between border-t border-sanctuary-stone gap-3">
                          <span className="text-caption text-ink-muted truncate max-w-[180px] sm:max-w-xs">{proj.impact}</span>
                          <button
                            type="button"
                            onClick={() => handleOpenSponsor(proj.title)}
                            className="min-h-[44px] px-5 py-2 rounded-sm bg-sanctuary-950 hover:bg-gold-600 text-sanctuary-alabaster font-semibold text-caption uppercase tracking-[0.14em] transition-colors flex items-center gap-1.5 cursor-pointer shrink-0"
                          >
                            <span>Sponsor</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            )}
          </div>
        </div>
      </main>

      <Footer
        onOpenBranchModal={openBranchModal}
        onOpenGivingModal={() => handleOpenSponsor('Sanctuary Expansion & Building')}
        onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
      />

      <MobileQuickBar
        onOpenBranchModal={openBranchModal}
        onOpenGivingModal={() => handleOpenSponsor('Sanctuary Expansion & Building')}
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
        defaultAmount={selectedAmount}
      />
      <PrayerModal
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
      />
    </div>
  );
};

export default Sponsorship;
