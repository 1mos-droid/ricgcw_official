import React, { ReactNode, useRef } from 'react';
import { m, useInView, useReducedMotion } from 'framer-motion';
import { CATHEDRAL_EASE, VIEWPORT_ONCE, DrawRule } from './motion';

interface SectionHeaderProps {
  index?: string;
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
 * Architectural editorial section header with optional monograph chapter index,
 * hairline rule, word-by-word masked serif reveal triggered cleanly via an unclipped wrapper,
 * and italic metallic-gold accent.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  index,
  eyebrow,
  title,
  accent,
  description,
  rightSlot,
  variant = 'light',
  as = 'h2',
  className = '',
}) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, VIEWPORT_ONCE);
  const prefersReduced = useReducedMotion();
  const titleWords = title.trim().split(/\s+/).filter(Boolean);
  const accentWords = accent ? accent.trim().split(/\s+/).filter(Boolean) : [];
  const totalWords = titleWords.length + accentWords.length;

  const isDark = variant === 'dark';
  const eyebrowClass = isDark ? 'text-gold-400' : 'text-gold-600';
  const titleColorClass = isDark ? 'text-sanctuary-alabaster' : 'text-ink-primary';
  const accentColorClass = isDark ? 'text-gold-400' : 'text-gold-600';
  const descColorClass = isDark ? 'text-sanctuary-alabaster/75' : 'text-ink-secondary';

  const wordVariant = {
    hidden: prefersReduced ? { opacity: 0 } : { y: '105%', opacity: 0 },
    visible: (idx: number) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: prefersReduced ? 0.15 : 0.7,
        delay: prefersReduced ? 0 : Math.min(idx, totalWords) * 0.05,
        ease: CATHEDRAL_EASE,
      },
    }),
  };

  const renderAnimatedWord = (word: string, wordIndex: number, isAccent = false) => (
    <span key={`${word}-${wordIndex}`} className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0">
      <m.span
        custom={wordIndex}
        variants={wordVariant}
        className={`inline-block ${isAccent ? `italic font-normal ${accentColorClass}` : ''}`}
      >
        {word}
      </m.span>
    </span>
  );

  const HeadingMotion = as === 'h3' ? m.h3 : m.h2;

  return (
    <div ref={headerRef} className={`space-y-5 ${className}`}>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 min-w-0">
          <m.div
            initial={{ opacity: 0, y: prefersReduced ? 0 : 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: prefersReduced ? 0.15 : 0.5, ease: CATHEDRAL_EASE }}
            className={`flex items-center gap-3 text-eyebrow uppercase tracking-[0.24em] font-mono font-semibold ${eyebrowClass}`}
          >
            {index && <span className="tabular-nums">{index}</span>}
            <span aria-hidden="true" className={`inline-block w-8 h-px ${isDark ? 'bg-gold-400/50' : 'bg-gold-600/50'}`} />
            <span>{eyebrow}</span>
          </m.div>

          <HeadingMotion
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={`font-serif text-h2 tracking-tight font-normal ${titleColorClass}`}
          >
            {titleWords.map((word, idx) => renderAnimatedWord(word, idx, false))}
            {accentWords.map((word, idx) => renderAnimatedWord(word, titleWords.length + idx, true))}
          </HeadingMotion>
        </div>

        {rightSlot ? (
          <div className="shrink-0">{rightSlot}</div>
        ) : description ? (
          <p className={`text-body max-w-md leading-relaxed ${descColorClass}`}>{description}</p>
        ) : null}
      </div>

      <DrawRule variant={isDark ? 'dark' : 'light'} />
    </div>
  );
};

export default SectionHeader;
