import { Heart, MapPin, Phone, Mail, Sparkles, ChevronRight, Church, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useChurch } from '../context/ChurchContext';
import { IMAGES } from '../data/churchData';
import { YoutubeIcon, FacebookIcon, InstagramIcon } from './Icons';
import { trackEvent } from '../utils/analytics';
import { toTelUrl, toWhatsAppUrl, toInternationalDisplay, toLocalMoMoDisplay } from '../utils/phoneUtils';

interface FooterProps {
  onOpenBranchModal?: (branchId?: string) => void;
  onOpenGivingModal?: () => void;
  onOpenPrayerModal?: () => void;
}

export const Footer = ({ onOpenBranchModal, onOpenGivingModal, onOpenPrayerModal }: FooterProps) => {
  const { churchInfo, branches } = useChurch();

  return (
    <footer className="relative bg-[#080B11] text-[#FAF8F5]/80 border-t border-[#E6E0D3]/15 pt-12 pb-10 overflow-hidden">
      {/* Subtle top atmospheric gold hairline glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[540px] h-px bg-gradient-to-r from-transparent via-[#DFC57B]/50 to-transparent"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Top Callout Banner */}
        <div className="mb-10 p-6 md:p-8 rounded-2xl bg-[#0F1420] border border-[#B8860B]/30 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#B8860B]/15 border border-[#B8860B]/30 text-[#DFC57B] text-[11px] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> {churchInfo.themeYear} Mandate
            </div>
            <h3 className="text-xl md:text-2xl font-serif text-[#FAF8F5]">
              {churchInfo.themeTitle}: {churchInfo.themeSubtitle}
            </h3>
            <p className="text-[#FAF8F5]/70 text-xs sm:text-sm max-w-2xl font-light">
              Join us this week for an encounter with God&apos;s living word and power. Experience miracles, salvation, and kingdom advancement.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => {
                trackEvent('interaction', 'branch_modal_opened', 'Footer Banner');
                onOpenBranchModal?.();
              }}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-[#FAF8F5] font-medium text-xs uppercase tracking-wider border border-white/15 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-[#DFC57B]" /> Plan Your Visit
            </button>
            <button
              onClick={() => {
                trackEvent('conversion', 'prayer_modal_opened', 'Footer Banner');
                onOpenPrayerModal?.();
              }}
              className="px-5 py-2.5 rounded-full bg-[#B8860B] hover:bg-[#996515] text-[#FAF8F5] font-semibold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Submit Prayer
            </button>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Col 1: About Church */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#B8860B]/30 shadow-sm shrink-0">
                <img src={IMAGES.logo} alt="RICGCW Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg text-[#FAF8F5]">{churchInfo.shortName}</h4>
                <p className="text-[10px] uppercase font-semibold text-[#DFC57B] tracking-wider">Worldwide Ministry</p>
              </div>
            </div>
            <p className="text-xs text-[#FAF8F5]/70 leading-relaxed font-light">
              Rhema Inner Court Gospel Church (Worldwide) is a prophetic, apostolic, and evangelistic movement perfecting saints and taking territories.
            </p>
            <div className="pt-2 text-xs italic text-[#DFC57B] border-l-2 border-[#B8860B]/40 pl-3">
              &ldquo;{churchInfo.scripturalAnchor.verse}&rdquo;
              <span className="block font-semibold mt-1 text-[#FAF8F5]/60 not-italic">({churchInfo.scripturalAnchor.reference})</span>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={churchInfo.contact.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-600 text-[#FAF8F5]/70 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={churchInfo.contact.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-600 text-[#FAF8F5]/70 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={churchInfo.contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-pink-600 text-[#FAF8F5]/70 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Church Branches */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#FAF8F5] flex items-center gap-2">
              <Church className="w-4 h-4 text-[#DFC57B]" /> Sanctuary Locations
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
                  className="w-full text-left p-3 rounded-xl bg-[#0F1420] hover:bg-[#141B2A] border border-white/10 hover:border-[#DFC57B]/35 transition-all cursor-pointer group"
                >
                  <p className="text-xs font-bold text-[#FAF8F5] group-hover:text-[#DFC57B] transition-colors flex items-center justify-between">
                    <span>{b.name.split('(')[0]}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-[11px] text-[#FAF8F5]/60 mt-0.5">{b.location}</p>
                  <p className="text-[10px] text-[#DFC57B]/90 font-mono mt-0.5 tabular-nums">
                    Sunday: {b.services[0]?.time}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Col 3: Quick Links & Ministries */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#FAF8F5]">
              Explore Ministries
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#about" className="text-[#FAF8F5]/65 hover:text-[#DFC57B] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#DFC57B]" /> Apostolic Leadership
                </a>
              </li>
              <li>
                <a href="#identity" className="text-[#FAF8F5]/65 hover:text-[#DFC57B] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#DFC57B]" /> Tabernacle &amp; Color Meanings
                </a>
              </li>
              <li>
                <a href="#ministries" className="text-[#FAF8F5]/65 hover:text-[#DFC57B] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#DFC57B]" /> Men of Valor &amp; Women of Grace
                </a>
              </li>
              <li>
                <a href="#ministries" className="text-[#FAF8F5]/65 hover:text-[#DFC57B] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#DFC57B]" /> Youth Alive &amp; Kids Court
                </a>
              </li>
              <li>
                <a href="#media" className="text-[#FAF8F5]/65 hover:text-[#DFC57B] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#DFC57B]" /> Sermons &amp; Media Altar
                </a>
              </li>
              <li>
                <Link to="/sponsorship" className="text-[#FAF8F5]/65 hover:text-[#DFC57B] transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-[#DFC57B]" /> Mission Sponsorship Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact & Giving */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#FAF8F5] flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#DFC57B]" /> Get in Touch
            </h4>
            <div className="space-y-2.5 text-xs text-[#FAF8F5]/75">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#DFC57B] shrink-0 mt-0.5" />
                <span>{churchInfo.contact.location}</span>
              </p>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#DFC57B] shrink-0 mt-0.5" />
                <div>
                  <a
                    href={toTelUrl(churchInfo.contact.phone)}
                    onClick={() => trackEvent('conversion', 'call_hotline', 'Footer')}
                    className="hover:text-[#DFC57B] font-mono font-bold tabular-nums block text-[#FAF8F5]"
                  >
                    {toInternationalDisplay(churchInfo.contact.phone)}
                  </a>
                  <span className="text-[11px] font-mono text-[#FAF8F5]/55 tabular-nums">
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
                <Mail className="w-4 h-4 text-[#DFC57B] shrink-0" />
                <a href={`mailto:${churchInfo.contact.email}`} className="hover:text-[#DFC57B] font-mono">
                  {churchInfo.contact.email}
                </a>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  trackEvent('conversion', 'giving_modal_opened', 'Footer');
                  onOpenGivingModal?.();
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#B8860B]/15 hover:bg-[#B8860B]/25 text-[#DFC57B] border border-[#DFC57B]/30 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5" /> Tithes &amp; MoMo Giving
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright Bar & Privacy / Terms Links */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F5]/50">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
            <p>© {new Date().getFullYear()} Rhema Inner Court Gospel Church (Worldwide). All rights reserved.</p>
            <span className="hidden sm:inline text-white/20">•</span>
            <p className="text-[#FAF8F5]/65">
              Built by{' '}
              <a
                href="https://damise-1free.web.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#DFC57B] hover:text-white font-medium underline underline-offset-2 transition-colors"
              >
                Kumesi Moses Mawulolo
              </a>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link to="/privacy" className="text-[#FAF8F5]/65 hover:text-[#DFC57B] transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="text-[#FAF8F5]/65 hover:text-[#DFC57B] transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <button
              onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}
              className="text-[#FAF8F5]/65 hover:text-[#DFC57B] transition-colors cursor-pointer"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
