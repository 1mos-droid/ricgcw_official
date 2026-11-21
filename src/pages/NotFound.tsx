import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { IMAGES } from '../data/churchData';
import { usePageTitle } from '../utils/usePageTitle';

export const NotFound: React.FC = () => {
  usePageTitle('Page Not Found • 404');

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#141619] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#B8860B]/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#DFC57B]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-lg w-full relative z-10 text-center space-y-8">
        {/* Brand */}
        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#B8860B]/35 shadow-lg mx-auto">
          <img src={IMAGES.logo} alt="RICGCW Logo" className="w-full h-full object-cover" />
        </div>

        <div className="space-y-3">
          <span className="px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest bg-[#F3EFE6] border border-[#E6E0D3] text-[#B8860B] inline-block">
            Error 404 • Grace Still Abounds
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#141619]">
            Waypoint Not Found
          </h1>
          <p className="text-sm text-[#4A5058] leading-relaxed max-w-md mx-auto font-light">
            The pathway or document you are seeking is not located at this address. You may return to the main sanctuary or explore our service schedules.
          </p>
        </div>

        {/* Action Navigation */}
        <div className="p-6 rounded-3xl bg-[#F3EFE6]/85 backdrop-blur-md border border-[#E6E0D3] space-y-4 shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wider text-[#787F87]">
            Helpful Sanctuary Waypoints
          </p>

          <div className="grid gap-2.5">
            <Link
              to="/"
              className="p-3.5 rounded-full bg-[#141619] hover:bg-[#B8860B] text-[#FAF8F5] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Sanctuary Homepage</span>
            </Link>

            <Link
              to="/sponsorship"
              className="p-3.5 rounded-full bg-white hover:bg-[#FAF8F5] text-[#141619] font-bold text-xs uppercase tracking-wider border border-[#E6E0D3] transition-colors flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#B8860B]" />
              <span>Missions &amp; Sponsorship Altar</span>
            </Link>
          </div>
        </div>

        <div className="text-[11px] font-mono text-[#787F87]">
          Rhema Inner Court Gospel Church (Worldwide) • Accra, Ghana
        </div>
      </div>
    </div>
  );
};

export default NotFound;
