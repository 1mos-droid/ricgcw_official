import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Church, Compass, MapPin, Sparkles } from 'lucide-react';
import { IMAGES } from '../data/churchData';
import { usePageTitle } from '../utils/usePageTitle';

export const NotFound: React.FC = () => {
  usePageTitle('Page Not Found • 404');

  return (
    <div className="min-h-screen bg-[#070c18] text-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-lg w-full relative z-10 text-center space-y-8">
        {/* Brand */}
        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl shadow-amber-500/10 mx-auto">
          <img src={IMAGES.logo} alt="RICGCW Logo" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-3">
          <span className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-amber-500/10 border border-amber-500/20 text-amber-300">
            Error 404 • Grace Still Abounds
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-white">
            Waypoint Not Found
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
            The pathway or document you are seeking is not located at this address. You may return to the main sanctuary or explore our service schedules.
          </p>
        </div>

        {/* Action Navigation */}
        <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Helpful Sanctuary Waypoints
          </p>

          <div className="grid gap-2.5">
            <Link
              to="/"
              className="p-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Sanctuary Homepage</span>
            </Link>

            <Link
              to="/sponsorship"
              className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider border border-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Missions &amp; Sponsorship Altar</span>
            </Link>
          </div>
        </div>

        <div className="text-[11px] font-mono text-slate-500">
          Rhema Inner Court Gospel Church (Worldwide) • Accra, Ghana
        </div>
      </div>
    </div>
  );
};

export default NotFound;
