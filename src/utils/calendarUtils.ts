/**
 * Calendar .ics generator for RICGCW events
 * Works across iOS Safari, Android Chrome, and desktop calendar clients.
 */

export interface CalendarEventDetails {
  title: string;
  description: string;
  location: string;
  dateStr?: string; // e.g. "April 18, 2026" or "2026-04-18"
  timeStr?: string; // e.g. "9:00 AM - 1:00 PM"
}

/**
 * Generates an iCalendar (.ics) string for an event
 */
export function generateIcsContent(event: CalendarEventDetails): string {
  // Parse or approximate UTC timestamps for the event
  const now = new Date();
  const dtStamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  // Default to future date or current date if parsing fails
  let startDate = new Date();
  if (event.dateStr) {
    const parsed = new Date(event.dateStr);
    if (!isNaN(parsed.getTime())) {
      startDate = parsed;
    }
  }

  // Set default hours to 09:00 GMT
  startDate.setUTCHours(9, 0, 0, 0);

  const endDate = new Date(startDate.getTime() + 3 * 60 * 60 * 1000); // 3-hour duration

  const dtStart = startDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const dtEnd = endDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const cleanTitle = event.title.replace(/\n/g, ' ').trim();
  const cleanDesc = event.description.replace(/\n/g, '\\n').trim();
  const cleanLoc = (event.location || 'RICGCW Cathedral, Accra, Ghana').replace(/\n/g, ' ').trim();

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//RICGCW//Rhema Inner Court Worldwide//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:ricgcw-event-${Date.now()}@ricgcw.me`,
    `DTSTAMP:${dtStamp}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${cleanTitle}`,
    `DESCRIPTION:${cleanDesc}`,
    `LOCATION:${cleanLoc}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/**
 * Triggers a download of the .ics file directly in the browser
 */
export function downloadEventIcs(event: CalendarEventDetails) {
  if (typeof window === 'undefined') return;

  const content = generateIcsContent(event);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const filename = `${event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.ics`;

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
}
