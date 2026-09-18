import { useEffect } from 'react';

/**
 * Custom hook to dynamically update and manage unique, SEO-friendly page titles.
 */
export const usePageTitle = (title?: string) => {
  useEffect(() => {
    const previousTitle = document.title;
    if (title) {
      document.title = `${title} | Rhema Inner Court Gospel Church (Worldwide)`;
    } else {
      document.title = 'Rhema Inner Court Gospel Church (Worldwide) | 2026: Divine Manifestation';
    }

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};

export default usePageTitle;
