import { m, useScroll, useReducedMotion } from 'framer-motion';
import { Heart, MapPin, Phone, Mail, Sparkles, ChevronRight, Church, MessageCircle, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useChurch } from '../context/ChurchContext';
import { IMAGES } from '../data/churchData';
import { YoutubeIcon, FacebookIcon, InstagramIcon } from './Icons';
import { trackEvent } from '../utils/analytics';
import { toTelUrl, toWhatsAppUrl, toInternationalDisplay, toLocalMoMoDisplay } from '../utils/phoneUtils';
import { Reveal, Stagger, StaggerItem, SPRING_TACTILE } from './motion';

interface FooterProps {
  onOpenBranchModal?: (branchId?: string) => void;
  onOpenGivingModal?: () => void;
  onOpenPrayerModal?: () => void;
}

export const Footer = ({ onOpenBranchModal, onOpenGivingModal, onOpenPrayerModal }: FooterProps) => {
  const { churchInfo, branches } = useChurch();
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  return (
    <footer className="relative bg-sanctuary-950 text-sanctuary-alabaster/85 border-t border-sanctuary-stone/15 pt-14 pb-12 overflow-hidden">
      {/* Subtle top atmospheric gold hairline glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[540px] h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8 space-y-12">
        {/* Large Editorial Serif Sign-Off Reveal */}
        <Reveal className="text-center space-y-2 pb-4 border-b border-white/10">
          <p className="text-eyebrow uppercase tracking-[0.26em] text-gold-400 font-semibold">
            {churchInfo.themeYear} Mandate • Esther 5:1
          </p>
          <p className="font-serif text-display italic text-sanctuary-alabaster tracking-tight">
            Touching Lives Worldwide.
          </p>
        </Reveal>

        {/* Top Callout Banner */}
        <Reveal className="p-6 md:p-8 rounded-2xl bg-sanctuary-900 border border-gold-500/30 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/15 border border-gold-500/30 text-gold-400 text-eyebrow font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> {churchInfo.themeYear} Mandate
            </div>
            <h3 className="text-h3 font-serif text-sanctuary-alabaster font-bold">
              {churchInfo.themeTitle}: {churchInfo.themeSubtitle}
            </h3>
            <p className="text-sanctuary-alabaster/75 text-body max-w-2xl">
              Join us this week for an encounter with God&apos;s living word and power. Experience miracles, salvation, and kingdom advancement.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                trackEvent('interaction', 'branch_modal_opened', 'Footer Banner');
                onOpenBranchModal?.();
              }}
              className="min-h-[44px] px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-sanctuary-alabaster font-semibold text-caption uppercase tracking-wider border border-white/15 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-gold-400" /> Plan Your Visit
            </button>
            <button
              type="button"
              onClick={() => {
                trackEvent('conversion', 'prayer_modal_opened', 'Footer Banner');
                onOpenPrayerModal?.();
              }}
              className="min-h-[44px] px-5 py-2.5 rounded-full bg-gold-600 hover:bg-gold-700 text-sanctuary-alabaster font-semibold text-caption uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Submit Prayer
            </button>
          </div>
        </Reveal>

        {/* Staggered 4-Column Footer Grid */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: About Church */}
          <StaggerItem className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-gold-500/30 shadow-sm shrink-0">
                <img src={IMAGES.logo} alt="RICGCW Logo" width={48} height={48} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-xl text-sanctuary-alabaster">{churchInfo.shortName}</h4>
                <p className="text-eyebrow uppercase font-semibold text-gold-400 tracking-wider">Worldwide Ministry</p>
              </div>
            </div>
            <p className="text-caption text-sanctuary-alabaster/75 leading-relaxed">
              Rhema Inner Court Gospel Church (Worldwide) is a prophetic, apostolic, and evangelistic movement perfecting saints and taking territories.
            </p>
            <div className="pt-2 text-caption italic text-gold-400 border-l-2 border-gold-500/40 pl-3">
              &ldquo;{churchInfo.scripturalAnchor.verse}&rdquo;
              <span className="block font-semibold mt-1 text-sanctuary-alabaster/65 not-italic">
                ({churchInfo.scripturalAnchor.reference})
              </span>
            </div>
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={churchInfo.contact.youtube}
                target="_blank"
                rel="noreferrer"
                className="min-w-[44px] min-h-[44px] rounded-xl bg-white/5 hover:bg-red-600 text-sanctuary-alabaster/75 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={churchInfo.contact.facebook}
                target="_blank"
                rel="noreferrer"
                className="min-w-[44px] min-h-[44px] rounded-xl bg-white/5 hover:bg-blue-600 text-sanctuary-alabaster/75 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={churchInfo.contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="min-w-[44px] min-h-[44px] rounded-xl bg-white/5 hover:bg-pink-600 text-sanctuary-alabaster/75 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </StaggerItem>

          {/* Col 2: Church Branches */}
          <StaggerItem className="space-y-4">
            <h4 className="font-bold text-caption uppercase tracking-wider text-sanctuary-alabaster flex items-center gap-2">
              <Church className="w-4 h-4 text-gold-400" /> Sanctuary Locations
            </h4>
            <div className="space-y-2.5">
              {branches.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    trackEvent('interaction', 'branch_modal_opened', b.name);
                    onOpenBranchModal?.(b.id);
                  }}
                  className="w-full min-h-[44px] text-left p-3.5 rounded-xl bg-sanctuary-900 hover:bg-sanctuary-850 border border-white/10 hover:border-gold-400/35 transition-all cursor-pointer group"
                >
                  <p className="text-caption font-bold text-sanctuary-alabaster group-hover:text-gold-400 transition-colors flex items-center justify-between">
                    <span>{b.name.split('(')[0]}</span>
                    <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-caption text-sanctuary-alabaster/65 mt-0.5">{b.location}</p>
                  <p className="text-eyebrow text-gold-400 font-mono mt-0.5 tabular-nums">
                    Sunday: {b.services[0]?.time}
                  </p>
                </button>
              ))}
            </div>
          </StaggerItem>

          {/* Col 3: Quick Links & Ministries */}
          <StaggerItem className="space-y-4">
            <h4 className="font-bold text-caption uppercase tracking-wider text-sanctuary-alabaster">
              Explore Ministries
            </h4>
            <ul className="space-y-2.5 text-caption">
              <li>
                <a href="#about" className="text-sanctuary-alabaster/75 hover:text-gold-400 transition-colors flex items-center gap-1.5 py-1">
                  <ChevronRight className="w-3.5 h-3.5 text-gold-400" /> Apostolic Leadership
                </a>
              </li>
              <li>
                <a href="#identity" className="text-sanctuary-alabaster/75 hover:text-gold-400 transition-colors flex items-center gap-1.5 py-1">
                  <ChevronRight className="w-3.5 h-3.5 text-gold-400" /> Tabernacle &amp; Color Meanings
                </a>
              </li>
              <li>
                <a href="#ministries" className="text-sanctuary-alabaster/75 hover:text-gold-400 transition-colors flex items-center gap-1.5 py-1">
                  <ChevronRight className="w-3.5 h-3.5 text-gold-400" /> Men of Valor &amp; Women of Grace
                </a>
              </li>
              <li>
                <a href="#ministries" className="text-sanctuary-alabaster/75 hover:text-gold-400 transition-colors flex items-center gap-1.5 py-1">
                  <ChevronRight className="w-3.5 h-3.5 text-gold-400" /> Youth Alive &amp; Kids Court
                </a>
              </li>
              <li>
                <a href="#media" className="text-sanctuary-alabaster/75 hover:text-gold-400 transition-colors flex items-center gap-1.5 py-1">
                  <ChevronRight className="w-3.5 h-3.5 text-gold-400" /> Sermons &amp; Media Altar
                </a>
              </li>
              <li>
                <Link to="/sponsorship" className="text-sanctuary-alabaster/75 hover:text-gold-400 transition-colors flex items-center gap-1.5 py-1">
                  <ChevronRight className="w-3.5 h-3.5 text-gold-400" /> Mission Sponsorship Portal
                </Link>
              </li>
            </ul>
          </StaggerItem>

          {/* Col 4: Verified Contact & Giving */}
          <StaggerItem className="space-y-4">
            <h4 className="font-bold text-caption uppercase tracking-wider text-sanctuary-alabaster flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold-400" /> Get in Touch
            </h4>
            <div className="space-y-3 text-caption text-sanctuary-alabaster/80">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span>{churchInfo.contact.location}</span>
              </p>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <a
                    href={toTelUrl(churchInfo.contact.phone)}
                    onClick={() => trackEvent('conversion', 'call_hotline', 'Footer')}
                    className="hover:text-gold-400 font-mono font-bold tabular-nums block text-sanctuary-alabaster"
                  >
                    {toInternationalDisplay(churchInfo.contact.phone)}
                  </a>
                  <span className="text-eyebrow font-mono text-sanctuary-alabaster/60 tabular-nums">
                    Local / MoMo: {toLocalMoMoDisplay(churchInfo.contact.phone)}
                  </span>
                </div>
              </div>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={toWhatsAppUrl(churchInfo.contact.phone, 'Shalom Pastor, I am reaching out from the RICGCW website.')}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('conversion', 'whatsapp_chat', 'Footer')}
                  className="hover:text-emerald-300 text-emerald-400 font-bold"
                >
                  Chat on WhatsApp
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href={`mailto:${churchInfo.contact.email}`} className="hover:text-gold-400 font-mono">
                  {churchInfo.contact.email}
                </a>
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  trackEvent('conversion', 'giving_modal_opened', 'Footer');
                  onOpenGivingModal?.();
                }}
                className="w-full min-h-[44px] py-3 px-4 rounded-xl bg-gold-500/15 hover:bg-gold-500/25 text-gold-400 border border-gold-400/30 text-caption font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4" /> Tithes &amp; MoMo Giving
              </button>
            </div>
          </StaggerItem>
        </Stagger>

        {/* Bottom Legal Copyright Bar + Back to Top Ring */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-caption text-sanctuary-alabaster/60">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Rhema Inner Court Gospel Church (Worldwide). All rights reserved.</p>
            <span className="hidden sm:inline text-white/20">•</span>
            <p className="text-sanctuary-alabaster/75">
              Built by{' '}
              <a
                href="https://damise-1free.web.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold-400 hover:text-white font-medium underline underline-offset-2 transition-colors"
              >
                Kumesi Moses Mawulolo
              </a>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-caption">
            <Link to="/privacy" className="text-sanctuary-alabaster/75 hover:text-gold-400 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="text-sanctuary-alabaster/75 hover:text-gold-400 transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}
              className="text-sanctuary-alabaster/75 hover:text-gold-400 transition-colors cursor-pointer"
            >
              Cookie Settings
            </button>

            {/* Back to Top Button with Circular Scroll-Progress Ring */}
            <m.button
              type="button"
              onClick={scrollToTop}
              whileTap={prefersReduced ? undefined : { scale: 0.92 }}
              transition={SPRING_TACTILE}
              aria-label="Back to top"
              title="Back to top"
              className="relative w-12 h-12 rounded-full bg-sanctuary-900 hover:bg-sanctuary-850 text-gold-400 flex items-center justify-center cursor-pointer ml-1 shrink-0"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 44 44"
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
              >
                <circle
                  cx="22"
                  cy="22"
                  r="19"
                  fill="none"
                  stroke="rgba(223,197,123,0.18)"
                  strokeWidth="2"
                />
                <m.circle
                  cx="22"
                  cy="22"
                  r="19"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  style={prefersReduced ? undefined : { pathLength: scrollYProgress }}
                />
              </svg>
              <ArrowUp className="w-4 h-4 relative z-10" />
            </m.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
