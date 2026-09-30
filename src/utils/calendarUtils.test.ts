import { describe, it, expect } from 'vitest';
import { generateIcsContent } from './calendarUtils';

describe('calendarUtils (iCalendar ICS Generator)', () => {
  it('generates valid VCALENDAR and VEVENT fields', () => {
    const ics = generateIcsContent({
      title: '2026 Consecration Service',
      description: 'Liturgy and elevation service for ministers and pastors.',
      location: 'RICGCW Main Cathedral, Mallam, Accra',
      dateStr: '2026-04-18',
    });

    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('END:VCALENDAR');
    expect(ics).toContain('BEGIN:VEVENT');
    expect(ics).toContain('SUMMARY:2026 Consecration Service');
    expect(ics).toContain('LOCATION:RICGCW Main Cathedral, Mallam, Accra');
    expect(ics).toContain('STATUS:CONFIRMED');
    expect(ics).toContain('PRODID:-//RICGCW//Rhema Inner Court Worldwide//EN');
  });
});
