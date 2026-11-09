const express = require('express');
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  adjustStock,
  deleteProduct,
  getLowStockReport,
  getCategorySummary
} = require('../controllers/productController');
const {
  validateCreateProduct,
  validateStockAdjustment
} = require('../middleware/validateProduct');

// Aggregation & Report routes (Must be registered before /:id routes)
router.get('/low-stock', getLowStockReport);
router.get('/summary', getCategorySummary);

// Collection routes
router.route('/')
  .get(getAllProducts)
  .post(validateCreateProduct, createProduct);

// Stock adjustment route
router.patch('/:id/stock', validateStockAdjustment, adjustStock);

// Single item CRUD routes
router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
