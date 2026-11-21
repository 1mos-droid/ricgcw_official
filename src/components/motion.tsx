import React, { ReactNode } from 'react';
import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Variants,
} from 'framer-motion';

/**
 * Shared Motion System — Reverent Cathedral Motion Language
 * Rules:
 * - Always animate only transform (x, y, scale, rotate) and opacity (+ clip-path for reveals)
 * - Use CATHEDRAL_EASE for reveals, SPRING_TACTILE for interactive touches
 * - Honor prefers-reduced-motion globally via <MotionConfig reducedMotion="user"> and explicit checks
 */

export const CATHEDRAL_EASE = [0.22, 1, 0.36, 1] as const;

export const DURATION = {
  micro: 0.15,
  ui: 0.36,
  reveal: 0.8,
} as const;

export const SPRING_TACTILE = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30,
};

export const SPRING_GENTLE = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 28,
};

export const VIEWPORT_ONCE = {
  once: true,
  amount: 0.25 as const,
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
      variants={
        prefersReduced
          ? fadeIn
          : staggerItem
      }
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
 * Gentle magnetic pointer attraction on desktop/fine-pointer devices only.
 * Zero React re-renders during pointer move; disabled under reduced motion.
 */
export const Magnetic: React.FC<MagneticProps> = ({
  children,
  className = '',
  strength = 0.22,
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
