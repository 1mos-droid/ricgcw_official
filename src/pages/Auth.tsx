import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/churchData';
import { usePageTitle } from '../utils/usePageTitle';

export const Auth: React.FC = () => {
  usePageTitle('Access Verification');
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-100 px-4 relative overflow-hidden">
      <div className="max-w-md w-full text-center space-y-8 p-8 sm:p-10 bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl relative z-10">
        {/* Church Logo */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-2xl overflow-hidden border border-amber-500/40 shadow-lg">
            <img src={IMAGES.logo} alt="RICGCW Logo" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Verification Success Icon */}
        <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-serif text-white">
            Access Confirmed
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Your verification has been successfully confirmed. You can now return to the home sanctuary and explore all church services.
          </p>
        </div>

        <div className="pt-4">
          <Link
            to="/"
            className="w-full py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>Return to Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="pt-2 text-[11px] text-slate-500 font-mono">
          Rhema Inner Court Gospel Church (Worldwide)
        </div>
      </div>
    </div>
  );
};

export default Auth;
