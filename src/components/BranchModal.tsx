import { useState } from 'react';
import { X, MapPin, Clock, Phone, Mail, Navigation, Check, ChevronRight, Church, Copy } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { Branch } from '../data/churchData';
import { trackEvent } from '../utils/analytics';

interface BranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBranchId?: string;
}

export const BranchModal = ({ isOpen, onClose, defaultBranchId }: BranchModalProps) => {
  const { branches } = useChurch();
  const [selectedBranch, setSelectedBranch] = useState<Branch>(() => {
    return branches.find((b) => b.id === defaultBranchId) || branches[0];
  });
  const [copiedTime, setCopiedTime] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTime(text);
    setTimeout(() => setCopiedTime(null), 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-white text-slate-900 border border-slate-200 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 md:p-8 bg-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Church className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold font-serif text-white">Find a Church Sanctuary</h2>
              <p className="text-xs text-amber-300 font-medium">Gather with us in worship across our {branches.length} active branches</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close branch modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="grid md:grid-cols-12 flex-1 overflow-y-auto">
          {/* Branch Tabs */}
          <div className="md:col-span-4 p-4 md:p-6 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200 space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-2">Select Location</p>
            {branches.map((branch) => {
              const isSelected = selectedBranch.id === branch.id;
              return (
                <button
                  key={branch.id}
                  onClick={() => {
                    setSelectedBranch(branch);
                    trackEvent('interaction', 'branch_tab_selected', branch.name);
                  }}
                  className={`w-full text-left p-4 rounded-2xl transition-all flex items-center justify-between group cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500/60 text-slate-950 shadow-sm ring-1 ring-amber-500/20'
                      : 'bg-white hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-950">{branch.name.split('(')[0]}</span>
                      {branch.isHeadquarters && (
                        <span className="text-[9px] font-bold bg-amber-500/20 text-amber-900 border border-amber-500/30 px-2 py-0.5 rounded-md">
                          HQ
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                      {branch.location}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-amber-600 translate-x-0.5' : 'text-slate-400'}`} />
                </button>
              );
            })}
          </div>

          {/* Branch Details */}
          <div className="md:col-span-8 p-6 md:p-8 space-y-6 overflow-y-auto">
            <div className="space-y-3 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-900 border border-amber-500/30">
                  {selectedBranch.tagline}
                </span>
                <span className="text-xs text-slate-500">Resident Minister: <strong className="text-slate-900">{selectedBranch.pastor}</strong></span>
              </div>

              <h3 className="text-2xl font-bold font-serif text-slate-950">{selectedBranch.name}</h3>
              
              <div className="space-y-1 text-xs text-slate-600">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{selectedBranch.address}</span>
                </p>
                <p className="italic text-slate-500 pl-6">{selectedBranch.directions}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(selectedBranch.name + ', ' + selectedBranch.location)}`}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('interaction', 'branch_directions', selectedBranch.name)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2"
                >
                  <Navigation className="w-3.5 h-3.5" /> Open Google Maps
                </a>
                <a
                  href={`tel:${selectedBranch.phone}`}
                  onClick={() => trackEvent('conversion', 'call_hotline', selectedBranch.name)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs uppercase tracking-wider border border-slate-200 transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600" /> {selectedBranch.phone}
                </a>
              </div>
            </div>

            {/* Service Schedules */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" /> Weekly Gathering Schedule
              </h4>

              <div className="space-y-2.5">
                {selectedBranch.services.map((srv, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border transition-all ${
                      srv.isMain
                        ? 'bg-amber-50/70 border-amber-300 shadow-sm'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${srv.isMain ? 'bg-amber-500 text-slate-950 font-black' : 'bg-white text-slate-700 border border-slate-200'}`}>
                        {srv.day}
                      </span>
                      <span className="font-mono text-xs font-bold text-slate-900">{srv.time}</span>
                    </div>
                    <p className="font-bold text-sm text-slate-950 mt-1">{srv.name}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{srv.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchModal;
