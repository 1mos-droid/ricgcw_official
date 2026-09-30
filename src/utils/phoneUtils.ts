/**
 * RICGCW Ghana Phone Number Formatting Utilities
 * Standardizes formatting for:
 * - WhatsApp API links (https://wa.me/233XXXXXXXXX without '+', spaces, or leading zero)
 * - Dial links (tel:+233XXXXXXXXX)
 * - Ghanaian Local Display (024 448 5740 - familiar for MTN MoMo)
 * - International Display (+233 24 448 5740)
 */

export const OFFICIAL_GHANA_PHONE_RAW = '233244485740';

/**
 * Normalizes any Ghana telephone input into a clean 12-digit international string: 233XXXXXXXXX
 */
export function normalizeGhanaPhone(phone?: string): string {
  if (!phone) return OFFICIAL_GHANA_PHONE_RAW;

  // Extract all digit characters
  let digits = phone.replace(/\D/g, '');

  // Handle known 13-digit typo with trailing extra digit (+2332444857403 -> 233244485740)
  if (digits.startsWith('233') && digits.length > 12) {
    digits = digits.substring(0, 12);
  }

  // Handle leading local zero (e.g., 0244485740 -> 233244485740)
  if (digits.startsWith('0') && digits.length === 10) {
    digits = '233' + digits.substring(1);
  }

  // If missing country code and length is 9 (e.g., 244485740)
  if (digits.length === 9) {
    digits = '233' + digits;
  }

  // Fallback to official number if invalid length
  if (digits.length !== 12 || !digits.startsWith('233')) {
    return digits || OFFICIAL_GHANA_PHONE_RAW;
  }

  return digits;
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
 * Formats an international phone number for human display: +233 24 448 5740
 */
export function toInternationalDisplay(phone?: string): string {
  const normalized = normalizeGhanaPhone(phone);
  if (normalized.length === 12 && normalized.startsWith('233')) {
    const code = normalized.slice(0, 3); // 233
    const prefix = normalized.slice(3, 5); // 24
    const part1 = normalized.slice(5, 8); // 448
    const part2 = normalized.slice(8, 12); // 5740
    return `+${code} ${prefix} ${part1} ${part2}`;
  }
  return phone || '+233 24 448 5740';
}

/**
 * Formats a phone number for local Ghanaian MoMo display: 024 448 5740
 */
export function toLocalMoMoDisplay(phone?: string): string {
  const normalized = normalizeGhanaPhone(phone);
  if (normalized.length === 12 && normalized.startsWith('233')) {
    const local = '0' + normalized.slice(3); // 0244485740
    const prefix = local.slice(0, 3); // 024
    const part1 = local.slice(3, 6); // 448
    const part2 = local.slice(6, 10); // 5740
    return `${prefix} ${part1} ${part2}`;
  }
  return '024 448 5740';
}
