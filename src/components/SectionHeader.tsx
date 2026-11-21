import React, { ReactNode } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import { CATHEDRAL_EASE, VIEWPORT_ONCE } from './motion';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  accent?: string;
  description?: string;
  rightSlot?: ReactNode;
  variant?: 'light' | 'dark';
  as?: 'h2' | 'h3';
  className?: string;
}

/**
 * Shared editorial section header with word-by-word masked serif reveal
 * and optional italic burnished-gold accent.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  accent,
  description,
  rightSlot,
  variant = 'light',
  as = 'h2',
  className = '',
}) => {
  const prefersReduced = useReducedMotion();
  const titleWords = title.trim().split(/\s+/).filter(Boolean);
  const accentWords = accent ? accent.trim().split(/\s+/).filter(Boolean) : [];
  const totalWords = titleWords.length + accentWords.length;

  const isDark = variant === 'dark';
  const eyebrowClass = isDark ? 'text-gold-400' : 'text-gold-600';
  const titleColorClass = isDark ? 'text-white' : 'text-ink-primary';
  const accentColorClass = isDark ? 'text-gold-400' : 'text-gold-600';
  const borderClass = isDark ? 'border-white/10' : 'border-sanctuary-stone/80';
  const descColorClass = isDark ? 'text-white/75' : 'text-ink-secondary';

  const HeadingTag = as;

  const renderAnimatedWord = (word: string, index: number, isAccent = false) => (
    <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom mr-[0.26em] last:mr-0">
      <m.span
        initial={prefersReduced ? { opacity: 0 } : { y: '105%', opacity: 0 }}
        whileInView={prefersReduced ? { opacity: 1 } : { y: '0%', opacity: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{
          duration: prefersReduced ? 0.15 : 0.72,
          delay: prefersReduced ? 0 : Math.min(index, totalWords) * 0.055,
          ease: CATHEDRAL_EASE,
        }}
        className={`inline-block ${isAccent ? `italic font-normal ${accentColorClass}` : ''}`}
      >
        {word}
      </m.span>
    </span>
  );

  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-4 border-b ${borderClass} pb-5 ${className}`}
    >
      <div className="space-y-1.5">
        <m.span
          initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: prefersReduced ? 0.15 : 0.5, ease: CATHEDRAL_EASE }}
          className={`text-eyebrow uppercase tracking-[0.22em] font-semibold block font-sans ${eyebrowClass}`}
        >
          {eyebrow}
        </m.span>
        <HeadingTag className={`font-serif text-h2 tracking-tight ${titleColorClass}`}>
          {titleWords.map((word, idx) => renderAnimatedWord(word, idx, false))}
          {accentWords.map((word, idx) => renderAnimatedWord(word, titleWords.length + idx, true))}
        </HeadingTag>
      </div>

      {rightSlot ? (
        <div className="shrink-0">{rightSlot}</div>
      ) : description ? (
        <p className={`text-caption max-w-md ${descColorClass}`}>{description}</p>
      ) : null}
    </div>
  );
};

export default SectionHeader;
