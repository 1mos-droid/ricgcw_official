import React, { useEffect, useRef, useId, useState } from 'react';
import { m, AnimatePresence, useReducedMotion, PanInfo } from 'framer-motion';
import { X } from 'lucide-react';
import { CATHEDRAL_EASE, SPRING_TACTILE } from '../motion';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
  maxWidthClass?: string;
  closeOnBackdrop?: boolean;
  closeLabel?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  icon,
  children,
  maxWidthClass = 'max-w-xl',
  closeOnBackdrop = true,
  closeLabel = 'Close dialog',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const prefersReduced = useReducedMotion();
  const [isMobileSheet, setIsMobileSheet] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 640
  );

  useEffect(() => {
    const checkViewport = () => setIsMobileSheet(window.innerWidth < 640);
    window.addEventListener('resize', checkViewport, { passive: true });
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length > 0) {
          focusable[0].focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);
      if (previousActiveElement.current && typeof previousActiveElement.current.focus === 'function') {
        previousActiveElement.current.focus();
      }
    };
  }, [isOpen, onClose]);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 100 || info.velocity.y > 400) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
        >
          {/* Animated Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0.1 : 0.22, ease: CATHEDRAL_EASE }}
            className="fixed inset-0 bg-sanctuary-950/78 backdrop-blur-sm"
            onClick={closeOnBackdrop ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Sharp Architectural Dialog / Mobile Drag Sheet */}
          <m.div
            ref={modalRef}
            tabIndex={-1}
            drag={isMobileSheet && !prefersReduced ? 'y' : false}
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0, bottom: 0.35 }}
            onDragEnd={handleDragEnd}
            initial={
              prefersReduced
                ? { opacity: 0 }
                : isMobileSheet
                ? { opacity: 0, y: '100%' }
                : { opacity: 0, scale: 0.96, y: 12 }
            }
            animate={
              prefersReduced
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              prefersReduced
                ? { opacity: 0 }
                : isMobileSheet
                ? { opacity: 0, y: '100%' }
                : { opacity: 0, scale: 0.96, y: 10 }
            }
            transition={prefersReduced ? { duration: 0.12 } : SPRING_TACTILE}
            className={`relative w-full ${maxWidthClass} bg-sanctuary-alabaster text-ink-primary border border-sanctuary-stone rounded-t-xl sm:rounded-sm shadow-2xl overflow-hidden z-10 sm:my-6 max-h-[92vh] flex flex-col focus:outline-none`}
          >
            {/* Mobile Sheet Grab Handle */}
            <div className="sm:hidden flex justify-center pt-2.5 pb-1 bg-sanctuary-950 shrink-0" aria-hidden="true">
              <span className="w-10 h-1 rounded-full bg-gold-400/40" />
            </div>

            {/* Header */}
            <div className="p-5 sm:p-7 pt-3 sm:pt-7 logo-obsidian-bg text-sanctuary-alabaster flex items-center justify-between border-b border-gold-400/20 shrink-0">
              <div className="flex items-center gap-3.5 min-w-0">
                {icon && (
                  <div className="w-11 h-11 rounded-sm bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-400 shrink-0">
                    {icon}
                  </div>
                )}
                <div className="min-w-0">
                  <h2 id={titleId} className="text-2xl sm:text-3xl font-normal font-serif text-sanctuary-alabaster leading-tight">
                    {title}
                  </h2>
                  {subtitle && <p className="text-caption font-mono uppercase tracking-wider text-gold-400 mt-0.5">{subtitle}</p>}
                </div>
              </div>

              <button
                onClick={onClose}
                className="min-w-[44px] min-h-[44px] rounded-sm bg-white/8 hover:bg-white/20 text-sanctuary-alabaster/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-2"
                aria-label={closeLabel}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-5 sm:p-7 pb-[calc(1.25rem+env(safe-area-inset-bottom,0px))] sm:pb-7 overflow-y-auto flex-1">
              {children}
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
