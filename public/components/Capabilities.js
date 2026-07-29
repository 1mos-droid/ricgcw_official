// Capabilities Section Component (Pillars of Faith)
// Displays core pillars in a staggered grid with full-bleed video backgrounds

const Capabilities = () => {
  const FadingVideo = window.FadingVideo;
  const motion = window.Motion?.motion || window.Motion;

  // Stagger animation container
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Card slide/blur animation
  const cardVariants = {
    hidden: { filter: 'blur(10px)', opacity: 0, y: 40 },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  // Header fade-in animation
  const headerVariants = {
    hidden: { filter: 'blur(8px)', opacity: 0, y: 20 },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' }
    }
  };

  const cardsData = [
    {
      title: "Worship",
      body: "Passionate and authentic praise that connects us to God. Experience transformative spiritual encounters in our sanctuaries.",
      iconPath: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
      tags: ["Authentic Praise", "Holy Presence", "Divine Encounter", "Praise Sanctuary"]
    },
    {
      title: "Mission",
      body: "Evangelism and community outreach reaching the ends of the earth. Fulfilling the great commission and caring for spiritual and physical needs.",
      iconPath: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.53c-.26-.81-1-1.4-1.9-1.4h-1v-3c0-.55-.45-1-1-1h-6v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.4z",
      tags: ["Global Reach", "Outreach", "Community Care", "Taking Territories"]
    },
    {
      title: "Integrity",
      body: "Living a life of character guided by Biblical principles. We protect the integrity of our leaders and serve our families in absolute faithfulness.",
      iconPath: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z",
      tags: ["Biblical Truth", "Sincere Character", "Holy Walk", "Perfecting Saints"]
    }
  ];

  return (
    <section id="about" className="relative w-full min-h-screen overflow-hidden bg-black flex flex-col justify-between z-10 select-none">
      {/* Background Video (full bleed) */}
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ opacity: 0 }}
      />

      {/* Main Content Area */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        className="relative z-10 px-8 md:px-16 lg:px-20 pt-28 pb-16 flex flex-col min-h-screen w-full justify-between"
      >
        {/* Header Block (mb-auto) */}
        <motion.div variants={headerVariants} className="mb-auto text-left">
          <div className="text-sm font-body font-semibold tracking-wider text-white/60 mb-4 uppercase">
            // Our Pillars
          </div>
          <h2 className="font-heading italic text-white text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px] max-w-2xl select-none">
            Perfecting<br />the saints
          </h2>
        </motion.div>

        {/* Three Columns Staggered Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full"
        >
          {cardsData.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between hover:scale-[1.01] transition-transform shadow-2xl"
            >
              {/* Top Row of Card */}
              <div className="flex items-start justify-between gap-4">
                {/* Nested Icon Square */}
                <div className="w-11 h-11 rounded-[0.75rem] liquid-glass flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d={card.iconPath} />
                  </svg>
                </div>

                {/* Pill Tags */}
                <div className="flex flex-wrap justify-end gap-1.5 max-w-[75%]">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className="liquid-glass rounded-full px-2.5 py-1 text-[10px] text-white/95 font-body font-medium tracking-wide whitespace-nowrap select-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Spacer */}
              <div className="flex-1" />

              {/* Bottom of Card */}
              <div className="mt-6 text-left">
                <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none select-none">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm text-white/85 font-body font-light leading-snug max-w-[32ch]">
                  {card.body}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

window.Capabilities = Capabilities;
