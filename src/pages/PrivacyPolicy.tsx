import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { BranchModal } from '../components/BranchModal';
import { GivingModal } from '../components/GivingModal';
import { PrayerModal } from '../components/PrayerModal';
import { MobileQuickBar } from '../components/MobileQuickBar';
import { usePageTitle } from '../utils/usePageTitle';
import { useChurch } from '../context/ChurchContext';
import { toTelUrl, toInternationalDisplay } from '../utils/phoneUtils';

export const PrivacyPolicy = () => {
  usePageTitle('Privacy Policy');
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
    <div className="relative isolate min-h-screen bg-sanctuary-alabaster text-ink-primary selection:bg-gold-600 selection:text-sanctuary-alabaster pb-16 md:pb-0 overflow-x-clip">
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
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-secondary hover:text-gold-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Homepage
            </Link>
            <span className="text-[11px] font-mono text-gold-600 uppercase font-semibold">
              Last Updated: September 2026
            </span>
          </div>

          {/* Header */}
          <div className="space-y-4 border-b border-sanctuary-stone pb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sanctuary-parchment border border-sanctuary-stone text-gold-600 text-xs font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-gold-600" />
              <span>Official Privacy Policy</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-ink-primary tracking-tight">
              Privacy Policy &amp; Data Protection
            </h1>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-2xl font-light">
              Rhema Inner Court Gospel Church (Worldwide) is committed to safeguarding the privacy, personal details, and confidential prayer petitions of our congregation, online visitors, and kingdom partners.
            </p>
          </div>

          {/* Policy Sections Container */}
          <div className="space-y-6 text-ink-secondary text-sm leading-relaxed">
            {/* Section 1 */}
            <section className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/78 backdrop-blur-md border border-sanctuary-stone space-y-4">
              <h2 className="text-xl font-bold font-serif text-ink-primary flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-xs font-bold font-mono">1</span>
                Information We Collect
              </h2>
              <p>
                When you interact with our website, join our services, or submit inquiries, we may collect the following personal information:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-ink-secondary text-xs sm:text-sm">
                <li><strong className="text-ink-primary">Contact Details:</strong> Your name, phone number, WhatsApp contact, and email address submitted voluntarily through our inquiry or prayer forms.</li>
                <li><strong className="text-ink-primary">Prayer Requests &amp; Testimonies:</strong> Prayer petitions, spiritual counseling topics, and praise reports shared with our pastoral council.</li>
                <li><strong className="text-ink-primary">Donation Transaction References:</strong> Transaction metadata, receipt email addresses, giving categories, and payment references generated by our payment partner, Paystack. We do not store credit card numbers or Mobile Money PINs.</li>
                <li><strong className="text-ink-primary">Device and Diagnostic Data:</strong> Anonymous metrics regarding browser type, device category (mobile, desktop, tablet), and pages visited to improve our ministry website.</li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/78 backdrop-blur-md border border-sanctuary-stone space-y-4">
              <h2 className="text-xl font-bold font-serif text-ink-primary flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-xs font-bold font-mono">2</span>
                Pastoral Confidentiality &amp; Prayer Petitions
              </h2>
              <p>
                Every prayer request submitted to Rhema Inner Court Gospel Church (Worldwide) is treated with absolute pastoral reverence and confidentiality. Prayer petitions marked as confidential are restricted exclusively to General Overseer Rev. Nicholas Dobeng and the ordained intercessory prayer team.
              </p>
              <div className="p-4 rounded-xl bg-white/85 border border-gold-500/30 text-xs space-y-1">
                <p className="font-bold text-gold-600">Sacred Trust Covenant</p>
                <p className="text-ink-secondary">
                  We will never sell, rent, lease, or publicly disclose your private prayer requests, phone numbers, or spiritual petitions to any third party under any circumstance.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/78 backdrop-blur-md border border-sanctuary-stone space-y-4">
              <h2 className="text-xl font-bold font-serif text-ink-primary flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-xs font-bold font-mono">3</span>
                Online Giving &amp; Payment Security
              </h2>
              <p>
                All digital tithes, offerings, covenant seeds, and project sponsorship contributions processed through this website are handled by <strong className="text-ink-primary">Paystack</strong>, a leading PCI-DSS Level 1 certified payment gateway provider.
              </p>
              <ul className="space-y-2 list-disc pl-5 text-ink-secondary text-xs sm:text-sm">
                <li>All payment data is encrypted using industry standard 256-bit SSL encryption.</li>
                <li>Direct payments via MTN Mobile Money, Telecel Cash, AT Money, Visa, Mastercard, and Apple Pay are authenticated directly between you and your financial provider.</li>
                <li>The church only receives official transaction status updates and reference codes to confirm receipt of funds.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/78 backdrop-blur-md border border-sanctuary-stone space-y-4">
              <h2 className="text-xl font-bold font-serif text-ink-primary flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-xs font-bold font-mono">4</span>
                Cookies &amp; Local Storage Usage
              </h2>
              <p>
                Our website utilizes essential local storage and cookie tokens to enhance your browsing experience:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-ink-secondary text-xs sm:text-sm">
                <li><strong className="text-ink-primary">Essential Preference Tokens:</strong> Storing branch schedule selection, prayer form states, and administrative session authentication.</li>
                <li><strong className="text-ink-primary">Consent Management:</strong> Storing your cookie banner choices so you are not prompted repeatedly on each visit.</li>
                <li><strong className="text-ink-primary">Diagnostics &amp; Analytics:</strong> Measuring overall engagement with weekly sermon livestreams and event announcements.</li>
              </ul>
              <p className="pt-2">
                You can adjust your cookie preferences at any time by clicking &ldquo;Cookie Settings&rdquo; in our footer or clearing your browser cookies.
              </p>
            </section>

            {/* Section 5 */}
            <section className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/78 backdrop-blur-md border border-sanctuary-stone space-y-4">
              <h2 className="text-xl font-bold font-serif text-ink-primary flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-xs font-bold font-mono">5</span>
                Your Rights &amp; Data Deletion
              </h2>
              <p>
                You retain complete authority over your personal information. You may request to review, update, or permanently delete any inquiry or contact details stored in our database at any time by contacting the church secretariat.
              </p>
            </section>

            {/* Section 6: Contact Secretariat */}
            <section className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/78 backdrop-blur-md border border-sanctuary-stone space-y-4">
              <h2 className="text-xl font-bold font-serif text-ink-primary flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-xs font-bold font-mono">6</span>
                Contact Pastoral Secretariat
              </h2>
              <p>
                If you have any questions or concerns regarding this Privacy Policy or your personal information, please reach out to our administrative office:
              </p>
              <div className="grid sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-4 rounded-xl bg-white/90 border border-sanctuary-stone space-y-1">
                  <Mail className="w-4 h-4 text-gold-600 mb-1" />
                  <p className="font-bold text-ink-primary">Email Address</p>
                  <a href={`mailto:${churchInfo.contact.email}`} className="text-gold-600 hover:underline font-medium">
                    {churchInfo.contact.email}
                  </a>
                </div>
                <div className="p-4 rounded-xl bg-white/90 border border-sanctuary-stone space-y-1">
                  <Phone className="w-4 h-4 text-gold-600 mb-1" />
                  <p className="font-bold text-ink-primary">Telephone / WhatsApp</p>
                  <a href={toTelUrl(churchInfo.contact.phone)} className="text-gold-600 hover:underline font-mono tabular-nums font-medium">
                    {toInternationalDisplay(churchInfo.contact.phone)}
                  </a>
                </div>
                <div className="p-4 rounded-xl bg-white/90 border border-sanctuary-stone space-y-1">
                  <MapPin className="w-4 h-4 text-gold-600 mb-1" />
                  <p className="font-bold text-ink-primary">Headquarters</p>
                  <p className="text-ink-secondary">Mallam Cathedral, Accra, Ghana</p>
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

export default PrivacyPolicy;
