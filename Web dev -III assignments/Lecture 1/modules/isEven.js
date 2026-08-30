// isEven.js - Custom Module: isEven checker
// Web Dev III - Lab Assignment 1
// This module exports utility functions related to even/odd checking.

/**
 * Checks if a given number is even.
 * @param {number} num - The number to check.
 * @returns {boolean} - true if even, false if odd.
 */
function isEven(num) {
  if (typeof num !== "number" || isNaN(num)) {
    throw new Error(`isEven() expects a number, got: ${typeof num}`);
  }
  return num % 2 === 0;
}

/**
 * Checks if a given number is odd.
 * @param {number} num - The number to check.
 * @returns {boolean} - true if odd, false if even.
 */
function isOdd(num) {
  return !isEven(num);
}

/**
 * Returns "Even" or "Odd" label for a number.
 * @param {number} num - The number to check.
 * @returns {string} - "Even" or "Odd"
 */
function getEvenOddLabel(num) {
  return isEven(num) ? "Even" : "Odd";
}

/**
 * Filters and returns only even numbers from an array.
 * @param {number[]} arr - Array of numbers.
 * @returns {number[]} - Array of even numbers.
 */
function filterEven(arr) {
  return arr.filter(isEven);
}

/**
 * Filters and returns only odd numbers from an array.
 * @param {number[]} arr - Array of numbers.
 * @returns {number[]} - Array of odd numbers.
 */
function filterOdd(arr) {
  return arr.filter(isOdd);
}

// Export all functions using module.exports
module.exports = {
  isEven,
  isOdd,
  getEvenOddLabel,
  filterEven,
  filterOdd,
};
