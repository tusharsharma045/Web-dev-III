const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Product = require('../models/Product');

dotenv.config();

const sampleProducts = [
  // 1. Furniture (Low stock item 1 - matching PDF screenshot)
  {
    name: 'Study Table',
    sku: 'FURN-TB-012',
    category: 'Furniture',
    price: 3999,
    quantity: 2,
    reorderLevel: 4,
    supplier: 'IKEA India'
  },
  // 2. Furniture (Low stock item 2)
  {
    name: 'Ergonomic Office Chair',
    sku: 'FURN-CH-044',
    category: 'Furniture',
    price: 6499,
    quantity: 3,
    reorderLevel: 5,
    supplier: 'Featherlite'
  },
  // 3. Electronics 1 (Part of exact PDF summary: totalItems 4, totalQty 96, stockVal 343904, avgPrice 5636.5)
  {
    name: 'USB-C Fast Charger 65W',
    sku: 'ELEC-CH-101',
    category: 'Electronics',
    price: 1000,
    quantity: 30,
    reorderLevel: 15,
    supplier: 'Anker Tech'
  },
  // 4. Electronics 2
  {
    name: 'Bluetooth Earbuds',
    sku: 'ELEC-EB-202',
    category: 'Electronics',
    price: 1000,
    quantity: 40,
    reorderLevel: 20,
    supplier: 'Boat Audio'
  },
  // 5. Electronics 3
  {
    name: 'Noise Cancelling Headphones',
    sku: 'ELEC-HP-303',
    category: 'Electronics',
    price: 6870,
    quantity: 12,
    reorderLevel: 10,
    supplier: 'Sony India'
  },
  // 6. Electronics 4
  {
    name: '27-inch 4K IPS Monitor',
    sku: 'ELEC-MN-404',
    category: 'Electronics',
    price: 13676,
    quantity: 14,
    reorderLevel: 8,
    supplier: 'LG Electronics'
  },
  // 7. Apparel 1 (Part of exact PDF summary: totalItems 2, totalQty 78, stockVal 75522, avgPrice 1399)
  {
    name: 'Cotton Graphic T-Shirt',
    sku: 'APP-TS-501',
    category: 'Apparel',
    price: 699,
    quantity: 63,
    reorderLevel: 20,
    supplier: 'FabIndia'
  },
  // 8. Apparel 2
  {
    name: 'Slim Fit Denim Jacket',
    sku: 'APP-JK-502',
    category: 'Apparel',
    price: 2099,
    quantity: 15,
    reorderLevel: 10,
    supplier: 'Levis India'
  },
  // 9. Stationery 1
  {
    name: 'Hardcover Spiral Notebook A5',
    sku: 'STNY-NB-001',
    category: 'Stationery',
    price: 180,
    quantity: 50,
    reorderLevel: 25,
    supplier: 'Classmate'
  },
  // 10. Stationery 2
  {
    name: 'Highlighter Pen Set 6 Colors',
    sku: 'STNY-HL-002',
    category: 'Stationery',
    price: 240,
    quantity: 35,
    reorderLevel: 15,
    supplier: 'Faber-Castell'
  },
  // 11. Fitness 1 (Low stock item 3)
  {
    name: 'Non-Slip Premium Yoga Mat',
    sku: 'FIT-YM-001',
    category: 'Fitness',
    price: 899,
    quantity: 4,
    reorderLevel: 10,
    supplier: 'Decathlon'
  },
  // 12. Fitness 2 (Low stock item 4)
  {
    name: 'Adjustable Dumbbell Pair 10kg',
    sku: 'FIT-DB-002',
    category: 'Fitness',
    price: 2499,
    quantity: 1,
    reorderLevel: 6,
    supplier: 'Kobo Fitness'
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/inventory_db';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products.');

    // Insert sample products
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${createdProducts.length} products.`);

    console.log('\nSeeded summary:');
    console.log(`- Total products: ${createdProducts.length}`);
    console.log(`- Categories: 5 (Electronics, Apparel, Furniture, Stationery, Fitness)`);
    console.log(`- Low-stock items: 4 (Study Table, Ergonomic Office Chair, Yoga Mat, Adjustable Dumbbell Pair)`);

    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during database seeding:', error.message);
    process.exit(1);
  }
};

seedDB();
