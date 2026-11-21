import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cookie, Settings, X, Info } from 'lucide-react';

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

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-6 md:right-auto md:max-w-xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-[#080B11]/95 border border-[#DFC57B]/25 text-[#FAF8F5] rounded-2xl p-5 md:p-6 shadow-2xl backdrop-blur-xl space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#B8860B]/20 border border-[#B8860B]/40 flex items-center justify-center text-[#DFC57B] shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#FAF8F5]">Cookie &amp; Privacy Notice</h3>
              <p className="text-[11px] text-[#DFC57B] font-medium">Rhema Inner Court Gospel Church (Worldwide)</p>
            </div>
          </div>
          <button
            onClick={() => saveConsent(false)}
            className="text-[#FAF8F5]/60 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            aria-label="Close and use essential only"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <p className="text-xs text-[#FAF8F5]/75 leading-relaxed font-light">
          We use essential cookies and local storage to deliver core sanctuary services, remember branch preferences, and secure Paystack online giving. We also use anonymous analytics to understand sermon and ministry engagement.
        </p>

        {/* Detailed Preferences Accordion */}
        {showDetails && (
          <div className="p-3.5 rounded-xl bg-[#0F1420] border border-white/10 space-y-3 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="space-y-0.5">
                <p className="font-bold text-[#FAF8F5] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Essential Operations (Required)
                </p>
                <p className="text-[11px] text-[#FAF8F5]/60">
                  Necessary for website navigation, branch direction lookups, and secure donations.
                </p>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#3B6E4C]/30 text-emerald-300 border border-[#3B6E4C]/50">
                Always Active
              </span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="space-y-0.5 pr-3">
                <p className="font-bold text-[#FAF8F5] flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#DFC57B]" />
                  Anonymous Usage Analytics
                </p>
                <p className="text-[11px] text-[#FAF8F5]/60">
                  Helps our media secretariat measure sermon broadcasts and visitor trends without storing personal identifiers.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={analyticsAllowed}
                  onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-[#1C2436] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E6E0D3] after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#B8860B]" />
              </label>
            </div>
          </div>
        )}

        {/* Links & Action Buttons */}
        <div className="space-y-3 pt-1">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <button
              onClick={() => saveConsent(true)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#B8860B] hover:bg-[#996515] text-[#FAF8F5] font-semibold uppercase tracking-wider text-[11px] transition-all shadow-md text-center cursor-pointer"
            >
              Accept All
            </button>
            <button
              onClick={() => saveConsent(false)}
              className="flex-1 py-2.5 px-4 rounded-xl bg-[#0F1420] hover:bg-[#1C2436] text-[#FAF8F5] font-semibold uppercase tracking-wider text-[11px] border border-white/15 transition-colors text-center cursor-pointer"
            >
              Essential Only
            </button>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-[#DFC57B] font-semibold uppercase tracking-wider text-[11px] border border-white/10 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>{showDetails ? 'Hide' : 'Preferences'}</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#FAF8F5]/60 pt-1">
            <Link to="/privacy" className="hover:text-[#DFC57B] underline underline-offset-2">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-[#DFC57B] underline underline-offset-2">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
