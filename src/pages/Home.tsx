import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../sections/Hero';
import { WelcomeOverseer } from '../sections/WelcomeOverseer';
import { BranchesSchedules } from '../sections/BranchesSchedules';
import About from '../sections/About';
import Identity from '../sections/Identity';
import Ministries from '../sections/Ministries';
import MediaHub from '../sections/MediaHub';
import Events from '../sections/Events';
import Connect from '../sections/Connect';
import { BranchModal } from '../components/BranchModal';
import { GivingModal } from '../components/GivingModal';
import { PrayerModal } from '../components/PrayerModal';

export const Home = () => {
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [isGivingModalOpen, setIsGivingModalOpen] = useState(false);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070c18] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Navigation */}
      <Navbar
        onOpenBranchModal={() => setIsBranchModalOpen(true)}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
        onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onOpenBranchModal={() => setIsBranchModalOpen(true)}
          onOpenGivingModal={() => setIsGivingModalOpen(true)}
          onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
        />
        <WelcomeOverseer
          onOpenBranchModal={() => setIsBranchModalOpen(true)}
          onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
        />
        <BranchesSchedules
          onOpenBranchModal={() => setIsBranchModalOpen(true)}
        />
        <About />
        <Identity />
        <Ministries
          onOpenBranchModal={() => setIsBranchModalOpen(true)}
          onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
        />
        <MediaHub />
        <Events
          onOpenBranchModal={() => setIsBranchModalOpen(true)}
          onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
        />
        <Connect
          onOpenBranchModal={() => setIsBranchModalOpen(true)}
          onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenBranchModal={() => setIsBranchModalOpen(true)}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
        onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
      />

      {/* Modals */}
      <BranchModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
      />
      <GivingModal
        isOpen={isGivingModalOpen}
        onClose={() => setIsGivingModalOpen(false)}
      />
      <PrayerModal
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
      />
    </div>
  );
};

export default Home;
