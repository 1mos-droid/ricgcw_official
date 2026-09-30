import { describe, it, expect } from 'vitest';
import { getNextSundayCountdown } from './serviceScheduleUtils';

describe('serviceScheduleUtils (Accra Timezone Service Countdown)', () => {
  it('detects live service on Sunday between 8:30 AM and 12:30 PM GMT', () => {
    // Sunday 10:00 AM GMT
    const sundayMorningService = new Date(Date.UTC(2026, 8, 20, 10, 0, 0)); // Sept 20, 2026 is Sunday
    const status = getNextSundayCountdown(sundayMorningService);

    expect(status.isLiveNow).toBe(true);
    expect(status.isToday).toBe(true);
    expect(status.label).toContain('in Session');
  });

  it('detects Sunday early morning countdown before 8:30 AM GMT', () => {
    // Sunday 7:15 AM GMT (1h 45m before 9:00 AM)
    const earlySunday = new Date(Date.UTC(2026, 8, 20, 7, 15, 0));
    const status = getNextSundayCountdown(earlySunday);

    expect(status.isLiveNow).toBe(false);
    expect(status.isToday).toBe(true);
    expect(status.hours).toBe(1);
    expect(status.mins).toBe(45);
    expect(status.label).toContain('this morning');
  });

  it('counts down to next week Sunday when checked on Sunday afternoon after 12:30 PM GMT', () => {
    // Sunday 2:00 PM GMT
    const sundayAfternoon = new Date(Date.UTC(2026, 8, 20, 14, 0, 0));
    const status = getNextSundayCountdown(sundayAfternoon);

    expect(status.isLiveNow).toBe(false);
    expect(status.isToday).toBe(false);
    expect(status.days).toBe(6);
    expect(status.hours).toBe(19); // 14:00 to 09:00 next day is 19 hours
  });

  it('counts down correctly on a Wednesday', () => {
    // Wednesday Sept 23, 2026 at 09:00 AM GMT (4 days until Sunday Sept 27 at 09:00 AM)
    const wednesday = new Date(Date.UTC(2026, 8, 23, 9, 0, 0));
    const status = getNextSundayCountdown(wednesday);

    expect(status.isLiveNow).toBe(false);
    expect(status.days).toBe(4);
    expect(status.hours).toBe(0);
    expect(status.mins).toBe(0);
  });
});
