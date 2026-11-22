import React from 'react';
import { ArrowUp, MapPin, Phone, Mail, HeartHandshake } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useChurch } from '../context/ChurchContext';
import { IMAGES, IMAGE_DIMENSIONS } from '../data/churchData';
import { YoutubeIcon, FacebookIcon, InstagramIcon } from './Icons';
import { trackEvent } from '../utils/analytics';
import { toTelUrl, toWhatsAppUrl, toInternationalDisplay, toLocalMoMoDisplay } from '../utils/phoneUtils';

interface FooterProps {
  onOpenBranchModal?: (branchId?: string) => void;
  onOpenGivingModal?: () => void;
  onOpenPrayerModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBranchModal,
  onOpenGivingModal,
  onOpenPrayerModal,
}) => {
  const { churchInfo, branches } = useChurch();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    if (!isHome) {
      e.preventDefault();
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <footer className="bg-public-ink text-white border-t border-white/10 pt-16 sm:pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Top Invitation Band */}
        <div className="pb-10 border-b border-white/15 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-public-accent-light">
              Sunday Service · 09:00 AM GMT
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Come worship with us this Sunday.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenBranchModal?.()}
              className="min-h-[44px] px-5 py-2.5 rounded-lg border border-white/25 hover:border-white text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-public-accent-light" />
              <span>Plan your visit</span>
            </button>

            <button
              type="button"
              onClick={() => {
                trackEvent('conversion', 'giving_modal_opened', 'Footer');
                onOpenGivingModal?.();
              }}
              className="min-h-[44px] px-5 py-2.5 rounded-lg bg-public-accent-light hover:bg-white text-public-ink text-sm font-semibold transition-colors cursor-pointer"
            >
              Give Online
            </button>
          </div>
        </div>

        {/* 4-Column Directory */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={IMAGES.logo}
                alt="RICGCW Logo"
                width={IMAGE_DIMENSIONS.logo.width}
                height={IMAGE_DIMENSIONS.logo.height}
                className="w-10 h-10 rounded-lg object-cover border border-white/20 shrink-0"
              />
              <div>
                <p className="font-sans font-extrabold text-lg text-white leading-tight">
                  {churchInfo.shortName}
                </p>
                <p className="text-xs text-white/65">Rhema Inner Court Gospel Church (Worldwide)</p>
              </div>
            </div>

            <p className="text-sm text-white/75 leading-relaxed max-w-sm">
              {churchInfo.vision}
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={churchInfo.contact.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="min-w-[44px] min-h-[44px] rounded-lg border border-white/20 text-white/80 hover:text-white hover:border-white flex items-center justify-center transition-colors"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={churchInfo.contact.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="min-w-[44px] min-h-[44px] rounded-lg border border-white/20 text-white/80 hover:text-white hover:border-white flex items-center justify-center transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={churchInfo.contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="min-w-[44px] min-h-[44px] rounded-lg border border-white/20 text-white/80 hover:text-white hover:border-white flex items-center justify-center transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-public-accent-light">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <a
                  href="#sanctuaries"
                  onClick={(e) => handleAnchor(e, 'sanctuaries')}
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  Service Times
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleAnchor(e, 'about')}
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  About &amp; Vision
                </a>
              </li>
              <li>
                <a
                  href="#ministries"
                  onClick={(e) => handleAnchor(e, 'ministries')}
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  Ministries
                </a>
              </li>
              <li>
                <a
                  href="#media"
                  onClick={(e) => handleAnchor(e, 'media')}
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  Watch Messages
                </a>
              </li>
              <li>
                <a
                  href="#events"
                  onClick={(e) => handleAnchor(e, 'events')}
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  Upcoming Events
                </a>
              </li>
              <li>
                <Link to="/sponsorship" className="hover:text-white transition-colors inline-block py-0.5">
                  Sponsorship
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPrayerModal?.()}
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5 py-0.5 cursor-pointer text-left"
                >
                  <HeartHandshake className="w-3.5 h-3.5 text-public-accent-light" />
                  <span>Request Prayer</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Branches */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-public-accent-light">
              Sanctuaries
            </h3>
            <ul className="space-y-2.5 text-sm">
              {branches.map((branch) => (
                <li key={branch.id}>
                  <button
                    type="button"
                    onClick={() => onOpenBranchModal?.(branch.id)}
                    className="text-left group cursor-pointer"
                  >
                    <span className="font-semibold text-white group-hover:text-public-accent-light transition-colors block">
                      {branch.name}
                    </span>
                    <span className="text-xs text-white/65 block">{branch.location}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Secretariat & Legal */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-public-accent-light">
              Contact &amp; Legal
            </h3>
            <div className="space-y-2.5 text-sm text-white/80">
              <a
                href={toTelUrl(churchInfo.contact.phone)}
                className="flex items-center gap-2 hover:text-white transition-colors tabular-nums"
              >
                <Phone className="w-4 h-4 text-public-accent-light shrink-0" />
                <span>{toInternationalDisplay(churchInfo.contact.phone)}</span>
              </a>
              <p className="text-xs text-white/65 tabular-nums pl-6">
                Local / MoMo: {toLocalMoMoDisplay(churchInfo.contact.phone)}
              </p>

              <a
                href={`mailto:${churchInfo.contact.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-public-accent-light shrink-0" />
                <span>{churchInfo.contact.email}</span>
              </a>

              <a
                href={toWhatsAppUrl(churchInfo.contact.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-public-accent-light hover:text-white underline underline-offset-4 text-sm pt-0.5"
              >
                Message on WhatsApp
              </a>
            </div>

            <div className="pt-3 border-t border-white/15 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-white/70">
              <Link to="/privacy" className="hover:text-white underline underline-offset-2">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white underline underline-offset-2">
                Terms of Service
              </Link>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}
                className="hover:text-white underline underline-offset-2 cursor-pointer"
              >
                Cookie Settings
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Credit Row */}
        <div className="pt-8 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-white/70">
          <div className="space-y-1">
            <p>
              &copy; {new Date().getFullYear()} Rhema Inner Court Gospel Church (Worldwide). All rights reserved.
            </p>
            <p>
              Crafted by{' '}
              <a
                href="https://damise-1free.web.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-public-accent-light underline underline-offset-2 font-medium"
              >
                Kumesi Moses Mawulolo
              </a>
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            className="min-h-[44px] min-w-[44px] px-4 py-2 rounded-lg border border-white/20 hover:border-white text-white inline-flex items-center justify-center gap-2 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>Top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
