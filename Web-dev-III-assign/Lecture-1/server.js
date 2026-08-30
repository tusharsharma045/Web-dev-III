// server.js - Basic HTTP Server using the http Module
// Web Dev III - Lab Assignment 1
// Handles multiple routes: /, /about, /contact, and 404 for unknown routes.
// Usage: node server.js

const http = require("http");
const logger = require("./modules/logger");

const PORT = 3000;
const HOST = "127.0.0.1";

// ── Route Handler ──────────────────────────────────────────────
/**
 * Sends an HTML response with a given status code and body content.
 */
function sendResponse(res, statusCode, title, bodyContent, bgColor = "#1a1a2e") {
  res.writeHead(statusCode, { "Content-Type": "text/html" });
  res.end(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Smart Utility Toolkit</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: ${bgColor};
      color: #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .card {
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 16px;
      padding: 40px 60px;
      text-align: center;
      max-width: 600px;
      backdrop-filter: blur(10px);
    }
    h1 { font-size: 2.5rem; margin-bottom: 12px; color: #a78bfa; }
    p  { font-size: 1.1rem; line-height: 1.7; color: #c4b5fd; }
    .badge {
      display: inline-block;
      background: #7c3aed;
      color: #fff;
      padding: 4px 14px;
      border-radius: 999px;
      font-size: 0.8rem;
      margin-top: 20px;
    }
    nav { margin-top: 28px; }
    nav a {
      color: #818cf8;
      text-decoration: none;
      margin: 0 12px;
      font-size: 0.95rem;
      transition: color 0.2s;
    }
    nav a:hover { color: #a78bfa; text-decoration: underline; }
  </style>
</head>
<body>
  <div class="card">
    ${bodyContent}
    <nav>
      <a href="/">Home</a>
      <a href="/about">About</a>
      <a href="/contact">Contact</a>
    </nav>
  </div>
</body>
</html>`);
}

// ── Create HTTP Server ─────────────────────────────────────────
const server = http.createServer((req, res) => {
  const url    = req.url;
  const method = req.method;

  // Log incoming request
  logger.info(`${method} ${url}`);

  switch (url) {
    case "/":
      sendResponse(
        res,
        200,
        "Home",
        `<h1>🏠 Welcome!</h1>
         <p>Welcome to the <strong>Smart Utility Toolkit</strong> — a Node.js backend demo built for Web Dev III, Lab Assignment 1.</p>
         <span class="badge">Status: 200 OK</span>`,
        "#0f0f1a"
      );
      logger.success("Served: Home page (200)");
      break;

    case "/about":
      sendResponse(
        res,
        200,
        "About",
        `<h1>📖 About</h1>
         <p>This toolkit showcases Node.js core modules: <strong>process</strong>, <strong>http</strong>, <strong>fs</strong>, and <strong>crypto</strong>. Built without any external npm packages.</p>
         <span class="badge">Status: 200 OK</span>`,
        "#0a1628"
      );
      logger.success("Served: About page (200)");
      break;

    case "/contact":
      sendResponse(
        res,
        200,
        "Contact",
        `<h1>📬 Contact</h1>
         <p>Reach out via your institution's learning portal or email your instructor for any queries related to this assignment.</p>
         <span class="badge">Status: 200 OK</span>`,
        "#0f1a0f"
      );
      logger.success("Served: Contact page (200)");
      break;

    default:
      sendResponse(
        res,
        404,
        "404 Not Found",
        `<h1>🚫 404</h1>
         <p>The route <code style="background:#2d1b69;padding:2px 8px;border-radius:4px;">${url}</code> does not exist on this server.</p>
         <span class="badge" style="background:#be123c;">Status: 404 Not Found</span>`,
        "#1a0a0a"
      );
      logger.warn(`404 Not Found: ${url}`);
      break;
  }
});

// ── Start Server ───────────────────────────────────────────────
server.listen(PORT, HOST, () => {
  logger.success(`Server running at http://${HOST}:${PORT}`);
  console.log("\x1b[36m%s\x1b[0m", "\nAvailable Routes:");
  console.log("  GET /         → Home page");
  console.log("  GET /about    → About page");
  console.log("  GET /contact  → Contact page");
  console.log("  GET /other    → 404 Error page");
  console.log("\nPress Ctrl+C to stop the server.\n");
});
