import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/churchData';
import { usePageTitle } from '../utils/usePageTitle';

export const Auth: React.FC = () => {
  usePageTitle('Access Verification');
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF8F5] text-[#141619] px-4 relative overflow-hidden">
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[360px] bg-[radial-gradient(ellipse_at_center,rgba(184,134,11,0.14)_0%,transparent_70%)] blur-[90px] pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-8 p-8 sm:p-10 bg-[#F3EFE6]/85 backdrop-blur-md border border-[#E6E0D3] rounded-3xl shadow-xl relative z-10">
        {/* Church Logo */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#B8860B]/35 shadow-sm">
            <img src={IMAGES.logo} alt="RICGCW Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Verification Success Icon */}
        <div className="w-16 h-16 bg-[#3B6E4C]/15 border border-[#3B6E4C]/30 rounded-2xl flex items-center justify-center mx-auto text-[#3B6E4C]">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-serif text-[#141619]">
            Access Confirmed
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5058] font-light">
            Your verification has been successfully confirmed. You can now return to the home sanctuary and explore all church services.
          </p>
        </div>

        <div className="pt-4">
          <Link
            to="/"
            className="w-full py-3.5 px-6 rounded-full bg-[#141619] hover:bg-[#B8860B] text-[#FAF8F5] font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="pt-2 text-[11px] text-[#787F87] font-mono">
          Rhema Inner Court Gospel Church (Worldwide)
        </div>
      </div>
    </div>
  );
};

export default Auth;
