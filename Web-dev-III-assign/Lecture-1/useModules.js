// useModules.js - Demonstrates Custom Module Reusability

const { isEven, isOdd, getEvenOddLabel, filterEven, filterOdd } = require("./modules/isEven");
const logger = require("./modules/logger");

console.log("\x1b[36m%s\x1b[0m", "=== Custom Module Demonstration ===\n");

logger.info("Starting custom module demonstration...");
logger.debug("Modules loaded: isEven.js, logger.js");

console.log("\n\x1b[33m--- isEven Module Demo ---\x1b[0m");

const testNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

testNumbers.forEach((num) => {
  const label = getEvenOddLabel(num);
  const emoji = isEven(num) ? "✅" : "❌";
  console.log(`  ${emoji} ${num} → ${label}`);
});

console.log("\n\x1b[33m--- Filtering Even & Odd Numbers ---\x1b[0m");

const evenNumbers = filterEven(testNumbers);
const oddNumbers  = filterOdd(testNumbers);

logger.success(`Even numbers from [${testNumbers}]: [${evenNumbers}]`);
logger.success(`Odd  numbers from [${testNumbers}]: [${oddNumbers}]`);

console.log("\n\x1b[33m--- Individual Function Tests ---\x1b[0m");

logger.info(`isEven(42)  → ${isEven(42)}`);
logger.info(`isOdd(17)   → ${isOdd(17)}`);
logger.info(`isEven(0)   → ${isEven(0)}`);
logger.info(`isOdd(1001) → ${isOdd(1001)}`);

console.log("\n\x1b[33m--- Error Handling Demo ---\x1b[0m");
try {
  isEven("hello");
} catch (err) {
  logger.error(`Caught expected error: ${err.message}`);
}

console.log("");
logger.success("Module demonstration complete!");
