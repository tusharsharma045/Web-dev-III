// diceRoller.js
// A simple dice roller using the crypto module
// crypto.randomInt() gives us a secure random number
// Usage: node diceRoller.js

// Import the built-in crypto module
const crypto = require("crypto");

console.log("=== Dice Roller ===\n");

// Roll the dice 5 times using a loop
for (var i = 1; i <= 5; i++) {
  // crypto.randomInt(1, 7) gives a random number from 1 to 6
  var diceValue = crypto.randomInt(1, 7);
  console.log("Roll " + i + ": Dice Rolled = " + diceValue);
}

console.log("\nDone rolling!");
