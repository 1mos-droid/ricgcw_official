import React, { ReactNode, useRef } from 'react';
import {
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'framer-motion';

/**
 * Shared Motion System — Living Cathedral Monograph Motion Language
 * Rules:
 * - Always animate only transform (x, y, scale, rotate) and opacity (+ clip-path for curtain reveals)
 * - Use CATHEDRAL_EASE for architectural reveals, SPRING_TACTILE for interactive controls
 * - Honor prefers-reduced-motion globally via <MotionConfig reducedMotion="user"> and explicit checks
 */

export const CATHEDRAL_EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  micro: 0.16,
  ui: 0.36,
  reveal: 0.8,
} as const;

export const SPRING_TACTILE = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 32,
};

export const SPRING_GENTLE = {
  type: 'spring' as const,
  stiffness: 240,
  damping: 28,
};

export const VIEWPORT_ONCE = {
  once: true,
  amount: 'some' as const,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.reveal, ease: CATHEDRAL_EASE },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.ui, ease: CATHEDRAL_EASE },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: SPRING_TACTILE,
  },
};

export const maskReveal: Variants = {
  hidden: { y: '105%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.72, ease: CATHEDRAL_EASE },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: CATHEDRAL_EASE },
  },
};

export const shakeX = {
  x: [0, -8, 8, -5, 5, -2, 2, 0],
  transition: { duration: 0.3 },
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  y = 20,
}) => {
  const prefersReduced = useReducedMotion();

  return (
    <m.div
      initial={{ opacity: 0, y: prefersReduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{
        duration: prefersReduced ? DURATION.micro : DURATION.reveal,
        delay: prefersReduced ? 0 : delay,
        ease: CATHEDRAL_EASE,
      }}
      className={className}
    >
      {children}
    </m.div>
  );
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const Stagger: React.FC<StaggerProps> = ({
  children,
  className = '',
  staggerDelay = 0.07,
}) => {
  const prefersReduced = useReducedMotion();

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT_ONCE}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReduced ? 0 : staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
};

export const StaggerItem: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const prefersReduced = useReducedMotion();

  return (
    <m.div
      variants={prefersReduced ? fadeIn : staggerItem}
      className={className}
    >
      {children}
    </m.div>
  );
};

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

/**
 * Gentle pointer magnetic pull for architectural CTAs on desktop/mouse pointers.
 */
export const Magnetic: React.FC<MagneticProps> = ({
  children,
  className = '',
  strength = 0.2,
}) => {
  const prefersReduced = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_TACTILE);
  const y = useSpring(rawY, SPRING_TACTILE);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || e.pointerType !== 'mouse') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    rawX.set(dx * strength);
    rawY.set(dy * strength);
  };

  const handlePointerLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <m.div
      style={prefersReduced ? undefined : { x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`inline-flex ${className}`}
    >
      {children}
    </m.div>
  );
};

interface ParallaxFrameProps {
  children: ReactNode;
  className?: string;
  offsetY?: number;
  zoomFrom?: number;
}

/**
 * Scroll-scrubbed architectural frame: subtly shifts y and eases zoom as the container traverses the viewport.
 */
export const ParallaxFrame: React.FC<ParallaxFrameProps> = ({
  children,
  className = '',
  offsetY = 32,
  zoomFrom = 1.07,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offsetY, offsetY]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [zoomFrom, 1.02, 1]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <m.div
        style={prefersReduced ? undefined : { y, scale }}
        className="w-full h-full will-change-transform"
      >
        {children}
      </m.div>
    </div>
  );
};

interface CurtainRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * Architectural vertical clip-path aperture reveal.
 * Observes an unclipped outer wrapper so IntersectionObserver fires reliably in Chromium.
 */
export const CurtainReveal: React.FC<CurtainRevealProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(outerRef, VIEWPORT_ONCE);
  const prefersReduced = useReducedMotion();

  return (
    <div ref={outerRef} className={className}>
      <m.div
        initial={
          prefersReduced
            ? { opacity: 0 }
            : { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.85 }
        }
        animate={
          isInView
            ? prefersReduced
              ? { opacity: 1 }
              : { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
            : undefined
        }
        transition={{
          duration: prefersReduced ? DURATION.micro : 0.85,
          delay: prefersReduced ? 0 : delay,
          ease: CATHEDRAL_EASE,
        }}
        className="w-full h-full"
      >
        {children}
      </m.div>
    </div>
  );
};

interface DrawRuleProps {
  className?: string;
  variant?: 'light' | 'dark' | 'gold';
  delay?: number;
}

/**
 * Scroll-triggered 1px architectural divider that draws left-to-right on entry.
 */
export const DrawRule: React.FC<DrawRuleProps> = ({
  className = '',
  variant = 'light',
  delay = 0,
}) => {
  const outerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(outerRef, VIEWPORT_ONCE);
  const prefersReduced = useReducedMotion();
  const bgClass =
    variant === 'gold'
      ? 'bg-gold-500/50'
      : variant === 'dark'
      ? 'bg-white/15'
      : 'bg-sanctuary-stone';

  return (
    <div ref={outerRef} aria-hidden="true" className={`w-full overflow-hidden ${className}`}>
      <m.div
        initial={prefersReduced ? { opacity: 0 } : { scaleX: 0 }}
        animate={
          isInView
            ? prefersReduced
              ? { opacity: 1 }
              : { scaleX: 1 }
            : undefined
        }
        transition={{
          duration: prefersReduced ? DURATION.micro : 0.8,
          delay: prefersReduced ? 0 : delay,
          ease: CATHEDRAL_EASE,
        }}
        className={`h-px w-full origin-left ${bgClass}`}
      />
    </div>
  );
};

interface ScrollBandProps {
  items: readonly string[];
  className?: string;
}

/**
 * Scroll-linked horizontal typographic ribbon clipped strictly to viewport bounds.
 */
export const ScrollBand: React.FC<ScrollBandProps> = ({
  items,
  className = '',
}) => {
  const bandRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const x = useTransform(smoothProgress, [0, 1], ['0%', '-18%']);

  const repeated = [...items, ...items, ...items];

  return (
    <div
      ref={bandRef}
      aria-hidden="true"
      className={`w-full overflow-hidden select-none ${className}`}
    >
      <m.div
        style={prefersReduced ? undefined : { x }}
        className="flex items-center gap-8 whitespace-nowrap will-change-transform py-4"
      >
        {repeated.map((label, idx) => (
          <span key={idx} className="inline-flex items-center gap-8 shrink-0">
            <span className="font-serif italic text-2xl sm:text-3xl tracking-tight">
              {label}
            </span>
            <span className="text-gold-500 text-xs font-mono">✦</span>
          </span>
        ))}
      </m.div>
    </div>
  );
};
