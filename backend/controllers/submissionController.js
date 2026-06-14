const path = require('path');
const Submission = require('../models/Submission');
const Assignment = require('../models/Assignment');

exports.createSubmission = async (req, res, next) => {
  try {
    const { assignmentId, githubLink } = req.body;
    if (!assignmentId) {
      return res.status(400).json({ message: 'Assignment ID is required' });
    }

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    if (new Date() > new Date(assignment.deadline)) {
      return res.status(400).json({ message: 'Deadline has passed for this assignment' });
    }

    let fileUrl = null;
    if (req.file) {
      fileUrl = `/uploads/${req.file.filename}`;
    }

    const existingSubmission = await Submission.findOne({
      student: req.user.id,
      assignment: assignmentId
    });

    if (existingSubmission) {
      if (new Date() > new Date(assignment.deadline)) {
        return res.status(400).json({ message: 'Cannot edit submission after deadline' });
      }
      existingSubmission.fileUrl = fileUrl || existingSubmission.fileUrl;
      existingSubmission.githubLink = githubLink || existingSubmission.githubLink;
      existingSubmission.submittedAt = new Date();
      existingSubmission.status = 'Resubmitted';
      await existingSubmission.save();
      return res.json(existingSubmission);
    }

    const submission = await Submission.create({
      student: req.user.id,
      assignment: assignmentId,
      fileUrl,
      githubLink,
      submittedAt: new Date(),
      status: 'Submitted'
    });

    res.status(201).json(submission);
  } catch (error) {
    next(error);
  }
};

exports.getSubmissions = async (req, res, next) => {
  try {
    const submissions = await Submission.find().populate('student', 'name email role').populate('assignment', 'title deadline');
    res.json(submissions);
  } catch (error) {
    next(error);
  }
};

exports.getStudentSubmissions = async (req, res, next) => {
  try {
    const submissions = await Submission.find({ student: req.user.id }).populate('assignment', 'title deadline');
    res.json(submissions);
  } catch (error) {
    next(error);
  }
};

exports.reviewSubmission = async (req, res, next) => {
  try {
    const { marks, feedback } = req.body;
    const submission = await Submission.findById(req.params.id).populate('student', 'name email');
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    submission.marks = marks !== undefined ? marks : submission.marks;
    submission.feedback = feedback || submission.feedback;
    submission.status = 'Reviewed';
    await submission.save();
    res.json(submission);
  } catch (error) {
    next(error);
  }
};
