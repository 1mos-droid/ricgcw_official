import React, { useState, useEffect, useRef } from 'react';
import {
  m,
  AnimatePresence,
  useScroll,
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
  const activeSection = useActiveSection(SECTION_IDS, isHome);

  // Only update React state on threshold crossings; scroll progress drives GPU transform directly
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const scrolledNow = latest > 40;
    setIsScrolled((prev) => (prev !== scrolledNow ? scrolledNow : prev));

    const prevY = lastScrollYRef.current;
    if (latest <= 120) {
      setIsHidden((prev) => (prev ? false : prev));
    } else if (latest > prevY + 10) {
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
    { name: 'About', id: 'about' },
    { name: 'Sanctuaries', id: 'sanctuaries' },
    { name: 'Ministries', id: 'ministries' },
    { name: 'Media', id: 'media' },
    { name: 'Partner', route: '/sponsorship' },
    { name: 'Connect', id: 'connect' },
  ];

  const useLightPill = !isHome || isScrolled;

  return (
    <>
      <m.header
        initial={false}
        animate={{ y: isHidden && !isOpen ? '-120%' : '0%' }}
        transition={prefersReduced ? { duration: 0.01 } : SPRING_TACTILE}
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 pt-3 pointer-events-none"
      >
        {/* Floating Centered Pill Nav Container */}
        <div
          className={`pointer-events-auto relative max-w-5xl mx-auto rounded-full px-3.5 sm:px-5 py-2 flex items-center justify-between gap-3 transition-colors duration-300 overflow-hidden backdrop-blur-xl ${
            useLightPill
              ? 'bg-sanctuary-alabaster/90 border border-sanctuary-stone shadow-[0_10px_30px_-10px_rgba(20,22,25,0.12)]'
              : 'bg-sanctuary-950/75 border border-white/15 shadow-xl'
          }`}
        >
          {/* Left: Brand Logo + Name */}
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 group shrink-0 min-h-[40px]"
            aria-label="Rhema Inner Court Gospel Church Home"
          >
            <div
              className={`w-9 h-9 rounded-xl overflow-hidden border transition-colors shrink-0 ${
                useLightPill
                  ? 'border-gold-500/35 bg-sanctuary-parchment'
                  : 'border-gold-500/40 bg-sanctuary-900'
              }`}
            >
              <img
                src={IMAGES.logo}
                alt="RICGCW Logo"
                width={IMAGE_DIMENSIONS.logo.width}
                height={IMAGE_DIMENSIONS.logo.height}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="leading-tight">
              <span
                className={`font-serif font-bold text-base sm:text-lg tracking-wider block transition-colors ${
                  useLightPill ? 'text-ink-primary group-hover:text-gold-600' : 'text-sanctuary-alabaster group-hover:text-gold-400'
                }`}
              >
                {churchInfo.shortName}
              </span>
              <span
                className={`hidden lg:block text-eyebrow tracking-wide font-normal ${
                  useLightPill ? 'text-ink-muted' : 'text-sanctuary-alabaster/70'
                }`}
              >
                Inner Court Sanctuary
              </span>
            </div>
          </Link>

          {/* Center (Desktop md+): Frosted Pill Links with sliding layoutId indicator */}
          <nav
            aria-label="Primary sanctuary navigation"
            className="hidden md:flex items-center gap-1"
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
                  className={`relative px-3.5 py-2 rounded-full text-caption font-medium tracking-wide transition-colors cursor-pointer min-h-[40px] flex items-center ${
                    useLightPill
                      ? isActive
                        ? 'text-ink-primary font-semibold'
                        : 'text-ink-secondary hover:text-ink-primary'
                      : isActive
                      ? 'text-sanctuary-950 font-semibold'
                      : 'text-sanctuary-alabaster/85 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <m.span
                      layoutId="nav-active"
                      transition={SPRING_TACTILE}
                      className={`absolute inset-0 rounded-full -z-10 ${
                        useLightPill
                          ? 'bg-gold-500/18 border border-gold-500/35'
                          : 'bg-gold-400'
                      }`}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-2 shrink-0">
            <Magnetic strength={0.18}>
              <button
                type="button"
                onClick={() => {
                  trackEvent('conversion', 'giving_modal_opened', 'Navbar');
                  onOpenGivingModal?.();
                }}
                className="min-h-[40px] px-4 py-2 rounded-full bg-gold-600 hover:bg-gold-700 text-sanctuary-alabaster text-caption font-semibold tracking-wide shadow-sm flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-sanctuary-alabaster" />
                <span>Give</span>
              </button>
            </Magnetic>

            {/* Mobile Menu Toggle Button with Menu ⇄ X morph */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className={`md:hidden min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center border transition-colors cursor-pointer ${
                useLightPill
                  ? 'bg-sanctuary-parchment hover:bg-sanctuary-stone text-ink-primary border-sanctuary-stone'
                  : 'bg-white/10 hover:bg-white/20 text-sanctuary-alabaster border-white/15'
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <m.span
                    key="icon-close"
                    initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.18, ease: CATHEDRAL_EASE }}
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
                    transition={{ duration: 0.18, ease: CATHEDRAL_EASE }}
                    className="flex items-center justify-center"
                  >
                    <Menu className="w-5 h-5" />
                  </m.span>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* Continuous Scroll Reading Progress Bar along pill bottom */}
          <m.div
            aria-hidden="true"
            style={{ scaleX: scrollYProgress }}
            className="absolute bottom-0 left-4 right-4 h-[2px] origin-left bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 opacity-85 pointer-events-none"
          />
        </div>
      </m.header>

      {/* =====================================================================
          MOBILE FULL-SCREEN CIRCULAR CLIP-PATH OVERLAY (<md)
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
                : { clipPath: 'circle(0% at calc(100% - 2.25rem) 2.25rem)', opacity: 0.9 }
            }
            animate={
              prefersReduced
                ? { opacity: 1 }
                : { clipPath: 'circle(150% at calc(100% - 2.25rem) 2.25rem)', opacity: 1 }
            }
            exit={
              prefersReduced
                ? { opacity: 0 }
                : { clipPath: 'circle(0% at calc(100% - 2.25rem) 2.25rem)', opacity: 0.9 }
            }
            transition={{ duration: prefersReduced ? 0.15 : 0.45, ease: CATHEDRAL_EASE }}
            className="md:hidden fixed inset-0 z-[60] bg-sanctuary-950/98 backdrop-blur-xl text-sanctuary-alabaster flex flex-col justify-between p-6 pt-5 pb-[calc(1.5rem+env(safe-area-inset-bottom,0px))] overflow-y-auto"
          >
            {/* Top Bar inside Overlay */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl overflow-hidden border border-gold-500/40 bg-sanctuary-900">
                  <img
                    src={IMAGES.logo}
                    alt="RICGCW Logo"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="font-serif font-bold text-lg text-sanctuary-alabaster block leading-tight">
                    {churchInfo.shortName}
                  </span>
                  <span className="text-eyebrow uppercase tracking-widest text-gold-400">
                    2026: Divine Manifestation
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close navigation menu"
                className="min-w-[44px] min-h-[44px] rounded-full bg-white/10 hover:bg-white/20 text-sanctuary-alabaster flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Large Staggered Serif Links */}
            <nav className="py-8 flex flex-col gap-2" aria-label="Sanctuary sections">
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
                      delay: prefersReduced ? 0 : 0.08 + idx * 0.06,
                      ease: CATHEDRAL_EASE,
                    }}
                    onClick={() => handleNavClick(link.id, link.route)}
                    className={`min-h-[48px] text-left py-2 font-serif text-3xl sm:text-4xl tracking-tight transition-colors flex items-baseline gap-4 cursor-pointer ${
                      isActive ? 'text-gold-400 italic' : 'text-sanctuary-alabaster hover:text-gold-400'
                    }`}
                  >
                    <span className="text-eyebrow font-mono text-gold-400/70 not-italic">
                      0{idx + 1}
                    </span>
                    <span>{link.name}</span>
                  </m.button>
                );
              })}
            </nav>

            {/* Bottom Give CTA & Social Links */}
            <div className="space-y-4 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  trackEvent('conversion', 'giving_modal_opened', 'Mobile Overlay');
                  onOpenGivingModal?.();
                }}
                className="w-full min-h-[48px] py-3.5 px-6 rounded-full bg-gold-600 hover:bg-gold-700 text-sanctuary-alabaster font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-sanctuary-alabaster" />
                <span>Give &amp; Partner Online</span>
              </button>

              <div className="flex items-center justify-between pt-1">
                <span className="text-caption text-sanctuary-alabaster/65">
                  Touching Lives Worldwide
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={churchInfo.contact.youtube}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube"
                    className="min-w-[44px] min-h-[44px] rounded-xl bg-white/5 hover:bg-red-600 text-sanctuary-alabaster/80 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <YoutubeIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={churchInfo.contact.facebook}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    className="min-w-[44px] min-h-[44px] rounded-xl bg-white/5 hover:bg-blue-600 text-sanctuary-alabaster/80 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={churchInfo.contact.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className="min-w-[44px] min-h-[44px] rounded-xl bg-white/5 hover:bg-pink-600 text-sanctuary-alabaster/80 hover:text-white flex items-center justify-center transition-colors"
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
