import React, { ReactNode } from 'react';

interface SectionHeaderProps {
  /** Retained for compatibility with legacy callers; rendered without decorative numbering. */
  index?: string;
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  rightSlot?: ReactNode;
  variant?: 'light' | 'dark';
  as?: 'h2' | 'h3';
  headingId?: string;
  className?: string;
}

/** Shared public heading hierarchy, with optional supporting copy or action. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  accent,
  description,
  rightSlot,
  variant = 'light',
  as = 'h2',
  headingId,
  className = '',
}) => {
  const isDark = variant === 'dark';
  const eyebrowClass = isDark ? 'text-public-accent-light' : 'text-public-accent';
  const titleColorClass = isDark ? 'text-white' : 'text-public-ink';
  const accentColorClass = isDark ? 'text-public-accent-light' : 'text-public-accent';
  const descColorClass = isDark ? 'text-white/75' : 'text-public-ink-muted';

  const HeadingTag = as;

  return (
    <div className={className}>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12">
        <div className="space-y-4 min-w-0 max-w-3xl">
          <p className={`text-xs font-bold uppercase tracking-[0.16em] ${eyebrowClass}`}>
            {eyebrow}
          </p>
          <HeadingTag id={headingId} className={`font-sans text-[clamp(2.25rem,4.2vw,4rem)] leading-[1.06] font-extrabold tracking-[-0.045em] text-balance ${titleColorClass}`}>
            {title}
            {accent ? (
              <>
                {' '}
                <span className={accentColorClass}>{accent}</span>
              </>
            ) : null}
          </HeadingTag>
        </div>

        {rightSlot ? (
          <div className="shrink-0">{rightSlot}</div>
        ) : description ? (
          <p className={`text-base max-w-sm leading-relaxed ${descColorClass}`}>{description}</p>
        ) : null}
      </div>
    </div>
  );
};

export default SectionHeader;
