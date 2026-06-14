const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {
  createSubmission,
  getSubmissions,
  getStudentSubmissions,
  reviewSubmission
} = require('../controllers/submissionController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['.pdf', '.doc', '.docx'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
    }
  }
});

router.get('/', protect, authorize('teacher'), getSubmissions);
router.get('/student', protect, authorize('student'), getStudentSubmissions);
router.post('/', protect, authorize('student'), upload.single('file'), createSubmission);
router.put('/:id/review', protect, authorize('teacher'), reviewSubmission);

module.exports = router;
