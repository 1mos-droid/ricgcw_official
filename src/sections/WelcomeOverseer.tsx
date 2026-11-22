import React, { useState, useEffect } from 'react';
import { MessageCircle, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useChurch } from '../context/ChurchContext';
import { PICTURES, IMAGE_DIMENSIONS } from '../data/churchData';
import { trackEvent } from '../utils/analytics';
import { toWhatsAppUrl } from '../utils/phoneUtils';
import SectionHeader from '../components/SectionHeader';
import ResponsiveImage from '../components/ResponsiveImage';

interface WelcomeOverseerProps {
  onOpenPrayerModal?: () => void;
  onOpenBranchModal?: (branchId?: string) => void;
}

export const WelcomeOverseer: React.FC<WelcomeOverseerProps> = ({ onOpenPrayerModal }) => {
  const { churchInfo, churchColors } = useChurch();
  const location = useLocation();
  const [showIdentity, setShowIdentity] = useState(location.hash === '#identity');

  useEffect(() => {
    if (location.hash === '#identity') {
      setShowIdentity(true);
    }
  }, [location.hash]);

  const definitions = churchInfo.definitions || [];
  const mottoItems =
    churchInfo.motto && churchInfo.motto.length > 0
      ? churchInfo.motto
      : [
          { title: 'Perfecting the Saints', scripture: 'Ephesians 4:12' },
          { title: 'Taking Territories', scripture: 'Joshua 1:3' },
          { title: 'Where Impossibility Becomes Possible', scripture: 'Luke 1:37' },
        ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-public-canvas text-public-ink py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-public-border"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        <SectionHeader
          headingId="about-heading"
          eyebrow="About RICGCW"
          title="Rooted in Scripture,"
          accent="built for people"
          description={churchInfo.slogan}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Overseer Portrait Column */}
          <div className="lg:col-span-5 space-y-3">
            <div className="aspect-[3/4] w-full max-w-md mx-auto lg:max-w-none rounded-2xl overflow-hidden bg-public-surface border border-public-border">
              <ResponsiveImage
                src={PICTURES.pastor2}
                alt={`${churchInfo.founder.name} — ${churchInfo.founder.title}`}
                width={IMAGE_DIMENSIONS.pastor2.width}
                height={IMAGE_DIMENSIONS.pastor2.height}
                sizes="(min-width: 1024px) 38vw, 100vw"
                pictureClassName="w-full h-full block"
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="max-w-md mx-auto lg:max-w-none pt-1">
              <p className="text-lg font-bold text-public-ink">{churchInfo.founder.name}</p>
              <p className="text-sm text-public-ink-muted">{churchInfo.founder.title}</p>
            </div>
          </div>

          {/* Vision, Mandate & Actions Column */}
          <div className="lg:col-span-7 space-y-8 min-w-0">
            <div className="bg-public-surface border border-public-border rounded-2xl p-6 sm:p-8 space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-public-accent">
                Our Vision
              </p>
              <blockquote className="text-xl sm:text-2xl font-bold tracking-tight text-public-ink leading-snug">
                {churchInfo.vision}
              </blockquote>
              <p className="text-base text-public-ink-muted leading-relaxed">
                &ldquo;{churchInfo.founder.quote}&rdquo;
              </p>
            </div>

            <p className="text-base sm:text-lg text-public-ink-muted leading-relaxed max-w-2xl">
              At {churchInfo.name}, every gathering centers on sincere worship, clear Bible teaching, and caring for both spiritual growth and practical community needs.
            </p>

            {/* Primary Pastoral Connection Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <button
                type="button"
                onClick={() => onOpenPrayerModal?.()}
                className="min-h-[48px] px-6 py-3 rounded-lg bg-public-ink hover:bg-public-accent text-white font-semibold text-base inline-flex items-center justify-center transition-colors cursor-pointer"
              >
                Request prayer
              </button>

              <a
                href={toWhatsAppUrl(churchInfo.contact.phone)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('conversion', 'whatsapp_chat', 'Welcome Overseer')}
                className="min-h-[48px] px-6 py-3 rounded-lg border border-public-border bg-public-surface hover:border-public-ink text-public-ink font-semibold text-base inline-flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-public-accent shrink-0" />
                <span>Message on WhatsApp</span>
              </a>
            </div>

            {/* 3-Item Mission Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {mottoItems.map((item) => (
                <div
                  key={item.title}
                  className="p-5 rounded-xl bg-public-surface border border-public-border space-y-1.5"
                >
                  <p className="text-xs font-semibold text-public-accent">{item.scripture}</p>
                  <p className="text-base font-bold text-public-ink leading-snug">{item.title}</p>
                </div>
              ))}
            </div>

            {/* Collapsible Identity & Church Colors Panel (Preserves #identity Anchor) */}
            <div id="identity" className="border border-public-border rounded-2xl bg-public-surface overflow-hidden">
              <button
                type="button"
                aria-expanded={showIdentity}
                aria-controls="ricgcw-identity-panel"
                onClick={() => setShowIdentity((prev) => !prev)}
                className="w-full min-h-[56px] px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-public-canvas/60 transition-colors cursor-pointer"
              >
                <div>
                  <span className="text-base font-bold text-public-ink block">
                    What our name &amp; church colors mean
                  </span>
                  <span className="text-sm text-public-ink-muted">
                    Explore our Rhema etymology and official emblem colors
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-public-ink-muted shrink-0 transition-transform ${
                    showIdentity ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {showIdentity && (
                <div
                  id="ricgcw-identity-panel"
                  className="px-6 pb-6 pt-2 border-t border-public-border space-y-6"
                >
                  {definitions.length > 0 && (
                    <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {definitions.map((def) => (
                        <div
                          key={def.term}
                          className="p-4 rounded-xl bg-public-canvas border border-public-border space-y-1"
                        >
                          <dt className="text-sm font-bold text-public-ink">{def.term}</dt>
                          <dd className="text-sm text-public-ink-muted leading-relaxed">
                            {def.meaning}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  )}

                  {churchColors && churchColors.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-public-ink-muted">
                        Official Church Colors
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {churchColors.map((clr) => (
                          <div
                            key={clr.name}
                            className="p-3.5 rounded-xl bg-public-canvas border border-public-border flex items-start gap-3"
                          >
                            <span
                              aria-hidden="true"
                              className="w-7 h-7 rounded-md border border-public-border shrink-0 mt-0.5"
                              style={{ backgroundColor: clr.hex }}
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-public-ink">
                                {clr.name}{' '}
                                <span className="text-xs font-medium text-public-ink-muted">
                                  · {clr.biblicalReference}
                                </span>
                              </p>
                              <p className="text-xs text-public-ink-muted mt-0.5 leading-relaxed">
                                {clr.spiritualMeaning}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeOverseer;
