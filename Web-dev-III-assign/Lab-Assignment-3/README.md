# Assignment 3: Inventory and Data Management System

**Course:** Web Dev III  
**Unit Covered:** Unit – 3  
**CO Mapping:** CO3  
**Marks:** 2.5  
**Mode:** 100% In-Class (Lab Practicals)  
**Time:** 30–40 minutes  

---

## 📋 Table of Contents
- [Assignment Overview](#-assignment-overview)
- [Technology Stack & Restrictions](#-technology-stack--restrictions)
- [Project Directory Structure](#-project-directory-structure)
- [Docker Compose Setup (MongoDB)](#-docker-compose-setup-mongodb)
- [Running the Application](#-running-the-application)
- [Postman Testing & Screenshot Guide](#-postman-testing--screenshot-guide)
- [Mongoose Schema Design & Field-Level Validation](#-mongoose-schema-design--field-level-validation)
- [API Endpoints Reference](#-api-endpoints-reference)
- [Evaluation Rubric](#-evaluation-rubric)

---

## 🎯 Assignment Overview
The **Inventory and Data Management System** is a RESTful backend built with Node.js, Express.js, and MongoDB using Mongoose. It enables warehouses or retail stores to manage products, adjust stock levels safely (restock and sale operations), query the catalog with filtering, sorting, and pagination, and generate inventory reports using MongoDB Aggregation Pipelines.

### Key Highlights:
- **Persistent Storage:** MongoDB containerized with `docker compose up -d`.
- **Mongoose ODM:** Field-level schema validations, unique SKU indexes, and virtual `stockValue` (`price * quantity`).
- **RESTful CRUD Operations:** Complete Create, Read, Update, Delete, and Stock Adjustment (`PATCH`).
- **Querying:** Dynamic category, supplier, stock, price range filters, regex text search, sorting, and pagination.
- **Aggregation Pipelines:** Low-Stock Alert report (`quantity <= reorderLevel`) and Category-wise inventory metrics.
- **Robust Error Handling:** Centralized middleware managing CastError, duplicate keys, validation errors, and malformed JSON.

---

## 🛠️ Technology Stack & Restrictions

- **Runtime:** Node.js (v18+ or v22+)
- **Backend Framework:** Express.js
- **Database:** MongoDB (via Docker Compose)
- **ODM:** Mongoose
- **Configuration:** dotenv
- **Containerization:** Docker & Docker Compose

> **Assignment Restrictions:**
> - ❌ No pre-built admin panel, CMS, or inventory-management boilerplate.
> - ✅ Only Node.js, Express, Mongoose, and dotenv are used.

---

## 📂 Project Directory Structure

```
Lab-Assignment-3/
├── config/
│   └── db.js                 # MongoDB connection using Mongoose
├── controllers/
│   └── productController.js  # CRUD, filtering, & aggregation business logic
├── middleware/
│   ├── errorHandler.js       # Centralized error handler
│   ├── logger.js             # HTTP request logger
│   └── validateProduct.js    # Body validation middleware
├── models/
│   └── Product.js            # Mongoose Schema with validations & stockValue virtual
├── routes/
│   └── productRoutes.js      # Express router for /api/products
├── scripts/
│   └── seed.js               # Initializer script matching PDF sample dataset
├── .env                      # Environment config (PORT=5000, MONGODB_URI)
├── .env.example              # Template environment file
├── .gitignore                # Git ignore rules
├── docker-compose.yml        # Docker Compose configuration for MongoDB
├── app.js                    # Express application setup
├── server.js                 # HTTP server entry point
├── package.json              # Dependencies and npm scripts
├── Inventory_Management_API.postman_collection.json # Postman test collection
└── README.md                 # Project documentation
```

---

## 🐳 Docker Compose Setup (MongoDB)

The project includes [`docker-compose.yml`](file:///home/tushar/personal/Web-dev-III/Web-dev-III-assign/Lab-Assignment-3/docker-compose.yml) to spin up MongoDB locally.

### Start MongoDB Container:
```bash
docker compose up -d
```
*(or use `npm run docker:up`)*

### Verify Container is Running:
```bash
docker ps
```
You should see:
```text
CONTAINER ID   IMAGE          PORTS                      NAMES
...            mongo:latest   0.0.0.0:27017->27017/tcp   mongodb_inventory
```

### Stop MongoDB Container:
```bash
docker compose down
```
*(or use `npm run docker:down`)*

---

## 🚀 Running the Application

### 1. Install Dependencies:
```bash
cd Lab-Assignment-3
npm install
```

### 2. Seed Sample Database:
Populates the database with the exact 12 products, 5 categories, and 4 low-stock items shown in the assignment PDF:
```bash
npm run seed
```

### 3. Start the Express Server:
- **Development mode (with auto-reload):**
  ```bash
  npm run dev
  ```
- **Production mode:**
  ```bash
  npm start
  ```

Server will start on **`http://localhost:5000`**.

---

## 📮 Postman Testing & Screenshot Guide

We have created an automated Postman collection:  
👉 [`Inventory_Management_API.postman_collection.json`](file:///home/tushar/personal/Web-dev-III/Web-dev-III-assign/Lab-Assignment-3/Inventory_Management_API.postman_collection.json)

### How to use in Postman:
1. Open **Postman**.
2. Click **Import** (top-left) and select `Lab-Assignment-3/Inventory_Management_API.postman_collection.json`.
3. Open folder: **`1. Lab Screenshots (Ordered 1 to 7)`**.
4. Simply run each request **in order from 1 to 7**:
   * **Screenshot 1:** `GET All Products` ➔ captures IDs and lists catalogue.
   * **Screenshot 2:** `POST Create Product` ➔ creates "Gel Pen" and **automatically saves its ID**.
   * **Screenshot 3:** `PUT Update Product` ➔ automatically uses the saved ID (`{{productId}}`).
   * **Screenshot 4:** `DELETE Product` ➔ automatically deletes the saved ID (`{{productId}}`).
   * **Screenshot 5:** `GET Low-Stock Alert Report` ➔ displays low stock items and **automatically saves Study Table ID**.
   * **Screenshot 6:** `GET Category Summary` ➔ displays category aggregation summary.
   * **Screenshot 7:** `PATCH Stock Adjustment` ➔ automatically updates stock for Study Table (`{{studyTableId}}`).

> ✨ **No manual copying or pasting of IDs needed!** The collection automatically carries forward the generated IDs.

---

## 🗄️ Mongoose Schema Design & Field-Level Validation

Defined in [`models/Product.js`](file:///home/tushar/personal/Web-dev-III/Web-dev-III-assign/Lab-Assignment-3/models/Product.js):

| Field | Type | Required | Validation & Constraints |
| :--- | :--- | :--- | :--- |
| `name` | String | Yes | `trim: true`, length 2-100 characters |
| `sku` | String | Yes | `unique: true`, `uppercase: true`, `trim: true`, Regex: `/^[A-Za-z0-9-]+$/` |
| `category` | String | Yes | `trim: true` |
| `price` | Number | Yes | `min: 0` |
| `quantity` | Number | Yes | `min: 0`, default `0` |
| `reorderLevel` | Number | Yes | `min: 0`, default `0` |
| `supplier` | String | Yes | `trim: true` |
| `createdAt` | Date | Auto | Via `timestamps: true` |
| `updatedAt` | Date | Auto | Via `timestamps: true` |
| `stockValue` | Number | Virtual | Calculated via getter: `price * quantity` |
| `id` | String | Virtual | Mongoose virtual string ID |

---

## 🌐 API Endpoints Reference

Base URL: `http://localhost:5000`

### 1. GET `/api/products` (Screenshot 1)
- **Status:** `200 OK`
- **Query Params:** `category`, `search`, `minPrice`, `maxPrice`, `inStock`, `sortBy`, `order`, `page`, `limit`
- **Sample Output:**
```json
{
  "total": 12,
  "page": 1,
  "totalPages": 2,
  "count": 10,
  "products": [
    {
      "_id": "6a54767af6123427d6e61d76",
      "name": "Study Table",
      "sku": "FURN-TB-012",
      "category": "Furniture",
      "price": 3999,
      "quantity": 2,
      "reorderLevel": 4,
      "supplier": "IKEA India",
      "stockValue": 7998,
      "id": "6a54767af6123427d6e61d76"
    }
  ]
}
```

### 2. POST `/api/products` (Screenshot 2)
- **Status:** `201 Created`
- **Request Body:**
```json
{
  "name": "Gel Pen Pack of 15",
  "sku": "STNY-PN-713",
  "category": "Stationery",
  "price": 120,
  "quantity": 40,
  "reorderLevel": 20,
  "supplier": "Cello Pens"
}
```

### 3. PUT `/api/products/:id` (Screenshot 3)
- **Status:** `200 OK`
- **Request Body:**
```json
{
  "name": "Gel Pen Pack of 15",
  "sku": "STNY-PN-713",
  "category": "Stationery",
  "price": 140,
  "quantity": 60
}
```

### 4. DELETE `/api/products/:id` (Screenshot 4)
- **Status:** `200 OK`
- **Response:**
```json
{
  "message": "Product deleted",
  "id": "6a547727f6123427d6e61d7c"
}
```

### 5. GET `/api/products/low-stock` (Screenshot 5)
- **Status:** `200 OK`
- **Description:** Aggregation query matching items where `quantity <= reorderLevel`.
- **Response:**
```json
{
  "count": 4,
  "lowStockItems": [ ... ]
}
```

### 6. GET `/api/products/summary` (Screenshot 6)
- **Status:** `200 OK`
- **Description:** Aggregation grouping by category calculating total items, total quantity, total stock value, and average price.
- **Response:**
```json
{
  "categories": 5,
  "summary": [
    {
      "_id": "Electronics",
      "totalItems": 4,
      "totalQuantity": 96,
      "totalStockValue": 343904,
      "avgPrice": 5636.5
    },
    {
      "_id": "Apparel",
      "totalItems": 2,
      "totalQuantity": 78,
      "totalStockValue": 75522,
      "avgPrice": 1399
    }
  ]
}
```

### 7. PATCH `/api/products/:id/stock` (Screenshot 7)
- **Status:** `200 OK`
- **Description:** Restock (positive change) or sale (negative change) with safe inventory validation preventing negative stock.
- **Request Body:**
```json
{
  "change": 10
}
```
- **Response:**
```json
{
  "message": "Stock updated",
  "product": { ... }
}
```

---

## 📊 Evaluation Rubric

| Criteria | Marks | Implementation |
| :--- | :---: | :--- |
| **Database Schema Design & Validation (Mongoose)** | **0.5** | Field-level schema validations, unique SKU, positive constraints, virtual `stockValue` (`price * quantity`). |
| **CRUD Functionality** | **0.75** | `POST` (201), `GET /:id` (200), `PUT /:id` (200), `DELETE /:id` (200), `PATCH /:id/stock` (200). |
| **Querying (Filtering, Sorting, Pagination)** | **0.5** | Full query parameter support on `GET /api/products` with pagination metadata (`total`, `page`, `totalPages`, `count`). |
| **Aggregation (Low-Stock & Category Summary)** | **0.5** | Multi-stage aggregation pipelines for low-stock reports and category totals. |
| **API Design & Clean Code** | **0.25** | MVC architecture, centralized error handling, custom logger, Docker Compose containerization. |
| **Total** | **2.5** | **100% Completed** |
