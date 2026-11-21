import React from 'react';
import { Link } from 'react-router-dom';
import { m, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/churchData';
import { usePageTitle } from '../utils/usePageTitle';
import { scaleIn, CATHEDRAL_EASE, SPRING_TACTILE } from '../components/motion';

/**
 * Access verification confirmation route with sanctuary entrance and SVG checkmark draw.
 */
export const Auth: React.FC = () => {
  usePageTitle('Access Verification');
  const prefersReduced = useReducedMotion();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-sanctuary-alabaster sanctuary-composite-canvas text-ink-primary px-4 py-8 relative overflow-hidden">
      <m.div
        variants={scaleIn}
        initial={prefersReduced ? false : 'hidden'}
        animate="visible"
        className="max-w-md w-full text-center space-y-7 p-8 sm:p-10 bg-sanctuary-parchment/95 border border-sanctuary-stone rounded-3xl shadow-xl relative z-10"
      >
        {/* Church Logo */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gold-500/35 shadow-sm bg-sanctuary-alabaster">
            <img src={IMAGES.logo} alt="RICGCW Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Verification Success Icon (Animated SVG Check Draw) */}
        <div className="w-16 h-16 bg-olive-500/15 border border-olive-500/30 rounded-2xl flex items-center justify-center mx-auto text-olive-500">
          <svg viewBox="0 0 36 36" className="w-9 h-9" fill="none" aria-hidden="true">
            <m.circle
              cx="18"
              cy="18"
              r="14"
              stroke="currentColor"
              strokeWidth="2"
              initial={prefersReduced ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, delay: 0.1, ease: CATHEDRAL_EASE }}
            />
            <m.path
              d="M11.5 18.5L16 23L24.5 14"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={prefersReduced ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, delay: 0.45, ease: CATHEDRAL_EASE }}
            />
          </svg>
        </div>

        <div className="space-y-2.5">
          <h1 className="text-h2 font-bold font-serif text-ink-primary">
            Access Confirmed
          </h1>
          <p className="text-body text-ink-secondary">
            Your verification has been successfully confirmed. You can now return to the home sanctuary and explore all church services.
          </p>
        </div>

        <div className="pt-2">
          <m.div whileTap={prefersReduced ? undefined : { scale: 0.98 }} transition={SPRING_TACTILE}>
            <Link
              to="/"
              className="group w-full min-h-[44px] py-3.5 px-6 rounded-full bg-ink-primary hover:bg-gold-600 text-sanctuary-alabaster font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500"
            >
              <span>Return to Homepage</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </m.div>
        </div>

        <div className="pt-1 text-caption text-ink-muted font-mono">
          Rhema Inner Court Gospel Church (Worldwide)
        </div>
      </m.div>
    </div>
  );
};

export default Auth;
