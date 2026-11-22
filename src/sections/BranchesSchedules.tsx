import React, { useState } from 'react';
import { MapPin, Phone, Clock, Navigation, Copy, Check, AlertCircle, ArrowUpRight } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';
import { toTelUrl, toInternationalDisplay } from '../utils/phoneUtils';
import SectionHeader from '../components/SectionHeader';

interface BranchesSchedulesProps {
  onOpenBranchModal?: (branchId?: string) => void;
}

export const BranchesSchedules: React.FC<BranchesSchedulesProps> = ({ onOpenBranchModal }) => {
  const { branches } = useChurch();
  const [copiedState, setCopiedState] = useState<Record<string, 'copied' | 'error'>>({});

  const handleCopyAddress = async (branchId: string, text: string) => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API unavailable');
      }
      await navigator.clipboard.writeText(text);
      setCopiedState((prev) => ({ ...prev, [branchId]: 'copied' }));
    } catch {
      setCopiedState((prev) => ({ ...prev, [branchId]: 'error' }));
    }

    window.setTimeout(() => {
      setCopiedState((prev) => {
        const next = { ...prev };
        delete next[branchId];
        return next;
      });
    }, 2400);
  };

  return (
    <section
      id="sanctuaries"
      aria-labelledby="branches-heading"
      className="bg-public-canvas text-public-ink py-16 sm:py-24 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-public-border"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <SectionHeader
          headingId="branches-heading"
          eyebrow="Our Locations"
          title="One family."
          accent="Find your place."
          description="Worship with us in person across Greater Accra. All listed service times observe Ghana Time (GMT)."
        />

        {branches.length === 0 ? (
          <div className="rounded-2xl border border-public-border bg-public-canvas p-8 sm:p-10 text-center space-y-3">
            <h3 className="text-lg font-bold text-public-ink">
              Branch information is being updated
            </h3>
            <p className="text-base text-public-ink-muted max-w-xl mx-auto">
              Please reach out to our church secretariat below for Sunday worship hours and directions.
            </p>
            <div className="pt-2">
              <a
                href="#connect"
                className="min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-public-ink hover:bg-public-accent text-white font-semibold text-sm transition-colors"
              >
                Contact the church
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {branches.map((branch) => {
              const copyFeedback = copiedState[branch.id];
              const mainService = branch.services?.find(service => service.isMain)
                ?? branch.services?.find(service => service.day.toLowerCase() === 'sunday')
                ?? branch.services?.[0];
              const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${branch.address}, ${branch.location}`
              )}`;

              return (
                <article
                  key={branch.id}
                  className="border-t-2 border-public-ink pt-6 flex flex-col justify-between gap-6"
                >
                  <div className="space-y-5">
                    {/* Branch Title & Tagline */}
                    <div className="space-y-1.5 pb-4 border-b border-public-border">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-public-accent">
                        {branch.isHeadquarters ? 'Main Cathedral · HQ' : 'Branch Sanctuary'}
                      </p>
                      <h3 className="text-2xl font-bold tracking-tight text-public-ink">
                        {branch.name}
                      </h3>
                      <p className="text-sm text-public-ink-muted">{branch.tagline}</p>
                    </div>

                    {mainService && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-public-accent">{mainService.day} · {mainService.name}</p>
                        <p className="text-2xl sm:text-3xl font-bold tracking-tight tabular-nums">{mainService.time}</p>
                        <p className="text-xs text-public-ink-muted">Ghana Time (GMT)</p>
                      </div>
                    )}
                    <details className="group border-y border-public-border py-3">
                      <summary className="min-h-[44px] flex items-center justify-between gap-3 text-sm font-semibold cursor-pointer list-none">
                        <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4" /> Full weekly schedule</span>
                        <span className="text-xl group-open:rotate-45 transition-transform" aria-hidden="true">+</span>
                      </summary>
                      {branch.services && branch.services.length > 0 ? (
                        <ul className="space-y-2">
                          {branch.services.map((svc, idx) => (
                            <li
                              key={`${branch.id}-svc-${idx}`}
                              className="py-3 border-t border-public-border"
                            >
                              <div className="flex flex-wrap items-baseline justify-between gap-2">
                                <span className="text-sm font-semibold text-public-ink">
                                  {svc.day}
                                </span>
                                <span className="text-xs font-semibold text-public-accent tabular-nums">
                                  {svc.time} GMT
                                </span>
                              </div>
                              <p className="text-sm text-public-ink-muted mt-1">{svc.name}</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-public-ink-muted bg-public-surface border border-public-border rounded-xl p-3">
                          Contact our secretariat for current service hours at this location.
                        </p>
                      )}
                    </details>

                    {/* Location */}
                    <div className="space-y-2 text-sm text-public-ink-muted">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-public-accent shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-public-ink">{branch.address}</p>
                          <p className="text-xs text-public-ink-muted mt-0.5">{branch.directions}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="space-y-2.5 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        trackEvent('interaction', 'branch_selected', branch.name);
                        onOpenBranchModal?.(branch.id);
                      }}
                      className="w-full min-h-[44px] px-4 py-2.5 rounded-full bg-public-ink hover:bg-public-accent text-white text-sm font-semibold inline-flex items-center justify-center gap-3 transition-colors cursor-pointer"
                    >
                      Service times &amp; directions <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-3 gap-2">
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('interaction', 'branch_directions', branch.name)}
                        className="min-h-[44px] px-2.5 py-2 rounded-full border border-public-border bg-transparent hover:border-public-ink text-public-ink text-xs font-semibold inline-flex items-center justify-center gap-1 transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5 text-public-accent shrink-0" />
                        <span>Map</span>
                      </a>

                      <a
                        href={toTelUrl(branch.phone)}
                        aria-label={`Call ${branch.name} at ${toInternationalDisplay(branch.phone)}`}
                        className="min-h-[44px] px-2.5 py-2 rounded-full border border-public-border bg-transparent hover:border-public-ink text-public-ink text-xs font-semibold inline-flex items-center justify-center gap-1 transition-colors"
                      >
                        <Phone className="w-3.5 h-3.5 text-public-accent shrink-0" />
                        <span>Call</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => handleCopyAddress(branch.id, `${branch.address}, ${branch.location}`)}
                        aria-label={`Copy address for ${branch.name}`}
                        className="min-h-[44px] px-2.5 py-2 rounded-full border border-public-border bg-transparent hover:border-public-ink text-public-ink text-xs font-semibold inline-flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        {copyFeedback === 'copied' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-olive-500 shrink-0" />
                            <span>Copied</span>
                          </>
                        ) : copyFeedback === 'error' ? (
                          <>
                            <AlertCircle className="w-3.5 h-3.5 text-public-accent shrink-0" />
                            <span>Unavailable</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-public-accent shrink-0" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default BranchesSchedules;
