// lib/currency.ts

// Formats a number into Indian Rupees (INR) with Indian numbering system (e.g., 1,00,000)
export function formatIndianRupee(amount: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(amount);
}

// Formats a number into a compact Indian Rupee representation (e.g., ₹1L, ₹1Cr)
export function formatIndianRupeeCompact(amount: number): string {
  if (amount >= 10000000) { // Crore
    return `₹${(amount / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} Cr`;
  }
  if (amount >= 100000) { // Lakh
    return `₹${(amount / 100000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} L`;
  }
  return formatIndianRupee(amount);
}

// Converts a string input (e.g., "1,00,000") to a number
export function parseIndianRupee(input: string): number {
  const cleanedInput = input.replace(/₹|,/g, '').trim();
  return parseFloat(cleanedInput);
}

// Validates if a string is a valid Indian Rupee amount format
export function isValidIndianRupeeFormat(input: string): boolean {
  const regex = /^(₹)?\s*\d{1,3}(,\d{2})*(\.\d{1,2})?$/;
  return regex.test(input);
}