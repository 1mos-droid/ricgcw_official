import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, MapPin, Phone, Sparkles, Radio } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CHURCH_INFO, IMAGES } from '../data/churchData';
import { YoutubeIcon, FacebookIcon } from './Icons';

interface NavbarProps {
  onOpenBranchModal?: () => void;
  onOpenGivingModal?: () => void;
  onOpenPrayerModal?: () => void;
}

export const Navbar = ({ onOpenBranchModal, onOpenGivingModal, onOpenPrayerModal }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    if (!isHome) {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'About & Overseer', id: 'about' },
    { name: 'Branches', id: 'branches' },
    { name: 'Culture & Identity', id: 'identity' },
    { name: 'Ministries', id: 'ministries' },
    { name: 'Media & Sermons', id: 'media' },
    { name: 'Events', id: 'events' },
    { name: 'Partnership', route: '/sponsorship' },
    { name: 'Connect', id: 'connect' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-slate-950 text-xs font-semibold py-1.5 px-4 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-slate-950 text-amber-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
              2026 Theme
            </span>
            <span className="tracking-wide">
              <strong>Divine Manifestation</strong> — Touching Lives Worldwide across Accra & Beyond
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-bold">
            <a href={`tel:${CHURCH_INFO.contact.phone}`} className="hover:underline flex items-center gap-1">
              <Phone className="w-3 h-3" /> {CHURCH_INFO.contact.phone}
            </a>
            <span>•</span>
            <button
              onClick={onOpenPrayerModal}
              className="hover:underline text-slate-950 flex items-center gap-1 font-bold cursor-pointer"
            >
              <Sparkles className="w-3 h-3" /> Request Prayer
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-300 px-4 sm:px-6 md:px-8 ${
          isScrolled
            ? 'bg-slate-950/90 backdrop-blur-xl border-b border-amber-500/20 py-3.5 shadow-2xl shadow-black/60'
            : 'bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden border border-amber-500/40 shadow-lg shadow-amber-500/10 group-hover:border-amber-400 transition-all">
              <img src={IMAGES.logo} alt="RICGCW Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel font-bold text-lg sm:text-xl text-white tracking-wider group-hover:text-amber-300 transition-colors">
                  RICGCW
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Global
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block tracking-wide font-medium">
                Rhema Inner Court Gospel Church
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              link.route ? (
                <Link
                  key={link.name}
                  to={link.route}
                  className="text-xs uppercase font-bold tracking-wider text-slate-300 hover:text-amber-400 transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.id!)}
                  className="text-xs uppercase font-bold tracking-wider text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                >
                  {link.name}
                </button>
              )
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onOpenBranchModal}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Branches</span>
            </button>

            <button
              onClick={onOpenGivingModal}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-slate-950" />
              <span>Giving</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenGivingModal}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-md shadow-amber-500/20"
            >
              <Heart className="w-3 h-3 fill-slate-950" /> Giving
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden mt-4 bg-slate-950/95 border border-amber-500/20 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl overflow-hidden space-y-4"
            >
              <div className="grid gap-2">
                {navLinks.map((link) => (
                  link.route ? (
                    <Link
                      key={link.name}
                      to={link.route}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="p-3 rounded-xl bg-white/5 hover:bg-amber-500/10 text-slate-200 hover:text-amber-300 font-bold text-sm transition-colors block"
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <button
                      key={link.name}
                      onClick={() => handleNavClick(link.id!)}
                      className="p-3 rounded-xl bg-white/5 hover:bg-amber-500/10 text-slate-200 hover:text-amber-300 font-bold text-sm text-left transition-colors cursor-pointer w-full"
                    >
                      {link.name}
                    </button>
                  )
                ))}
              </div>

              <div className="pt-2 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenBranchModal?.();
                  }}
                  className="py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-4 h-4 text-amber-400" /> Branches
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenPrayerModal?.();
                  }}
                  className="py-3 px-4 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4" /> Prayer
                </button>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span>Helpline: {CHURCH_INFO.contact.phone}</span>
                <div className="flex items-center gap-3">
                  <a href={CHURCH_INFO.contact.youtube} target="_blank" rel="noreferrer" className="hover:text-red-400">
                    <YoutubeIcon className="w-4 h-4" />
                  </a>
                  <a href={CHURCH_INFO.contact.facebook} target="_blank" rel="noreferrer" className="hover:text-blue-400">
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
