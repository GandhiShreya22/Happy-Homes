/**
 * Formats a date string into "day shortMonth year" format (e.g., "17 Jun 2025").
 * @param {string | Date} date - The date string or Date object to format.
 * @returns {string} - The formatted date string or an empty string if the date is invalid.
 */
export const formatDateToGB = (date: string | Date): string => {
  if (!date) return '';

  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) return '';

  return parsedDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Formats an amount to INR currency format (e.g., "₹1,000.00").
 * @param {number} amount - The amount to format.
 * @returns {string} - The formatted amount in INR currency format.
 */
export const formatAmountToInrCurrency = (amount: number): string => {
  const options: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };

  return new Intl.NumberFormat('en-IN', options).format(amount || 0);
};
