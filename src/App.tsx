import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ChurchProvider } from './context/ChurchContext';
import Home from './pages/Home';
import Sponsorship from './pages/Sponsorship';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Auth from './pages/Auth';
import ConsecrationProgram from './pages/ConsecrationProgram';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import CookieConsent from './components/CookieConsent';

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

function App() {
  return (
    <ChurchProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/sponsorship" element={<Sponsorship />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/auth" element={<Auth />} />

          {/* Unlisted / Secret QR Code Program Lineup Routes (Not linked in navigation) */}
          <Route path="/consecration" element={<ConsecrationProgram />} />
          <Route path="/consecration-service" element={<ConsecrationProgram />} />
          <Route path="/order-of-service" element={<ConsecrationProgram />} />
          <Route path="/lineup" element={<ConsecrationProgram />} />
          <Route path="/program" element={<ConsecrationProgram />} />

          {/* Secret Admin Portal Routes (Not linked publicly) */}
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

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <CookieConsent />
      </Router>
    </ChurchProvider>
  );
}

export default App;
