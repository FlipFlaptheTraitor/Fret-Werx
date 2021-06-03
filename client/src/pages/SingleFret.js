import React from 'react';
import { Link, useParams } from 'react-router-dom';

import FeedbackList from '../components/FeedbackList';
import FeedbackForm from '../components/FeedbackForm';
import Auth from '../utils/auth';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_FRET } from '../utils/queries';

import builder from '../assets/images/builderDisplay.png';

const SingleFret = props => {
  const { id: fretId } = useParams();

  const { loading, data } = useQuery(QUERY_FRET, {
    variables: { id: fretId }
  });

  const fret = data?.fret || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-fret-container mt-5">
          <div key={fret._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/my-frets/${fret.username}`}
                style={{ fontWeight: 700 }}
              >
                {fret.username}
              </Link>{' '}
              fret creation on {fret.createdAt}
            </p>
            <div className="card-body">
            <div className="thumb-display">
                <div className="thumb-container">
                  <div className="thumb-background" style={{ backgroundImage: `url(${fret.webformatURL})` }}>
                    <img src={builder} alt="A guitar fretboard template builder that displays dynamic designs to the user" />
                  </div>
                </div>
              </div>
              <div className="info-wrap">
                <p>{fret.fretText}</p>
                <Link to={`/fret/${fret._id}`}>
                  <p className="mb-0">
                    Feedback: {fret.feedbackCount} || Click to{' '}
                    {fret.feedbackCount ? 'see' : 'start'} the discussion!
                  </p>
                </Link>
              </div>
            </div>
          </div>
        {fret.feedbackCount > 0 && <FeedbackList feedbacks={fret.feedbacks} />}
        {Auth.loggedIn() && <FeedbackForm fretId={fret._id} />}
    </div>
  );
};

export default SingleFret;
