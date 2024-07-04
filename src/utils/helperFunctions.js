
/**
 * Calculates the percentage off between a minimum price and a comparison price.
 *
 * @param {number} minPrice - The minimum price of the product.
 * @param {number} comparePrice - The original comparison price of the product.
 * @returns {string} The percentage off, rounded to the nearest whole number, as a string.
 *
 * @example
 * // returns '20'
 * calculatePercentageOff(80, 100);
 *
 * @example
 * // returns '50'
 * calculatePercentageOff(50, 100);
 */

export const calculatePercentageOff = (minPrice, comparePrice) => {
  const percentageOff = ((comparePrice - minPrice) / comparePrice) * 100;
  return percentageOff.toFixed(0);
};
