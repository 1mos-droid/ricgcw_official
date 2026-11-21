import { useEffect, useState } from 'react';

/**
 * Tracks the currently visible section ID using IntersectionObserver
 * with zero scroll-event listener layout thrashing.
 */
export function useActiveSection(
  sectionIds: readonly string[],
  enabled = true
): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled || sectionIds.length === 0 || typeof IntersectionObserver === 'undefined') {
      setActiveId(null);
      return;
    }

    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleRatios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let bestId: string | null = null;
        let bestRatio = 0;

        for (const id of sectionIds) {
          const ratio = visibleRatios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId) {
          setActiveId(bestId);
        }
      },
      {
        rootMargin: '-22% 0px -50% 0px',
        threshold: [0, 0.15, 0.35, 0.6],
      }
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [sectionIds, enabled]);

  return activeId;
}

export default useActiveSection;
