import { describe, it, expect } from 'vitest';
import {
  normalizeGhanaPhone,
  toWhatsAppUrl,
  toTelUrl,
  toInternationalDisplay,
  toLocalMoMoDisplay,
  OFFICIAL_GHANA_PHONE_RAW,
} from './phoneUtils';

describe('phoneUtils (Ghana Phone Formatter)', () => {
  it('normalizes various phone input formats correctly', () => {
    // Standard local format with leading 0
    expect(normalizeGhanaPhone('0244485740')).toBe('233244485740');
    expect(normalizeGhanaPhone('024 448 5740')).toBe('233244485740');

    // Standard international format with +
    expect(normalizeGhanaPhone('+233 24 448 5740')).toBe('233244485740');
    expect(normalizeGhanaPhone('+233244485740')).toBe('233244485740');

    // Typo format with trailing 13th digit (from historical bug)
    expect(normalizeGhanaPhone('+233 244 485 7403')).toBe('233244485740');
    expect(normalizeGhanaPhone('+2332444857403')).toBe('233244485740');

    // Empty or undefined fallback
    expect(normalizeGhanaPhone('')).toBe(OFFICIAL_GHANA_PHONE_RAW);
    expect(normalizeGhanaPhone(undefined)).toBe(OFFICIAL_GHANA_PHONE_RAW);
  });

  it('generates correct wa.me link without plus or spaces', () => {
    const url = toWhatsAppUrl('024 448 5740');
    expect(url).toBe('https://wa.me/233244485740');

    const urlWithMsg = toWhatsAppUrl('024 448 5740', 'Hello Pastor, I have a question');
    expect(urlWithMsg).toBe('https://wa.me/233244485740?text=Hello%20Pastor%2C%20I%20have%20a%20question');
  });

  it('generates correct tel: link', () => {
    expect(toTelUrl('024 448 5740')).toBe('tel:+233244485740');
    expect(toTelUrl('+233 244 485 7403')).toBe('tel:+233244485740');
  });

  it('formats international display cleanly', () => {
    expect(toInternationalDisplay('0244485740')).toBe('+233 24 448 5740');
    expect(toInternationalDisplay('+2332444857403')).toBe('+233 24 448 5740');
  });

  it('formats local Ghanaian MoMo display cleanly', () => {
    expect(toLocalMoMoDisplay('+233 24 448 5740')).toBe('024 448 5740');
    expect(toLocalMoMoDisplay('233244485740')).toBe('024 448 5740');
  });
});
