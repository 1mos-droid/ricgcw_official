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
          initial={{ opacity: 0, y: prefersReduced ? 0 : 24, scale: prefersReduced ? 1 : 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: prefersReduced ? 0 : 20, scale: prefersReduced ? 1 : 0.98 }}
          transition={prefersReduced ? { duration: 0.12 } : SPRING_TACTILE}
          className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-xl z-50"
        >
          <div className="bg-sanctuary-950/95 border border-gold-400/25 text-sanctuary-alabaster rounded-2xl p-5 md:p-6 shadow-2xl backdrop-blur-xl space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 shrink-0">
                  <Cookie className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-sanctuary-alabaster">
                    Cookie &amp; Privacy Notice
                  </h3>
                  <p className="text-eyebrow text-gold-400 font-medium">
                    Rhema Inner Court Gospel Church (Worldwide)
                  </p>
                </div>
              </div>
              <button
                onClick={() => saveConsent(false)}
                className="min-w-[36px] min-h-[36px] text-sanctuary-alabaster/60 hover:text-white p-1 rounded-lg flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close and use essential only"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <p className="text-caption text-sanctuary-alabaster/80 leading-relaxed">
              We use essential cookies and local storage to deliver core sanctuary services, remember branch preferences, and secure Paystack online giving. We also use anonymous analytics to understand sermon and ministry engagement.
            </p>

            {/* Detailed Preferences Accordion */}
            <AnimatePresence initial={false}>
              {showDetails && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="p-3.5 rounded-xl bg-sanctuary-900 border border-white/10 space-y-3 text-caption">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10 gap-3">
                      <div className="space-y-0.5">
                        <p className="font-bold text-sanctuary-alabaster flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          Essential Operations (Required)
                        </p>
                        <p className="text-caption text-sanctuary-alabaster/65">
                          Necessary for website navigation, branch direction lookups, and secure donations.
                        </p>
                      </div>
                      <span className="text-eyebrow font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-olive-500/30 text-emerald-300 border border-olive-500/50 shrink-0">
                        Always Active
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1 gap-3">
                      <div className="space-y-0.5">
                        <p className="font-bold text-sanctuary-alabaster flex items-center gap-1.5">
                          <Info className="w-4 h-4 text-gold-400" />
                          Anonymous Usage Analytics
                        </p>
                        <p className="text-caption text-sanctuary-alabaster/65">
                          Helps our media secretariat measure sermon broadcasts and visitor trends without storing personal identifiers.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0 min-h-[44px]">
                        <input
                          type="checkbox"
                          checked={analyticsAllowed}
                          onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-sanctuary-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[14px] after:left-[2px] after:bg-white after:border-sanctuary-stone after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-gold-600" />
                      </label>
                    </div>
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            {/* Links & Action Buttons */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-wrap items-center gap-2 text-caption">
                <button
                  onClick={() => saveConsent(true)}
                  className="flex-1 min-h-[44px] py-2.5 px-4 rounded-xl bg-gold-600 hover:bg-gold-700 text-sanctuary-alabaster font-semibold uppercase tracking-wider text-eyebrow transition-all shadow-md text-center cursor-pointer"
                >
                  Accept All
                </button>
                <button
                  onClick={() => saveConsent(false)}
                  className="flex-1 min-h-[44px] py-2.5 px-4 rounded-xl bg-sanctuary-900 hover:bg-sanctuary-800 text-sanctuary-alabaster font-semibold uppercase tracking-wider text-eyebrow border border-white/15 transition-colors text-center cursor-pointer"
                >
                  Essential Only
                </button>
                <button
                  onClick={() => setShowDetails(!showDetails)}
                  className="min-h-[44px] py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gold-400 font-semibold uppercase tracking-wider text-eyebrow border border-white/10 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>{showDetails ? 'Hide' : 'Preferences'}</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-caption text-sanctuary-alabaster/65 pt-1">
                <Link to="/privacy" className="hover:text-gold-400 underline underline-offset-2">
                  Privacy Policy
                </Link>
                <span>•</span>
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
