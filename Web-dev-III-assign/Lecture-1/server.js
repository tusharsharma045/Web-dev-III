// server.js
// A basic HTTP server using Node.js built-in http module
// Usage: node server.js  → then open http://localhost:3000 in browser

// Import the built-in http module
const http = require("http");

const PORT = 3000; // the server will run on port 3000

// Create the server
// req = the incoming request (what the user asked for)
// res = the response we send back
const server = http.createServer(function(req, res) {

  // req.url tells us which route the user visited
  const url = req.url;

  console.log("Someone visited: " + url);

  if (url === "/") {
    // Home page
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome to the Home Page!</h1><p><a href='/about'>About</a> | <a href='/contact'>Contact</a></p>");

  } else if (url === "/about") {
    // About page
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>About Page</h1><p>This is a simple Node.js HTTP server.</p><p><a href='/'>Home</a></p>");

  } else if (url === "/contact") {
    // Contact page
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Contact Page</h1><p>Email us at: hello@example.com</p><p><a href='/'>Home</a></p>");

  } else {
    // 404 - Page not found
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Page Not Found</h1><p>The page <b>" + url + "</b> does not exist.</p><p><a href='/'>Go Home</a></p>");
  }

});

// Start listening for requests
server.listen(PORT, function() {
  console.log("Server is running at http://localhost:" + PORT);
  console.log("Routes: /  |  /about  |  /contact");
  console.log("Press Ctrl+C to stop.");
});
