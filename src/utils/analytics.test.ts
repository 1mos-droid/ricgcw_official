import { describe, it, expect, beforeEach } from 'vitest';
import { trackEvent, trackPageView, getAnalyticsSummary, clearAnalyticsData, isAnalyticsPermitted } from './analytics';

describe('analytics utility', () => {
  beforeEach(() => {
    localStorage.clear();
    clearAnalyticsData();
  });

  it('tracks page views and events when consent is granted', () => {
    trackPageView('Sanctuary Home');
    trackEvent('interaction', 'branch_modal_opened', 'Cathedral');

    const summary = getAnalyticsSummary();
    expect(summary.totalPageViews).toBeGreaterThanOrEqual(1);
    expect(summary.recentEvents.length).toBe(2);
  });

  it('suppresses navigation events when user denies analytics consent', () => {
    localStorage.setItem('ricgcw_cookie_consent', JSON.stringify({
      essential: true,
      analytics: false,
      decidedAt: new Date().toISOString(),
    }));

    expect(isAnalyticsPermitted()).toBe(false);

    trackPageView('Secret Page');
    const summary = getAnalyticsSummary();
    expect(summary.recentEvents.length).toBe(0);
  });
});
