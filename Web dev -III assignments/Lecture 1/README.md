# 🧰 Smart Utility Toolkit

**Lab Assignment 1 | Web Dev III — Node.js & Express Backend**
**Unit:** Unit–1 | **Marks:** 2.5 | **Mode:** 100% In-Class (Lab Practical)

---

## 📋 Overview

The **Smart Utility Toolkit** is a hands-on lab assignment that explores Node.js core modules without using any external npm packages or frameworks. It covers:

- Command-line interaction via `process.argv`
- Custom modular programming with `module.exports` / `require()`
- HTTP server creation using the `http` module
- File CRUD operations using the `fs` module
- Secure randomness with the `crypto` module

---

## 📁 Project Structure

```
smart-utility-toolkit/
├── index.js           ← Entry point / Toolkit overview
├── calculator.js      ← CLI Calculator (process.argv)
├── server.js          ← HTTP Server (http module)
├── fileManager.js     ← File CRUD Manager (fs module)
├── diceRoller.js      ← Crypto Dice Roller (crypto module)
├── useModules.js      ← Custom module usage demo
├── dice_history.txt   ← Auto-generated dice roll history
├── package.json
├── .gitignore
│
└── modules/
    ├── isEven.js      ← Custom isEven/isOdd module
    └── logger.js      ← Custom Logger with timestamps & colors
```

---

## ⚙️ Technology Stack

| Technology | Purpose |
|------------|---------|
| Node.js    | JavaScript runtime environment |
| JavaScript (ES6) | Backend logic & modules |
| Terminal / CLI | Running Node.js programs |
| `process`  | CLI argument handling |
| `http`     | HTTP server creation |
| `fs`       | File system operations |
| `crypto`   | Cryptographically secure randomness |

> ⚠️ **No external npm packages used.** Only Node.js built-in core modules.

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or above recommended)

### Install & Setup

```bash
git clone https://github.com/<your-username>/Web-dev-III.git
cd "Web dev -III assignments/Lecture 1"
npm install   # No external deps, just sets up package.json
```

---

## 🧪 Running the Utilities

### 1. 🏠 Entry Point Overview
```bash
node index.js
```
Lists all available utilities.

---

### 2. 🧮 CLI Calculator (`calculator.js`)
Uses `process.argv` to perform arithmetic from the command line.

```bash
node calculator.js add 10 5        # → 10 + 5 = 15
node calculator.js subtract 20 8   # → 20 - 8 = 12
node calculator.js multiply 7 8    # → 7 × 8 = 56
node calculator.js divide 100 4    # → 100 ÷ 4 = 25
node calculator.js modulus 17 5    # → 17 % 5 = 2
node calculator.js power 2 10      # → 2 ^ 10 = 1024
```

**Supported operations:** `add`, `subtract`, `multiply`, `divide`, `modulus`, `power`

---

### 3. 📦 Custom Modules (`modules/`)

#### `modules/isEven.js`
```js
const { isEven, isOdd, getEvenOddLabel, filterEven, filterOdd } = require('./modules/isEven');

isEven(4);              // → true
isOdd(7);               // → true
getEvenOddLabel(10);    // → "Even"
filterEven([1,2,3,4]);  // → [2, 4]
```

#### `modules/logger.js`
```js
const logger = require('./modules/logger');

logger.info('Server started');
logger.success('File created!');
logger.warn('File already exists');
logger.error('Connection refused');
logger.debug('Checking variable...');
```

Output includes timestamps and ANSI color codes:
```
[2025-08-30 14:35:22] [INFO   ] Server started
[2025-08-30 14:35:22] [SUCCESS] File created!
```

#### Run the module demo:
```bash
node useModules.js
```

---

### 4. 🌐 HTTP Server (`server.js`)
```bash
node server.js
```

Server runs at `http://127.0.0.1:3000`

| Route     | Response                 | Status |
|-----------|--------------------------|--------|
| `/`       | Welcome page             | 200    |
| `/about`  | About page               | 200    |
| `/contact`| Contact page             | 200    |
| `/*`      | 404 Not Found            | 404    |

Test with your browser or Postman.

---

### 5. 📂 File Manager (`fileManager.js`)
```bash
node fileManager.js
```

Demonstrates a full CRUD cycle on `demo.txt`:
1. **Create** — `fs.writeFile()`
2. **Read** — `fs.readFile()`
3. **Update** — `fs.appendFile()`
4. **Delete** — `fs.unlink()`

All operations run asynchronously with proper error handling.

---

### 6. 🎲 Dice Roller (`diceRoller.js`)
```bash
node diceRoller.js          # Default: 5 rolls
node diceRoller.js 3        # Custom: 3 rolls
node diceRoller.js 10       # Custom: 10 rolls
```

- Uses `crypto.randomInt()` for cryptographically secure random values (1–6)
- Renders ASCII dice art in the terminal
- Displays roll summary (total, average, highest, lowest)
- **Bonus:** Saves roll history to `dice_history.txt`

Sample output:
```
Roll #1:
  ┌─────────┐
  │  ●   ●  │
  │    ●    │
  │  ●   ●  │
  └─────────┘
  Dice Rolled: 5
```

---

## 🌟 Bonus Features

| Feature | Description |
|---------|-------------|
| 🎨 ANSI Colors | All utilities use colored terminal output |
| 🕐 Timestamp Logs | Logger module includes date/time in every log |
| ➕ Extended Calculator | Supports 6 operations including modulus & power |
| 📜 Dice History | Rolls are saved to `dice_history.txt` automatically |

---

## 📊 Assignment Rubric

| Criteria | Marks |
|----------|-------|
| Functionality | 1.5 |
| Code Structure & Modules | 0.5 |
| Clean Code & Output | 0.5 |
| **Total** | **2.5** |

---

## 📚 Learning Outcomes

- ✅ How Node.js executes JavaScript outside the browser
- ✅ Using `process.argv` for CLI input
- ✅ Creating/reusing custom modules with `module.exports` and `require()`
- ✅ Building an HTTP server with routing using the `http` module
- ✅ Performing CRUD file operations with the `fs` module
- ✅ Generating secure random values with the `crypto` module
- ✅ Understanding synchronous vs asynchronous behavior

---

## 👨‍💻 Author

**Web Dev III — Lab Assignment 1**
Course: Node.js & Express Backend
