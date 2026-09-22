// routes/studentRoutes.js
// Modular Router for Student CRUD APIs

const express = require('express');
const router = express.Router();
let students = require('../data/students');

// Helper function to auto-increment student ID
const getNextId = () => {
  if (students.length === 0) return 1;
  const ids = students.map(s => s.id);
  return Math.max(...ids) + 1;
};

/**
 * @route   GET /students
 * @desc    Get all students
 * @access  Public
 * @returns 200 OK
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

/**
 * @route   GET /students/:id
 * @desc    Get single student by ID
 * @access  Public
 * @returns 200 OK, 400 Bad Request (invalid format), 404 Not Found
 */
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid student ID format. ID must be an integer.'
    });
  }

  const student = students.find(s => s.id === id);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found.`
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

/**
 * @route   POST /students
 * @desc    Create a new student record
 * @access  Public
 * @returns 201 Created, 400 Bad Request (missing required fields)
 */
router.post('/', (req, res) => {
  const { name, age, course, email, grade } = req.body;

  // Validation: Required fields
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Student "name" is required and must be a valid string.'
    });
  }

  if (!course || typeof course !== 'string' || course.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: Student "course" is required and must be a valid string.'
    });
  }

  if (age !== undefined && (isNaN(Number(age)) || Number(age) <= 0)) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: "age" must be a positive number.'
    });
  }

  const newStudent = {
    id: getNextId(),
    name: name.trim(),
    age: age !== undefined ? Number(age) : null,
    course: course.trim(),
    email: email && typeof email === 'string' ? email.trim() : null,
    grade: grade && typeof grade === 'string' ? grade.trim() : 'N/A'
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: 'Student created successfully.',
    data: newStudent
  });
});

/**
 * @route   PUT /students/:id
 * @desc    Update existing student record by ID
 * @access  Public
 * @returns 200 OK, 400 Bad Request, 404 Not Found
 */
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid student ID format. ID must be an integer.'
    });
  }

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found.`
    });
  }

  const { name, age, course, email, grade } = req.body;

  // Validation: Ensure body contains at least one field to update
  if (!name && age === undefined && !course && !email && !grade) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: At least one field (name, age, course, email, grade) must be provided for update.'
    });
  }

  if (age !== undefined && (isNaN(Number(age)) || Number(age) <= 0)) {
    return res.status(400).json({
      success: false,
      message: 'Validation Error: "age" must be a positive number.'
    });
  }

  const existingStudent = students[index];

  const updatedStudent = {
    ...existingStudent,
    name: name !== undefined && typeof name === 'string' && name.trim() !== '' ? name.trim() : existingStudent.name,
    age: age !== undefined ? Number(age) : existingStudent.age,
    course: course !== undefined && typeof course === 'string' && course.trim() !== '' ? course.trim() : existingStudent.course,
    email: email !== undefined && typeof email === 'string' ? email.trim() : existingStudent.email,
    grade: grade !== undefined && typeof grade === 'string' ? grade.trim() : existingStudent.grade
  };

  students[index] = updatedStudent;

  res.status(200).json({
    success: true,
    message: 'Student record updated successfully.',
    data: updatedStudent
  });
});

/**
 * @route   DELETE /students/:id
 * @desc    Delete a student record by ID
 * @access  Public
 * @returns 200 OK, 400 Bad Request, 404 Not Found
 */
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid student ID format. ID must be an integer.'
    });
  }

  const index = students.findIndex(s => s.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: `Student with ID ${id} not found.`
    });
  }

  const deletedStudent = students.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: `Student with ID ${id} deleted successfully.`,
    data: deletedStudent
  });
});

module.exports = router;
