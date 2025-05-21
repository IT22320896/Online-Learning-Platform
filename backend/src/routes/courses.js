const express = require('express');
const router = express.Router();
const {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
  getInstructorCourses,
  getEnrolledStudents
} = require('../controllers/courses');
const { authenticateUser, authorizeRoles } = require('../middleware/auth');

// Public routes
router.get('/', getAllCourses);
router.get('/:id', getCourseById);

// Protected routes - Instructors only
router.post('/', authenticateUser, authorizeRoles('instructor', 'admin'), createCourse);
router.put('/:id', authenticateUser, authorizeRoles('instructor', 'admin'), updateCourse);
router.delete('/:id', authenticateUser, authorizeRoles('instructor', 'admin'), deleteCourse);
router.get('/instructor/my-courses', authenticateUser, authorizeRoles('instructor', 'admin'), getInstructorCourses);
router.get('/:id/students', authenticateUser, authorizeRoles('instructor', 'admin'), getEnrolledStudents);

// Protected routes - Students only
router.post('/:id/enroll', authenticateUser, authorizeRoles('student'), enrollCourse);

module.exports = router; 