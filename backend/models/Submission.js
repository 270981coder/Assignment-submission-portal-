const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
  fileUrl: { type: String },
  githubLink: { type: String },
  feedback: { type: String, default: '' },
  marks: { type: Number, default: null },
  submittedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'Submitted' }
}, { timestamps: true });

module.exports = mongoose.model('Submission', submissionSchema);
