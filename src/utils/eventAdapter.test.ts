import { describe, it, expect } from 'vitest';
import {
  normalizeFirestoreEvent,
  toFirestoreEvent,
  isUpcomingEvent,
  sortEventsChronologically,
  formatEventDate,
} from './eventAdapter';
import { EventItem } from '../data/churchData';

describe('eventAdapter utility (TDD)', () => {
  describe('normalizeFirestoreEvent', () => {
    it('normalizes a standard Firestore event document from ricgcw', () => {
      const firestoreDoc = {
        id: 'fire-conf-2026',
        name: 'Prophetic Impartation Conference',
        date: '2026-11-20',
        time: '6:00 PM',
        location: 'Mallam Headquarters',
        category: 'Conference',
        description: '3 Days of supernatural power and prophetic direction.',
        isFeatured: true,
      };

      const result = normalizeFirestoreEvent(firestoreDoc);

      expect(result.id).toBe('fire-conf-2026');
      expect(result.title).toBe('Prophetic Impartation Conference');
      expect(result.date).toBe('Nov 20, 2026');
      expect(result.time).toBe('6:00 PM');
      expect(result.location).toBe('Mallam Headquarters');
      expect(result.category).toBe('Conference');
      expect(result.description).toBe('3 Days of supernatural power and prophetic direction.');
      expect(result.isFeatured).toBe(true);
    });

    it('handles Firestore Timestamp objects with toDate()', () => {
      const mockTimestamp = {
        toDate: () => new Date('2026-12-31T20:00:00Z'),
      };
      const firestoreDoc = {
        id: 'crossover-2026',
        title: 'Crossover Revival Night',
        date: mockTimestamp,
        time: '8:00 PM',
        location: 'All Sanctuaries',
      };

      const result = normalizeFirestoreEvent(firestoreDoc);

      expect(result.id).toBe('crossover-2026');
      expect(result.title).toBe('Crossover Revival Night');
      expect(result.date).toContain('2026');
    });

    it('provides fallbacks for missing optional properties', () => {
      const firestoreDoc = {
        id: 'sunday-service',
        name: 'Glorious Sunday Service',
      };

      const result = normalizeFirestoreEvent(firestoreDoc);

      expect(result.id).toBe('sunday-service');
      expect(result.title).toBe('Glorious Sunday Service');
      expect(result.time).toBe('09:00 AM');
      expect(result.location).toContain('RICGCW');
      expect(result.category).toBe('Worship Service');
      expect(result.isFeatured).toBe(false);
    });
  });

  describe('toFirestoreEvent', () => {
    it('converts an EventItem into a Firestore document structure', () => {
      const eventItem: EventItem = {
        id: 'custom-event-1',
        title: 'Youth Holy Ghost Rally',
        date: '2026-10-15',
        time: '4:00 PM',
        location: 'Kokrobitey Sanctuary',
        category: 'Youth Ministry',
        description: 'Empowering next-gen leaders in faith and prayer.',
        isFeatured: false,
      };

      const firestoreData = toFirestoreEvent(eventItem);

      expect(firestoreData.name).toBe('Youth Holy Ghost Rally');
      expect(firestoreData.date).toBe('2026-10-15');
      expect(firestoreData.time).toBe('4:00 PM');
      expect(firestoreData.location).toBe('Kokrobitey Sanctuary');
      expect(firestoreData.category).toBe('Youth Ministry');
      expect(firestoreData.description).toBe('Empowering next-gen leaders in faith and prayer.');
    });
  });

  describe('isUpcomingEvent', () => {
    it('identifies future event dates correctly', () => {
      const futureDate = '2099-12-31';
      expect(isUpcomingEvent(futureDate)).toBe(true);
    });

    it('identifies past event dates correctly', () => {
      const pastDate = '2010-01-01';
      expect(isUpcomingEvent(pastDate)).toBe(false);
    });
  });

  describe('sortEventsChronologically', () => {
    it('sorts a list of events from earliest to latest date', () => {
      const events: EventItem[] = [
        {
          id: '3',
          title: 'Dec Event',
          date: '2026-12-15',
          time: '10:00 AM',
          location: 'HQ',
          category: 'Service',
          description: '',
        },
        {
          id: '1',
          title: 'Jan Event',
          date: '2026-01-10',
          time: '10:00 AM',
          location: 'HQ',
          category: 'Service',
          description: '',
        },
        {
          id: '2',
          title: 'Jun Event',
          date: '2026-06-20',
          time: '10:00 AM',
          location: 'HQ',
          category: 'Service',
          description: '',
        },
      ];

      const sorted = sortEventsChronologically(events);
      expect(sorted[0].id).toBe('1');
      expect(sorted[1].id).toBe('2');
      expect(sorted[2].id).toBe('3');
    });
  });

  describe('formatEventDate', () => {
    it('formats ISO dates into readable church date format', () => {
      const formatted = formatEventDate('2026-04-12');
      expect(formatted).toBe('Apr 12, 2026');
    });

    it('preserves already formatted date strings', () => {
      const formatted = formatEventDate('Every Sunday');
      expect(formatted).toBe('Every Sunday');
    });
  });
});
