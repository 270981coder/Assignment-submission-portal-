import { useEffect, useState } from 'react';
import api from '../services/api';
import AssignmentCard from '../components/AssignmentCard';

const StudentDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assignRes, subRes] = await Promise.all([
          api.get('/assignments'),
          api.get('/submissions/student')
        ]);
        setAssignments(assignRes.data);
        setSubmissions(subRes.data);
      } catch (err) {
        setError('Unable to load data');
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Student Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-lg-8">
          <h4>Assignments</h4>
          {assignments.length === 0 && <p>No assignments available</p>}
          {assignments.map((assignment) => (
            <AssignmentCard key={assignment._id} assignment={assignment} />
          ))}
        </div>
        <div className="col-lg-4">
          <h4>My Submissions</h4>
          {submissions.length === 0 && <p>You have no submissions yet.</p>}
          {submissions.map((submission) => (
            <div className="card mb-3" key={submission._id}>
              <div className="card-body">
                <h5 className="card-title">{submission.assignment?.title}</h5>
                <p className="mb-1"><strong>Status:</strong> {submission.status}</p>
                <p className="mb-1"><strong>Marks:</strong> {submission.marks ?? 'Pending'}</p>
                <p><strong>Feedback:</strong> {submission.feedback || 'No feedback yet'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
