import { Heart, MapPin, Phone, Mail, Sparkles, ChevronRight, Church } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CHURCH_INFO, BRANCHES, IMAGES } from '../data/churchData';
import { YoutubeIcon, FacebookIcon, InstagramIcon } from './Icons';

interface FooterProps {
  onOpenBranchModal?: () => void;
  onOpenGivingModal?: () => void;
  onOpenPrayerModal?: () => void;
}

export const Footer = ({ onOpenBranchModal, onOpenGivingModal, onOpenPrayerModal }: FooterProps) => {
  return (
    <footer className="relative bg-slate-950 text-slate-300 border-t border-amber-500/20 pt-20 pb-12 overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Top Callout Banner */}
        <div className="mb-16 p-8 md:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-amber-500/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> 2026 Mandate
            </div>
            <h3 className="text-2xl md:text-3xl font-bold font-serif text-white">
              Divine Manifestation — Touching Lives Worldwide
            </h3>
            <p className="text-slate-400 text-sm max-w-2xl">
              Join us this week for an encounter with God's word and power. Experience miracles, salvation, and kingdom advancement.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <button
              onClick={onOpenBranchModal}
              className="px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-amber-400" /> Plan Your Visit
            </button>
            <button
              onClick={onOpenPrayerModal}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" /> Submit Prayer
            </button>
          </div>
        </div>

        {/* 4-Column Footer Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Col 1: About Church */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden border border-amber-500/30 shadow-md">
                <img src={IMAGES.logo} alt="RICGCW Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-cinzel font-bold text-lg text-white">RICGCW</h4>
                <p className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Worldwide Ministry</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rhema Inner Court Gospel Church (Worldwide) is a prophetic, apostolic, and evangelistic movement perfecting saints and taking territories.
            </p>
            <div className="pt-2 text-xs italic text-amber-300/80 border-l-2 border-amber-500/30 pl-3">
              "{CHURCH_INFO.scripturalAnchor.verse}"
              <span className="block font-bold mt-1 text-slate-400 not-italic">— {CHURCH_INFO.scripturalAnchor.reference}</span>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={CHURCH_INFO.contact.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="YouTube Channel"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href={CHURCH_INFO.contact.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="Facebook Page"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={CHURCH_INFO.contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-all"
                aria-label="Instagram Page"
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
            <div className="space-y-3">
              {BRANCHES.map((b) => (
                <div
                  key={b.id}
                  onClick={onOpenBranchModal}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-amber-500/30 transition-all cursor-pointer group"
                >
                  <p className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                    <span>{b.name.split('(')[0]}</span>
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{b.location}</p>
                  <p className="text-[10px] text-amber-400/80 font-mono mt-1">
                    Sunday: {b.services[0].time}
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
                  <ChevronRight className="w-3 h-3 text-amber-400" /> Tabernacle & Color Meanings
                </a>
              </li>
              <li>
                <a href="#ministries" className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400" /> Men of Valor & Women of Grace
                </a>
              </li>
              <li>
                <a href="#ministries" className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400" /> Youth Alive & Kids Court
                </a>
              </li>
              <li>
                <a href="#media" className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400" /> Sermons & Radio Broadcast
                </a>
              </li>
              <li>
                <Link to="/sponsorship" className="text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-amber-400" /> Mission Sponsorship Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Giving */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-wider text-white flex items-center gap-2">
              <Phone className="w-4 h-4 text-amber-400" /> Get in Touch
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{CHURCH_INFO.contact.location}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${CHURCH_INFO.contact.phone}`} className="hover:text-amber-300 font-mono">
                  {CHURCH_INFO.contact.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${CHURCH_INFO.contact.email}`} className="hover:text-amber-300 font-mono">
                  {CHURCH_INFO.contact.email}
                </a>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenGivingModal}
                className="w-full py-3 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5" /> Tithes & MoMo Giving
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Rhema Inner Court Gospel Church (Worldwide). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-amber-400/80 font-medium">General Overseer: Rev. Nicholas Dobeng</span>
            <span>•</span>
            <span className="text-slate-400">Touching Lives Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
