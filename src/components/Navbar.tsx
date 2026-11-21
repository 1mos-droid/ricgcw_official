import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useChurch } from '../context/ChurchContext';
import { IMAGES } from '../data/churchData';
import { trackEvent } from '../utils/analytics';

interface NavbarProps {
  onOpenBranchModal?: (branchId?: string) => void;
  onOpenGivingModal?: () => void;
  onOpenPrayerModal?: () => void;
}

const SECTION_IDS = ['about', 'sanctuaries', 'ministries', 'media', 'connect'] as const;

export const Navbar: React.FC<NavbarProps> = ({
  onOpenGivingModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';
  const { churchInfo } = useChurch();

  // Adaptive daylight surface once scrolled past hero on home, or on light sub-routes
  const useLightHeader = !isHome || isScrolled;

  // Scroll detection, reading progress, and section scroll-spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 36);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0);

      if (isHome) {
        let current: string | null = null;
        for (const id of SECTION_IDS) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 160 && rect.bottom > 100) {
              current = id;
            }
          }
        }
        setActiveSection(current);
      } else {
        setActiveSection(null);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Escape key to close navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 md:px-8 ${
        useLightHeader
          ? 'bg-sanctuary-alabaster/90 backdrop-blur-xl border-b border-sanctuary-stone/90 py-3 shadow-[0_6px_28px_-10px_rgba(20,22,25,0.09)]'
          : isOpen
          ? 'bg-sanctuary-950/95 backdrop-blur-xl border-b border-sanctuary-stone/15 py-3 shadow-xl'
          : 'bg-gradient-to-b from-sanctuary-950/90 via-sanctuary-950/55 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 h-11 sm:h-12 relative overflow-hidden">
        {/* =====================================================================
            LEFT: BRAND (LOGO + ANIMATED NAME)
            When open: Name smoothly leaves to the left, ONLY the Logo remains!
        ===================================================================== */}
        <div className="flex items-center shrink-0">
          <Link
            to="/"
            onClick={() => {
              if (isOpen) setIsOpen(false);
            }}
            className="flex items-center group cursor-pointer select-none"
            aria-label="Rhema Inner Court Gospel Church Home"
          >
            {/* The Logo (Always stays in place) */}
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl overflow-hidden border shadow-sm transition-colors shrink-0 ${
                useLightHeader
                  ? 'border-gold-500/35 group-hover:border-gold-500 bg-sanctuary-parchment'
                  : 'border-gold-500/40 group-hover:border-gold-400 bg-sanctuary-900'
              }`}
            >
              <img
                src={IMAGES.logo}
                alt="RICGCW Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* The Church Name (Smoothly leaves when navbar is opened) */}
            <AnimatePresence initial={false}>
              {!isOpen && (
                <motion.div
                  key="brand-text"
                  initial={{ opacity: 0, x: -16, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: 'auto' }}
                  exit={{ opacity: 0, x: -16, width: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden whitespace-nowrap ml-2.5 sm:ml-3"
                >
                  <span
                    className={`font-serif font-bold text-base sm:text-lg tracking-wider block leading-tight transition-colors ${
                      useLightHeader
                        ? 'text-ink-primary group-hover:text-gold-600'
                        : 'text-sanctuary-alabaster group-hover:text-gold-400'
                    }`}
                  >
                    {churchInfo.shortName}
                  </span>
                  <p
                    className={`text-[10px] hidden sm:block tracking-wide font-light transition-colors ${
                      useLightHeader ? 'text-ink-secondary' : 'text-sanctuary-alabaster/70'
                    }`}
                  >
                    Rhema Inner Court Gospel Church
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* =====================================================================
            CENTER / RIGHT: SLIDING IN-LINE NAVBAR OR CLOSED CONTROLS
        ===================================================================== */}
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            /* OPENED STATE: Simplified navbar slides into the top bar from right to left */
            <motion.nav
              key="opened-sliding-navbar"
              aria-label="Primary sanctuary navigation"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 flex items-center justify-end gap-1 sm:gap-2 overflow-x-auto no-scrollbar pl-2"
            >
              {/* Simplified Nav Links */}
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                {navLinks.map((link) => {
                  const isActive =
                    (link.route && location.pathname === link.route) ||
                    (link.id && activeSection === link.id);
                  return (
                    <button
                      key={link.name}
                      onClick={() => handleNavClick(link.id, link.route)}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                        useLightHeader
                          ? isActive
                            ? 'text-gold-600 bg-gold-500/10 font-semibold'
                            : 'text-ink-secondary hover:text-ink-primary hover:bg-sanctuary-stone/50'
                          : isActive
                          ? 'text-gold-400 bg-white/10 font-semibold'
                          : 'text-sanctuary-alabaster/85 hover:text-gold-400 hover:bg-white/5'
                      }`}
                    >
                      {link.name}
                    </button>
                  );
                })}
              </div>

              {/* Giving Action Button */}
              <button
                onClick={() => {
                  trackEvent('conversion', 'giving_modal_opened', 'Navbar');
                  onOpenGivingModal?.();
                }}
                className="px-3.5 sm:px-4 py-1.5 rounded-full bg-gold-600 hover:bg-gold-700 text-sanctuary-alabaster text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ml-1"
              >
                <Heart className="w-3.5 h-3.5 fill-sanctuary-alabaster" />
                <span>Give</span>
              </button>

              {/* Close Button (X) */}
              <button
                onClick={() => setIsOpen(false)}
                className={`p-1.5 sm:p-2 rounded-full transition-colors cursor-pointer shrink-0 ml-1 ${
                  useLightHeader
                    ? 'bg-sanctuary-stone/60 hover:bg-sanctuary-stone text-ink-primary'
                    : 'bg-white/10 hover:bg-white/20 text-sanctuary-alabaster'
                }`}
                aria-label="Close navigation bar"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.nav>
          ) : (
            /* CLOSED STATE: Navbar is closed and hidden to the right. Only Menu & Give shown */
            <motion.div
              key="closed-controls"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2 sm:gap-3 shrink-0"
            >
              <button
                onClick={() => {
                  trackEvent('conversion', 'giving_modal_opened', 'Navbar');
                  onOpenGivingModal?.();
                }}
                className="px-3.5 sm:px-4 py-1.5 rounded-full bg-gold-600 hover:bg-gold-700 text-sanctuary-alabaster text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-sanctuary-alabaster" />
                <span>Give</span>
              </button>

              <button
                onClick={() => setIsOpen(true)}
                aria-expanded={isOpen}
                className={`px-3.5 sm:px-4 py-1.5 rounded-full border text-xs font-medium uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                  useLightHeader
                    ? 'bg-sanctuary-parchment hover:bg-sanctuary-stone text-ink-primary border-sanctuary-stone'
                    : 'bg-white/10 hover:bg-white/15 text-sanctuary-alabaster border-white/15'
                }`}
                aria-label="Open navigation menu"
              >
                <Menu className={`w-4 h-4 ${useLightHeader ? 'text-gold-600' : 'text-gold-400'}`} />
                <span>Menu</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Continuous Reading Progress Hairline */}
      {isScrolled && (
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold-500/15 pointer-events-none"
        >
          <div
            className="h-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 origin-left transition-transform duration-150 ease-out"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      )}
    </header>
  );
};

export default Navbar;
