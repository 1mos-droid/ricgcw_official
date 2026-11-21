import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileCheck, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BranchModal } from '../components/BranchModal';
import { GivingModal } from '../components/GivingModal';
import { PrayerModal } from '../components/PrayerModal';
import { MobileQuickBar } from '../components/MobileQuickBar';
import { usePageTitle } from '../utils/usePageTitle';
import { useChurch } from '../context/ChurchContext';
import { toTelUrl, toInternationalDisplay } from '../utils/phoneUtils';

export const TermsOfService = () => {
  usePageTitle('Terms of Service');
  const { churchInfo } = useChurch();
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string | undefined>(undefined);
  const [isGivingModalOpen, setIsGivingModalOpen] = useState(false);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);

  const openBranchModal = (branchId?: string) => {
    setSelectedBranchId(branchId);
    setIsBranchModalOpen(true);
  };

  return (
    <div className="relative isolate min-h-screen bg-[#FAF8F5] text-[#141619] selection:bg-[#B8860B] selection:text-[#FAF8F5] pb-16 md:pb-0 overflow-x-clip">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-subtle-pattern opacity-35" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[780px] h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(184,134,11,0.12)_0%,transparent_70%)] blur-[90px]" />
      </div>

      <Navbar
        onOpenBranchModal={openBranchModal}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
        onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
      />

      <main className="relative z-10 pt-32 sm:pt-36 pb-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {/* Top Breadcrumb */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4A5058] hover:text-[#B8860B] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Homepage
            </Link>
            <span className="text-[11px] font-mono text-[#B8860B] uppercase font-semibold">
              Last Updated: September 2026
            </span>
          </div>

          {/* Header */}
          <div className="space-y-4 border-b border-[#E6E0D3] pb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F3EFE6] border border-[#E6E0D3] text-[#B8860B] text-xs font-bold uppercase tracking-wider">
              <FileCheck className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Official Terms of Service</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-[#141619] tracking-tight">
              Terms of Service &amp; Ministry Guidelines
            </h1>
            <p className="text-sm sm:text-base text-[#4A5058] leading-relaxed max-w-2xl font-light">
              Welcome to the official digital platform of Rhema Inner Court Gospel Church (Worldwide). By accessing our website, you agree to the following sacred and administrative terms.
            </p>
          </div>

          {/* Terms Container */}
          <div className="space-y-6 text-[#4A5058] text-sm leading-relaxed">
            {/* Section 1 */}
            <section className="p-6 sm:p-8 rounded-2xl bg-[#F3EFE6]/78 backdrop-blur-md border border-[#E6E0D3] space-y-4">
              <h2 className="text-xl font-bold font-serif text-[#141619] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#B8860B]/15 text-[#B8860B] border border-[#B8860B]/25 flex items-center justify-center text-xs font-bold font-mono">1</span>
                Acceptance of Terms
              </h2>
              <p>
                By browsing, visiting, or utilizing any feature of the Rhema Inner Court Gospel Church (Worldwide) website (ricgcw.me), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, along with our Privacy Policy. If you do not agree with any part of these terms, you may refrain from using this website.
              </p>
            </section>

            {/* Section 2 */}
            <section className="p-6 sm:p-8 rounded-2xl bg-[#F3EFE6]/78 backdrop-blur-md border border-[#E6E0D3] space-y-4">
              <h2 className="text-xl font-bold font-serif text-[#141619] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#B8860B]/15 text-[#B8860B] border border-[#B8860B]/25 flex items-center justify-center text-xs font-bold font-mono">2</span>
                Ministry Purpose &amp; Respectful Use
              </h2>
              <p>
                This platform is dedicated to proclaiming the Gospel of Jesus Christ, shepherding believers, broadcasting apostolic teachings, publishing gathering schedules, and facilitating kingdom giving.
              </p>
              <ul className="space-y-2 list-disc pl-5 text-[#4A5058] text-xs sm:text-sm">
                <li>Users agree to use all contact forms, prayer altars, and interactive tools in good faith and with Christian reverence.</li>
                <li>Any abusive, profane, fraudulent, or harassing submissions sent through our portal will result in immediate disqualification and potential blocking by network administrators.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="p-6 sm:p-8 rounded-2xl bg-[#F3EFE6]/78 backdrop-blur-md border border-[#E6E0D3] space-y-4">
              <h2 className="text-xl font-bold font-serif text-[#141619] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#B8860B]/15 text-[#B8860B] border border-[#B8860B]/25 flex items-center justify-center text-xs font-bold font-mono">3</span>
                Online Giving, Tithes &amp; Project Sponsorship
              </h2>
              <p>
                All financial contributions, tithes, freewill offerings, theme seeds, and mission sponsorships made via our Paystack gateway are voluntary acts of worship and partnership with God&apos;s work.
              </p>
              <div className="p-4 rounded-xl bg-white/85 border border-[#B8860B]/30 text-xs space-y-1.5">
                <p className="font-bold text-[#B8860B]">Contribution Policy</p>
                <p className="text-[#4A5058]">
                  Because financial seeds are voluntary spiritual contributions deployed directly to church welfare, rural crusades, building projects, and ministry operations, online donations are generally non-refundable. However, if an accidental duplicate transaction occurs, please contact our secretariat within 7 days with your Paystack payment reference for prompt reconciliation.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="p-6 sm:p-8 rounded-2xl bg-[#F3EFE6]/78 backdrop-blur-md border border-[#E6E0D3] space-y-4">
              <h2 className="text-xl font-bold font-serif text-[#141619] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#B8860B]/15 text-[#B8860B] border border-[#B8860B]/25 flex items-center justify-center text-xs font-bold font-mono">4</span>
                Intellectual Property &amp; Media Rights
              </h2>
              <p>
                All sermon audio, livestream recordings, event artwork, ministry logos, photographs of our General Overseer and pastoral council, and written publications published on this site are the intellectual property of Rhema Inner Court Gospel Church (Worldwide).
              </p>
              <ul className="space-y-2 list-disc pl-5 text-[#4A5058] text-xs sm:text-sm">
                <li>You are encouraged to share links, sermon excerpts, and scripture devotionals for personal edification and non-commercial evangelism.</li>
                <li>Reproduction, commercial resale, or unauthorized alteration of church media without prior written permission from the General Overseer&apos;s office is strictly prohibited.</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="p-6 sm:p-8 rounded-2xl bg-[#F3EFE6]/78 backdrop-blur-md border border-[#E6E0D3] space-y-4">
              <h2 className="text-xl font-bold font-serif text-[#141619] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#B8860B]/15 text-[#B8860B] border border-[#B8860B]/25 flex items-center justify-center text-xs font-bold font-mono">5</span>
                External Links &amp; Third-Party Services
              </h2>
              <p>
                Our platform contains direct links to third-party services including YouTube (sermon streams), Facebook, Instagram, Google Maps (sanctuary navigation), and Paystack (payment processing). We do not control and are not responsible for the independent terms or privacy practices of these third-party platforms.
              </p>
            </section>

            {/* Section 6 */}
            <section className="p-6 sm:p-8 rounded-2xl bg-[#F3EFE6]/78 backdrop-blur-md border border-[#E6E0D3] space-y-4">
              <h2 className="text-xl font-bold font-serif text-[#141619] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#B8860B]/15 text-[#B8860B] border border-[#B8860B]/25 flex items-center justify-center text-xs font-bold font-mono">6</span>
                Governing Law &amp; Jurisdiction
              </h2>
              <p>
                These Terms of Service are governed by and construed in accordance with the laws of the Republic of Ghana. Any disputes arising out of the use of this website shall be resolved amicably through Christian arbitration and the competent courts of Greater Accra, Ghana.
              </p>
            </section>

            {/* Section 7 */}
            <section className="p-6 sm:p-8 rounded-2xl bg-[#F3EFE6]/78 backdrop-blur-md border border-[#E6E0D3] space-y-4">
              <h2 className="text-xl font-bold font-serif text-[#141619] flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#B8860B]/15 text-[#B8860B] border border-[#B8860B]/25 flex items-center justify-center text-xs font-bold font-mono">7</span>
                Secretariat Inquiries
              </h2>
              <p>
                For any formal inquiries, wedding/dedication bookings, or questions about these terms, please contact:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-white/90 border border-[#E6E0D3] space-y-1">
                  <Mail className="w-4 h-4 text-[#B8860B] mb-1" />
                  <p className="font-bold text-[#141619]">Email</p>
                  <a href={`mailto:${churchInfo.contact.email}`} className="text-[#B8860B] hover:underline font-medium">
                    {churchInfo.contact.email}
                  </a>
                </div>
                <div className="p-4 rounded-xl bg-white/90 border border-[#E6E0D3] space-y-1">
                  <Phone className="w-4 h-4 text-[#B8860B] mb-1" />
                  <p className="font-bold text-[#141619]">Phone</p>
                  <a href={toTelUrl(churchInfo.contact.phone)} className="text-[#B8860B] hover:underline font-mono tabular-nums font-medium">
                    {toInternationalDisplay(churchInfo.contact.phone)}
                  </a>
                </div>
                <div className="p-4 rounded-xl bg-white/90 border border-[#E6E0D3] space-y-1">
                  <MapPin className="w-4 h-4 text-[#B8860B] mb-1" />
                  <p className="font-bold text-[#141619]">Main Cathedral</p>
                  <p className="text-[#4A5058]">Mallam-Gbawe Road, Accra, Ghana</p>
                </div>
              </div>
            </section>
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
      />
      <PrayerModal
        isOpen={isPrayerModalOpen}
        onClose={() => setIsPrayerModalOpen(false)}
      />
    </div>
  );
};

export default TermsOfService;
