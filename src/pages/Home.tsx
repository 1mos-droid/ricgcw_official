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
    <div className="relative min-h-screen bg-sanctuary-alabaster text-ink-primary selection:bg-sanctuary-950 selection:text-gold-400 pb-16 md:pb-0 overflow-x-clip">
      {/* Navigation */}
      <Navbar
        onOpenBranchModal={openBranchModal}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
        onOpenPrayerModal={() => openPrayerModal()}
      />

      {/* Seamless Architectural Color-World Chapters */}
      <main id="main-content" className="relative">
        {/* Chapter 00: Deep Forest Emerald Threshold & Kinetic Scroll Ribbon */}
        <Hero
          onOpenBranchModal={openBranchModal}
          onOpenGivingModal={() => setIsGivingModalOpen(true)}
          onOpenPrayerModal={() => openPrayerModal()}
        />

        {/* Chapter 01–02: Sunlit Travertine Apostolic Monograph & Tabernacle Monoliths */}
        <WelcomeOverseer
          onOpenBranchModal={openBranchModal}
          onOpenPrayerModal={() => openPrayerModal()}
        />

        {/* Chapter 03: Deep Forest Emerald Sanctuaries & Panoramic Fellowship */}
        <BranchesSchedules
          onOpenBranchModal={openBranchModal}
        />

        {/* Chapter 04: Sunlit Travertine Interactive Ministry Index */}
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

        {/* Chapter 05: Warm Espresso Obsidian Broadcast Cinema & Prayer Altar */}
        <MediaHub
          onOpenPrayerModal={() => openPrayerModal()}
        />

        {/* Chapter 06: Warm Sand Linen Calendar Exhibition */}
        <Events
          onOpenBranchModal={openBranchModal}
          onOpenPrayerModal={() => openPrayerModal()}
        />

        {/* Chapter 07: Sunlit Travertine Concierge & Pastoral Correspondence */}
        <Connect
          onOpenBranchModal={openBranchModal}
          onOpenPrayerModal={() => openPrayerModal()}
        />
      </main>

      {/* Deep Forest Emerald Monumental Finale */}
      <Footer
        onOpenBranchModal={openBranchModal}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
        onOpenPrayerModal={() => openPrayerModal()}
      />

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
