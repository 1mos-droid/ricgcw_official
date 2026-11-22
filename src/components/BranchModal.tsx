import { useState, useEffect } from 'react';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MapPin, Clock, Phone, Navigation, ChevronRight, Church } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { Branch } from '../data/churchData';
import { trackEvent } from '../utils/analytics';
import { Modal } from './common/Modal';
import { toTelUrl, toInternationalDisplay } from '../utils/phoneUtils';
import { CATHEDRAL_EASE } from './motion';

interface BranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBranchId?: string;
}

export const BranchModal = ({ isOpen, onClose, defaultBranchId }: BranchModalProps) => {
  const { churchInfo, branches } = useChurch();
  const prefersReduced = useReducedMotion();
  const [selectedBranch, setSelectedBranch] = useState<Branch | undefined>(() => {
    return branches.find((b) => b.id === defaultBranchId) || branches[0];
  });

  // Sync active branch when opened from a specific branch shortcut
  useEffect(() => {
    if (!isOpen) return;
    if (branches.length === 0) {
      setSelectedBranch(undefined);
      return;
    }
    const matched = defaultBranchId ? branches.find((b) => b.id === defaultBranchId) : undefined;
    setSelectedBranch(matched || branches[0]);
  }, [isOpen, defaultBranchId, branches]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Find a Church Sanctuary"
      subtitle={
        branches.length > 0
          ? `Worship with us across our ${branches.length} active locations (Ghana Time · GMT)`
          : 'Sanctuary locations & service schedule'
      }
      icon={<Church className="w-5 h-5" />}
      maxWidthClass="max-w-4xl"
      closeLabel="Close branch modal"
    >
      {branches.length === 0 || !selectedBranch ? (
        <div className="py-8 text-center space-y-4">
          <p className="text-base font-bold text-public-ink">
            Branch directory is currently being updated
          </p>
          <p className="text-sm text-public-ink-muted max-w-md mx-auto">
            Please call our church secretariat for immediate directions and Sunday gathering times.
          </p>
          <a
            href={toTelUrl(churchInfo.contact.phone)}
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-public-ink hover:bg-public-accent text-white text-sm font-semibold transition-colors tabular-nums"
          >
            <Phone className="w-4 h-4" />
            <span>Call {toInternationalDisplay(churchInfo.contact.phone)}</span>
          </a>
        </div>
      ) : (
        <div className="grid md:grid-cols-12 -m-5 sm:-m-7">
          {/* Branch Tabs */}
          <div className="md:col-span-4 p-4 md:p-6 bg-public-canvas border-b md:border-b-0 md:border-r border-public-border space-y-2.5">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-public-ink-muted px-1">
              Select Location
            </p>
            {branches.map((branch) => {
              const isSelected = selectedBranch.id === branch.id;
              return (
                <button
                  key={branch.id}
                  type="button"
                  onClick={() => {
                    setSelectedBranch(branch);
                    trackEvent('interaction', 'branch_tab_selected', branch.name);
                  }}
                  className={`w-full min-h-[44px] text-left p-3.5 rounded-xl transition-colors flex items-center justify-between gap-2 cursor-pointer border ${
                    isSelected
                      ? 'bg-public-surface border-public-ink text-public-ink shadow-xs'
                      : 'bg-public-surface/70 hover:bg-public-surface border-public-border text-public-ink-muted'
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-public-ink truncate">
                        {branch.name.split('(')[0].trim()}
                      </span>
                      {branch.isHeadquarters && (
                        <span className="text-[11px] font-semibold bg-public-canvas text-public-accent border border-public-border px-2 py-0.5 rounded-md shrink-0">
                          HQ
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-public-ink-muted flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-public-accent shrink-0" />
                      <span className="truncate">{branch.location}</span>
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 ${
                      isSelected ? 'text-public-accent' : 'text-public-ink-muted'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Branch Details */}
          <div className="md:col-span-8 p-6 md:p-8 bg-public-surface relative">
            <AnimatePresence mode="wait">
              <m.div
                key={selectedBranch.id}
                initial={{ opacity: 0, y: prefersReduced ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReduced ? 0 : -6 }}
                transition={{ duration: prefersReduced ? 0.08 : 0.18, ease: CATHEDRAL_EASE }}
                className="space-y-6"
              >
                <div className="space-y-3 pb-6 border-b border-public-border">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-public-canvas text-public-accent border border-public-border">
                      {selectedBranch.tagline}
                    </span>
                    <span className="text-sm text-public-ink-muted">
                      Minister: <strong className="text-public-ink">{selectedBranch.pastor}</strong>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-public-ink tracking-tight">
                    {selectedBranch.name}
                  </h3>

                  <div className="space-y-1 text-sm text-public-ink-muted">
                    <p className="flex items-start gap-2 text-public-ink font-medium">
                      <MapPin className="w-4 h-4 text-public-accent shrink-0 mt-0.5" />
                      <span>{selectedBranch.address}</span>
                    </p>
                    <p className="pl-6">{selectedBranch.directions}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(
                        `${selectedBranch.name}, ${selectedBranch.location}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent('interaction', 'branch_directions', selectedBranch.name)}
                      className="min-h-[44px] px-5 py-2.5 rounded-lg bg-public-ink hover:bg-public-accent text-white font-semibold text-sm transition-colors inline-flex items-center gap-2"
                    >
                      <Navigation className="w-4 h-4" /> Open Google Maps
                    </a>
                    <a
                      href={toTelUrl(selectedBranch.phone)}
                      onClick={() => trackEvent('conversion', 'call_hotline', selectedBranch.name)}
                      className="min-h-[44px] px-5 py-2.5 rounded-lg bg-public-canvas hover:border-public-ink text-public-ink font-semibold text-sm border border-public-border transition-colors inline-flex items-center gap-2 tabular-nums"
                    >
                      <Phone className="w-4 h-4 text-public-accent" />
                      <span>{toInternationalDisplay(selectedBranch.phone)}</span>
                    </a>
                  </div>
                </div>

                {/* Service Schedules */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.12em] text-public-ink-muted flex items-center gap-2">
                      <Clock className="w-4 h-4 text-public-accent" /> Weekly Gathering Schedule
                    </h4>
                    <span className="text-xs font-medium text-public-ink-muted">Ghana Time (GMT)</span>
                  </div>

                  {selectedBranch.services && selectedBranch.services.length > 0 ? (
                    <div className="space-y-2.5">
                      {selectedBranch.services.map((srv, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl border ${
                            srv.isMain
                              ? 'bg-public-canvas border-public-ink/30'
                              : 'bg-public-canvas/60 border-public-border'
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span
                              className={`text-xs font-semibold px-2.5 py-0.5 rounded-md ${
                                srv.isMain
                                  ? 'bg-public-ink text-white'
                                  : 'bg-public-surface text-public-ink-muted border border-public-border'
                              }`}
                            >
                              {srv.day}
                            </span>
                            <span className="text-sm font-semibold text-public-accent tabular-nums">
                              {srv.time} GMT
                            </span>
                          </div>
                          <p className="font-bold text-base text-public-ink mt-1.5">{srv.name}</p>
                          <p className="text-sm text-public-ink-muted mt-0.5">{srv.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-public-ink-muted p-4 rounded-xl bg-public-canvas border border-public-border">
                      Please contact this congregation by phone for updated service times.
                    </p>
                  )}
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default BranchModal;
