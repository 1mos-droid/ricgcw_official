import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../sections/Hero';
import { WelcomeOverseer } from '../sections/WelcomeOverseer';
import { BranchesSchedules } from '../sections/BranchesSchedules';
import Ministries from '../sections/Ministries';
import MediaHub from '../sections/MediaHub';
import Events from '../sections/Events';
import Connect from '../sections/Connect';
import { BranchModal } from '../components/BranchModal';
import { GivingModal } from '../components/GivingModal';
import { PrayerModal } from '../components/PrayerModal';
import { MobileQuickBar } from '../components/MobileQuickBar';
import { IMAGES } from '../data/churchData';
import { trackPageView } from '../utils/analytics';
import { usePageTitle } from '../utils/usePageTitle';

interface PrayerPrefill {
  category?: string;
  message?: string;
}

export const Home = () => {
  usePageTitle('Home • 2026: Divine Manifestation');
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string | undefined>(undefined);
  const [isGivingModalOpen, setIsGivingModalOpen] = useState(false);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [prayerPrefill, setPrayerPrefill] = useState<PrayerPrefill | undefined>(undefined);

  useEffect(() => {
    trackPageView('Home');
  }, []);

  const openBranchModal = (branchId?: string) => {
    setSelectedBranchId(branchId);
    setIsBranchModalOpen(true);
  };

  const openPrayerModal = (prefill?: PrayerPrefill) => {
    setPrayerPrefill(prefill);
    setIsPrayerModalOpen(true);
  };

  return (
    <div className="relative isolate min-h-screen bg-sanctuary-alabaster text-ink-primary selection:bg-gold-600 selection:text-sanctuary-alabaster pb-16 md:pb-0 overflow-x-clip">
      {/* =====================================================================
          CONSTANT ATMOSPHERIC SANCTUARY CANVAS (Fixed Background Layer)
          Anchors a continuous, tranquil sanctuary atmosphere with morning light
          and subtle sacred depth that gently reveals as sections scroll over it.
      ===================================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        {/* Base Cathedral Alabaster Tint */}
        <div className="absolute inset-0 bg-sanctuary-alabaster" />

        {/* Ambient Sanctuary Worship Texture with Soft Blur */}
        <div className="absolute inset-0 opacity-[0.085] mix-blend-multiply">
          <img
            src={IMAGES.theme || IMAGES.overseer}
            alt=""
            className="w-full h-full object-cover object-center scale-105 filter blur-[2px] saturate-75 contrast-110"
          />
        </div>

        {/* Subtle Architectural Limestone Grain */}
        <div className="absolute inset-0 bg-subtle-pattern opacity-35" />

        {/* Ambient Golden Radial Light Blooms (Sunlight in Cathedral Hall) */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[920px] h-[640px] bg-[radial-gradient(ellipse_at_center,rgba(184,134,11,0.16)_0%,transparent_70%)] blur-[90px]" />
        <div className="absolute top-[28%] -left-32 w-[650px] h-[650px] bg-[radial-gradient(ellipse_at_center,rgba(223,197,123,0.14)_0%,transparent_70%)] blur-[100px]" />
        <div className="absolute top-[60%] -right-32 w-[720px] h-[720px] bg-[radial-gradient(ellipse_at_center,rgba(184,134,11,0.12)_0%,transparent_70%)] blur-[110px]" />
        <div className="absolute bottom-8 left-1/3 w-[600px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(200,75,49,0.06)_0%,transparent_70%)] blur-[120px]" />

        {/* Subtle Sacred Parchment Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(230,224,211,0.45)_100%)]" />
      </div>

      {/* Navigation */}
      <Navbar
        onOpenBranchModal={openBranchModal}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
        onOpenPrayerModal={() => openPrayerModal()}
      />

      {/* Main Content Sections: 5 Architectural Movements */}
      <main id="main-content" className="relative z-10">
        {/* Movement I: The Threshold (Hero + Integrated Campus Dock) */}
        <Hero
          onOpenBranchModal={openBranchModal}
          onOpenGivingModal={() => setIsGivingModalOpen(true)}
          onOpenPrayerModal={() => openPrayerModal()}
        />

        {/* Movement II: The Shepherd's Welcome & Covenant Identity */}
        <WelcomeOverseer
          onOpenBranchModal={openBranchModal}
          onOpenPrayerModal={() => openPrayerModal()}
        />

        {/* Movement III: The Three Sanctuaries (Split Architectural Showcase) */}
        <BranchesSchedules
          onOpenBranchModal={openBranchModal}
        />

        {/* Movement IV: The Living Word & Prayer Altar (Deep Sanctuary Theater) */}
        <MediaHub
          onOpenPrayerModal={() => openPrayerModal()}
        />

        {/* Movement V: Life in the Kingdom (Ministries Bento, Calendar & Connect) */}
        <Ministries
          onOpenBranchModal={openBranchModal}
          onOpenPrayerModal={() => openPrayerModal()}
          onConnectMinistry={(ministryName) =>
            openPrayerModal({
              category: 'Spiritual Growth & Guidance',
              message: `Shalom Pastoral Team, I would like to connect with and serve in the ${ministryName} fellowship.`,
            })
          }
        />
        <Events
          onOpenBranchModal={openBranchModal}
          onOpenPrayerModal={() => openPrayerModal()}
        />
        <Connect
          onOpenBranchModal={openBranchModal}
          onOpenPrayerModal={() => openPrayerModal()}
        />
      </main>

      {/* Footer */}
      <div className="relative z-10">
        <Footer
          onOpenBranchModal={openBranchModal}
          onOpenGivingModal={() => setIsGivingModalOpen(true)}
          onOpenPrayerModal={() => openPrayerModal()}
        />
      </div>

      {/* Mobile Sticky Action Bar */}
      <MobileQuickBar
        onOpenBranchModal={openBranchModal}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
      />

      {/* Modals */}
      <BranchModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        defaultBranchId={selectedBranchId}
      />
      <GivingModal
        isOpen={isGivingModalOpen}
        onClose={() => setIsGivingModalOpen(false)}
      />
      <PrayerModal
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
        defaultCategory={prayerPrefill?.category}
        defaultMessage={prayerPrefill?.message}
      />
    </div>
  );
};

export default Home;
