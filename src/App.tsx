import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ChurchProvider } from './context/ChurchContext';
import Home from './pages/Home';
import CookieConsent from './components/CookieConsent';

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

// Lightweight, accessible sanctuary suspense fallback
function SanctuaryLoadingFallback() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="min-h-screen bg-[#070c18] text-amber-400 flex flex-col items-center justify-center p-6 space-y-4"
    >
      <div className="w-10 h-10 border-2 border-amber-500/20 border-t-amber-400 rounded-full animate-spin" />
      <p className="text-xs uppercase tracking-widest font-bold text-slate-300">
        Loading Sanctuary...
      </p>
    </div>
  );
}

function App() {
  return (
    <ChurchProvider>
      <Router>
        {/* WCAG 2.2 AA Skip to Main Content Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2.5 focus:bg-amber-500 focus:text-slate-950 focus:font-bold focus:rounded-xl focus:shadow-2xl focus:ring-2 focus:ring-amber-300"
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
  );
}

export default App;
