// fileManager.js
// Usage: node fileManager.js

const fs     = require("fs");
const path   = require("path");
const logger = require("./modules/logger");

const FILE_PATH = path.join(__dirname, "demo.txt");

console.log("\x1b[36m%s\x1b[0m", "=== File Manager (fs Module Demo) ===\n");

function createFile() {
  logger.info("Creating file: demo.txt ...");
  const content = "Hello, Node.js! This file was created by the fs module.\nLine 2: File creation complete.\n";

  fs.writeFile(FILE_PATH, content, "utf8", (err) => {
    if (err) {
      logger.error(`Failed to create file: ${err.message}`);
      return;
    }
    logger.success(`File created successfully at: ${FILE_PATH}`);
    readFile();
  });
}

function readFile() {
  logger.info("Reading file: demo.txt ...");

  fs.readFile(FILE_PATH, "utf8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        logger.error("File not found! Make sure it exists before reading.");
      } else {
        logger.error(`Failed to read file: ${err.message}`);
      }
      return;
    }
    logger.success("File contents:");
    console.log("\x1b[90m────────────────────────────────\x1b[0m");
    console.log(data);
    console.log("\x1b[90m────────────────────────────────\x1b[0m");
    updateFile();
  });
}

function updateFile() {
  logger.info("Updating (appending to) file: demo.txt ...");
  const appendContent = `Line 3: File updated at ${new Date().toLocaleString()}.\nLine 4: fs.appendFile() works great!\n`;

  fs.appendFile(FILE_PATH, appendContent, "utf8", (err) => {
    if (err) {
      logger.error(`Failed to update file: ${err.message}`);
      return;
    }
    logger.success("File updated (appended) successfully!");
    logger.info("Reading updated file...");

    fs.readFile(FILE_PATH, "utf8", (readErr, data) => {
      if (readErr) {
        logger.error(`Failed to re-read file: ${readErr.message}`);
        return;
      }
      console.log("\x1b[90m────────────────────────────────\x1b[0m");
      console.log(data);
      console.log("\x1b[90m────────────────────────────────\x1b[0m");
      deleteFile();
    });
  });
}

function deleteFile() {
  logger.info("Deleting file: demo.txt ...");

  fs.unlink(FILE_PATH, (err) => {
    if (err) {
      if (err.code === "ENOENT") {
        logger.error("Cannot delete: File not found.");
      } else {
        logger.error(`Failed to delete file: ${err.message}`);
      }
      return;
    }
    logger.success("File deleted successfully!");
    logger.info("Verifying deletion...");

    fs.readFile(FILE_PATH, "utf8", (readErr) => {
      if (readErr && readErr.code === "ENOENT") {
        logger.warn("Confirmed: File no longer exists.");
      }
      console.log("");
      logger.success("=== File Manager Demo Complete! ===");
    });
  });
}

createFile();
