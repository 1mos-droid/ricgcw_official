// Hero Section Component
// Handles full viewport background video, liquid-glass navigation, and detailed entrance animations for the church website

const ArrowUpRight = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const Play = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <polygon points="6 4 20 12 6 20 6 4" />
  </svg>
);

const Hero = () => {
  const FadingVideo = window.FadingVideo;
  const BlurText = window.BlurText;
  const Navbar = window.Navbar;
  const motion = window.Motion?.motion || window.Motion;

  // Stagger configurations for elements
  const entranceTransition = (delay) => ({
    duration: 0.8,
    ease: 'easeOut',
    delay: delay
  });

  const baseEntrance = {
    initial: { filter: 'blur(10px)', opacity: 0, y: 20 },
    animate: { filter: 'blur(0px)', opacity: 1, y: 0 }
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-between z-10 select-none">
      {/* Background Video */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_080021_d598092b-c4c2-4e53-8e46-94cf9064cd50.mp4"
        className="absolute left-1/2 top-0 -translate-x-1/2 object-cover object-top z-0"
        style={{ width: "120%", height: "120%" }}
      />

      {/* Navbar Container */}
      <Navbar />

      {/* Hero Content (Centered) */}
      <div className="flex-1 flex flex-col items-center justify-center text-center pt-28 px-4 max-w-4xl mx-auto z-10">
        
        {/* Badge (delay 0.4s) */}
        <motion.div
          initial={baseEntrance.initial}
          animate={baseEntrance.animate}
          transition={entranceTransition(0.4)}
          className="liquid-glass rounded-full p-1.5 flex items-center gap-3 pr-4 mb-6 shadow-sm select-none"
        >
          <span className="bg-white text-black px-3 py-1 text-xs font-semibold rounded-full font-body uppercase tracking-wider">
            Theme
          </span>
          <span className="text-sm text-white/90 font-body font-medium tracking-wide">
            2026: Divine Manifestation — Touching Lives Worldwide
          </span>
        </motion.div>

        {/* Headline (using BlurText) */}
        <BlurText
          text="Rhema Inner Court Gospel Church"
          className="text-6xl md:text-7xl lg:text-[5.5rem] font-heading italic text-white leading-[0.8] max-w-4xl justify-center tracking-[-4px]"
        />

        {/* Subheading (delay 0.8s) */}
        <motion.p
          initial={baseEntrance.initial}
          animate={baseEntrance.animate}
          transition={entranceTransition(0.8)}
          className="mt-6 text-sm md:text-base text-white max-w-2xl font-body font-light leading-tight tracking-wide text-white/90"
        >
          A community of believers dedicated to worship, transformation, and the global spread of the Gospel. Taking territories and perfecting the saints.
        </motion.p>

        {/* CTAs (delay 1.1s) */}
        <motion.div
          initial={baseEntrance.initial}
          animate={baseEntrance.animate}
          transition={entranceTransition(1.1)}
          className="flex items-center gap-6 mt-8"
        >
          <button className="liquid-glass-strong rounded-full px-5 py-2.5 text-sm font-medium text-white flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform cursor-pointer">
            Join Our Service
            <ArrowUpRight className="h-5 w-5 stroke-white" />
          </button>
          <a
            href="#sponsorship"
            className="flex items-center gap-2 text-sm font-medium text-white hover:text-white/80 active:scale-95 transition-all cursor-pointer font-body"
          >
            Support Our Mission
            <Play className="h-4 w-4 fill-white" />
          </a>
        </motion.div>

        {/* Stats Row (delay 1.3s) */}
        <motion.div
          initial={baseEntrance.initial}
          animate={baseEntrance.animate}
          transition={entranceTransition(1.3)}
          className="flex flex-row items-stretch justify-center gap-4 mt-10 w-full"
        >
          {/* Card 1 */}
          <div className="liquid-glass p-5 w-[180px] sm:w-[220px] rounded-[1.25rem] flex flex-col justify-between items-start text-left shadow-lg">
            <div className="text-white mb-6">
              <svg className="w-7 h-7 stroke-white" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div>
              <div className="font-heading italic text-white text-3xl sm:text-4xl tracking-[-1px] leading-none">
                3 Branches
              </div>
              <div className="text-[11px] sm:text-xs text-white/70 font-body font-light mt-2 leading-tight">
                Active Church Locations
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="liquid-glass p-5 w-[180px] sm:w-[220px] rounded-[1.25rem] flex flex-col justify-between items-start text-left shadow-lg">
            <div className="text-white mb-6">
              <svg className="w-7 h-7 stroke-white" viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                <path d="M2 12h20" />
              </svg>
            </div>
            <div>
              <div className="font-heading italic text-white text-3xl sm:text-4xl tracking-[-1px] leading-none">
                1,000+
              </div>
              <div className="text-[11px] sm:text-xs text-white/70 font-body font-light mt-2 leading-tight">
                Global Community Members
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Partners (bottom of hero, delay 1.4s) */}
      <motion.div
        initial={baseEntrance.initial}
        animate={baseEntrance.animate}
        transition={entranceTransition(1.4)}
        className="flex flex-col items-center gap-4 pb-10 z-10 w-full mt-auto"
      >
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white/80 font-body tracking-wide select-none">
          Serving and gathering across active regional branches
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 mt-2">
          {['Mallam', 'Kokrobitey', 'Langma'].map((name) => (
            <span
              key={name}
              className="font-heading italic text-white text-2xl md:text-3xl tracking-tight select-none opacity-90 hover:opacity-100 transition-opacity cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

window.Hero = Hero;
