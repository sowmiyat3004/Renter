// lib/localization.ts

// Default Indian locale settings
export const INDIAN_LOCALE = 'en-IN';
export const INDIAN_TIMEZONE = 'Asia/Kolkata';
export const INDIAN_CURRENCY_CODE = 'INR';
export const INDIAN_CURRENCY_SYMBOL = '₹';

// Date formatting (DD/MM/YYYY)
export function formatIndianDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(INDIAN_LOCALE, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: INDIAN_TIMEZONE,
    ...options,
  }).format(d);
}

// Time formatting (HH:MM AM/PM)
export function formatIndianTime(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(INDIAN_LOCALE, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: INDIAN_TIMEZONE,
    ...options,
  }).format(d);
}

// Phone number formatting (e.g., +91 98765 43210)
export function formatIndianPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, ''); // Remove non-digits
  if (cleaned.length === 10) {
    return `+91 ${cleaned.substring(0, 5)} ${cleaned.substring(5)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+${cleaned.substring(0, 2)} ${cleaned.substring(2, 7)} ${cleaned.substring(7)}`;
  }
  return phoneNumber; // Return as is if not a standard 10-digit Indian number
}

// Address formatting (example: 123, Main Street, Bandra West, Mumbai, Maharashtra - 400050)
export function formatIndianAddress(
  address: { street?: string; city: string; state: string; pincode?: string; country?: string }
): string {
  const parts = [];
  if (address.street) parts.push(address.street);
  parts.push(address.city);
  parts.push(address.state);
  if (address.pincode) parts.push(address.pincode);
  if (address.country && address.country !== 'India') parts.push(address.country); // Only add if not India

  return parts.join(', ');
}