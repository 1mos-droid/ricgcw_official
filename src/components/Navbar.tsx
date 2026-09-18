import { useState, useEffect } from 'react';
import { Menu, X, Heart, MapPin, Phone, Sparkles, MessageCircle } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useChurch } from '../context/ChurchContext';
import { IMAGES } from '../data/churchData';
import { YoutubeIcon, FacebookIcon } from './Icons';
import { trackEvent } from '../utils/analytics';

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
  const { churchInfo, themeSettings } = useChurch();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
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
    { name: 'Culture & Colors', id: 'identity' },
    { name: 'Ministries', id: 'ministries' },
    { name: 'Media & Sermons', id: 'media' },
    { name: 'Events', id: 'events' },
    { name: 'Partnership', route: '/sponsorship' },
    { name: 'Connect', id: 'connect' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-200">
      {/* Top Banner Notice */}
      {themeSettings.showAnnouncementBanner && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 text-slate-950 text-xs font-semibold py-1.5 px-4 hidden sm:block">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-slate-950 text-amber-300 text-[10px] font-black uppercase px-2 py-0.5 rounded-md">
                {themeSettings.announcementBadge}
              </span>
              <span className="tracking-wide">
                <strong>{themeSettings.announcementText}</strong>
              </span>
            </div>
            <div className="flex items-center gap-4 text-[11px] font-bold">
              <a
                href={`tel:${churchInfo.contact.phone}`}
                onClick={() => trackEvent('conversion', 'call_hotline', 'Top Bar')}
                className="hover:underline flex items-center gap-1 font-mono"
              >
                <Phone className="w-3 h-3" /> {churchInfo.contact.phone}
              </a>
              <span>•</span>
              <button
                onClick={() => {
                  trackEvent('conversion', 'prayer_modal_opened', 'Top Bar');
                  onOpenPrayerModal?.();
                }}
                className="hover:underline text-slate-950 flex items-center gap-1 font-bold cursor-pointer"
              >
                <Sparkles className="w-3 h-3" /> Request Prayer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav
        className={`transition-all duration-200 px-4 sm:px-6 md:px-8 ${
          isScrolled
            ? 'bg-slate-950 border-b border-amber-500/20 py-3 shadow-xl'
            : 'bg-gradient-to-b from-slate-950/95 via-slate-950/80 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden border border-amber-500/40 shadow-md group-hover:border-amber-400 transition-colors">
              <img src={IMAGES.logo} alt="RICGCW Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel font-bold text-lg sm:text-xl text-white tracking-wider group-hover:text-amber-300 transition-colors">
                  {churchInfo.shortName}
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Global
                </span>
              </div>
              <p className="text-[10px] text-slate-300 hidden sm:block tracking-wide font-medium">
                Rhema Inner Court Gospel Church
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) =>
              link.route ? (
                <Link
                  key={link.name}
                  to={link.route}
                  className="text-xs uppercase font-bold tracking-wider text-slate-200 hover:text-amber-300 transition-colors"
                >
                  {link.name}
                </Link>
              ) : (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.id!)}
                  className="text-xs uppercase font-bold tracking-wider text-slate-200 hover:text-amber-300 transition-colors cursor-pointer"
                >
                  {link.name}
                </button>
              )
            )}
          </div>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`https://wa.me/${churchInfo.contact.phone.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noreferrer"
              onClick={() => trackEvent('conversion', 'whatsapp_chat', 'Navbar')}
              className="px-3.5 py-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => {
                trackEvent('interaction', 'branch_modal_opened', 'Navbar');
                onOpenBranchModal?.();
              }}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-100 hover:text-white border border-white/15 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Branches</span>
            </button>

            <button
              onClick={() => {
                trackEvent('conversion', 'giving_modal_opened', 'Navbar');
                onOpenGivingModal?.();
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-black uppercase tracking-wider shadow-md shadow-amber-500/20 flex items-center gap-1.5 active:scale-95 transition-all cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-slate-950" />
              <span>Giving</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => {
                trackEvent('conversion', 'giving_modal_opened', 'Mobile Header');
                onOpenGivingModal?.();
              }}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm"
            >
              <Heart className="w-3 h-3 fill-slate-950" /> Giving
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 hover:text-white border border-white/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-3 bg-slate-950 border border-amber-500/20 rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="grid gap-1.5">
              {navLinks.map((link) =>
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
              )}
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

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <a href={`tel:${churchInfo.contact.phone}`} className="font-mono hover:text-amber-300">
                {churchInfo.contact.phone}
              </a>
              <div className="flex items-center gap-3">
                <a href={churchInfo.contact.youtube} target="_blank" rel="noreferrer" className="hover:text-red-400">
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a href={churchInfo.contact.facebook} target="_blank" rel="noreferrer" className="hover:text-blue-400">
                  <FacebookIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
