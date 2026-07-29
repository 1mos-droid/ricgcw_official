// Navbar Component
// Responsive liquid-glass navbar with Church brand logo and Giving CTA button

const ArrowUpRight = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const Navbar = () => {
  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Culture', href: '#identity' },
    { name: 'Ministries', href: '#ministries' },
    { name: 'Media', href: '#media' },
    { name: 'Events', href: '#events' },
    { name: 'Connect', href: '#connect' },
  ];

  return (
    <nav className="fixed top-4 left-0 w-full px-8 lg:px-16 z-50 flex items-center justify-between">
      {/* Left Brand Logo (r for Rhema) */}
      <div className="w-12 h-12 rounded-full liquid-glass flex items-center justify-center font-heading italic text-3xl text-white cursor-pointer select-none hover:scale-105 active:scale-95 transition-transform">
        r
      </div>

      {/* Center Links (Desktop only) */}
      <div className="hidden md:flex items-center liquid-glass rounded-full p-1.5 gap-1">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="px-3 py-2 text-sm font-medium text-white/90 font-body hover:text-white transition-colors"
          >
            {link.name}
          </a>
        ))}
        <button className="bg-white text-black font-body rounded-full px-4 py-2 text-sm font-semibold flex items-center gap-1 whitespace-nowrap hover:bg-white/90 active:scale-95 transition-all ml-1 cursor-pointer">
          Giving
          <ArrowUpRight className="h-4 w-4 stroke-black" />
        </button>
      </div>

      {/* Mobile Menu Trigger (Balance empty spacer) */}
      <div className="w-12 h-12 opacity-0 pointer-events-none" aria-hidden="true" />
    </nav>
  );
};

window.Navbar = Navbar;
