// diceRoller.js
// Usage: node diceRoller.js [numberOfRolls]

const crypto = require("crypto");
const fs     = require("fs");
const path   = require("path");
const logger = require("./modules/logger");

const colors = {
  reset:   "\x1b[0m",
  bold:    "\x1b[1m",
  red:     "\x1b[31m",
  green:   "\x1b[32m",
  yellow:  "\x1b[33m",
  cyan:    "\x1b[36m",
  magenta: "\x1b[35m",
};

const DICE_ART = {
  1: ["┌─────────┐", "│         │", "│    ●    │", "│         │", "└─────────┘"],
  2: ["┌─────────┐", "│  ●      │", "│         │", "│      ●  │", "└─────────┘"],
  3: ["┌─────────┐", "│  ●      │", "│    ●    │", "│      ●  │", "└─────────┘"],
  4: ["┌─────────┐", "│  ●   ●  │", "│         │", "│  ●   ●  │", "└─────────┘"],
  5: ["┌─────────┐", "│  ●   ●  │", "│    ●    │", "│  ●   ●  │", "└─────────┘"],
  6: ["┌─────────┐", "│  ●   ●  │", "│  ●   ●  │", "│  ●   ●  │", "└─────────┘"],
};

function secureRandomInt(min, max) {
  return crypto.randomInt(min, max + 1);
}

function rollDice() {
  return secureRandomInt(1, 6);
}

function printDice(face) {
  const art = DICE_ART[face];
  art.forEach((line) => console.log("  " + colors.yellow + line + colors.reset));
}

function saveRollHistory(rolls) {
  const historyFile = path.join(__dirname, "dice_history.txt");
  const timestamp   = new Date().toLocaleString();
  const entry       = `[${timestamp}] Rolls: ${rolls.join(", ")} | Total: ${rolls.reduce((a, b) => a + b, 0)}\n`;

  fs.appendFile(historyFile, entry, "utf8", (err) => {
    if (err) {
      logger.error(`Could not save roll history: ${err.message}`);
    } else {
      logger.info(`Roll history saved to: dice_history.txt`);
    }
  });
}

console.log(colors.cyan + colors.bold);
console.log("╔══════════════════════════════════════╗");
console.log("║    🎲  Crypto Dice Roller  🎲         ║");
console.log("║    Web Dev III - Lab Assignment 1    ║");
console.log("╚══════════════════════════════════════╝");
console.log(colors.reset);

const numberOfRolls = parseInt(process.argv[2]) || 5;

if (isNaN(numberOfRolls) || numberOfRolls < 1 || numberOfRolls > 20) {
  logger.error("Please provide a valid number of rolls between 1 and 20.");
  logger.info("Usage: node diceRoller.js [1-20]");
  process.exit(1);
}

logger.info(`Rolling dice ${numberOfRolls} time(s) using crypto.randomInt()...\n`);

const rolls = [];

for (let i = 1; i <= numberOfRolls; i++) {
  const result = rollDice();
  rolls.push(result);

  console.log(colors.magenta + `Roll #${i}:` + colors.reset);
  printDice(result);
  console.log(`  Dice Rolled: ${colors.green + colors.bold}${result}${colors.reset}\n`);
}

const total   = rolls.reduce((sum, val) => sum + val, 0);
const average = (total / rolls.length).toFixed(2);
const highest = Math.max(...rolls);
const lowest  = Math.min(...rolls);

console.log(colors.cyan + "── Roll Summary ─────────────────────────────" + colors.reset);
console.log(`  All rolls  : [${rolls.join(", ")}]`);
console.log(`  Total      : ${colors.yellow}${total}${colors.reset}`);
console.log(`  Average    : ${colors.yellow}${average}${colors.reset}`);
console.log(`  Highest    : ${colors.green}${highest}${colors.reset}`);
console.log(`  Lowest     : ${colors.red}${lowest}${colors.reset}`);
console.log(colors.cyan + "─────────────────────────────────────────────" + colors.reset + "\n");

saveRollHistory(rolls);
logger.success("Dice rolling session complete!");
