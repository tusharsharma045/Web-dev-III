// useModules.js
// This file shows how to use custom modules with require()
// We import our isEven and logger modules from the modules/ folder

// Import our custom modules
const isEvenModule = require("./modules/isEven");
const logger = require("./modules/logger");

console.log("=== Custom Module Demo ===\n");

// --- Using the logger module ---
logger.info("Logger module is working!");
logger.success("Modules loaded successfully.");

// --- Using the isEven module ---
console.log("\n--- Checking Even or Odd ---");

var numbers = [1, 2, 3, 4, 5, 6];

for (var i = 0; i < numbers.length; i++) {
  var num = numbers[i];
  var label = isEvenModule.getEvenOddLabel(num);
  console.log(num + " is " + label);
}

// --- Testing isEven and isOdd directly ---
console.log("\n--- Direct Function Tests ---");
console.log("isEven(10) =", isEvenModule.isEven(10));  // true
console.log("isOdd(7)   =", isEvenModule.isOdd(7));    // true
console.log("isEven(3)  =", isEvenModule.isEven(3));   // false

logger.success("Module demo complete!");
