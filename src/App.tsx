import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig, LazyMotion, domMax, AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { ChurchProvider } from './context/ChurchContext';
import Home from './pages/Home';
import CookieConsent from './components/CookieConsent';
import { IMAGES } from './data/churchData';
import { CATHEDRAL_EASE } from './components/motion';

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

// Clean neutral loading fallback aligned with the warm off-white editorial surface
function SanctuaryLoadingFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-screen bg-public-canvas text-public-ink flex flex-col items-center justify-center p-6 space-y-4"
    >
      <div className="w-12 h-12 rounded-xl overflow-hidden border border-public-border bg-public-surface shadow-xs">
        <img src={IMAGES.logo} alt="RICGCW Logo" width={48} height={48} className="w-full h-full object-cover" />
      </div>
      <div className="w-36 h-1 rounded-full bg-public-border overflow-hidden relative">
        <div className="absolute inset-y-0 w-1/2 rounded-full bg-public-accent animate-shimmer-bar" />
      </div>
      <p className="text-xs uppercase tracking-[0.14em] font-semibold text-public-ink-muted">
        Loading...
      </p>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const prefersReduced = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <m.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: prefersReduced ? 0.08 : 0.16, ease: CATHEDRAL_EASE }}
      >
        <Suspense fallback={<SanctuaryLoadingFallback />}>
          <Routes location={location}>
            {/* Public Core Website Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/sponsorship" element={<Sponsorship />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/auth" element={<Auth />} />

            {/* Unlisted / Secret QR Code Program Lineup Routes */}
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
      </m.div>
    </AnimatePresence>
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
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2.5 focus:bg-public-accent focus:text-white focus:font-semibold focus:rounded-lg focus:shadow-lg focus:ring-2 focus:ring-public-ink"
            >
              Skip to main content
            </a>

            <ScrollToTop />
            <AnimatedRoutes />
            <CookieConsent />
          </Router>
        </ChurchProvider>
      </LazyMotion>
    </MotionConfig>
  );
}

export default App;
