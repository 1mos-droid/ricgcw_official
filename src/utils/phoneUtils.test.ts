import { describe, it, expect } from 'vitest';
import {
  normalizeGhanaPhone,
  sanitizeChurchPhone,
  toWhatsAppUrl,
  toTelUrl,
  toLocalDigits,
  toInternationalDisplay,
  toLocalMoMoDisplay,
  OFFICIAL_GHANA_PHONE_RAW,
  OFFICIAL_GHANA_PHONE_LOCAL,
  OFFICIAL_GHANA_PHONE_INTL,
} from './phoneUtils';

describe('phoneUtils (Ghana Phone Formatter)', () => {
  it('normalizes canonical 0244857403 formats correctly', () => {
    expect(normalizeGhanaPhone('0244857403')).toBe('233244857403');
    expect(normalizeGhanaPhone('024 485 7403')).toBe('233244857403');
    expect(normalizeGhanaPhone('+233 24 485 7403')).toBe('233244857403');
    expect(normalizeGhanaPhone('+233244857403')).toBe('233244857403');
    expect(normalizeGhanaPhone('+233 024 485 7403')).toBe('233244857403');
  });

  it('auto-heals historical typo variants to the official 0244857403 number', () => {
    expect(normalizeGhanaPhone('+233 244 485 7403')).toBe('233244857403');
    expect(normalizeGhanaPhone('+2332444857403')).toBe('233244857403');
    expect(normalizeGhanaPhone('+233 24 448 5740')).toBe('233244857403');
    expect(normalizeGhanaPhone('0244485740')).toBe('233244857403');
    expect(normalizeGhanaPhone('')).toBe(OFFICIAL_GHANA_PHONE_RAW);
    expect(normalizeGhanaPhone(undefined)).toBe(OFFICIAL_GHANA_PHONE_RAW);
  });

  it('preserves other valid Ghanaian numbers without altering digits', () => {
    expect(normalizeGhanaPhone('0241234567')).toBe('233241234567');
    expect(toLocalDigits('0241234567')).toBe('0241234567');
  });

  it('sanitizes legacy persisted phone strings cleanly', () => {
    expect(sanitizeChurchPhone('+233 244 485 7403')).toBe(OFFICIAL_GHANA_PHONE_INTL);
    expect(sanitizeChurchPhone('0244485740')).toBe(OFFICIAL_GHANA_PHONE_INTL);
    expect(sanitizeChurchPhone('+233 24 485 7403')).toBe('+233 24 485 7403');
  });

  it('generates correct wa.me link without plus or spaces', () => {
    const url = toWhatsAppUrl('024 485 7403');
    expect(url).toBe('https://wa.me/233244857403');

    const urlWithMsg = toWhatsAppUrl('024 485 7403', 'Hello Pastor, I have a question');
    expect(urlWithMsg).toBe('https://wa.me/233244857403?text=Hello%20Pastor%2C%20I%20have%20a%20question');
  });

  it('generates correct tel: link', () => {
    expect(toTelUrl('024 485 7403')).toBe('tel:+233244857403');
    expect(toTelUrl('+233 244 485 7403')).toBe('tel:+233244857403');
  });

  it('formats international, local MoMo, and 10-digit copy formats cleanly', () => {
    expect(toInternationalDisplay('0244857403')).toBe('+233 24 485 7403');
    expect(toInternationalDisplay('+2332444857403')).toBe('+233 24 485 7403');
    expect(toLocalMoMoDisplay('+233 24 485 7403')).toBe('024 485 7403');
    expect(toLocalMoMoDisplay('233244857403')).toBe('024 485 7403');
    expect(toLocalDigits('+233 24 485 7403')).toBe(OFFICIAL_GHANA_PHONE_LOCAL);
  });
});
