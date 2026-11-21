import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { m, useAnimationControls, useReducedMotion } from 'framer-motion';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';
import { IMAGES } from '../data/churchData';
import { usePageTitle } from '../utils/usePageTitle';
import { scaleIn, SPRING_TACTILE } from '../components/motion';

/**
 * Admin control portal login with sanctuary midnight tokens and shake feedback on invalid credentials.
 */
export const AdminLogin: React.FC = () => {
  usePageTitle('Admin Portal Login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const prefersReduced = useReducedMotion();
  const formShakeControls = useAnimationControls();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const configuredPasscode =
        (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ADMIN_PASSCODE) || 'admin2026';
      const cleanInput = password.trim();
      const cleanEmail = email.trim().toLowerCase();

      const isValid = cleanEmail.length > 0 && cleanInput === configuredPasscode;

      if (isValid) {
        const sessionPayload = JSON.stringify({
          authenticated: true,
          user: cleanEmail,
          timestamp: Date.now(),
        });

        if (rememberMe) {
          localStorage.setItem('ricgcw_admin_session', sessionPayload);
        } else {
          sessionStorage.setItem('ricgcw_admin_session', sessionPayload);
        }
        navigate('/admin/dashboard');
      } else {
        setError('Invalid admin credentials. Please enter authorized credentials.');
        setIsLoading(false);
        if (!prefersReduced) {
          void formShakeControls.start({
            x: [0, -8, 8, -6, 6, -3, 3, 0],
            transition: { duration: 0.45, ease: 'easeInOut' },
          });
        }
      }
    }, 400);
  };

  return (
    <div
      className="min-h-screen bg-sanctuary-midnight flex items-center justify-center p-4 sm:p-6 relative overflow-hidden text-sanctuary-alabaster"
      style={{
        backgroundImage:
          'radial-gradient(circle at 22% 25%, rgba(184, 134, 11, 0.14), transparent 45%), radial-gradient(circle at 78% 75%, rgba(30, 58, 138, 0.16), transparent 45%)',
      }}
    >
      <m.div
        variants={scaleIn}
        initial={prefersReduced ? false : 'hidden'}
        animate="visible"
        className="max-w-md w-full relative z-10 space-y-6"
      >
        {/* Back to Public Site link */}
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/"
            className="min-h-[44px] inline-flex items-center gap-1.5 text-caption font-semibold text-sanctuary-alabaster/70 hover:text-gold-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-lg px-2 -ml-2"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Website
          </Link>
          <span className="text-eyebrow font-mono uppercase text-gold-300 px-2.5 py-1 rounded-full bg-gold-500/15 border border-gold-500/30">
            Secure Portal
          </span>
        </div>

        {/* Login Box */}
        <m.div
          animate={formShakeControls}
          className="bg-sanctuary-900/95 border border-gold-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-7"
        >
          {/* Brand & Title */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-gold-500/40 shadow-lg mx-auto bg-sanctuary-midnight">
              <img src={IMAGES.logo} alt="RICGCW Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-h2 font-bold font-serif text-white">RICGCW Admin Portal</h1>
              <p className="text-caption text-sanctuary-alabaster/70 mt-1">
                Authorized Administrative Control Center
              </p>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="p-3.5 rounded-xl bg-flame-500/15 border border-flame-500/40 text-flame-300 text-caption font-medium"
            >
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email-input"
                className="block text-eyebrow font-bold uppercase text-sanctuary-alabaster/80 mb-1.5"
              >
                Admin Email / Username
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-sanctuary-alabaster/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-email-input"
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@ricgcw.org"
                  className="w-full min-h-[46px] pl-10 pr-4 py-3 rounded-xl bg-sanctuary-800/80 border border-sanctuary-800 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 text-white text-body outline-none transition-colors placeholder:text-sanctuary-alabaster/40"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-passcode-input"
                className="block text-eyebrow font-bold uppercase text-sanctuary-alabaster/80 mb-1.5"
              >
                Passcode / Security PIN
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-sanctuary-alabaster/50 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="admin-passcode-input"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full min-h-[46px] pl-10 pr-12 py-3 rounded-xl bg-sanctuary-800/80 border border-sanctuary-800 focus:border-gold-400 focus:ring-2 focus:ring-gold-400/20 text-white text-body outline-none transition-colors placeholder:text-sanctuary-alabaster/40"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center absolute right-1 top-1/2 -translate-y-1/2 text-sanctuary-alabaster/60 hover:text-white rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 cursor-pointer"
                  aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="min-h-[44px] flex items-center gap-2.5 cursor-pointer text-caption text-sanctuary-alabaster/75 select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-sanctuary-800 bg-sanctuary-800 text-gold-500 focus:ring-gold-400"
                />
                <span>Remember this workstation</span>
              </label>
            </div>

            <m.button
              type="submit"
              disabled={isLoading}
              whileTap={prefersReduced ? undefined : { scale: 0.98 }}
              transition={SPRING_TACTILE}
              className="w-full min-h-[48px] py-3.5 px-6 rounded-xl bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-sanctuary-midnight font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isLoading ? 'Authenticating...' : 'Access Admin Control Center'}</span>
            </m.button>
          </form>
        </m.div>

        <div className="text-center text-caption text-sanctuary-alabaster/55 font-mono">
          Rhema Inner Court Gospel Church (Worldwide) • Protected System
        </div>
      </m.div>
    </div>
  );
};

export default AdminLogin;
