import React from 'react';
import { Link } from 'react-router-dom';
import { m, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { IMAGES } from '../data/churchData';
import { usePageTitle } from '../utils/usePageTitle';
import { fadeUp, staggerContainer, staggerItem, CATHEDRAL_EASE, SPRING_TACTILE } from '../components/motion';

/**
 * 404 sanctuary fallback page with a calm floating architectural compass emblem.
 */
export const NotFound: React.FC = () => {
  usePageTitle('Page Not Found • 404');
  const prefersReduced = useReducedMotion();

  return (
    <div className="min-h-screen bg-sanctuary-alabaster sanctuary-composite-canvas text-ink-primary flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <m.div
        variants={staggerContainer}
        initial={prefersReduced ? false : 'hidden'}
        animate="visible"
        className="max-w-lg w-full relative z-10 text-center space-y-8"
      >
        {/* Brand & Gentle Floating Sanctuary Compass Arch */}
        <m.div variants={staggerItem} className="relative flex flex-col items-center gap-4">
          <m.div
            animate={prefersReduced ? undefined : { y: [-4, 4, -4] }}
            transition={
              prefersReduced
                ? undefined
                : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
            }
            className="relative flex items-center justify-center"
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 120 120"
              className="w-24 h-24 text-gold-600/80"
              fill="none"
            >
              <m.path
                d="M24 96V56C24 36.118 40.118 20 60 20C79.882 20 96 36.118 96 56V96"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={prefersReduced ? { pathLength: 1 } : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, ease: CATHEDRAL_EASE }}
              />
              <circle
                cx="60"
                cy="58"
                r="22"
                stroke="currentColor"
                strokeOpacity="0.28"
                strokeWidth="1"
                strokeDasharray="3 4"
              />
              <path
                d="M60 30L64.5 53.5L88 58L64.5 62.5L60 86L55.5 62.5L32 58L55.5 53.5L60 30Z"
                fill="currentColor"
                fillOpacity="0.14"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            </svg>
            <div className="w-11 h-11 rounded-xl overflow-hidden border border-gold-500/40 shadow-md bg-sanctuary-alabaster absolute">
              <img src={IMAGES.logo} alt="RICGCW Logo" className="w-full h-full object-cover" />
            </div>
          </m.div>
        </m.div>

        <m.div variants={fadeUp} className="space-y-3">
          <span className="px-4 py-1.5 rounded-full text-eyebrow font-bold uppercase bg-sanctuary-parchment border border-sanctuary-stone text-gold-600 inline-block">
            Error 404 • Grace Still Abounds
          </span>
          <h1 className="text-h1 font-bold font-serif text-ink-primary">
            Waypoint Not Found
          </h1>
          <p className="text-body text-ink-secondary leading-relaxed max-w-md mx-auto">
            The pathway or document you are seeking is not located at this address. You may return to the main sanctuary or explore our service schedules.
          </p>
        </m.div>

        {/* Action Navigation */}
        <m.div
          variants={staggerItem}
          className="p-6 sm:p-7 rounded-3xl bg-sanctuary-parchment/90 border border-sanctuary-stone space-y-4 shadow-sm"
        >
          <p className="text-eyebrow font-bold uppercase text-ink-muted">
            Helpful Sanctuary Waypoints
          </p>

          <div className="grid gap-3">
            <m.div whileTap={prefersReduced ? undefined : { scale: 0.98 }} transition={SPRING_TACTILE}>
              <Link
                to="/"
                className="min-h-[44px] py-3 px-5 rounded-full bg-ink-primary hover:bg-gold-600 text-sanctuary-alabaster font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Sanctuary Homepage</span>
              </Link>
            </m.div>

            <m.div whileTap={prefersReduced ? undefined : { scale: 0.98 }} transition={SPRING_TACTILE}>
              <Link
                to="/sponsorship"
                className="min-h-[44px] py-3 px-5 rounded-full bg-sanctuary-alabaster hover:bg-white text-ink-primary font-bold text-xs uppercase tracking-wider border border-sanctuary-stone transition-colors flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
              >
                <Sparkles className="w-4 h-4 text-gold-600" />
                <span>Missions &amp; Sponsorship Altar</span>
              </Link>
            </m.div>
          </div>
        </m.div>

        <m.div variants={staggerItem} className="text-caption font-mono text-ink-muted">
          Rhema Inner Court Gospel Church (Worldwide) • Accra, Ghana
        </m.div>
      </m.div>
    </div>
  );
};

export default NotFound;
