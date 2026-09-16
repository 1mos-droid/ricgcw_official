import { useState } from 'react';
import { MapPin, Clock, Navigation, Phone, Check, Church, ChevronRight, Copy } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { Branch } from '../data/churchData';
import { trackEvent } from '../utils/analytics';

interface BranchesSchedulesProps {
  onOpenBranchModal?: () => void;
}

export const BranchesSchedules = ({ onOpenBranchModal }: BranchesSchedulesProps) => {
  const { branches } = useChurch();
  const [activeBranchId, setActiveBranchId] = useState<string>(branches[0]?.id || 'mallam');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const activeBranch = branches.find((b) => b.id === activeBranchId) || branches[0];

  const handleCopySchedule = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <section id="branches" className="relative py-24 px-4 sm:px-6 md:px-8 bg-white text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-14 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-widest">
              <Church className="w-3.5 h-3.5 text-amber-600" /> Gather With Us
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif text-slate-950 tracking-tight">
              Church Sanctuaries & Service Times
            </h2>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl font-normal">
              Experience the power and presence of God in any of our {branches.length} regional branches across Greater Accra, Ghana.
            </p>
          </div>

          <button
            onClick={() => {
              trackEvent('interaction', 'branch_modal_opened', 'Branches Section');
              onOpenBranchModal?.();
            }}
            className="px-5 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 self-start md:self-auto transition-colors cursor-pointer shadow-md"
          >
            <MapPin className="w-4 h-4 text-amber-400" /> Full Branch Directory
          </button>
        </div>

        {/* Branch Interactive Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {branches.map((branch) => {
            const isActive = activeBranchId === branch.id;
            return (
              <button
                key={branch.id}
                onClick={() => {
                  setActiveBranchId(branch.id);
                  trackEvent('interaction', 'branch_tab_selected', branch.name);
                }}
                className={`p-6 rounded-3xl text-left transition-all relative overflow-hidden group cursor-pointer border ${
                  isActive
                    ? 'bg-amber-500/5 border-amber-500/60 shadow-lg ring-2 ring-amber-500/20'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'
                }`}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${isActive ? 'bg-amber-500 text-slate-950 shadow-sm font-bold' : 'bg-white text-slate-700 border border-slate-200'}`}>
                    <Church className="w-5 h-5" />
                  </div>
                  {branch.isHeadquarters && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 border border-amber-500/30">
                      Headquarters
                    </span>
                  )}
                </div>

                <h3 className="font-bold font-serif text-lg text-slate-950">
                  {branch.name.split('(')[0]}
                </h3>
                <p className="text-xs text-amber-700 font-semibold mt-0.5">{branch.location}</p>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2">{branch.tagline}</p>

                <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="font-mono text-[11px] text-slate-900 font-bold">
                    Sunday: {branch.services[0]?.time.split('–')[0]}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-amber-600 translate-x-1' : 'text-slate-400'}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Branch Detailed Card */}
        {activeBranch && (
          <div className="rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-8 md:p-10 shadow-lg space-y-8">
            {/* Top Branch Info */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-900 border border-amber-500/30">
                    {activeBranch.tagline}
                  </span>
                  <span className="text-xs text-slate-600">Led by: <strong className="text-slate-900">{activeBranch.pastor}</strong></span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-slate-950">{activeBranch.name}</h3>
                <p className="text-sm text-slate-700 flex items-center gap-2 font-medium">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{activeBranch.address}</span>
                </p>
                <p className="text-xs text-slate-500 italic">{activeBranch.directions}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(activeBranch.name + ', ' + activeBranch.location)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('interaction', 'branch_directions', activeBranch.name)}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 active:scale-95"
                >
                  <Navigation className="w-4 h-4" /> Open in Google Maps
                </a>
                <a
                  href={`tel:${activeBranch.phone}`}
                  onClick={() => trackEvent('conversion', 'call_hotline', activeBranch.name)}
                  className="px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs uppercase tracking-wider border border-slate-200 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-600" /> Call Sanctuary
                </a>
              </div>
            </div>

            {/* Service Schedules Grid */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" /> Weekly Gatherings & Ministrations
              </h4>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeBranch.services.map((service, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-2xl border transition-all ${
                      service.isMain
                        ? 'bg-white border-amber-400/80 shadow-md ring-1 ring-amber-400/30'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${service.isMain ? 'bg-amber-500/20 text-amber-900 font-black' : 'bg-slate-100 text-slate-700'}`}>
                        {service.day}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {service.time}
                      </span>
                    </div>
                    <h5 className="font-bold text-sm text-slate-950">{service.name}</h5>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{service.description}</p>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="text-slate-400">All are welcome</span>
                      <button
                        onClick={() => handleCopySchedule(`${activeBranch.name} - ${service.name}: ${service.day} at ${service.time}`)}
                        className="text-amber-700 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                      >
                        {copiedText ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedText ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BranchesSchedules;
