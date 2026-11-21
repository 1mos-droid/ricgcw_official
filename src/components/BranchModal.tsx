import { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Navigation, ChevronRight, Church } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { Branch } from '../data/churchData';
import { trackEvent } from '../utils/analytics';
import { Modal } from './common/Modal';
import { toTelUrl, toInternationalDisplay } from '../utils/phoneUtils';

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

  // Sync active branch when opened from a specific branch shortcut
  useEffect(() => {
    if (isOpen && branches.length > 0) {
      const matched = defaultBranchId ? branches.find((b) => b.id === defaultBranchId) : undefined;
      setSelectedBranch(matched || branches[0]);
    }
  }, [isOpen, defaultBranchId, branches]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Find a Church Sanctuary"
      subtitle={`Gather with us in worship across our ${branches.length} active branches`}
      icon={<Church className="w-6 h-6" />}
      maxWidthClass="max-w-4xl"
      closeLabel="Close branch modal"
    >
      <div className="grid md:grid-cols-12 -m-5 sm:-m-7">
        {/* Branch Tabs */}
        <div className="md:col-span-4 p-4 md:p-6 bg-sanctuary-parchment/70 border-b md:border-b-0 md:border-r border-sanctuary-stone space-y-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-ink-muted px-2">Select Location</p>
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
                    ? 'bg-white border-gold-500 text-ink-primary shadow-sm ring-1 ring-gold-500/20'
                    : 'bg-sanctuary-alabaster/80 hover:bg-white border-sanctuary-stone text-ink-secondary'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-ink-primary">{branch.name.split('(')[0]}</span>
                    {branch.isHeadquarters && (
                      <span className="text-[9px] font-bold bg-gold-500/15 text-gold-700 border border-gold-500/30 px-2 py-0.5 rounded-full">
                        HQ
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ink-muted flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gold-600 shrink-0" />
                    {branch.location}
                  </p>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-gold-600 translate-x-0.5' : 'text-ink-muted'}`} />
              </button>
            );
          })}
        </div>

        {/* Branch Details */}
        <div className="md:col-span-8 p-6 md:p-8 space-y-6 bg-sanctuary-alabaster">
          <div className="space-y-3 pb-6 border-b border-sanctuary-stone">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-gold-500/15 text-gold-700 border border-gold-500/30">
                {selectedBranch.tagline}
              </span>
              <span className="text-xs text-ink-muted">
                Resident Minister: <strong className="text-ink-primary">{selectedBranch.pastor}</strong>
              </span>
            </div>

            <h3 className="text-2xl font-bold font-serif text-ink-primary">{selectedBranch.name}</h3>

            <div className="space-y-1 text-xs text-ink-secondary">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                <span>{selectedBranch.address}</span>
              </p>
              <p className="italic text-ink-muted pl-6">{selectedBranch.directions}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(selectedBranch.name + ', ' + selectedBranch.location)}`}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('interaction', 'branch_directions', selectedBranch.name)}
                className="px-5 py-2.5 rounded-full bg-ink-primary hover:bg-gold-600 text-sanctuary-alabaster font-bold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center gap-2 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" /> Open Google Maps
              </a>
              <a
                href={toTelUrl(selectedBranch.phone)}
                onClick={() => trackEvent('conversion', 'call_hotline', selectedBranch.name)}
                className="px-5 py-2.5 rounded-full bg-sanctuary-parchment hover:bg-sanctuary-stone text-ink-primary font-bold text-xs uppercase tracking-wider border border-sanctuary-stone transition-colors flex items-center gap-2 cursor-pointer font-mono tabular-nums"
              >
                <Phone className="w-3.5 h-3.5 text-gold-600" /> {toInternationalDisplay(selectedBranch.phone)}
              </a>
            </div>
          </div>

          {/* Service Schedules */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-primary flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold-600" /> Weekly Gathering Schedule
            </h4>

            <div className="space-y-2.5">
              {selectedBranch.services.map((srv, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all ${
                    srv.isMain
                      ? 'bg-white border-gold-500/40 shadow-sm'
                      : 'bg-sanctuary-parchment/70 border-sanctuary-stone'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        srv.isMain
                          ? 'bg-gold-600 text-sanctuary-alabaster'
                          : 'bg-white text-ink-secondary border border-sanctuary-stone'
                      }`}
                    >
                      {srv.day}
                    </span>
                    <span className="font-mono text-xs font-bold text-ink-primary tabular-nums">{srv.time}</span>
                  </div>
                  <p className="font-serif font-bold text-base text-ink-primary mt-1">{srv.name}</p>
                  <p className="text-xs text-ink-secondary mt-0.5">{srv.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BranchModal;
