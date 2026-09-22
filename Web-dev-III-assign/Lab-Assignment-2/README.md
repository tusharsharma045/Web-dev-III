# Lab Assignment 2 – Student Management REST API

**Course:** Web Dev III (Node.js & Express Backend)  
**Unit:** 2 | **Marks:** 2.5 | **Type:** In-Class Lab Assignment  

---

## 📋 Table of Contents
- [Overview](#overview)
- [Learning Objectives](#learning-objectives)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [API Specification & Status Codes](#api-specification--status-codes)
- [Middleware Implementation](#middleware-implementation)
- [Setup & Running Instructions](#setup--running-instructions)
- [Testing with Postman & cURL](#testing-with-postman--curl)
- [Rubric & Evaluation](#rubric--evaluation)

---

## 🎯 Overview
The **Student Management REST API** is an Express.js backend project providing complete CRUD (Create, Read, Update, Delete) operations for student records using in-memory JSON data storage.

This project strictly obeys all assignment constraints:
- ❌ No Database (MongoDB / MySQL)
- ❌ No ORM / ODM (Mongoose)
- ✅ In-Memory Array & JSON Data Storage
- ✅ Custom Logger Middleware
- ✅ Modular Routing (`express.Router`)
- ✅ Proper HTTP Status Code Error Handling (`200`, `201`, `400`, `404`, `500`)

---

## 🧠 Learning Objectives
- Master Express.js server setup and configuration.
- Implement RESTful API conventions and design standards.
- Build complete CRUD endpoints (`GET`, `POST`, `PUT`, `DELETE`).
- Implement custom request logging middleware.
- Handle edge cases, request validation, and HTTP status codes cleanly.
- Test and verify APIs using Postman and cURL.

---

## 🛠️ Technology Stack
- **Node.js** - JavaScript Runtime Environment
- **Express.js** - Fast, unopinionated web framework for Node.js
- **Postman / cURL** - API Testing Tools

---

## 📂 Project Structure

```
Lab-Assignment-2/
├── data/
│   └── students.js          # In-memory student dataset
├── middleware/
│   └── logger.js            # Custom HTTP request logger middleware
├── routes/
│   └── studentRoutes.js     # Modular router for Student CRUD operations
├── app.js                   # Main Express application entry point
├── package.json             # Project dependencies and npm scripts
├── Student_Management_API.postman_collection.json # Exported Postman collection
└── README.md                # Project documentation
```

---

## 📌 API Specification & Status Codes

Base URL: `http://localhost:3000`

| HTTP Method | Endpoint | Description | Expected Status Codes |
|---|---|---|---|
| **GET** | `/` | Root Welcome API & Endpoint documentation | `200 OK` |
| **GET** | `/students` | Get all student records | `200 OK` |
| **GET** | `/students/:id` | Get single student record by ID | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **POST** | `/students` | Add a new student record | `201 Created`, `400 Bad Request` |
| **PUT** | `/students/:id` | Update an existing student record by ID | `200 OK`, `400 Bad Request`, `404 Not Found` |
| **DELETE** | `/students/:id` | Delete a student record by ID | `200 OK`, `400 Bad Request`, `404 Not Found` |

---

## ⚙️ Middleware Implementation

### Custom Logger (`middleware/logger.js`)
Logs incoming HTTP requests with timestamp, method, requested URL, response status code, and execution time in milliseconds:
```
[2026-09-22T21:20:00.000Z] GET /students 200 - 4ms
[2026-09-22T21:20:05.000Z] POST /students 201 - 8ms
```

---

## 🚀 Setup & Running Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Server
Run in production mode:
```bash
npm start
```
Run in development mode (with auto-reload):
```bash
npm run dev
```

The server will start on `http://localhost:3000`.

---

## 🧪 Testing with Postman & cURL

### Importing Postman Collection
1. Open **Postman**.
2. Click **Import** (top left).
3. Select the `Student_Management_API.postman_collection.json` file located in the project directory.
4. Execute the requests sequentially!

---

### Sample cURL Commands

#### 1. Get All Students (`GET /students`)
```bash
curl -X GET http://localhost:3000/students
```

#### 2. Get Student by ID (`GET /students/1`)
```bash
curl -X GET http://localhost:3000/students/1
```

#### 3. Create a New Student (`POST /students`)
```bash
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sarah Connor",
    "age": 23,
    "course": "Cyber Security",
    "email": "sarah.c@example.com",
    "grade": "A"
  }'
```

#### 4. Update Student Details (`PUT /students/1`)
```bash
curl -X PUT http://localhost:3000/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe Updated",
    "grade": "A+"
  }'
```

#### 5. Delete Student (`DELETE /students/2`)
```bash
curl -X DELETE http://localhost:3000/students/2
```

---

## 📊 Rubric & Evaluation

| Criteria | Allocated Marks | Status |
|---|---|---|
| **Functionality** (All CRUD APIs working correctly) | 1.5 Marks | ✅ Complete |
| **API Design** (Modular routes, proper status codes & validation) | 0.5 Marks | ✅ Complete |
| **Clean Code** (Proper folder structure, comments, middleware) | 0.5 Marks | ✅ Complete |
| **Total** | **2.5 Marks** | 💯 |

Happy Coding! 🚀
