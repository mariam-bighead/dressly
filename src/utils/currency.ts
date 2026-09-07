export const CURRENCY_SYMBOL = '₦';
export const CURRENCY_CODE = 'NGN';

/**
 * Formats a numeric amount as Nigerian Naira (NGN)
 * e.g. 185000 -> ₦185,000
 */
export function formatNaira(amount: number): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₦0';
  }
  return `₦${Math.round(amount).toLocaleString('en-NG')}`;
}

/**
 * Formats a numeric amount with up to 2 decimal places if needed
 */
export function formatNairaExact(amount: number): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₦0.00';
  }
  return `₦${amount.toLocaleString('en-NG', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}
