const Product = require('../models/Product');

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Public
 */
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all products with filtering, sorting, and pagination
 * @route   GET /api/products
 * @access  Public
 */
const getAllProducts = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      order = 'desc',
      sortOrder,
      category,
      search,
      name,
      minPrice,
      maxPrice,
      supplier,
      inStock
    } = req.query;

    const query = {};

    // Filter by Category (case-insensitive exact match)
    if (category) {
      query.category = { $regex: new RegExp(`^${category.trim()}$`, 'i') };
    }

    // Filter by Supplier (case-insensitive match)
    if (supplier) {
      query.supplier = { $regex: new RegExp(supplier.trim(), 'i') };
    }

    // Search by Name or SKU
    const searchTerm = search || name;
    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm.trim(), $options: 'i' } },
        { sku: { $regex: searchTerm.trim(), $options: 'i' } }
      ];
    }

    // Price range filtering
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      if (minPrice !== undefined && !isNaN(minPrice)) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice !== undefined && !isNaN(maxPrice)) {
        query.price.$lte = Number(maxPrice);
      }
    }

    // In-Stock filtering
    if (inStock !== undefined) {
      if (inStock === 'true' || inStock === true) {
        query.quantity = { $gt: 0 };
      } else if (inStock === 'false' || inStock === false) {
        query.quantity = 0;
      }
    }

    // Pagination calculations
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    const sortDirection = (order === 'asc' || sortOrder === 'asc' || order === '1') ? 1 : -1;
    const sortObj = {};
    sortObj[sortBy] = sortDirection;

    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query).sort(sortObj).skip(skip).limit(limitNum)
    ]);

    const totalPages = Math.ceil(total / limitNum) || 1;

    return res.status(200).json({
      total,
      page: pageNum,
      totalPages,
      count: products.length,
      products
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with id of ${req.params.id}`
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update product details
 * @route   PUT /api/products/:id
 * @access  Public
 */
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with id of ${req.params.id}`
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Safely adjust product stock (restock or sale)
 * @route   PATCH /api/products/:id/stock
 * @access  Public
 */
const adjustStock = async (req, res, next) => {
  try {
    const { change } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with id of ${req.params.id}`
      });
    }

    const newQuantity = product.quantity + change;
    if (newQuantity < 0) {
      return res.status(400).json({
        success: false,
        message: `Insufficient stock for operation. Current stock: ${product.quantity}, requested change: ${change}`
      });
    }

    product.quantity = newQuantity;
    await product.save();

    return res.status(200).json({
      message: 'Stock updated',
      product
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Public
 */
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: `Product not found with id of ${req.params.id}`
      });
    }

    return res.status(200).json({
      message: 'Product deleted',
      id: product._id
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get low-stock alert report (quantity <= reorderLevel) using aggregation
 * @route   GET /api/products/low-stock
 * @access  Public
 */
const getLowStockReport = async (req, res, next) => {
  try {
    const lowStockItems = await Product.aggregate([
      {
        $match: {
          $expr: { $lte: ['$quantity', '$reorderLevel'] }
        }
      },
      {
        $addFields: {
          stockValue: { $multiply: ['$price', '$quantity'] },
          id: { $toString: '$_id' }
        }
      },
      {
        $sort: { quantity: 1 }
      }
    ]);

    return res.status(200).json({
      count: lowStockItems.length,
      lowStockItems
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Category-wise inventory summary using aggregation
 * @route   GET /api/products/summary
 * @access  Public
 */
const getCategorySummary = async (req, res, next) => {
  try {
    const summary = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          totalItems: { $sum: 1 },
          totalQuantity: { $sum: '$quantity' },
          totalStockValue: { $sum: { $multiply: ['$price', '$quantity'] } },
          avgPrice: { $avg: '$price' }
        }
      },
      {
        $addFields: {
          avgPrice: { $round: ['$avgPrice', 2] }
        }
      },
      {
        $sort: { totalStockValue: -1 }
      }
    ]);

    return res.status(200).json({
      categories: summary.length,
      summary
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  adjustStock,
  deleteProduct,
  getLowStockReport,
  getCategorySummary
};
