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

/**
 * Clean editorial section header in bold Plus Jakarta Sans with restrained eyebrow label
 * and optional right-aligned callout or action slot.
 */
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
  const borderClass = isDark ? 'border-white/15' : 'border-public-border';

  const HeadingTag = as;

  return (
    <div className={`pb-6 border-b ${borderClass} ${className}`}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="space-y-2.5 min-w-0 max-w-2xl">
          <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${eyebrowClass}`}>
            {eyebrow}
          </p>
          <HeadingTag id={headingId} className={`font-sans text-h2 font-bold tracking-tight ${titleColorClass}`}>
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
          <p className={`text-base max-w-md leading-relaxed ${descColorClass}`}>{description}</p>
        ) : null}
      </div>
    </div>
  );
};

export default SectionHeader;
