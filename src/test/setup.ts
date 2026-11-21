import '@testing-library/jest-dom/vitest';

// Polyfill browser APIs for jsdom test environment
if (typeof window !== 'undefined') {
  const storage: Record<string, string> = {};
  const mockStorage = {
    getItem: (key: string) => (key in storage ? storage[key] : null),
    setItem: (key: string, value: string) => {
      storage[key] = String(value);
    },
    removeItem: (key: string) => {
      delete storage[key];
    },
    clear: () => {
      Object.keys(storage).forEach((key) => delete storage[key]);
    },
    get length() {
      return Object.keys(storage).length;
    },
    key: (i: number) => Object.keys(storage)[i] || null,
  };

  Object.defineProperty(window, 'localStorage', {
    value: mockStorage,
    writable: true,
  });

  if (typeof window.matchMedia !== 'function') {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });
  }

  if (typeof window.IntersectionObserver === 'undefined') {
    class MockIntersectionObserver implements IntersectionObserver {
      readonly root: Element | Document | null = null;
      readonly rootMargin: string = '';
      readonly thresholds: ReadonlyArray<number> = [];
      constructor(private callback: IntersectionObserverCallback) {}
      observe = (target: Element) => {
        this.callback(
          [
            {
              isIntersecting: true,
              intersectionRatio: 1,
              target,
              boundingClientRect: target.getBoundingClientRect(),
              intersectionRect: target.getBoundingClientRect(),
              rootBounds: null,
              time: Date.now(),
            } as IntersectionObserverEntry,
          ],
          this
        );
      };
      unobserve = () => {};
      disconnect = () => {};
      takeRecords = (): IntersectionObserverEntry[] => [];
    }
    window.IntersectionObserver = MockIntersectionObserver;
    (globalThis as Record<string, unknown>).IntersectionObserver = MockIntersectionObserver;
  }

  if (typeof window.ResizeObserver === 'undefined') {
    class MockResizeObserver implements ResizeObserver {
      observe = () => {};
      unobserve = () => {};
      disconnect = () => {};
    }
    window.ResizeObserver = MockResizeObserver;
    (globalThis as Record<string, unknown>).ResizeObserver = MockResizeObserver;
  }
}
