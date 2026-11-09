const express = require('express');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request Logger Middleware
app.use(logger);

// Root Welcome Route
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Inventory and Data Management System REST API (Lab Assignment 3)',
    endpoints: {
      getAllProducts: 'GET /api/products',
      createProduct: 'POST /api/products',
      getProductById: 'GET /api/products/:id',
      updateProduct: 'PUT /api/products/:id',
      deleteProduct: 'DELETE /api/products/:id',
      adjustStock: 'PATCH /api/products/:id/stock',
      lowStockReport: 'GET /api/products/low-stock',
      categorySummary: 'GET /api/products/summary'
    }
  });
});

// Mount Product Routes
app.use('/api/products', productRoutes);

// 404 Route Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Cannot ${req.method} ${req.originalUrl} - Route not found`
  });
});

// Centralized Error Handler Middleware
app.use(errorHandler);

module.exports = app;
