// logger.js
// A custom logger module that prints messages with a timestamp
// Each log level has its own color so it's easy to read in the terminal

// These are ANSI color codes - they change text color in the terminal
const green  = "\x1b[32m";
const yellow = "\x1b[33m";
const red    = "\x1b[31m";
const blue   = "\x1b[34m";
const reset  = "\x1b[0m"; // resets back to default color

// Returns the current date and time as a string
function getTimestamp() {
  return new Date().toLocaleString();
}

// INFO - for general information (blue)
function info(message) {
  console.log(blue + "[INFO] " + getTimestamp() + " - " + message + reset);
}

// SUCCESS - when something works (green)
function success(message) {
  console.log(green + "[SUCCESS] " + getTimestamp() + " - " + message + reset);
}

// WARN - for warnings (yellow)
function warn(message) {
  console.log(yellow + "[WARN] " + getTimestamp() + " - " + message + reset);
}

// ERROR - when something goes wrong (red)
function error(message) {
  console.log(red + "[ERROR] " + getTimestamp() + " - " + message + reset);
}

// Export the functions so other files can use this logger
module.exports = {
  info,
  success,
  warn,
  error,
};
