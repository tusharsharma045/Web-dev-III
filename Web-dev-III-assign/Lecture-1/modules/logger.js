// logger.js - Custom Logger Module

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

function getTimestamp() {
  const now  = new Date();
  const date = now.toLocaleDateString("en-CA");
  const time = now.toLocaleTimeString("en-US", { hour12: false });
  return `${date} ${time}`;
}

function formatLog(level, color, message) {
  const timestamp = colors.gray + `[${getTimestamp()}]` + colors.reset;
  const levelTag  = color + colors.bold + `[${level}]` + colors.reset;
  console.log(`${timestamp} ${levelTag} ${message}`);
}

function info(message) {
  formatLog("INFO   ", colors.blue, message);
}

function warn(message) {
  formatLog("WARN   ", colors.yellow, message);
}

function error(message) {
  formatLog("ERROR  ", colors.red, message);
}

function debug(message) {
  formatLog("DEBUG  ", colors.magenta, message);
}

function success(message) {
  formatLog("SUCCESS", colors.green, message);
}

function log(message) {
  formatLog("LOG    ", colors.cyan, message);
}

module.exports = {
  info,
  warn,
  error,
  debug,
  success,
  log,
  getTimestamp,
};
