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
    <footer className="relative logo-obsidian-bg text-sanctuary-alabaster/85 border-t border-gold-400/25 pt-20 pb-12 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 space-y-14">
        {/* Monumental Editorial Serif Sign-Off Reveal */}
        <Reveal className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/15">
          <div className="space-y-3">
            <p className="text-eyebrow font-mono uppercase tracking-[0.26em] text-gold-400">
              {churchInfo.themeYear} Mandate · {churchInfo.themeTitle} · Esther 5:1
            </p>
            <p className="font-serif text-display italic text-sanctuary-alabaster tracking-tight">
              Touching Lives Worldwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                trackEvent('interaction', 'branch_modal_opened', 'Footer Banner');
                onOpenBranchModal?.();
              }}
              className="min-h-[44px] px-5 py-2.5 rounded-sm bg-white/8 hover:bg-white/15 text-sanctuary-alabaster font-semibold text-caption uppercase tracking-[0.14em] border border-white/20 transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-gold-400" />
              <span>Plan Your Visit</span>
            </button>
            <button
              type="button"
              onClick={() => {
                trackEvent('conversion', 'prayer_modal_opened', 'Footer Banner');
                onOpenPrayerModal?.();
              }}
              className="min-h-[44px] px-5 py-2.5 rounded-sm bg-gold-500 hover:bg-gold-400 text-sanctuary-950 font-semibold text-caption uppercase tracking-[0.14em] transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Submit Prayer</span>
            </button>
          </div>
        </Reveal>

        {/* Staggered 4-Column Architectural Directory */}
        <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Church Identity */}
          <StaggerItem className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full overflow-hidden border border-gold-400/50 shrink-0">
                <img src={IMAGES.logo} alt="RICGCW Logo" width={44} height={44} loading="lazy" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-serif text-2xl text-sanctuary-alabaster leading-none">{churchInfo.shortName}</h4>
                <p className="text-[10px] font-mono uppercase text-gold-400 tracking-[0.18em] mt-1">Worldwide Ministry</p>
              </div>
            </div>
            <p className="text-caption text-sanctuary-alabaster/75 leading-relaxed">
              Rhema Inner Court Gospel Church (Worldwide) is a prophetic, apostolic, and evangelistic movement perfecting saints and taking territories.
            </p>
            <div className="pt-1 text-caption italic font-serif text-base text-gold-400 border-l border-gold-400/40 pl-3.5">
              &ldquo;{churchInfo.scripturalAnchor.verse}&rdquo;
              <span className="block font-mono text-[11px] mt-1 text-sanctuary-alabaster/60 not-italic">
                ({churchInfo.scripturalAnchor.reference})
              </span>
            </div>
            <div className="flex items-center gap-2 pt-2">
              <a
                href={churchInfo.contact.youtube}
                target="_blank"
                rel="noreferrer"
                className="min-w-[44px] min-h-[44px] rounded-sm border border-white/15 hover:bg-red-600 text-sanctuary-alabaster/75 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={churchInfo.contact.facebook}
                target="_blank"
                rel="noreferrer"
                className="min-w-[44px] min-h-[44px] rounded-sm border border-white/15 hover:bg-blue-600 text-sanctuary-alabaster/75 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={churchInfo.contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="min-w-[44px] min-h-[44px] rounded-sm border border-white/15 hover:bg-pink-600 text-sanctuary-alabaster/75 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </StaggerItem>

          {/* Col 2: Sanctuary Locations */}
          <StaggerItem className="space-y-4">
            <h4 className="font-mono text-eyebrow uppercase tracking-[0.2em] text-gold-400 flex items-center gap-2">
              <Church className="w-4 h-4" /> Sanctuary Locations
            </h4>
            <div className="divide-y divide-white/10 border-t border-white/10">
              {branches.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    trackEvent('interaction', 'branch_modal_opened', b.name);
                    onOpenBranchModal?.(b.id);
                  }}
                  className="w-full min-h-[44px] text-left py-3 hover:pl-2 transition-all cursor-pointer group"
                >
                  <p className="text-caption font-semibold text-sanctuary-alabaster group-hover:text-gold-400 transition-colors flex items-center justify-between">
                    <span>{b.name.split('(')[0]}</span>
                    <ChevronRight className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-[12px] text-sanctuary-alabaster/60">{b.location}</p>
                  <p className="text-[11px] text-gold-400 font-mono mt-0.5 tabular-nums">
                    Sunday: {b.services[0]?.time}
                  </p>
                </button>
              ))}
            </div>
          </StaggerItem>

          {/* Col 3: Quick Links */}
          <StaggerItem className="space-y-4">
            <h4 className="font-mono text-eyebrow uppercase tracking-[0.2em] text-gold-400">
              Explore Ministries
            </h4>
            <ul className="space-y-2 text-caption">
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

          {/* Col 4: Contact & Online Giving */}
          <StaggerItem className="space-y-4">
            <h4 className="font-mono text-eyebrow uppercase tracking-[0.2em] text-gold-400 flex items-center gap-2">
              <Phone className="w-4 h-4" /> Get in Touch
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
                  <span className="text-[11px] font-mono text-sanctuary-alabaster/60 tabular-nums">
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
                  className="hover:text-emerald-300 text-emerald-400 font-semibold"
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
                className="w-full min-h-[44px] py-3 px-4 rounded-sm bg-gold-500/15 hover:bg-gold-500 text-gold-400 hover:text-sanctuary-950 border border-gold-400/40 text-caption font-semibold uppercase tracking-[0.14em] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4" /> Tithes &amp; MoMo Giving
              </button>
            </div>
          </StaggerItem>
        </Stagger>

        {/* Bottom Copyright Bar + Circular Scroll-Progress Ring */}
        <div className="pt-8 border-t border-white/12 flex flex-col md:flex-row items-center justify-between gap-6 text-caption text-sanctuary-alabaster/60">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Rhema Inner Court Gospel Church (Worldwide). All rights reserved.</p>
            <span className="hidden sm:inline text-white/20">·</span>
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
            <span>·</span>
            <Link to="/terms" className="text-sanctuary-alabaster/75 hover:text-gold-400 transition-colors">
              Terms of Service
            </Link>
            <span>·</span>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}
              className="text-sanctuary-alabaster/75 hover:text-gold-400 transition-colors cursor-pointer"
            >
              Cookie Settings
            </button>

            <m.button
              type="button"
              onClick={scrollToTop}
              whileTap={prefersReduced ? undefined : { scale: 0.92 }}
              transition={SPRING_TACTILE}
              aria-label="Back to top"
              title="Back to top"
              className="relative w-11 h-11 rounded-full bg-sanctuary-900 hover:bg-sanctuary-800 text-gold-400 flex items-center justify-center cursor-pointer ml-1 shrink-0"
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
                  stroke="rgba(223,194,135,0.2)"
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
