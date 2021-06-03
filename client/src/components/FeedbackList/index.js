import React from 'react';
import { Link } from 'react-router-dom';

const FeedbackList = ({ feedbacks }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="feedback-title">Intended Feedback</span>
      </div>
      <div className="card-body feedback-container">
        {feedbacks &&
          feedbacks.map(feedback => (
            <p className="pill mb-3 feedback" key={feedback._id}>
              {feedback.feedbackBody}{' '}
              <Link to={`/my-frets/${feedback.username}`} style={{ fontWeight: 700 }}>
                {feedback.username} on {feedback.createdAt}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default FeedbackList;
