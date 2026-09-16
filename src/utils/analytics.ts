// Production Analytics & Interaction Tracker for RICGCW
export interface AnalyticsEvent {
  id: string;
  category: 'interaction' | 'conversion' | 'navigation' | 'inquiry';
  action: string;
  label?: string;
  timestamp: string;
  device: 'mobile' | 'desktop' | 'tablet';
}

export interface AnalyticsSummary {
  totalVisitors: number;
  totalPageViews: number;
  prayerRequestsCount: number;
  givingClicksCount: number;
  whatsappClicksCount: number;
  phoneCallsCount: number;
  directionsClicksCount: number;
  sermonViewsCount: number;
  recentEvents: AnalyticsEvent[];
  deviceBreakdown: { mobile: number; desktop: number; tablet: number };
  dailyViews: { date: string; views: number; visitors: number }[];
}

let inMemoryEvents: AnalyticsEvent[] = [];

const getDeviceType = (): 'mobile' | 'desktop' | 'tablet' => {
  if (typeof window === 'undefined') return 'desktop';
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

export const trackEvent = (category: AnalyticsEvent['category'], action: string, label?: string) => {
  try {
    const newEvent: AnalyticsEvent = {
      id: Math.random().toString(36).substring(2, 9),
      category,
      action,
      label,
      timestamp: new Date().toISOString(),
      device: getDeviceType(),
    };
    inMemoryEvents.push(newEvent);
    if (inMemoryEvents.length > 500) {
      inMemoryEvents = inMemoryEvents.slice(-500);
    }
  } catch (err) {
    console.warn('Analytics track note:', err);
  }
};

export const trackPageView = (pageName: string = 'Home') => {
  trackEvent('navigation', 'page_view', pageName);
};

export const getAnalyticsSummary = (): AnalyticsSummary => {
  const events = inMemoryEvents;

  let prayerRequestsCount = 0;
  let givingClicksCount = 0;
  let whatsappClicksCount = 0;
  let phoneCallsCount = 0;
  let directionsClicksCount = 0;
  let sermonViewsCount = 0;
  let pageViews = 0;
  const deviceCounts = { mobile: 0, desktop: 0, tablet: 0 };

  const dailyMap = new Map<string, { views: number; visitors: number }>();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const key = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    dailyMap.set(key, { views: 0, visitors: 0 });
  }

  events.forEach((ev) => {
    if (ev.device) {
      deviceCounts[ev.device] = (deviceCounts[ev.device] || 0) + 1;
    }

    const eventDate = new Date(ev.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    if (dailyMap.has(eventDate)) {
      const current = dailyMap.get(eventDate)!;
      if (ev.action === 'page_view') {
        current.views += 1;
      }
      current.visitors += 1;
    }

    if (ev.action === 'page_view') pageViews++;
    if (ev.action === 'prayer_request' || ev.action === 'prayer_request_submitted') prayerRequestsCount++;
    if (ev.action === 'give_momo' || ev.action === 'giving_modal_opened' || ev.action === 'give_paystack_intent') givingClicksCount++;
    if (ev.action === 'whatsapp_chat') whatsappClicksCount++;
    if (ev.action === 'call_hotline') phoneCallsCount++;
    if (ev.action === 'branch_directions') directionsClicksCount++;
    if (ev.action === 'watch_sermon') sermonViewsCount++;
  });

  const dailyViews = Array.from(dailyMap.entries()).map(([date, data]) => ({
    date,
    views: data.views,
    visitors: data.visitors,
  }));

  return {
    totalVisitors: events.length > 0 ? events.length : 1,
    totalPageViews: pageViews > 0 ? pageViews : 1,
    prayerRequestsCount,
    givingClicksCount,
    whatsappClicksCount,
    phoneCallsCount,
    directionsClicksCount,
    sermonViewsCount,
    recentEvents: events.slice(-20).reverse(),
    deviceBreakdown: deviceCounts,
    dailyViews,
  };
};

export const clearAnalyticsData = () => {
  inMemoryEvents = [];
};
