import { useEffect, useState } from 'react';
import api from '../services/api';

const StudentDashboard = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const res = await api.get('/assignments');
        setAssignments(res.data);
      } catch (err) {
        setError('Unable to load assignments');
      }
    };

    loadAssignments();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="text-xl font-bold mb-4">Student Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="grid grid-cols-1 gap-4">
        {assignments.map((assignment) => (
          <article className="card" key={assignment._id}>
            <div className="card-body">
              <h3 className="text-lg font-bold">{assignment.title}</h3>
              <p className="text-sm">{assignment.description}</p>
              <p className="text-sm text-secondary">Deadline: {new Date(assignment.deadline).toLocaleString()}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
