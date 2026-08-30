// logger.js - Custom Logger Module with Timestamps and Colors
// Web Dev III - Lab Assignment 1
// This module provides a reusable logger with log levels and ANSI colored output.

// ANSI color codes
const colors = {
  reset:   "\x1b[0m",
  bold:    "\x1b[1m",
  red:     "\x1b[31m",
  green:   "\x1b[32m",
  yellow:  "\x1b[33m",
  blue:    "\x1b[34m",
  magenta: "\x1b[35m",
  cyan:    "\x1b[36m",
  white:   "\x1b[37m",
  gray:    "\x1b[90m",
};

/**
 * Returns the current timestamp in a readable format.
 * @returns {string} - e.g. "2025-08-30 14:35:22"
 */
function getTimestamp() {
  const now = new Date();
  const date = now.toLocaleDateString("en-CA");           // YYYY-MM-DD
  const time = now.toLocaleTimeString("en-US", { hour12: false }); // HH:MM:SS
  return `${date} ${time}`;
}

/**
 * Formats a log message with timestamp and log level.
 * @param {string} level  - Log level label (INFO, WARN, ERROR, DEBUG, SUCCESS)
 * @param {string} color  - ANSI color code
 * @param {string} message - The message to log
 */
function formatLog(level, color, message) {
  const timestamp = colors.gray + `[${getTimestamp()}]` + colors.reset;
  const levelTag  = color + colors.bold + `[${level}]` + colors.reset;
  console.log(`${timestamp} ${levelTag} ${message}`);
}

// ── Public Logger API ──────────────────────────────────────────

/** Log an informational message (blue) */
function info(message) {
  formatLog("INFO   ", colors.blue, message);
}

/** Log a warning message (yellow) */
function warn(message) {
  formatLog("WARN   ", colors.yellow, message);
}

/** Log an error message (red) */
function error(message) {
  formatLog("ERROR  ", colors.red, message);
}

/** Log a debug message (magenta) */
function debug(message) {
  formatLog("DEBUG  ", colors.magenta, message);
}

/** Log a success message (green) */
function success(message) {
  formatLog("SUCCESS", colors.green, message);
}

/** Log a plain message without a level (cyan) */
function log(message) {
  formatLog("LOG    ", colors.cyan, message);
}

// Export using module.exports
module.exports = {
  info,
  warn,
  error,
  debug,
  success,
  log,
  getTimestamp,
};
