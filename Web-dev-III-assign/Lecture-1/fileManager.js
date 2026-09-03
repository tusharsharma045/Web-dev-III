// fileManager.js
// Shows how to Create, Read, Update, and Delete files using the fs module
// Usage: node fileManager.js

// Import built-in modules
const fs = require("fs");
const logger = require("./modules/logger");

const fileName = "demo.txt"; // the file we will work with

console.log("=== File Manager Demo ===\n");

// ── STEP 1: CREATE a file ──────────────────────────────────────
logger.info("Step 1: Creating file...");

fs.writeFile(fileName, "Hello! This file was created by Node.js.\n", function(err) {
  if (err) {
    logger.error("Could not create file: " + err.message);
    return;
  }
  logger.success("File created: " + fileName);

  // ── STEP 2: READ the file ────────────────────────────────────
  logger.info("Step 2: Reading file...");

  fs.readFile(fileName, "utf8", function(err, data) {
    if (err) {
      logger.error("Could not read file: " + err.message);
      return;
    }
    logger.success("File contents: " + data);

    // ── STEP 3: UPDATE the file (append more text) ─────────────
    logger.info("Step 3: Updating file (appending text)...");

    fs.appendFile(fileName, "This line was added later.\n", function(err) {
      if (err) {
        logger.error("Could not update file: " + err.message);
        return;
      }
      logger.success("File updated successfully!");

      // ── STEP 4: DELETE the file ───────────────────────────────
      logger.info("Step 4: Deleting file...");

      fs.unlink(fileName, function(err) {
        if (err) {
          logger.error("Could not delete file: " + err.message);
          return;
        }
        logger.success("File deleted successfully!");
        console.log("\n=== All 4 CRUD steps done! ===");
      });
    });
  });
});
