import { Link } from 'react-router-dom';

const AssignmentCard = ({ assignment }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{assignment.title}</h5>
        <p className="card-text">{assignment.description}</p>
        <p className="card-text"><small className="text-muted">Deadline: {new Date(assignment.deadline).toLocaleString()}</small></p>
        <Link to={`/assignments/${assignment._id}`} className="btn btn-primary btn-sm">View Details</Link>
      </div>
    </div>
  );
};

export default AssignmentCard;
