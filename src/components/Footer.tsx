import { Heart, MapPin, Phone, Mail, Sparkles, ChevronRight, Church, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useChurch } from '../context/ChurchContext';
import { IMAGES } from '../data/churchData';
import { YoutubeIcon, FacebookIcon, InstagramIcon } from './Icons';
import { trackEvent } from '../utils/analytics';

interface FooterProps {
  onOpenBranchModal?: () => void;
  onOpenGivingModal?: () => void;
  onOpenPrayerModal?: () => void;
}

export const Footer = ({ onOpenBranchModal, onOpenGivingModal, onOpenPrayerModal }: FooterProps) => {
  const { churchInfo, branches } = useChurch();

  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-amber-500/20 pt-16 pb-12 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Top Callout Banner */}
        <div className="mb-14 p-8 md:p-10 rounded-3xl bg-slate-900 border border-amber-500/30 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> {churchInfo.themeYear} Mandate
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-white">
              {churchInfo.themeTitle}: {churchInfo.themeSubtitle}
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm max-w-2xl">
              Join us this week for an encounter with God's word and power. Experience miracles, salvation, and kingdom advancement.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              onClick={() => {
                trackEvent('interaction', 'branch_modal_opened', 'Footer Banner');
                onOpenBranchModal?.();
              }}
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-amber-400" /> Plan Your Visit
            </button>
            <button
              onClick={() => {
                trackEvent('conversion', 'prayer_modal_opened', 'Footer Banner');
                onOpenPrayerModal?.();
              }}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Submit Prayer
            </button>
          </div>
        </div>

        {/* 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* Col 1: About Church */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-amber-500/30 shadow-sm">
                <img src={IMAGES.logo} alt="RICGCW Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-cinzel font-bold text-lg text-white">{churchInfo.shortName}</h4>
                <p className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Worldwide Ministry</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rhema Inner Court Gospel Church (Worldwide) is a prophetic, apostolic, and evangelistic movement perfecting saints and taking territories.
            </p>
            <div className="pt-2 text-xs italic text-amber-300/80 border-l-2 border-amber-500/30 pl-3">
              "{churchInfo.scripturalAnchor.verse}"
              <span className="block font-bold mt-1 text-slate-400 not-italic">({churchInfo.scripturalAnchor.reference})</span>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={churchInfo.contact.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={churchInfo.contact.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={churchInfo.contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Church Branches */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white flex items-center gap-2">
              <Church className="w-4 h-4 text-amber-400" /> Sanctuary Locations
            </h4>
            <div className="space-y-2.5">
              {branches.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    trackEvent('interaction', 'branch_modal_opened', b.name);
                    onOpenBranchModal?.();
                  }}
                  className="p-3 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-amber-500/30 transition-all cursor-pointer group"
                >
                  <p className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                    <span>{b.name.split('(')[0]}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{b.location}</p>
                  <p className="text-[10px] text-amber-400/90 font-mono mt-0.5">
                    Sunday: {b.services[0]?.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Quick Links & Ministries */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white">
              Explore Ministries
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400" /> Apostolic Leadership
                </a>
              </li>
              <li>
                <a href="#identity" className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400" /> Tabernacle &amp; Color Meanings
                </a>
              </li>
              <li>
                <a href="#ministries" className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400" /> Men of Valor &amp; Women of Grace
                </a>
              </li>
              <li>
                <a href="#ministries" className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400" /> Youth Alive &amp; Kids Court
                </a>
              </li>
              <li>
                <a href="#media" className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400" /> Sermons &amp; Radio Broadcast
                </a>
              </li>
              <li>
                <Link to="/sponsorship" className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400" /> Mission Sponsorship Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Verified Contact & Giving */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" /> Get in Touch
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{churchInfo.contact.location}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${churchInfo.contact.phone}`}
                  onClick={() => trackEvent('conversion', 'call_hotline', 'Footer')}
                  className="hover:text-amber-300 font-mono font-bold"
                >
                  {churchInfo.contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${churchInfo.contact.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('conversion', 'whatsapp_chat', 'Footer')}
                  className="hover:text-emerald-300 text-emerald-400 font-bold"
                >
                  Chat on WhatsApp
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${churchInfo.contact.email}`} className="hover:text-amber-300 font-mono">
                  {churchInfo.contact.email}
                </a>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  trackEvent('conversion', 'giving_modal_opened', 'Footer');
                  onOpenGivingModal?.();
                }}
                className="w-full py-3 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5" /> Tithes &amp; MoMo Giving
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright Bar & Privacy / Terms Links */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Rhema Inner Court Gospel Church (Worldwide). All rights reserved.</p>
          
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <Link to="/privacy" className="text-slate-400 hover:text-amber-300 transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="text-slate-400 hover:text-amber-300 transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <button
              onClick={() => window.dispatchEvent(new Event('open-cookie-preferences'))}
              className="text-slate-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
