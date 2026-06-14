import { useEffect, useState } from 'react';
import api from '../services/api';

const TeacherDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', deadline: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [assignRes, subRes] = await Promise.all([
          api.get('/assignments'),
          api.get('/submissions')
        ]);
        setAssignments(assignRes.data);
        setSubmissions(subRes.data);
      } catch (err) {
        setError('Unable to load teacher data');
      }
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const createAssignment = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    if (!form.title || !form.description || !form.deadline) {
      return setError('All fields are required');
    }
    try {
      const res = await api.post('/assignments', form);
      setAssignments((prev) => [res.data, ...prev]);
      setForm({ title: '', description: '', deadline: '' });
      setMessage('Assignment created successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create assignment');
    }
  };

  return (
    <div>
      <h2 className="mb-4">Teacher Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <div className="row">
        <div className="col-lg-6">
          <div className="card mb-4">
            <div className="card-body">
              <h5>Create Assignment</h5>
              <form onSubmit={createAssignment}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" name="title" className="form-control" value={form.title} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea name="description" className="form-control" value={form.description} onChange={handleChange}></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Deadline</label>
                  <input type="datetime-local" name="deadline" className="form-control" value={form.deadline} onChange={handleChange} />
                </div>
                <button className="btn btn-primary">Create Assignment</button>
              </form>
            </div>
          </div>
          <h4>Assignments</h4>
          {assignments.length === 0 && <p>No assignments yet.</p>}
          {assignments.map((assignment) => (
            <div className="card mb-3" key={assignment._id}>
              <div className="card-body">
                <h5>{assignment.title}</h5>
                <p>{assignment.description}</p>
                <p className="text-muted">Deadline: {new Date(assignment.deadline).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-6">
          <h4>Submissions</h4>
          {submissions.length === 0 && <p>No submissions yet.</p>}
          {submissions.map((submission) => (
            <div className="card mb-3" key={submission._id}>
              <div className="card-body">
                <h5>{submission.assignment?.title}</h5>
                <p><strong>Student:</strong> {submission.student?.name}</p>
                <p><strong>Status:</strong> {submission.status}</p>
                <p><strong>Marks:</strong> {submission.marks ?? 'Pending'}</p>
                <p><strong>GitHub:</strong> {submission.githubLink ? <a href={submission.githubLink} target="_blank" rel="noreferrer">View</a> : 'None'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
