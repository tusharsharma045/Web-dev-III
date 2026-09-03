// isEven.js
// A custom module that checks if a number is even or odd
// We export functions so other files can use them with require()

// Returns true if the number is even, false if odd
function isEven(num) {
  return num % 2 === 0;
}

// Returns true if the number is odd
function isOdd(num) {
  return num % 2 !== 0;
}

// Returns "Even" or "Odd" as a string
function getEvenOddLabel(num) {
  if (num % 2 === 0) {
    return "Even";
  } else {
    return "Odd";
  }
}

// Export all three functions so other files can use them
module.exports = {
  isEven,
  isOdd,
  getEvenOddLabel,
};
