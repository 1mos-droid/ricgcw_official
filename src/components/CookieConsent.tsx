import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ShieldCheck, Cookie, Settings, X, Info } from 'lucide-react';
import { SPRING_TACTILE } from './motion';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  decidedAt: string;
}

const COOKIE_STORAGE_KEY = 'ricgcw_cookie_consent';

export const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!saved) {
        const timer = setTimeout(() => setIsVisible(true), 800);
        return () => clearTimeout(timer);
      } else {
        const parsed: CookiePreferences = JSON.parse(saved);
        setAnalyticsAllowed(parsed.analytics !== false);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const handleOpenPreferences = () => {
      setShowDetails(true);
      setIsVisible(true);
    };

    window.addEventListener('open-cookie-preferences', handleOpenPreferences);
    return () => window.removeEventListener('open-cookie-preferences', handleOpenPreferences);
  }, []);

  const saveConsent = (allowAnalytics: boolean) => {
    const preferences: CookiePreferences = {
      essential: true,
      analytics: allowAnalytics,
      decidedAt: new Date().toISOString(),
    };
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify(preferences));
    } catch (e) {
      console.warn('Cookie consent storage error:', e);
    }
    setAnalyticsAllowed(allowAnalytics);
    setIsVisible(false);
    setShowDetails(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          role="region"
          aria-label="Cookie and Privacy Consent"
          initial={{ opacity: 0, y: prefersReduced ? 0 : 20, scale: prefersReduced ? 1 : 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: prefersReduced ? 0 : 16, scale: prefersReduced ? 1 : 0.98 }}
          transition={prefersReduced ? { duration: 0.12 } : SPRING_TACTILE}
          className="fixed bottom-16 md:bottom-5 left-3 right-3 md:left-auto md:right-5 md:max-w-md z-50"
        >
          <div className="bg-sanctuary-950/98 border border-gold-400/35 text-sanctuary-alabaster rounded-sm p-4 sm:p-5 shadow-2xl space-y-3">
            {/* Compact Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-sm bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-400 shrink-0">
                  <Cookie className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-sanctuary-alabaster leading-tight">
                    Cookie &amp; Privacy Notice
                  </h3>
                  <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-gold-400">
                    Rhema Inner Court Gospel Church (Worldwide)
                  </p>
                </div>
              </div>
              <button
                onClick={() => saveConsent(false)}
                className="min-w-[36px] min-h-[36px] text-sanctuary-alabaster/60 hover:text-white p-1 rounded-sm flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close and use essential only"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-caption text-sanctuary-alabaster/80 leading-snug">
              Essential cookies support branch lookup &amp; Paystack giving; optional analytics help measure ministry engagement.
            </p>

            <AnimatePresence initial={false}>
              {showDetails && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 rounded-sm bg-sanctuary-900 border border-white/12 space-y-2.5 text-caption">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 gap-3">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-sanctuary-alabaster flex items-center gap-1.5 text-xs">
                          <ShieldCheck className="w-4 h-4 text-olive-400 shrink-0" />
                          Essential Operations (Required)
                        </p>
                        <p className="text-xs text-sanctuary-alabaster/65">
                          Core navigation, branch directions, and Paystack checkout.
                        </p>
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-sm bg-olive-500/30 text-olive-400 border border-olive-500/50 shrink-0">
                        Active
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-sanctuary-alabaster flex items-center gap-1.5 text-xs">
                          <Info className="w-4 h-4 text-gold-400 shrink-0" />
                          Anonymous Usage Analytics
                        </p>
                        <p className="text-xs text-sanctuary-alabaster/65">
                          Measures sermon engagement without storing personal identifiers.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0 min-h-[40px]">
                        <input
                          type="checkbox"
                          checked={analyticsAllowed}
                          onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-sanctuary-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[12px] after:left-[2px] after:bg-white after:border-sanctuary-stone after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gold-500" />
                      </label>
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            <div className="space-y-2 pt-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => saveConsent(true)}
                  className="flex-1 min-h-[40px] py-2 px-3 rounded-sm bg-gold-500 hover:bg-gold-400 text-sanctuary-950 font-semibold uppercase tracking-[0.12em] text-[11px] transition-colors text-center cursor-pointer whitespace-nowrap"
                >
                  Accept All
                </button>
                <button
                  onClick={() => saveConsent(false)}
                  className="flex-1 min-h-[40px] py-2 px-3 rounded-sm bg-sanctuary-900 hover:bg-sanctuary-800 text-sanctuary-alabaster font-semibold uppercase tracking-[0.12em] text-[11px] border border-white/15 transition-colors text-center cursor-pointer whitespace-nowrap"
                >
                  Essential Only
                </button>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="min-h-[40px] py-2 px-3 rounded-sm bg-white/5 hover:bg-white/10 text-gold-400 font-semibold uppercase tracking-[0.12em] text-[11px] border border-white/12 transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>{showDetails ? 'Hide' : 'Preferences'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-xs text-sanctuary-alabaster/65">
                <Link to="/privacy" className="hover:text-gold-400 underline underline-offset-2">
                  Privacy Policy
                </Link>
                <span>·</span>
                <Link to="/terms" className="hover:text-gold-400 underline underline-offset-2">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
