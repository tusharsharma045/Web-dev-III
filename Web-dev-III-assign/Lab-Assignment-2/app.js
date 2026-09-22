// app.js
// Express Application Entry Point for Student Management REST API

const express = require('express');
const logger = require('./middleware/logger');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Built-in Middleware for JSON & URL-encoded parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Custom Logger Middleware
app.use(logger);

// 3. Root Welcome Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Student Management REST API (Lab Assignment 2)',
    endpoints: {
      getAllStudents: 'GET /students',
      getStudentById: 'GET /students/:id',
      createStudent: 'POST /students',
      updateStudent: 'PUT /students/:id',
      deleteStudent: 'DELETE /students/:id'
    }
  });
});

// 4. Register Modular Student Routes
app.use('/students', studentRoutes);

// 5. 404 Handler for Undefined Routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route '${req.originalUrl}' not found on this server.`
  });
});

// 6. Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack || err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Server if executed directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`=================================================`);
    console.log(`🚀 Student Management REST API Server is running`);
    console.log(`🌐 URL: http://localhost:${PORT}`);
    console.log(`📚 Base API Route: http://localhost:${PORT}/students`);
    console.log(`=================================================`);
  });
}

module.exports = app;
