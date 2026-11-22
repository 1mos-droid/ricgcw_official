import React, { useState, useEffect, useRef } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useChurch } from '../context/ChurchContext';
import { IMAGES, IMAGE_DIMENSIONS } from '../data/churchData';
import { trackEvent } from '../utils/analytics';
import { useActiveSection } from '../hooks/useActiveSection';
import { CATHEDRAL_EASE } from './motion';
import { toTelUrl, toInternationalDisplay } from '../utils/phoneUtils';
import { YoutubeIcon, FacebookIcon, InstagramIcon } from './Icons';

interface NavbarProps {
  onOpenBranchModal?: (branchId?: string) => void;
  onOpenGivingModal?: () => void;
  onOpenPrayerModal?: () => void;
}

const SECTION_IDS = ['sanctuaries', 'about', 'ministries', 'media', 'events', 'connect'] as const;

const NAV_LINKS = [
  { id: 'sanctuaries', label: 'Visit' },
  { id: 'about', label: 'About' },
  { id: 'ministries', label: 'Ministries' },
  { id: 'media', label: 'Watch' },
  { id: 'events', label: 'Events' },
  { id: 'connect', label: 'Connect' },
] as const;

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBranchModal,
  onOpenGivingModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const isSponsorship = location.pathname === '/sponsorship';
  const { churchInfo } = useChurch();
  const prefersReduced = useReducedMotion();

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileOverlayRef = useRef<HTMLDivElement>(null);

  const activeSection = useActiveSection(SECTION_IDS, isHome);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname, location.hash]);

  // Lock background scroll, bind Escape, trap focus inside open mobile drawer, and restore trigger focus
  useEffect(() => {
    if (!isOpen) return;

    const menuButtonNode = menuButtonRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const getFocusable = () => {
      if (!mobileOverlayRef.current) return [];
      return Array.from(
        mobileOverlayRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
    };

    const timer = window.setTimeout(() => {
      const focusable = getFocusable();
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }, 60);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        return;
      }
      if (e.key === 'Tab') {
        const focusable = getFocusable();
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      menuButtonNode?.focus();
    };
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    setIsOpen(false);
    if (!isHome) {
      navigate(`/#${sectionId}`);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
    }
  };

  const handleOpenGiving = () => {
    setIsOpen(false);
    trackEvent('conversion', 'giving_modal_opened', 'Navbar');
    onOpenGivingModal?.();
  };

  const handlePlanVisit = () => {
    setIsOpen(false);
    if (onOpenBranchModal) {
      onOpenBranchModal();
      return;
    }
    scrollToSection('sanctuaries');
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-public-canvas border-b border-public-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
          {/* Brand Logo & Wordmark */}
          <Link
            to="/"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
              }
            }}
            aria-label={`${churchInfo.shortName} Home`}
            className="flex items-center gap-2.5 shrink-0 min-h-[44px] py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-public-accent rounded-md"
          >
            <img
              src={IMAGES.logo}
              alt=""
              width={IMAGE_DIMENSIONS.logo.width}
              height={IMAGE_DIMENSIONS.logo.height}
              className="w-8 h-8 rounded-lg object-cover border border-public-border shrink-0"
            />
            <span className="font-sans font-extrabold text-base sm:text-lg tracking-tight text-public-ink">
              {churchInfo.shortName}
            </span>
          </Link>

          {/* Desktop & Tablet Navigation Row (768px+) */}
          <nav
            aria-label="Primary navigation"
            className="hidden md:flex items-center gap-0.5 lg:gap-1 min-w-0"
          >
            {NAV_LINKS.map((link) => {
              const isActive = isHome && activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  aria-current={isActive ? 'location' : undefined}
                  className={`min-h-[44px] px-2 lg:px-3 py-2 text-[13px] lg:text-sm whitespace-nowrap rounded-md transition-colors cursor-pointer ${
                    isActive
                      ? 'text-public-ink font-semibold underline decoration-public-accent decoration-2 underline-offset-8'
                      : 'text-public-ink-muted hover:text-public-ink font-medium'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            <Link
              to="/sponsorship"
              aria-current={isSponsorship ? 'page' : undefined}
              className={`min-h-[44px] px-2 lg:px-3 py-2 text-[13px] lg:text-sm whitespace-nowrap rounded-md inline-flex items-center transition-colors ${
                isSponsorship
                  ? 'text-public-ink font-semibold underline decoration-public-accent decoration-2 underline-offset-8'
                  : 'text-public-ink-muted hover:text-public-ink font-medium'
              }`}
            >
              Sponsor
            </Link>
          </nav>

          {/* Primary Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePlanVisit}
              className="hidden xl:inline-flex min-h-[44px] px-4 py-2 rounded-lg border border-public-border bg-public-surface hover:border-public-ink text-public-ink text-sm font-semibold items-center transition-colors cursor-pointer whitespace-nowrap"
            >
              Plan your visit
            </button>

            <button
              type="button"
              onClick={handleOpenGiving}
              className="min-h-[44px] px-4 sm:px-5 py-2 rounded-lg bg-public-ink hover:bg-public-accent text-white text-sm font-semibold inline-flex items-center justify-center transition-colors cursor-pointer whitespace-nowrap"
            >
              Give
            </button>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation-drawer"
              className="md:hidden min-w-[44px] min-h-[44px] p-2 rounded-lg border border-public-border bg-public-surface text-public-ink hover:border-public-ink inline-flex items-center justify-center transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            id="mobile-navigation-drawer"
            ref={mobileOverlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: prefersReduced ? 0.1 : 0.2, ease: CATHEDRAL_EASE }}
            className="md:hidden fixed inset-0 z-[60] bg-public-canvas text-public-ink flex flex-col justify-between px-5 pt-3 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] overflow-y-auto"
          >
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between h-14 border-b border-public-border">
              <div className="flex items-center gap-2.5">
                <img
                  src={IMAGES.logo}
                  alt=""
                  width={IMAGE_DIMENSIONS.logo.width}
                  height={IMAGE_DIMENSIONS.logo.height}
                  className="w-8 h-8 rounded-lg object-cover border border-public-border"
                />
                <span className="font-sans font-extrabold text-base tracking-tight text-public-ink">
                  {churchInfo.shortName}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation menu"
                className="min-w-[44px] min-h-[44px] p-2 rounded-lg border border-public-border bg-public-surface text-public-ink flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links List */}
            <nav aria-label="Mobile menu links" className="py-4 flex-1 flex flex-col divide-y divide-public-border">
              {NAV_LINKS.map((link) => {
                const isActive = isHome && activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    aria-current={isActive ? 'location' : undefined}
                    className={`min-h-[52px] w-full text-left py-3 text-xl font-bold tracking-tight transition-colors flex items-center justify-between cursor-pointer ${
                      isActive ? 'text-public-accent' : 'text-public-ink hover:text-public-accent'
                    }`}
                  >
                    <span>{link.label}</span>
                  </button>
                );
              })}

              <Link
                to="/sponsorship"
                onClick={() => setIsOpen(false)}
                aria-current={isSponsorship ? 'page' : undefined}
                className={`min-h-[52px] w-full text-left py-3 text-xl font-bold tracking-tight transition-colors flex items-center justify-between ${
                  isSponsorship ? 'text-public-accent' : 'text-public-ink hover:text-public-accent'
                }`}
              >
                <span>Sponsor</span>
              </Link>
            </nav>

            {/* Drawer Footer CTAs & Contact */}
            <div className="pt-4 border-t border-public-border space-y-4">
              <div className="grid grid-cols-1 gap-2.5">
                <button
                  type="button"
                  onClick={handlePlanVisit}
                  className="w-full min-h-[48px] px-5 py-3 rounded-lg bg-public-ink hover:bg-public-accent text-white font-semibold text-base transition-colors cursor-pointer"
                >
                  Plan your visit
                </button>
                <button
                  type="button"
                  onClick={handleOpenGiving}
                  className="w-full min-h-[48px] px-5 py-3 rounded-lg border border-public-border bg-public-surface hover:border-public-ink text-public-ink font-semibold text-base transition-colors cursor-pointer"
                >
                  Give Online
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 pt-1">
                <a
                  href={toTelUrl(churchInfo.contact.phone)}
                  className="min-h-[44px] inline-flex items-center gap-2 text-sm font-medium text-public-ink-muted hover:text-public-ink tabular-nums"
                >
                  <Phone className="w-4 h-4 text-public-accent" />
                  <span>{toInternationalDisplay(churchInfo.contact.phone)}</span>
                </a>

                <div className="flex items-center gap-1.5">
                  <a
                    href={churchInfo.contact.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="RICGCW YouTube"
                    className="min-w-[44px] min-h-[44px] rounded-lg border border-public-border bg-public-surface text-public-ink-muted hover:text-public-ink flex items-center justify-center"
                  >
                    <YoutubeIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={churchInfo.contact.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="RICGCW Facebook"
                    className="min-w-[44px] min-h-[44px] rounded-lg border border-public-border bg-public-surface text-public-ink-muted hover:text-public-ink flex items-center justify-center"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={churchInfo.contact.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="RICGCW Instagram"
                    className="min-w-[44px] min-h-[44px] rounded-lg border border-public-border bg-public-surface text-public-ink-muted hover:text-public-ink flex items-center justify-center"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
