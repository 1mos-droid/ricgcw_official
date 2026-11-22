import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../sections/Hero';
import { BranchesSchedules } from '../sections/BranchesSchedules';
import { WelcomeOverseer } from '../sections/WelcomeOverseer';
import { Ministries } from '../sections/Ministries';
import { MediaHub } from '../sections/MediaHub';
import { Events } from '../sections/Events';
import { Connect } from '../sections/Connect';
import { Footer } from '../components/Footer';
import { BranchModal } from '../components/BranchModal';
import { GivingModal } from '../components/GivingModal';
import { PrayerModal } from '../components/PrayerModal';
import { MobileQuickBar } from '../components/MobileQuickBar';
import { usePageTitle } from '../utils/usePageTitle';

export function Home() {
  usePageTitle();
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string | undefined>(undefined);
  const [isGivingModalOpen, setIsGivingModalOpen] = useState(false);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);
  const [prayerDefaults, setPrayerDefaults] = useState<{ category?: string; message?: string }>({});

  const openBranchModal = (branchId?: string) => {
    setSelectedBranchId(branchId);
    setIsBranchModalOpen(true);
  };

  const openPrayerModal = (defaults?: { category?: string; message?: string }) => {
    setPrayerDefaults(defaults || {});
    setIsPrayerModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-public-canvas text-public-ink pb-16 md:pb-0 overflow-x-clip">
      <Navbar
        onOpenBranchModal={openBranchModal}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
        onOpenPrayerModal={() => openPrayerModal()}
      />

      <main id="main-content" className="relative z-10">
        <Hero
          onOpenBranchModal={openBranchModal}
          onOpenGivingModal={() => setIsGivingModalOpen(true)}
          onOpenPrayerModal={() => openPrayerModal()}
        />

        <BranchesSchedules onOpenBranchModal={openBranchModal} />

        <WelcomeOverseer
          onOpenBranchModal={openBranchModal}
          onOpenPrayerModal={() => openPrayerModal()}
        />

        <Ministries
          onOpenBranchModal={openBranchModal}
          onOpenPrayerModal={() => openPrayerModal()}
          onConnectMinistry={(ministryName) =>
            openPrayerModal({
              category: 'Spiritual Growth & Guidance',
              message: `I would like to connect with the ${ministryName}. Please reach out with next steps.`,
            })
          }
        />

        <MediaHub onOpenPrayerModal={() => openPrayerModal()} />

        <Events
          onOpenBranchModal={openBranchModal}
          onOpenPrayerModal={() => openPrayerModal()}
        />

        <Connect
          onOpenBranchModal={openBranchModal}
          onOpenPrayerModal={() => openPrayerModal()}
        />
      </main>

      <Footer
        onOpenBranchModal={openBranchModal}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
        onOpenPrayerModal={() => openPrayerModal()}
      />

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
      />
      <PrayerModal
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
        defaultCategory={prayerDefaults.category}
        defaultMessage={prayerDefaults.message}
      />
    </div>
  );
}

export default Home;
