import { useState } from 'react';
import { Link } from 'react-router-dom';
import { m, useScroll, useReducedMotion } from 'framer-motion';
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
import { useActiveSection } from '../hooks/useActiveSection';
import { Reveal } from '../components/motion';

const PRIVACY_SECTIONS = [
  { id: 'privacy-1', num: '1', label: 'Data Collected' },
  { id: 'privacy-2', num: '2', label: 'Pastoral Confidentiality' },
  { id: 'privacy-3', num: '3', label: 'Online Giving & Security' },
  { id: 'privacy-4', num: '4', label: 'Cookies & Local Storage' },
  { id: 'privacy-5', num: '5', label: 'Your Rights & Deletion' },
  { id: 'privacy-6', num: '6', label: 'Contact Secretariat' },
] as const;

const SECTION_IDS = PRIVACY_SECTIONS.map((s) => s.id);

export const PrivacyPolicy = () => {
  usePageTitle('Privacy Policy');
  const { churchInfo } = useChurch();
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState<string | undefined>(undefined);
  const [isGivingModalOpen, setIsGivingModalOpen] = useState(false);
  const [isPrayerModalOpen, setIsPrayerModalOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();
  const activeSection = useActiveSection(SECTION_IDS, true);

  const openBranchModal = (branchId?: string) => {
    setSelectedBranchId(branchId);
    setIsBranchModalOpen(true);
  };

  return (
    <div className="relative isolate min-h-screen bg-sanctuary-alabaster text-ink-primary selection:bg-gold-600 selection:text-sanctuary-alabaster pb-16 md:pb-0 overflow-x-clip">
      {/* Top Reading Progress Bar */}
      <m.div
        aria-hidden="true"
        style={prefersReduced ? undefined : { scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[3px] origin-left bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 z-[60] pointer-events-none"
      />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden sanctuary-composite-canvas" aria-hidden="true">
        <div className="absolute inset-0 bg-subtle-pattern opacity-35" />
      </div>

      <Navbar
        onOpenBranchModal={openBranchModal}
        onOpenGivingModal={() => setIsGivingModalOpen(true)}
        onOpenPrayerModal={() => setIsPrayerModalOpen(true)}
      />

      <main id="main-content" className="relative z-10 pt-32 sm:pt-36 pb-20 px-4 sm:px-6 md:px-8">
        <div className="max-w-6xl mx-auto space-y-10">
          {/* Top Breadcrumb */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Link
              to="/"
              className="min-h-[44px] inline-flex items-center gap-2 text-caption font-bold uppercase tracking-wider text-ink-secondary hover:text-gold-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Return to Homepage
            </Link>
            <span className="text-eyebrow font-mono text-gold-600 uppercase font-semibold">
              Last Updated: September 2026
            </span>
          </div>

          {/* Header */}
          <Reveal className="space-y-4 border-b border-sanctuary-stone pb-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sanctuary-parchment border border-sanctuary-stone text-gold-600 text-eyebrow font-bold uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5 text-gold-600" />
              <span>Official Privacy Policy</span>
            </div>
            <h1 className="text-h1 font-bold font-serif text-ink-primary tracking-tight">
              Privacy Policy &amp; Data Protection
            </h1>
            <p className="text-body sm:text-base text-ink-secondary leading-relaxed max-w-prose">
              Rhema Inner Court Gospel Church (Worldwide) is committed to safeguarding the privacy, personal details, and confidential prayer petitions of our congregation, online visitors, and kingdom partners.
            </p>
          </Reveal>

          {/* 2-Column Editorial Layout with Sticky Desktop TOC */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Sticky Table of Contents Sidebar */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-28">
              <nav
                aria-label="Privacy policy table of contents"
                className="p-6 rounded-2xl bg-sanctuary-parchment/85 border border-sanctuary-stone space-y-3"
              >
                <p className="text-eyebrow uppercase tracking-[0.2em] font-semibold text-gold-600">
                  Contents
                </p>
                <ul className="space-y-1.5">
                  {PRIVACY_SECTIONS.map((sec) => {
                    const isActive = activeSection === sec.id;
                    return (
                      <li key={sec.id}>
                        <a
                          href={`#${sec.id}`}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-caption transition-colors ${
                            isActive
                              ? 'bg-white text-ink-primary font-semibold border border-gold-500/35 shadow-2xs'
                              : 'text-ink-secondary hover:text-ink-primary hover:bg-white/60'
                          }`}
                        >
                          <span className="font-mono text-eyebrow text-gold-600 font-bold">{sec.num}.</span>
                          <span>{sec.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>

            {/* Prose Sections */}
            <div className="lg:col-span-8 space-y-6 text-ink-secondary text-body leading-relaxed">
              <section id="privacy-1" className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/85 border border-sanctuary-stone space-y-4">
                <h2 className="text-h3 font-bold font-serif text-ink-primary flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-caption font-bold font-mono shrink-0">1</span>
                  <span>Information We Collect</span>
                </h2>
                <p className="max-w-prose">
                  When you interact with our website, join our services, or submit inquiries, we may collect the following personal information:
                </p>
                <ul className="space-y-2.5 list-disc pl-5 text-ink-secondary text-body max-w-prose">
                  <li><strong className="text-ink-primary">Contact Details:</strong> Your name, phone number, WhatsApp contact, and email address submitted voluntarily through our inquiry or prayer forms.</li>
                  <li><strong className="text-ink-primary">Prayer Requests &amp; Testimonies:</strong> Prayer petitions, spiritual counseling topics, and praise reports shared with our pastoral council.</li>
                  <li><strong className="text-ink-primary">Donation Transaction References:</strong> Transaction metadata, receipt email addresses, giving categories, and payment references generated by our payment partner, Paystack. We do not store credit card numbers or Mobile Money PINs.</li>
                  <li><strong className="text-ink-primary">Device and Diagnostic Data:</strong> Anonymous metrics regarding browser type, device category (mobile, desktop, tablet), and pages visited to improve our ministry website.</li>
                </ul>
              </section>

              <section id="privacy-2" className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/85 border border-sanctuary-stone space-y-4">
                <h2 className="text-h3 font-bold font-serif text-ink-primary flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-caption font-bold font-mono shrink-0">2</span>
                  <span>Pastoral Confidentiality &amp; Prayer Petitions</span>
                </h2>
                <p className="max-w-prose">
                  Every prayer request submitted to Rhema Inner Court Gospel Church (Worldwide) is treated with absolute pastoral reverence and confidentiality. Prayer petitions marked as confidential are restricted exclusively to General Overseer Rev. Nicholas Dobeng and the ordained intercessory prayer team.
                </p>
                <div className="p-4 rounded-xl bg-white/90 border border-gold-500/30 text-caption space-y-1 max-w-prose">
                  <p className="font-bold text-gold-600">Sacred Trust Covenant</p>
                  <p className="text-ink-secondary">
                    We will never sell, rent, lease, or publicly disclose your private prayer requests, phone numbers, or spiritual petitions to any third party under any circumstance.
                  </p>
                </div>
              </section>

              <section id="privacy-3" className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/85 border border-sanctuary-stone space-y-4">
                <h2 className="text-h3 font-bold font-serif text-ink-primary flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-caption font-bold font-mono shrink-0">3</span>
                  <span>Online Giving &amp; Payment Security</span>
                </h2>
                <p className="max-w-prose">
                  All digital tithes, offerings, covenant seeds, and project sponsorship contributions processed through this website are handled by <strong className="text-ink-primary">Paystack</strong>, a leading PCI-DSS Level 1 certified payment gateway provider.
                </p>
                <ul className="space-y-2.5 list-disc pl-5 text-ink-secondary text-body max-w-prose">
                  <li>All payment data is encrypted using industry standard 256-bit SSL encryption.</li>
                  <li>Direct payments via MTN Mobile Money, Telecel Cash, AT Money, Visa, Mastercard, and Apple Pay are authenticated directly between you and your financial provider.</li>
                  <li>The church only receives official transaction status updates and reference codes to confirm receipt of funds.</li>
                </ul>
              </section>

              <section id="privacy-4" className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/85 border border-sanctuary-stone space-y-4">
                <h2 className="text-h3 font-bold font-serif text-ink-primary flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-caption font-bold font-mono shrink-0">4</span>
                  <span>Cookies &amp; Local Storage Usage</span>
                </h2>
                <p className="max-w-prose">
                  Our website utilizes essential local storage and cookie tokens to enhance your browsing experience:
                </p>
                <ul className="space-y-2.5 list-disc pl-5 text-ink-secondary text-body max-w-prose">
                  <li><strong className="text-ink-primary">Essential Preference Tokens:</strong> Storing branch schedule selection, prayer form states, and administrative session authentication.</li>
                  <li><strong className="text-ink-primary">Consent Management:</strong> Storing your cookie banner choices so you are not prompted repeatedly on each visit.</li>
                  <li><strong className="text-ink-primary">Diagnostics &amp; Analytics:</strong> Measuring overall engagement with weekly sermon livestreams and event announcements.</li>
                </ul>
                <p className="pt-1 max-w-prose">
                  You can adjust your cookie preferences at any time by clicking &ldquo;Cookie Settings&rdquo; in our footer or clearing your browser cookies.
                </p>
              </section>

              <section id="privacy-5" className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/85 border border-sanctuary-stone space-y-4">
                <h2 className="text-h3 font-bold font-serif text-ink-primary flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-caption font-bold font-mono shrink-0">5</span>
                  <span>Your Rights &amp; Data Deletion</span>
                </h2>
                <p className="max-w-prose">
                  You retain complete authority over your personal information. You may request to review, update, or permanently delete any inquiry or contact details stored in our database at any time by contacting the church secretariat.
                </p>
              </section>

              <section id="privacy-6" className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/85 border border-sanctuary-stone space-y-4">
                <h2 className="text-h3 font-bold font-serif text-ink-primary flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-caption font-bold font-mono shrink-0">6</span>
                  <span>Contact Pastoral Secretariat</span>
                </h2>
                <p className="max-w-prose">
                  If you have any questions or concerns regarding this Privacy Policy or your personal information, please reach out to our administrative office:
                </p>
                <div className="grid sm:grid-cols-3 gap-4 pt-2 text-caption">
                  <div className="p-4 rounded-xl bg-white/95 border border-sanctuary-stone space-y-1">
                    <Mail className="w-4 h-4 text-gold-600 mb-1" />
                    <p className="font-bold text-ink-primary">Email Address</p>
                    <a href={`mailto:${churchInfo.contact.email}`} className="text-gold-600 hover:underline font-medium break-all">
                      {churchInfo.contact.email}
                    </a>
                  </div>
                  <div className="p-4 rounded-xl bg-white/95 border border-sanctuary-stone space-y-1">
                    <Phone className="w-4 h-4 text-gold-600 mb-1" />
                    <p className="font-bold text-ink-primary">Telephone / WhatsApp</p>
                    <a href={toTelUrl(churchInfo.contact.phone)} className="text-gold-600 hover:underline font-mono tabular-nums font-semibold">
                      {toInternationalDisplay(churchInfo.contact.phone)}
                    </a>
                  </div>
                  <div className="p-4 rounded-xl bg-white/95 border border-sanctuary-stone space-y-1">
                    <MapPin className="w-4 h-4 text-gold-600 mb-1" />
                    <p className="font-bold text-ink-primary">Headquarters</p>
                    <p className="text-ink-secondary">Mallam Cathedral, Accra, Ghana</p>
                  </div>
                </div>
              </section>
            </div>
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
