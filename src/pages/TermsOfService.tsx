import { useState } from 'react';
import { Link } from 'react-router-dom';
import { m, useScroll, useReducedMotion } from 'framer-motion';
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
import { useActiveSection } from '../hooks/useActiveSection';
import { Reveal } from '../components/motion';

const TERMS_SECTIONS = [
  { id: 'terms-1', num: '1', label: 'Acceptance' },
  { id: 'terms-2', num: '2', label: 'Ministry Purpose & Use' },
  { id: 'terms-3', num: '3', label: 'Online Giving & Sponsorship' },
  { id: 'terms-4', num: '4', label: 'Media & Intellectual Property' },
  { id: 'terms-5', num: '5', label: 'External Services' },
  { id: 'terms-6', num: '6', label: 'Governing Law' },
  { id: 'terms-7', num: '7', label: 'Inquiries & Contact' },
] as const;

const SECTION_IDS = TERMS_SECTIONS.map((s) => s.id);

export const TermsOfService = () => {
  usePageTitle('Terms of Service');
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
              <FileCheck className="w-3.5 h-3.5 text-gold-600" />
              <span>Official Terms of Service</span>
            </div>
            <h1 className="text-h1 font-bold font-serif text-ink-primary tracking-tight">
              Terms of Service &amp; Ministry Guidelines
            </h1>
            <p className="text-body sm:text-base text-ink-secondary leading-relaxed max-w-prose">
              Welcome to the official digital platform of Rhema Inner Court Gospel Church (Worldwide). By accessing our website, you agree to the following sacred and administrative terms.
            </p>
          </Reveal>

          {/* 2-Column Editorial Layout with Sticky Desktop TOC */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            <aside className="hidden lg:block lg:col-span-4 sticky top-28">
              <nav
                aria-label="Terms of service table of contents"
                className="p-6 rounded-2xl bg-sanctuary-parchment/85 border border-sanctuary-stone space-y-3"
              >
                <p className="text-eyebrow uppercase tracking-[0.2em] font-semibold text-gold-600">
                  Contents
                </p>
                <ul className="space-y-1.5">
                  {TERMS_SECTIONS.map((sec) => {
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

            {/* Terms Container */}
            <div className="lg:col-span-8 space-y-6 text-ink-secondary text-body leading-relaxed">
              <section id="terms-1" className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/85 border border-sanctuary-stone space-y-4">
                <h2 className="text-h3 font-bold font-serif text-ink-primary flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-caption font-bold font-mono shrink-0">1</span>
                  <span>Acceptance of Terms</span>
                </h2>
                <p className="max-w-prose">
                  By browsing, visiting, or utilizing any feature of the Rhema Inner Court Gospel Church (Worldwide) website (ricgcw.me), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, along with our Privacy Policy. If you do not agree with any part of these terms, you may refrain from using this website.
                </p>
              </section>

              <section id="terms-2" className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/85 border border-sanctuary-stone space-y-4">
                <h2 className="text-h3 font-bold font-serif text-ink-primary flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-caption font-bold font-mono shrink-0">2</span>
                  <span>Ministry Purpose &amp; Respectful Use</span>
                </h2>
                <p className="max-w-prose">
                  This platform is dedicated to proclaiming the Gospel of Jesus Christ, shepherding believers, broadcasting apostolic teachings, publishing gathering schedules, and facilitating kingdom giving.
                </p>
                <ul className="space-y-2.5 list-disc pl-5 text-ink-secondary text-body max-w-prose">
                  <li>Users agree to use all contact forms, prayer altars, and interactive tools in good faith and with Christian reverence.</li>
                  <li>Any abusive, profane, fraudulent, or harassing submissions sent through our portal will result in immediate disqualification and potential blocking by network administrators.</li>
                </ul>
              </section>

              <section id="terms-3" className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/85 border border-sanctuary-stone space-y-4">
                <h2 className="text-h3 font-bold font-serif text-ink-primary flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-caption font-bold font-mono shrink-0">3</span>
                  <span>Online Giving, Tithes &amp; Project Sponsorship</span>
                </h2>
                <p className="max-w-prose">
                  All financial contributions, tithes, freewill offerings, theme seeds, and mission sponsorships made via our Paystack gateway are voluntary acts of worship and partnership with God&apos;s work.
                </p>
                <div className="p-4 rounded-xl bg-white/90 border border-gold-500/30 text-caption space-y-1.5 max-w-prose">
                  <p className="font-bold text-gold-600">Contribution Policy</p>
                  <p className="text-ink-secondary">
                    Because financial seeds are voluntary spiritual contributions deployed directly to church welfare, rural crusades, building projects, and ministry operations, online donations are generally non-refundable. However, if an accidental duplicate transaction occurs, please contact our secretariat within 7 days with your Paystack payment reference for prompt reconciliation.
                  </p>
                </div>
              </section>

              <section id="terms-4" className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/85 border border-sanctuary-stone space-y-4">
                <h2 className="text-h3 font-bold font-serif text-ink-primary flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-caption font-bold font-mono shrink-0">4</span>
                  <span>Intellectual Property &amp; Media Rights</span>
                </h2>
                <p className="max-w-prose">
                  All sermon audio, livestream recordings, event artwork, ministry logos, photographs of our General Overseer and pastoral council, and written publications published on this site are the intellectual property of Rhema Inner Court Gospel Church (Worldwide).
                </p>
                <ul className="space-y-2.5 list-disc pl-5 text-ink-secondary text-body max-w-prose">
                  <li>You are encouraged to share links, sermon excerpts, and scripture devotionals for personal edification and non-commercial evangelism.</li>
                  <li>Reproduction, commercial resale, or unauthorized alteration of church media without prior written permission from the General Overseer&apos;s office is strictly prohibited.</li>
                </ul>
              </section>

              <section id="terms-5" className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/85 border border-sanctuary-stone space-y-4">
                <h2 className="text-h3 font-bold font-serif text-ink-primary flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-caption font-bold font-mono shrink-0">5</span>
                  <span>External Links &amp; Third-Party Services</span>
                </h2>
                <p className="max-w-prose">
                  Our platform contains direct links to third-party services including YouTube (sermon streams), Facebook, Instagram, Google Maps (sanctuary navigation), and Paystack (payment processing). We do not control and are not responsible for the independent terms or privacy practices of these third-party platforms.
                </p>
              </section>

              <section id="terms-6" className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/85 border border-sanctuary-stone space-y-4">
                <h2 className="text-h3 font-bold font-serif text-ink-primary flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-caption font-bold font-mono shrink-0">6</span>
                  <span>Governing Law &amp; Jurisdiction</span>
                </h2>
                <p className="max-w-prose">
                  These Terms of Service are governed by and construed in accordance with the laws of the Republic of Ghana. Any disputes arising out of the use of this website shall be resolved amicably through Christian arbitration and the competent courts of Greater Accra, Ghana.
                </p>
              </section>

              <section id="terms-7" className="p-6 sm:p-8 rounded-2xl bg-sanctuary-parchment/85 border border-sanctuary-stone space-y-4">
                <h2 className="text-h3 font-bold font-serif text-ink-primary flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gold-500/15 text-gold-600 border border-gold-500/25 flex items-center justify-center text-caption font-bold font-mono shrink-0">7</span>
                  <span>Secretariat Inquiries</span>
                </h2>
                <p className="max-w-prose">
                  For any formal inquiries, wedding/dedication bookings, or questions about these terms, please contact:
                </p>
                <div className="grid sm:grid-cols-3 gap-4 pt-2 text-caption">
                  <div className="p-4 rounded-xl bg-white/95 border border-sanctuary-stone space-y-1">
                    <Mail className="w-4 h-4 text-gold-600 mb-1" />
                    <p className="font-bold text-ink-primary">Email</p>
                    <a href={`mailto:${churchInfo.contact.email}`} className="text-gold-600 hover:underline font-medium break-all">
                      {churchInfo.contact.email}
                    </a>
                  </div>
                  <div className="p-4 rounded-xl bg-white/95 border border-sanctuary-stone space-y-1">
                    <Phone className="w-4 h-4 text-gold-600 mb-1" />
                    <p className="font-bold text-ink-primary">Phone</p>
                    <a href={toTelUrl(churchInfo.contact.phone)} className="text-gold-600 hover:underline font-mono tabular-nums font-semibold">
                      {toInternationalDisplay(churchInfo.contact.phone)}
                    </a>
                  </div>
                  <div className="p-4 rounded-xl bg-white/95 border border-sanctuary-stone space-y-1">
                    <MapPin className="w-4 h-4 text-gold-600 mb-1" />
                    <p className="font-bold text-ink-primary">Main Cathedral</p>
                    <p className="text-ink-secondary">Mallam-Gbawe Road, Accra, Ghana</p>
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

export default TermsOfService;
