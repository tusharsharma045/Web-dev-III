// Input validation middleware for Product endpoints

const validateCreateProduct = (req, res, next) => {
  const { name, sku, category, price, quantity, reorderLevel, supplier } = req.body;
  const errors = [];

  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('Product name is required and must be non-empty');
  }

  if (!sku || typeof sku !== 'string' || !sku.trim()) {
    errors.push('SKU is required and must be non-empty');
  }

  if (!category || typeof category !== 'string' || !category.trim()) {
    errors.push('Category is required and must be non-empty');
  }

  if (price === undefined || price === null || typeof price !== 'number' || price < 0) {
    errors.push('Price is required and must be a non-negative number');
  }

  if (quantity !== undefined && (typeof quantity !== 'number' || quantity < 0)) {
    errors.push('Quantity must be a non-negative number');
  }

  if (reorderLevel !== undefined && (typeof reorderLevel !== 'number' || reorderLevel < 0)) {
    errors.push('Reorder level must be a non-negative number');
  }

  if (!supplier || typeof supplier !== 'string' || !supplier.trim()) {
    errors.push('Supplier is required and must be non-empty');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

const validateStockAdjustment = (req, res, next) => {
  const { change } = req.body;

  if (change === undefined || typeof change !== 'number' || isNaN(change)) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a valid numeric change amount'
    });
  }

  if (change === 0) {
    return res.status(400).json({
      success: false,
      message: 'Stock change amount must not be zero'
    });
  }

  next();
};

module.exports = {
  validateCreateProduct,
  validateStockAdjustment
};
