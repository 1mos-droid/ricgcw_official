/**
 * RICGCW Service Schedule & Countdown Utilities
 * Ghana is on Greenwich Mean Time (UTC+0, Africa/Accra) year-round with no DST.
 */

export interface ServiceCountdownStatus {
  isLiveNow: boolean;
  isToday: boolean;
  days: number;
  hours: number;
  mins: number;
  label: string;
}

/**
 * Calculates the countdown to the main Sunday Service (09:00 AM GMT / Accra time).
 * Considers service duration from 08:45 AM to 12:30 PM GMT as "In Session / Live Today".
 *
 * @param referenceDate Optional date for deterministic testing
 */
export function getNextSundayCountdown(referenceDate?: Date): ServiceCountdownStatus {
  const now = referenceDate ? new Date(referenceDate) : new Date();

  // Current UTC time (equivalent to Accra GMT)
  const currentUtcDay = now.getUTCDay(); // 0 is Sunday, 1 is Monday, ...
  const currentUtcHours = now.getUTCHours();
  const currentUtcMinutes = now.getUTCMinutes();
  const currentTotalMinutes = currentUtcHours * 60 + currentUtcMinutes;

  // Service timing parameters in minutes from midnight (Accra GMT)
  const servicePreStreamMinutes = 8 * 60 + 30; // 08:30 GMT
  const serviceStartMinutes = 9 * 60; // 09:00 GMT
  const serviceEndMinutes = 12 * 60 + 30; // 12:30 GMT

  // Case 1: Today is Sunday (day 0)
  if (currentUtcDay === 0) {
    // 1a: Service is happening right now (8:30 AM - 12:30 PM GMT)
    if (currentTotalMinutes >= servicePreStreamMinutes && currentTotalMinutes <= serviceEndMinutes) {
      return {
        isLiveNow: true,
        isToday: true,
        days: 0,
        hours: 0,
        mins: 0,
        label: 'Main Sanctuary Service in Session',
      };
    }

    // 1b: Sunday morning before service starts (< 08:30 GMT)
    if (currentTotalMinutes < servicePreStreamMinutes) {
      const diffMinutes = serviceStartMinutes - currentTotalMinutes;
      const hours = Math.floor(diffMinutes / 60);
      const mins = diffMinutes % 60;
      return {
        isLiveNow: false,
        isToday: true,
        days: 0,
        hours,
        mins,
        label: hours === 0 ? `Starts in ${mins}m this morning` : `Starts in ${hours}h ${mins}m this morning`,
      };
    }

    // 1c: Sunday afternoon after service (> 12:30 GMT) -> next Sunday
    const nextSunday = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 7,
      9, 0, 0, 0
    ));
    const diffMs = nextSunday.getTime() - now.getTime();
    const totalMins = Math.max(0, Math.floor(diffMs / 60000));
    const days = Math.floor(totalMins / (24 * 60));
    const hours = Math.floor((totalMins % (24 * 60)) / 60);
    const mins = totalMins % 60;

    return {
      isLiveNow: false,
      isToday: false,
      days,
      hours,
      mins,
      label: `${days}d ${hours}h until Next Sunday`,
    };
  }

  // Case 2: Monday (1) through Saturday (6)
  const daysUntilSunday = 7 - currentUtcDay;
  const targetSunday = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + daysUntilSunday,
    9, 0, 0, 0
  ));

  const diffMs = targetSunday.getTime() - now.getTime();
  const totalMins = Math.max(0, Math.floor(diffMs / 60000));
  const days = Math.floor(totalMins / (24 * 60));
  const hours = Math.floor((totalMins % (24 * 60)) / 60);
  const mins = totalMins % 60;

  return {
    isLiveNow: false,
    isToday: false,
    days,
    hours,
    mins,
    label: `${days}d ${hours}h until Sunday Encounter`,
  };
}
