// calculator.js
// A simple CLI calculator using process.argv
// Usage: node calculator.js add 10 5

// process.argv holds all command line arguments
// process.argv[0] = node, process.argv[1] = calculator.js
// So our actual inputs start from index 2
const operation = process.argv[2]; // e.g. "add"
const num1 = Number(process.argv[3]); // first number
const num2 = Number(process.argv[4]); // second number

// Show error if user didn't provide all arguments
if (!operation || isNaN(num1) || isNaN(num2)) {
  console.log("Please provide an operation and two numbers.");
  console.log("Example: node calculator.js add 10 5");
  process.exit(1);
}

// Perform the chosen operation
if (operation === "add") {
  console.log(num1 + " + " + num2 + " = " + (num1 + num2));

} else if (operation === "subtract") {
  console.log(num1 + " - " + num2 + " = " + (num1 - num2));

} else if (operation === "multiply") {
  console.log(num1 + " x " + num2 + " = " + (num1 * num2));

} else if (operation === "divide") {
  if (num2 === 0) {
    console.log("Error: Cannot divide by zero.");
  } else {
    console.log(num1 + " / " + num2 + " = " + (num1 / num2));
  }

} else {
  console.log("Unknown operation: " + operation);
  console.log("Valid options: add, subtract, multiply, divide");
}
