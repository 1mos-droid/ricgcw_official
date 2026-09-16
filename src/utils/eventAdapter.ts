import { EventItem } from '../data/churchData';

const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Safely parse a date value from various Firestore and string formats
 */
export function safeParseDate(val: unknown): Date {
  if (!val) return new Date();
  if (val instanceof Date) return val;
  if (typeof val === 'object' && val !== null && 'toDate' in val && typeof (val as { toDate: () => Date }).toDate === 'function') {
    return (val as { toDate: () => Date }).toDate();
  }
  if (typeof val === 'number') {
    return new Date(val);
  }
  if (typeof val === 'string') {
    // Check for YYYY-MM-DD format
    const match = val.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1;
      const day = parseInt(match[3], 10);
      return new Date(year, month, day);
    }
    const parsed = new Date(val);
    if (!isNaN(parsed.getTime())) {
      return parsed;
    }
  }
  return new Date();
}

/**
 * Formats date into readable string like "Nov 20, 2026" or preserves custom phrases like "Every Sunday"
 */
export function formatEventDate(val: unknown): string {
  if (!val) return 'Date TBA';
  if (typeof val === 'string') {
    const isIsoOrStandard = /^\d{4}-\d{2}-\d{2}/.test(val);
    if (!isIsoOrStandard && isNaN(Date.parse(val))) {
      return val; // e.g. "Every Sunday", "Last Friday Monthly"
    }
  }

  try {
    const d = safeParseDate(val);
    if (isNaN(d.getTime())) return String(val);
    const month = MONTH_NAMES[d.getMonth()];
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  } catch {
    return String(val);
  }
}

/**
 * Normalizes a raw Firestore event document into an EventItem
 */
export function normalizeFirestoreEvent(docData: { id: string; [key: string]: any }): EventItem {
  const rawTitle = docData.name || docData.title || 'Church Fellowship Event';
  const rawDate = docData.date || '';
  const rawTime = docData.time || '09:00 AM';
  const rawLocation = docData.location || (docData.branch ? `${docData.branch} Sanctuary` : 'RICGCW Headquarters, Accra');
  const rawCategory = docData.category || (docData.isOnline ? 'Online Broadcast' : 'Worship Service');
  const rawDescription = docData.description || (docData.isOnline ? 'Live stream gathering on YouTube & Facebook' : 'Join us for divine impartation, worship, and fellowship.');
  const isFeatured = Boolean(docData.isFeatured || docData.featured || false);

  return {
    id: docData.id,
    title: rawTitle,
    date: formatEventDate(rawDate),
    time: rawTime,
    location: rawLocation,
    category: rawCategory,
    description: rawDescription,
    isFeatured,
  };
}

/**
 * Converts an EventItem into a Firestore document structure
 */
export function toFirestoreEvent(event: Partial<EventItem> & { isOnline?: boolean; branch?: string }) {
  return {
    name: event.title || 'Untitled Event',
    date: event.date || new Date().toISOString().split('T')[0],
    time: event.time || '09:00 AM',
    location: event.location || 'RICGCW Headquarters, Accra',
    category: event.category || 'Worship Service',
    description: event.description || '',
    isFeatured: Boolean(event.isFeatured),
    isOnline: Boolean(event.isOnline),
    branch: event.branch || '',
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Checks if a given date string is in the future
 */
export function isUpcomingEvent(rawDate: unknown, rawTime?: string): boolean {
  if (!rawDate) return false;
  if (typeof rawDate === 'string' && (/every/i.test(rawDate) || /monthly/i.test(rawDate) || /weekly/i.test(rawDate))) {
    return true; // Recurring events are always upcoming
  }

  const eventDate = safeParseDate(rawDate);
  if (isNaN(eventDate.getTime())) return true;

  if (rawTime) {
    const timeMatch = rawTime.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
    if (timeMatch) {
      let hours = parseInt(timeMatch[1], 10);
      const minutes = parseInt(timeMatch[2], 10);
      const meridian = timeMatch[3]?.toUpperCase();
      if (meridian === 'PM' && hours < 12) hours += 12;
      if (meridian === 'AM' && hours === 12) hours = 0;
      eventDate.setHours(hours, minutes, 0, 0);
    } else {
      eventDate.setHours(23, 59, 59, 999);
    }
  } else {
    eventDate.setHours(23, 59, 59, 999);
  }

  return eventDate.getTime() >= Date.now();
}

/**
 * Sorts events chronologically from earliest to latest
 */
export function sortEventsChronologically(events: EventItem[]): EventItem[] {
  return [...events].sort((a, b) => {
    const dateA = safeParseDate(a.date).getTime();
    const dateB = safeParseDate(b.date).getTime();
    return dateA - dateB;
  });
}
