import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { useChurch } from '../context/ChurchContext';
import { trackEvent } from '../utils/analytics';
import SectionHeader from '../components/SectionHeader';

interface MinistriesProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: (branchId?: string) => void;
  onConnectMinistry?: (ministryName: string) => void;
}

export const Ministries: React.FC<MinistriesProps> = ({
  onOpenPrayerModal,
  onConnectMinistry,
}) => {
  const { ministries } = useChurch();

  const handleJoinMinistry = (ministryName: string) => {
    trackEvent('interaction', 'ministry_connect', ministryName);
    if (onConnectMinistry) {
      onConnectMinistry(ministryName);
    } else {
      onOpenPrayerModal?.();
    }
  };

  return (
    <section
      id="ministries"
      aria-labelledby="ministries-heading"
      className="bg-public-surface text-public-ink py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-public-border"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <SectionHeader
          headingId="ministries-heading"
          eyebrow="Get Involved"
          title="Find your"
          accent="community"
          description="Every ministry builds caring relationships, biblical maturity, and practical service across every age group."
        />

        {ministries.length === 0 ? (
          <div className="rounded-2xl border border-public-border bg-public-canvas p-8 sm:p-10 text-center space-y-3">
            <h3 className="text-lg font-bold text-public-ink">
              Ministry directory is being updated
            </h3>
            <p className="text-base text-public-ink-muted max-w-xl mx-auto">
              Want to serve on a team or join a fellowship group? Send us a quick message below and a pastor will connect with you.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onOpenPrayerModal?.()}
                className="min-h-[44px] inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-public-ink hover:bg-public-accent text-white font-semibold text-sm transition-colors cursor-pointer"
              >
                Connect with leadership
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ministries.map((ministry) => (
              <article
                key={ministry.id}
                className="bg-public-canvas border border-public-border rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-6"
              >
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-public-accent">
                    {ministry.tagline}
                  </p>
                  <h3 className="text-xl font-bold tracking-tight text-public-ink">
                    {ministry.name}
                  </h3>
                  <p className="text-sm sm:text-base text-public-ink-muted leading-relaxed">
                    {ministry.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-public-border space-y-4">
                  <div className="flex items-start gap-2 text-sm text-public-ink-muted">
                    <Clock className="w-4 h-4 text-public-accent shrink-0 mt-0.5" />
                    <span>{ministry.schedule}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleJoinMinistry(ministry.name)}
                    className="w-full min-h-[44px] px-4 py-2.5 rounded-lg border border-public-border bg-public-surface hover:border-public-ink hover:bg-public-ink hover:text-white text-public-ink text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Connect with {ministry.name.split(' ')[0]}</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Ministries;
