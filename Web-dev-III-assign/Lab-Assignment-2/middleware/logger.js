// middleware/logger.js
// Custom Logger Middleware to log HTTP request details (Method, URL, Status, Response Time)

const logger = (req, res, next) => {
  const start = Date.now();
  const timestamp = new Date().toISOString();
  const { method, originalUrl } = req;

  // Listen for response finish event to capture status code and duration
  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;
    console.log(`[${timestamp}] ${method} ${originalUrl} ${statusCode} - ${duration}ms`);
  });

  next();
};

module.exports = logger;
