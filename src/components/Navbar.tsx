import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { clsx } from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/church/logo.jpg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: isHome ? '#about' : '/#about' },
    { name: 'Culture', href: isHome ? '#identity' : '/#identity' },
    { name: 'Ministries', href: isHome ? '#ministries' : '/#ministries' },
    { name: 'Media', href: isHome ? '#media' : '/#media' },
    { name: 'Events', href: isHome ? '#events' : '/#events' },
    { name: 'Connect', href: isHome ? '#connect' : '/#connect' },
    { name: 'Sponsorship', href: '/sponsorship', isRoute: true },
  ];

  return (
    <nav 
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4',
        isScrolled ? 'glass h-16 shadow-lg shadow-black/5' : 'h-24'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-ios-blue/20">
            <img src={logoImg} alt="ICGCW Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-xl font-black tracking-tight text-ios-label">ICGCW</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link 
                key={link.name} 
                to={link.href}
                className="text-sm font-bold text-ios-secondary-label hover:text-ios-blue transition-colors uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ) : (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-bold text-ios-secondary-label hover:text-ios-blue transition-colors uppercase tracking-widest"
              >
                {link.name}
              </a>
            )
          ))}
          <button className="h-10 px-6 bg-ios-blue text-white rounded-full font-bold shadow-lg shadow-ios-blue/20 active:scale-95 transition-all text-xs uppercase tracking-widest">
            Giving
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-ios-label p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass border-t border-ios-separator p-6 flex flex-col gap-6 shadow-2xl"
          >
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link 
                  key={link.name} 
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="ios-headline text-center"
                >
                  {link.name}
                </Link>
              ) : (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="ios-headline text-center"
                >
                  {link.name}
                </a>
              )
            ))}
            <button className="h-14 bg-ios-blue text-white rounded-2xl font-bold shadow-lg">
              Support Our Mission
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
