import React, { useState, useEffect, useRef } from 'react';
import {
  m,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import { Heart, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useChurch } from '../context/ChurchContext';
import { IMAGES, IMAGE_DIMENSIONS } from '../data/churchData';
import { trackEvent } from '../utils/analytics';
import { useActiveSection } from '../hooks/useActiveSection';
import { CATHEDRAL_EASE, SPRING_TACTILE, Magnetic } from './motion';
import { YoutubeIcon, FacebookIcon, InstagramIcon } from './Icons';

interface NavbarProps {
  onOpenBranchModal?: (branchId?: string) => void;
  onOpenGivingModal?: () => void;
  onOpenPrayerModal?: () => void;
}

const SECTION_IDS = ['about', 'sanctuaries', 'ministries', 'media', 'connect'] as const;

export const Navbar: React.FC<NavbarProps> = ({ onOpenGivingModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { churchInfo } = useChurch();
  const prefersReduced = useReducedMotion();

  const lastScrollYRef = useRef(0);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileOverlayRef = useRef<HTMLDivElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 28, mass: 0.25 });
  const activeSection = useActiveSection(SECTION_IDS, isHome);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const scrolledNow = latest > 48;
    setIsScrolled((prev) => (prev !== scrolledNow ? scrolledNow : prev));

    const prevY = lastScrollYRef.current;
    if (latest <= 140) {
      setIsHidden((prev) => (prev ? false : prev));
    } else if (latest > prevY + 12) {
      setIsHidden((prev) => (!prev ? true : prev));
    } else if (latest < prevY - 6) {
      setIsHidden((prev) => (prev ? false : prev));
    }
    lastScrollYRef.current = latest;
  });

  // Scroll lock, Escape close & focus trap for mobile fullscreen overlay
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = setTimeout(() => {
      if (mobileOverlayRef.current) {
        const firstFocusable = mobileOverlayRef.current.querySelector<HTMLElement>(
          'button, [href], [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
      }
    }, 60);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        return;
      }

      if (e.key === 'Tab' && mobileOverlayRef.current) {
        const focusables = mobileOverlayRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
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
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);
      menuButtonRef.current?.focus();
    };
  }, [isOpen]);

  const handleNavClick = (sectionId?: string, route?: string) => {
    setIsOpen(false);
    setIsHidden(false);
    if (route) {
      navigate(route);
      return;
    }
    if (!sectionId) return;

    if (!isHome) {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'About', id: 'about', num: '01' },
    { name: 'Sanctuaries', id: 'sanctuaries', num: '02' },
    { name: 'Ministries', id: 'ministries', num: '03' },
    { name: 'Media', id: 'media', num: '04' },
    { name: 'Partner', route: '/sponsorship', num: '05' },
    { name: 'Connect', id: 'connect', num: '06' },
  ];

  const useLightMasthead = !isHome || isScrolled;

  return (
    <>
      <m.header
        initial={false}
        animate={{ y: isHidden && !isOpen ? '-108%' : '0%' }}
        transition={prefersReduced ? { duration: 0.01 } : SPRING_TACTILE}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 border-b ${
          useLightMasthead
            ? 'bg-sanctuary-alabaster/95 backdrop-blur-md border-sanctuary-stone text-ink-primary'
            : 'bg-sanctuary-950/55 backdrop-blur-md border-white/10 text-sanctuary-alabaster'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-[72px] flex items-center justify-between gap-4">
          {/* Left: Church Seal & Editorial Wordmark */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 group shrink-0 min-h-[44px]"
            aria-label="Rhema Inner Court Gospel Church Home"
          >
            <div
              className={`w-9 h-9 rounded-full overflow-hidden border transition-colors shrink-0 ${
                useLightMasthead
                  ? 'border-gold-500/60 bg-sanctuary-parchment'
                  : 'border-gold-400/60 bg-sanctuary-900'
              }`}
            >
              <img
                src={IMAGES.logo}
                alt="RICGCW Logo"
                width={IMAGE_DIMENSIONS.logo.width}
                height={IMAGE_DIMENSIONS.logo.height}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="leading-none">
              <span
                className={`font-serif text-xl sm:text-2xl tracking-tight block transition-colors ${
                  useLightMasthead
                    ? 'text-ink-primary group-hover:text-gold-600'
                    : 'text-sanctuary-alabaster group-hover:text-gold-400'
                }`}
              >
                {churchInfo.shortName}
              </span>
              <span
                className={`hidden xl:block text-[10px] font-mono uppercase tracking-[0.2em] mt-0.5 ${
                  useLightMasthead ? 'text-ink-muted' : 'text-gold-400/80'
                }`}
              >
                Accra · Worldwide
              </span>
            </div>
          </Link>

          {/* Center (Desktop md+): Architectural Editorial Nav with sliding brass underline */}
          <nav
            aria-label="Primary sanctuary navigation"
            className="hidden md:flex items-center gap-1 lg:gap-4 min-w-0"
          >
            {navLinks.map((link) => {
              const isActive =
                (link.route && location.pathname === link.route) ||
                (link.id && activeSection === link.id);
              return (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => handleNavClick(link.id, link.route)}
                  className={`relative px-2.5 lg:px-3 py-2 text-xs lg:text-caption tracking-wide transition-colors cursor-pointer min-h-[44px] flex items-center gap-1.5 whitespace-nowrap ${
                    useLightMasthead
                      ? isActive
                        ? 'text-ink-primary font-semibold'
                        : 'text-ink-secondary hover:text-ink-primary'
                      : isActive
                      ? 'text-gold-400 font-semibold'
                      : 'text-sanctuary-alabaster/80 hover:text-white'
                  }`}
                >
                  <span
                    className={`hidden lg:inline text-[10px] font-mono tabular-nums ${
                      isActive
                        ? useLightMasthead
                          ? 'text-gold-600'
                          : 'text-gold-400'
                        : 'opacity-45'
                    }`}
                  >
                    {link.num}
                  </span>
                  <span>{link.name}</span>

                  {isActive && (
                    <m.span
                      layoutId="nav-active"
                      transition={SPRING_TACTILE}
                      className={`absolute left-2.5 right-2.5 bottom-1.5 h-[2px] ${
                        useLightMasthead ? 'bg-gold-600' : 'bg-gold-400'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Sharp Architectural Give CTA + Mobile Curtain Menu Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Magnetic strength={0.14}>
              <button
                type="button"
                onClick={() => {
                  trackEvent('conversion', 'giving_modal_opened', 'Navbar');
                  onOpenGivingModal?.();
                }}
                className={`min-h-[42px] px-4 sm:px-5 py-2 rounded-sm text-xs uppercase tracking-[0.16em] font-semibold flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
                  useLightMasthead
                    ? 'bg-sanctuary-950 hover:bg-gold-600 text-sanctuary-alabaster'
                    : 'bg-gold-400 hover:bg-gold-300 text-sanctuary-950'
                }`}
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>Give</span>
              </button>
            </Magnetic>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={`md:hidden min-w-[44px] min-h-[44px] rounded-sm flex items-center justify-center border transition-colors cursor-pointer ${
                useLightMasthead
                  ? 'bg-sanctuary-parchment hover:bg-sanctuary-stone text-ink-primary border-sanctuary-stone'
                  : 'bg-white/5 hover:bg-white/15 text-sanctuary-alabaster border-white/20'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <m.span
                    key="icon-close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.16, ease: CATHEDRAL_EASE }}
                    className="flex items-center justify-center"
                  >
                    <X className="w-5 h-5" />
                  </m.span>
                ) : (
                  <m.span
                    key="icon-menu"
                    initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.16, ease: CATHEDRAL_EASE }}
                    className="flex items-center justify-center"
                  >
                    <Menu className="w-5 h-5" />
                  </m.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Continuous Scroll Progress Hairline */}
        <m.div
          aria-hidden="true"
          style={prefersReduced ? undefined : { scaleX: smoothProgress }}
          className="h-[2px] w-full origin-left bg-gradient-to-r from-gold-600 via-gold-400 to-gold-500 pointer-events-none"
        />
      </m.header>

      {/* =====================================================================
          MOBILE FULL-SCREEN EMERALD CURTAIN OVERLAY (<md)
      ===================================================================== */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            ref={mobileOverlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile sanctuary navigation"
            initial={
              prefersReduced
                ? { opacity: 0 }
                : { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0.96 }
            }
            animate={
              prefersReduced
                ? { opacity: 1 }
                : { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
            }
            exit={
              prefersReduced
                ? { opacity: 0 }
                : { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0.96 }
            }
            transition={{ duration: prefersReduced ? 0.15 : 0.48, ease: CATHEDRAL_EASE }}
            className="md:hidden fixed inset-0 z-[60] logo-obsidian-bg text-sanctuary-alabaster flex flex-col justify-between p-6 pt-5 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] overflow-y-auto"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/12">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gold-400/50 bg-sanctuary-900">
                  <img
                    src={IMAGES.logo}
                    alt="RICGCW Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-serif text-xl text-sanctuary-alabaster block leading-tight">
                    {churchInfo.shortName}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-gold-400">
                    2026 · Divine Manifestation
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation menu"
                className="min-w-[44px] min-h-[44px] rounded-sm bg-white/10 hover:bg-white/20 text-sanctuary-alabaster flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Oversized Editorial Navigation Links */}
            <nav className="py-6 flex flex-col divide-y divide-white/10" aria-label="Sanctuary sections">
              {navLinks.map((link, idx) => {
                const isActive =
                  (link.route && location.pathname === link.route) ||
                  (link.id && activeSection === link.id);
                return (
                  <m.button
                    key={link.name}
                    type="button"
                    initial={{ opacity: 0, y: prefersReduced ? 0 : 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: prefersReduced ? 0.15 : 0.45,
                      delay: prefersReduced ? 0 : 0.08 + idx * 0.055,
                      ease: CATHEDRAL_EASE,
                    }}
                    onClick={() => handleNavClick(link.id, link.route)}
                    className={`min-h-[56px] text-left py-3 font-serif text-4xl tracking-tight transition-colors flex items-baseline gap-4 cursor-pointer ${
                      isActive ? 'text-gold-400 italic' : 'text-sanctuary-alabaster hover:text-gold-400'
                    }`}
                  >
                    <span className="text-eyebrow font-mono text-gold-400/75 not-italic tabular-nums">
                      {link.num}
                    </span>
                    <span>{link.name}</span>
                  </m.button>
                );
              })}
            </nav>

            {/* Bottom Give CTA & Social Links */}
            <div className="space-y-4 pt-5 border-t border-white/12">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  trackEvent('conversion', 'giving_modal_opened', 'Mobile Overlay');
                  onOpenGivingModal?.();
                }}
                className="w-full min-h-[48px] py-3.5 px-6 rounded-sm bg-gold-500 hover:bg-gold-400 text-sanctuary-950 font-semibold text-xs uppercase tracking-[0.18em] flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-current" />
                <span>Give &amp; Partner Online</span>
              </button>

              <div className="flex items-center justify-between pt-1">
                <span className="text-caption font-serif italic text-gold-400">
                  Touching Lives Worldwide
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={churchInfo.contact.youtube}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    className="min-w-[44px] min-h-[44px] rounded-sm border border-white/15 bg-white/5 hover:bg-red-600 text-sanctuary-alabaster/80 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <YoutubeIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={churchInfo.contact.facebook}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="min-w-[44px] min-h-[44px] rounded-sm border border-white/15 bg-white/5 hover:bg-blue-600 text-sanctuary-alabaster/80 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={churchInfo.contact.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="min-w-[44px] min-h-[44px] rounded-sm border border-white/15 bg-white/5 hover:bg-pink-600 text-sanctuary-alabaster/80 hover:text-white flex items-center justify-center transition-colors"
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
