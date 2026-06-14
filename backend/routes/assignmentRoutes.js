const express = require('express');
const router = express.Router();
const {
  createAssignment,
  getAssignments,
  getAssignmentById,
  updateAssignment,
  deleteAssignment
} = require('../controllers/assignmentController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/').get(protect, getAssignments).post(protect, authorize('teacher'), createAssignment);
router.route('/:id').get(protect, getAssignmentById).put(protect, authorize('teacher'), updateAssignment).delete(protect, authorize('teacher'), deleteAssignment);

module.exports = router;
