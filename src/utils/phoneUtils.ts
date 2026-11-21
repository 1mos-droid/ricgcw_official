/**
 * RICGCW Ghana Phone Number Formatting Utilities
 * Standardizes formatting for:
 * - WhatsApp API links (https://wa.me/233XXXXXXXXX without '+', spaces, or leading zero)
 * - Dial links (tel:+233XXXXXXXXX)
 * - Ghanaian Local Display (024 485 7403 - familiar for MTN MoMo)
 * - Local 10-Digit Copy Format (0244857403)
 * - International Display (+233 24 485 7403)
 */

export const OFFICIAL_GHANA_PHONE_RAW = '233244857403';
export const OFFICIAL_GHANA_PHONE_LOCAL = '0244857403';
export const OFFICIAL_GHANA_PHONE_INTL = '+233 24 485 7403';

const LEGACY_PHONE_TYPOS = new Set([
  '2332444857403',
  '233244485740',
  '02444857403',
  '0244485740',
  '244485740',
  '2444857403',
]);

/**
 * Normalizes any Ghana telephone input into a clean 12-digit international string: 233XXXXXXXXX
 */
export function normalizeGhanaPhone(phone?: string): string {
  if (!phone) return OFFICIAL_GHANA_PHONE_RAW;

  // Extract all digit characters
  let digits = phone.replace(/\D/g, '');
  if (!digits || LEGACY_PHONE_TYPOS.has(digits)) {
    return OFFICIAL_GHANA_PHONE_RAW;
  }

  // Handle +233 024... (13 digits with redundant local zero after country code)
  if (digits.startsWith('2330') && digits.length === 13) {
    digits = '233' + digits.substring(4);
  }

  // Handle trailing extra digit after 233XXXXXXXXX
  if (digits.startsWith('233') && digits.length > 12) {
    digits = digits.substring(0, 12);
  }

  // Handle leading local zero (e.g., 0244857403 -> 233244857403)
  if (digits.startsWith('0') && digits.length === 10) {
    digits = '233' + digits.substring(1);
  }

  // If missing country code and length is 9 (e.g., 244857403)
  if (digits.length === 9) {
    digits = '233' + digits;
  }

  // Auto-heal historical typo even after prefix conversion (e.g., 0244485740 -> 233244485740)
  if (LEGACY_PHONE_TYPOS.has(digits)) {
    return OFFICIAL_GHANA_PHONE_RAW;
  }

  // Fallback to official number if invalid length
  if (digits.length !== 12 || !digits.startsWith('233')) {
    return digits || OFFICIAL_GHANA_PHONE_RAW;
  }

  return digits;
}

/**
 * Sanitizes any persisted church/branch phone string so stale database values
 * containing the historical digit typo resolve cleanly to '+233 24 485 7403'.
 */
export function sanitizeChurchPhone(phone?: string): string {
  if (!phone) return OFFICIAL_GHANA_PHONE_INTL;
  const digits = phone.replace(/\D/g, '');
  if (!digits || LEGACY_PHONE_TYPOS.has(digits)) {
    return OFFICIAL_GHANA_PHONE_INTL;
  }
  return phone;
}

/**
 * Formats a phone number for wa.me links: https://wa.me/233XXXXXXXXX
 */
export function toWhatsAppUrl(phone?: string, message?: string): string {
  const normalized = normalizeGhanaPhone(phone);
  const baseUrl = `https://wa.me/${normalized}`;
  if (!message || !message.trim()) {
    return baseUrl;
  }
  return `${baseUrl}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Formats a phone number for tel: links: tel:+233XXXXXXXXX
 */
export function toTelUrl(phone?: string): string {
  const normalized = normalizeGhanaPhone(phone);
  return `tel:+${normalized}`;
}

/**
 * Formats a phone number as compact 10-digit Ghanaian local string: 0244857403
 */
export function toLocalDigits(phone?: string): string {
  const normalized = normalizeGhanaPhone(phone);
  if (normalized.length === 12 && normalized.startsWith('233')) {
    return '0' + normalized.slice(3);
  }
  return OFFICIAL_GHANA_PHONE_LOCAL;
}

/**
 * Formats an international phone number for human display: +233 24 485 7403
 */
export function toInternationalDisplay(phone?: string): string {
  const normalized = normalizeGhanaPhone(phone);
  if (normalized.length === 12 && normalized.startsWith('233')) {
    const code = normalized.slice(0, 3); // 233
    const prefix = normalized.slice(3, 5); // 24
    const part1 = normalized.slice(5, 8); // 485
    const part2 = normalized.slice(8, 12); // 7403
    return `+${code} ${prefix} ${part1} ${part2}`;
  }
  return phone || OFFICIAL_GHANA_PHONE_INTL;
}

/**
 * Formats a phone number for local Ghanaian MoMo display: 024 485 7403
 */
export function toLocalMoMoDisplay(phone?: string): string {
  const normalized = normalizeGhanaPhone(phone);
  if (normalized.length === 12 && normalized.startsWith('233')) {
    const local = '0' + normalized.slice(3); // 0244857403
    const prefix = local.slice(0, 3); // 024
    const part1 = local.slice(3, 6); // 485
    const part2 = local.slice(6, 10); // 7403
    return `${prefix} ${part1} ${part2}`;
  }
  return '024 485 7403';
}
