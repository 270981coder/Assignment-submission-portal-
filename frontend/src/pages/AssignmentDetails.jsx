import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const AssignmentDetails = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const [githubLink, setGithubLink] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAssignment = async () => {
      try {
        const res = await api.get(`/assignments/${id}`);
        setAssignment(res.data);
      } catch (err) {
        setError('Unable to load assignment');
      }
    };
    loadAssignment();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!file && !githubLink) {
      return setError('Select a file or add a GitHub/Drive link');
    }
    if (file && file.size > 5 * 1024 * 1024) {
      return setError('File must be smaller than 5MB');
    }

    const formData = new FormData();
    formData.append('assignmentId', id);
    if (file) formData.append('file', file);
    if (githubLink) formData.append('githubLink', githubLink);

    try {
      await api.post('/submissions', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('Submission uploaded successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed');
    }
  };

  if (!assignment) {
    return <div>Loading assignment...</div>;
  }

  return (
    <div className="card">
      <div className="card-body">
        <h3>{assignment.title}</h3>
        <p>{assignment.description}</p>
        <p><strong>Deadline:</strong> {new Date(assignment.deadline).toLocaleString()}</p>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Upload File</label>
            <input type="file" className="form-control" onChange={(e) => setFile(e.target.files[0])} accept=".pdf,.doc,.docx" />
          </div>
          <div className="mb-3">
            <label className="form-label">GitHub / Drive Link</label>
            <input type="url" className="form-control" value={githubLink} onChange={(e) => setGithubLink(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Submit Assignment</button>
        </form>
      </div>
    </div>
  );
};

export default AssignmentDetails;
