import '@testing-library/jest-dom/vitest';

// Polyfill localStorage for node/jsdom test environments
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
}
