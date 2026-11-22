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
import SectionHeader from '../components/SectionHeader';
import ResponsiveImage from '../components/ResponsiveImage';
import { PICTURES, IMAGE_DIMENSIONS } from '../data/churchData';

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
    <div className="relative min-h-screen bg-public-canvas text-public-ink pb-16 md:pb-0 overflow-x-clip">
      <Navbar
        onOpenBranchModal={openBranchModal}
        onOpenGivingModal={() => handleOpenSponsor('Sanctuary Expansion & Building')}
        onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
      />

      <main id="main-content" className="relative pt-16 pb-20">
        <div className="space-y-16 sm:space-y-24">
          <section className="bg-public-ink text-white">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-20 grid lg:grid-cols-2 items-center gap-10 lg:gap-16">
              <div className="space-y-6">
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-public-accent-light">
                  <Heart className="w-4 h-4" />
                  {sponsorshipSettings?.badge || 'Kingdom Partnership & Sponsorship'}
                </p>
                <h1 className="text-[clamp(2.75rem,5vw,4.75rem)] leading-[1.04] font-extrabold tracking-[-0.045em] whitespace-pre-line break-words">
                  {sponsorshipSettings?.headline || "Partner with God's Work to Touch Lives Worldwide."}
                </h1>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
                  {sponsorshipSettings?.subtitle || 'Your financial seeds and sponsorship empower us to spread the Gospel, provide welfare to orphanages, support rural crusades, and expand church sanctuaries across Ghana and beyond.'}
                </p>
                <a href="#partnership" className="min-h-[48px] inline-flex items-center gap-4 px-6 py-3 rounded-full bg-public-accent-light text-public-ink font-bold hover:bg-white transition-colors">
                  Explore partnership <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <figure>
                <ResponsiveImage src={PICTURES.couple1} alt="Rev. Nicholas Dobeng and Lady Pastor Dobeng" width={IMAGE_DIMENSIONS.couple1.width} height={IMAGE_DIMENSIONS.couple1.height} priority sizes="(min-width: 1024px) 45vw, 100vw" className="w-full h-auto rounded-t-[6rem] sm:rounded-t-[9rem]" />
                <figcaption className="text-sm text-white/70 pt-4">Together, touching lives worldwide.</figcaption>
              </figure>
            </div>
          </section>

          <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-16 sm:space-y-24">
            {/* Impact Stats Row */}
            <div className={`grid gap-6 ${statsGridClass}`}>
              {(sponsorshipStats || []).map((stat) => {
                const Icon = (stat.iconName && ICON_MAP[stat.iconName as keyof typeof ICON_MAP]) || Heart;
                return (
                  <div
                    key={stat.id || stat.label}
                    className="p-6 rounded-xl bg-public-surface border border-public-border text-center space-y-2"
                  >
                    <div className="w-11 h-11 rounded-xl mx-auto flex items-center justify-center border border-public-border bg-public-canvas text-public-accent">
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="text-3xl sm:text-4xl font-extrabold tabular-nums text-public-ink">
                      {stat.value}
                    </p>
                    <p className="text-xs font-semibold text-public-ink-muted uppercase tracking-[0.12em]">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Covenant Partnership Tiers & Quick Amount Picker */}
            <div id="partnership" className="space-y-8">
              <SectionHeader
                eyebrow="Stewardship & Partnership"
                title="Choose a"
                accent="Partnership Seed"
                rightSlot={
                  <div className="flex flex-wrap items-center gap-1 bg-public-surface p-1 rounded-xl border border-public-border">
                    {QUICK_AMOUNTS.map((amt) => {
                      const isSelected = selectedAmount === amt;
                      return (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setSelectedAmount(amt)}
                          className={`min-h-[44px] px-3 py-1.5 rounded-full text-xs font-semibold tabular-nums transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-public-ink text-white'
                              : 'text-public-ink-muted hover:text-public-ink'
                          }`}
                        >
                          GHS {amt}
                        </button>
                      );
                    })}
                  </div>
                }
              />

              <div className="grid md:grid-cols-3 gap-6">
                {PARTNERSHIP_TIERS.map((tier) => (
                  <div
                    key={tier.id}
                    className={`h-full rounded-xl p-7 flex flex-col justify-between gap-6 border transition-colors ${
                      tier.recommended
                        ? 'bg-public-ink text-white border-public-ink shadow-lg'
                        : 'bg-public-surface border-public-border text-public-ink'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-semibold uppercase tracking-[0.12em] ${
                            tier.recommended ? 'text-public-accent-light' : 'text-public-accent'
                          }`}
                        >
                          {tier.category}
                        </span>
                        {tier.recommended && (
                          <span className="px-2.5 py-0.5 rounded-md bg-public-accent-light text-public-ink text-xs font-semibold">
                            Recommended
                          </span>
                        )}
                      </div>
                      <h3 className="font-bold text-2xl tracking-tight">{tier.name}</h3>
                      <p className="text-2xl font-extrabold tabular-nums">GHS {tier.amount}</p>
                      <p
                        className={`text-base leading-relaxed ${
                          tier.recommended ? 'text-white/80' : 'text-public-ink-muted'
                        }`}
                      >
                        {tier.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenSponsor(tier.category, tier.amount)}
                      className={`min-h-[44px] w-full py-3 px-5 rounded-full font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                        tier.recommended
                          ? 'bg-public-accent-light hover:bg-white text-public-ink'
                          : 'bg-public-ink hover:bg-public-accent text-white'
                      }`}
                    >
                      <span>Sow GHS {tier.amount}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Secure Online Payment Gateway Banner */}
            <div className="p-8 sm:p-12 rounded-xl bg-public-ink text-white border border-public-ink flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-3 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-public-accent-light text-xs font-semibold uppercase tracking-[0.14em]">
                  <Lock className="w-3.5 h-3.5" />{' '}
                  {sponsorshipSettings?.gatewayBadge || 'Paystack Instant Gateway'}
                </div>
                <h2 className="text-h2 font-bold text-white tracking-tight">
                  {sponsorshipSettings?.gatewayTitle || 'One-Click Online Giving & Project Sponsorship'}
                </h2>
                <p className="text-white/80 text-base max-w-xl leading-relaxed">
                  {sponsorshipSettings?.gatewaySubtitle ||
                    'Send tithes, offerings, covenant seeds, and project donations securely in seconds using MTN Mobile Money, Telecel Cash, AT Money, Visa, Mastercard, or Apple Pay.'}
                </p>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={() => handleOpenSponsor('Sanctuary Expansion & Building', selectedAmount)}
                  className="min-h-[48px] px-7 py-3.5 rounded-full bg-public-accent-light hover:bg-white text-public-ink font-semibold text-base transition-colors inline-flex items-center gap-2.5 cursor-pointer"
                >
                  <Heart className="w-4 h-4" />
                  <span>{sponsorshipSettings?.ctaButtonText || 'Give Online Now'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Sponsorship Projects Grid */}
            <div className="space-y-8">
              <SectionHeader
                eyebrow="Missions & Infrastructure"
                title="Active Kingdom"
                accent="Projects"
                description="Select a specific mission initiative below to partner toward completion."
              />

              {!projects || projects.length === 0 ? (
                <div className="p-10 sm:p-12 text-center rounded-xl bg-public-surface border border-public-border space-y-3">
                  <Heart className="w-8 h-8 text-public-accent mx-auto" />
                  <h3 className="text-2xl font-bold text-public-ink">No Projects Currently Active</h3>
                  <p className="text-base text-public-ink-muted max-w-md mx-auto leading-relaxed">
                    New kingdom projects will be published soon. In the meantime, you can donate directly using our online giving gateway.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="h-full p-7 rounded-xl bg-public-surface border border-public-border space-y-5 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em]">
                          <span className="text-public-accent">{proj.category}</span>
                          <span className="tabular-nums text-public-ink">{proj.percent}% Funded</span>
                        </div>

                        <h3 className="font-bold text-2xl text-public-ink tracking-tight">{proj.title}</h3>
                        <p className="text-base text-public-ink-muted leading-relaxed">{proj.description}</p>
                      </div>

                      <div className="space-y-4 pt-2">
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-sm text-public-ink-muted tabular-nums">
                            <span>
                              Raised: <strong className="text-public-ink">{proj.raised}</strong>
                            </span>
                            <span>
                              Target: <strong className="text-public-ink">{proj.target}</strong>
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-public-canvas border border-public-border overflow-hidden">
                            <div
                              style={{ width: `${Math.min(100, Math.max(0, proj.percent))}%` }}
                              className="h-full bg-public-accent transition-all duration-300"
                            />
                          </div>
                        </div>

                        <div className="pt-3 flex items-center justify-between border-t border-public-border gap-3">
                          <span className="text-sm text-public-ink-muted truncate max-w-[180px] sm:max-w-xs">
                            {proj.impact}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleOpenSponsor(proj.title)}
                            className="min-h-[44px] px-5 py-2 rounded-full bg-public-ink hover:bg-public-accent text-white font-semibold text-sm transition-colors inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                          >
                            <span>Sponsor</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
