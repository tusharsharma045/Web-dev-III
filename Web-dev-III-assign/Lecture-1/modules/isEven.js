// isEven.js - Custom Module

function isEven(num) {
  if (typeof num !== "number" || isNaN(num)) {
    throw new Error(`isEven() expects a number, got: ${typeof num}`);
  }
  return num % 2 === 0;
}

function isOdd(num) {
  return !isEven(num);
}

function getEvenOddLabel(num) {
  return isEven(num) ? "Even" : "Odd";
}

function filterEven(arr) {
  return arr.filter(isEven);
}

function filterOdd(arr) {
  return arr.filter(isOdd);
}

module.exports = {
  isEven,
  isOdd,
  getEvenOddLabel,
  filterEven,
  filterOdd,
};
