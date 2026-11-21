import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig, LazyMotion, domMax } from 'framer-motion';
import { ChurchProvider } from './context/ChurchContext';
import Home from './pages/Home';
import CookieConsent from './components/CookieConsent';
import { IMAGES } from './data/churchData';

// Route-level code splitting: High-performance lazy loading for secondary and admin routes
const Sponsorship = lazy(() => import('./pages/Sponsorship'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Auth = lazy(() => import('./pages/Auth'));
const ConsecrationProgram = lazy(() => import('./pages/ConsecrationProgram'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminRoute = lazy(() => import('./components/AdminRoute'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

// Branded sanctuary suspense fallback with logo & gold shimmer bar
function SanctuaryLoadingFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-screen bg-sanctuary-alabaster text-gold-600 flex flex-col items-center justify-center p-6 space-y-5"
    >
      <div className="w-14 h-14 rounded-2xl overflow-hidden border border-gold-500/35 shadow-sm bg-sanctuary-parchment">
        <img src={IMAGES.logo} alt="RICGCW Logo" width={56} height={56} className="w-full h-full object-cover" />
      </div>
      <div className="w-40 h-1 rounded-full bg-sanctuary-stone overflow-hidden relative">
        <div className="absolute inset-y-0 w-1/2 rounded-full bg-gradient-to-r from-transparent via-gold-500 to-transparent animate-shimmer-bar" />
      </div>
      <p className="text-eyebrow uppercase tracking-widest font-semibold text-ink-secondary">
        Loading Sanctuary...
      </p>
    </div>
  );
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domMax}>
        <ChurchProvider>
          <Router>
            {/* WCAG 2.2 AA Skip to Main Content Link */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2.5 focus:bg-gold-600 focus:text-sanctuary-alabaster focus:font-bold focus:rounded-xl focus:shadow-2xl focus:ring-2 focus:ring-gold-400"
            >
              Skip to sanctuary content
            </a>

            <ScrollToTop />

            <Suspense fallback={<SanctuaryLoadingFallback />}>
              <Routes>
                {/* Public Core Website Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/sponsorship" element={<Sponsorship />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/auth" element={<Auth />} />

                {/* Unlisted / Secret QR Code Program Lineup Routes (Scanned by church attendees) */}
                <Route path="/consecration" element={<ConsecrationProgram />} />
                <Route path="/consecration-service" element={<ConsecrationProgram />} />
                <Route path="/order-of-service" element={<ConsecrationProgram />} />
                <Route path="/lineup" element={<ConsecrationProgram />} />
                <Route path="/program" element={<ConsecrationProgram />} />

                {/* Admin Portal Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />

                {/* 404 Waypoint Not Found */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>

            <CookieConsent />
          </Router>
        </ChurchProvider>
      </LazyMotion>
    </MotionConfig>
  );
}

export default App;
