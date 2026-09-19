import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, MapPin, Play, Clock, Heart, Users, Shield, MessageCircle } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { IMAGES } from '../data/churchData';
import { trackEvent } from '../utils/analytics';

interface HeroProps {
  onOpenBranchModal?: () => void;
  onOpenGivingModal?: () => void;
  onOpenPrayerModal?: () => void;
}

export const Hero = ({ onOpenBranchModal, onOpenGivingModal, onOpenPrayerModal }: HeroProps) => {
  const { churchInfo, themeSettings, branches, leadership } = useChurch();
  const [nextSundayCountdown, setNextSundayCountdown] = useState({ days: 0, hours: 0, mins: 0 });
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const mainBranch = branches.find((b) => b.isHeadquarters) || branches[0];
  const mainServiceTime = mainBranch?.services?.find((s) => s.isMain)?.time || mainBranch?.services?.[0]?.time || '9:00 AM';

  const heroCards = leadership && leadership.length > 0
    ? leadership.map((leader) => ({
        image: leader.image || IMAGES.overseer,
        tag: leader.role || leader.title,
        title: leader.name,
        caption: leader.bio,
      }))
    : [
        {
          image: IMAGES.overseer,
          tag: churchInfo.founder?.title || 'General Overseer & Founder',
          title: churchInfo.founder?.name || 'Rev. Nicholas Dobeng',
          caption: 'Leading with prophetic insight, apostolic mandate, and deep compassion for souls.',
        },
      ];

  // Auto rotate cards
  useEffect(() => {
    if (heroCards.length <= 1) return;
    const timer = setInterval(() => {
      setActiveSlideIndex((prev) => (prev + 1) % heroCards.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroCards.length]);

  // Next Sunday Service Countdown
  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date();
      const nextSunday = new Date();
      const dayOfWeek = now.getDay();
      const daysUntilSunday = (7 - dayOfWeek) % 7 || 7;

      nextSunday.setDate(now.getDate() + daysUntilSunday);
      nextSunday.setHours(9, 0, 0, 0);

      const diff = nextSunday.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const mins = Math.floor((diff / (1000 * 60)) % 60);
        setNextSundayCountdown({ days, hours, mins });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 60000);
    return () => clearInterval(interval);
  }, []);

  const currentCard = heroCards[activeSlideIndex] || heroCards[0];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 sm:pt-36 pb-20 px-4 sm:px-6 md:px-8 bg-slate-950 text-slate-100 overflow-hidden">
      {/* Background subtle grid pattern */}
      <div className="absolute inset-0 bg-navy-pattern opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-12">
        
        {/* Main 2-Column Hero Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Column: Headline, Mandate & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* 2026 Mandate Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{churchInfo.themeYear}: {churchInfo.themeTitle} • {churchInfo.themeSubtitle}</span>
            </div>

            {/* Main Punchy Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-white tracking-tight leading-[1.15]">
              {themeSettings.heroHeadline || (
                <>
                  Where Impossibilities <br className="hidden sm:inline" />
                  <span className="text-gold-light-gradient">Become Divine Reality.</span>
                </>
              )}
            </h1>

            {/* Subtitle Description */}
            <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {themeSettings.heroSubtitle || (
                <>
                  Welcome to <strong>{churchInfo.name}</strong>, founded by General Overseer <strong>Rev. Nicholas Dobeng</strong>. A sacred sanctuary dedicated to perfecting the saints, empowering families, and taking territories through the unadulterated word of God.
                </>
              )}
            </p>

            {/* High-Intent Conversion CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <a
                href="#branches"
                onClick={() => trackEvent('interaction', 'plan_visit_clicked', 'Hero')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 active:scale-95"
              >
                <MapPin className="w-4 h-4" />
                <span>Plan Your Visit This Sunday</span>
              </a>

              <a
                href={churchInfo.contact.youtube}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('conversion', 'watch_sermon', 'Hero')}
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider border border-white/15 transition-all flex items-center gap-2 active:scale-95"
              >
                <Play className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span>Watch Sermons Live</span>
              </a>

              <a
                href={`https://wa.me/${churchInfo.contact.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('conversion', 'whatsapp_chat', 'Hero')}
                className="px-4 py-3.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 font-bold text-xs uppercase tracking-wider border border-emerald-500/30 transition-all flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Pastoral WhatsApp</span>
              </a>
            </div>

            {/* Live Service Indicator & Branch Summary */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-800/80">
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-left">
                <p className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Next Service In
                </p>
                <p className="text-base font-bold font-mono text-white mt-0.5">
                  {nextSundayCountdown.days}d {nextSundayCountdown.hours}h {nextSundayCountdown.mins}m
                </p>
                <p className="text-[10px] text-slate-400">Main Service: {mainServiceTime}</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-left">
                <p className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {branches.length} Sanctuaries
                </p>
                <p className="text-sm font-bold text-white mt-0.5 truncate">
                  {branches.map((b) => b.name.replace(' Assembly', '').replace(' Sanctuary', '')).join(' • ')}
                </p>
                <p className="text-[10px] text-slate-400">Weekly Gatherings</p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-left col-span-2 sm:col-span-1">
                <p className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
                  <Shield className="w-3 h-3" /> Scriptural Anchor
                </p>
                <p className="text-xs font-bold text-white mt-0.5">{churchInfo.scripturalAnchor.reference}</p>
                <p className="text-[10px] text-slate-400">The Royal Court of Grace</p>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Photo Card Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              
              {/* Primary Visual Showcase Card */}
              <div className="rounded-[36px] overflow-hidden p-3 bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 border border-amber-500/30 shadow-2xl">
                <div className="aspect-[4/5] rounded-[28px] overflow-hidden relative">
                  <img
                    src={currentCard.image}
                    alt={currentCard.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Card Bottom Overlay Text */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 inline-block">
                      {currentCard.tag}
                    </span>
                    <h3 className="text-2xl font-bold font-serif text-white">{currentCard.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                      {currentCard.caption}
                    </p>
                  </div>
                </div>

                {/* Card Slide Switchers */}
                <div className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {heroCards.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`h-2 rounded-md transition-all cursor-pointer ${
                          idx === activeSlideIndex ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={onOpenPrayerModal}
                    className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Submit Prayer Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
