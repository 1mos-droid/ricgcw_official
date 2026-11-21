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
import { PICTURES, IMAGE_DIMENSIONS } from '../data/churchData';
import { trackPageView } from '../utils/analytics';
import { usePageTitle } from '../utils/usePageTitle';
import ResponsiveImage from '../components/ResponsiveImage';

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
          CONSTANT COMPOSITE SANCTUARY CANVAS (Fixed GPU-friendly Background)
          Uses a single multi-stop CSS radial gradient + soft ambient motif
          (zero heavy blur filter stacking for smooth 60fps scrolling).
      ===================================================================== */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden sanctuary-composite-canvas" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.06] mix-blend-multiply">
          <ResponsiveImage
            src={PICTURES.theme}
            alt=""
            decorative
            width={IMAGE_DIMENSIONS.theme.width}
            height={IMAGE_DIMENSIONS.theme.height}
            sizes="100vw"
            pictureClassName="w-full h-full block"
            className="w-full h-full object-cover object-center saturate-75"
          />
        </div>
        <div className="absolute inset-0 bg-subtle-pattern opacity-35" />
      </div>

      {/* Navigation */}
      <Navbar
        onOpenBranchModal={openBranchModal}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
        onOpenPrayerModal={() => openPrayerModal()}
      />

      {/* Main Content Sections */}
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

        {/* Movement IV: The Living Word & Prayer Altar */}
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
