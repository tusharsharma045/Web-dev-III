// calculator.js - CLI-Based Calculator using process.argv
// Web Dev III - Lab Assignment 1
// Usage: node calculator.js <operation> <num1> <num2>
// Example: node calculator.js add 10 5

const args = process.argv.slice(2); // Remove 'node' and 'calculator.js'

// ANSI Color codes for terminal output
const colors = {
  reset:  "\x1b[0m",
  red:    "\x1b[31m",
  green:  "\x1b[32m",
  yellow: "\x1b[33m",
  cyan:   "\x1b[36m",
  bold:   "\x1b[1m",
};

console.log(colors.cyan + "=== CLI Calculator ===" + colors.reset);

// Validate argument count
if (args.length < 3) {
  console.log(colors.red + "❌ Error: Not enough arguments." + colors.reset);
  console.log(colors.yellow + "Usage: node calculator.js <operation> <num1> <num2>" + colors.reset);
  console.log("Operations: add, subtract, multiply, divide, modulus, power");
  process.exit(1);
}

const operation = args[0].toLowerCase();
const num1 = parseFloat(args[1]);
const num2 = parseFloat(args[2]);

// Validate that inputs are numbers
if (isNaN(num1) || isNaN(num2)) {
  console.log(colors.red + "❌ Error: Please provide valid numbers." + colors.reset);
  process.exit(1);
}

let result;

// Perform the requested operation
switch (operation) {
  case "add":
    result = num1 + num2;
    console.log(colors.green + `✅ ${num1} + ${num2} = ${result}` + colors.reset);
    break;

  case "subtract":
    result = num1 - num2;
    console.log(colors.green + `✅ ${num1} - ${num2} = ${result}` + colors.reset);
    break;

  case "multiply":
    result = num1 * num2;
    console.log(colors.green + `✅ ${num1} × ${num2} = ${result}` + colors.reset);
    break;

  case "divide":
    if (num2 === 0) {
      console.log(colors.red + "❌ Error: Division by zero is not allowed." + colors.reset);
      process.exit(1);
    }
    result = num1 / num2;
    console.log(colors.green + `✅ ${num1} ÷ ${num2} = ${result}` + colors.reset);
    break;

  case "modulus":
    if (num2 === 0) {
      console.log(colors.red + "❌ Error: Modulus by zero is not allowed." + colors.reset);
      process.exit(1);
    }
    result = num1 % num2;
    console.log(colors.green + `✅ ${num1} % ${num2} = ${result}` + colors.reset);
    break;

  case "power":
    result = Math.pow(num1, num2);
    console.log(colors.green + `✅ ${num1} ^ ${num2} = ${result}` + colors.reset);
    break;

  default:
    console.log(colors.red + `❌ Error: Unknown operation "${operation}"` + colors.reset);
    console.log(colors.yellow + "Valid operations: add, subtract, multiply, divide, modulus, power" + colors.reset);
    process.exit(1);
}
