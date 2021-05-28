import React from 'react';
import { useParams } from 'react-router-dom';

import FeedbackList from '../components/FeedbackList';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_FRET } from '../utils/queries';

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
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {fret.username}
          </span>{' '}
          fret creation on {fret.createdAt}
        </p>
        <div className="card-body">
          <p>{fret.fretText}</p>
        </div>
      </div>

      {fret.feedbackCount > 0 && <FeedbackList feedbacks={fret.feedbacks} />}
    </div>
  );
};

export default SingleFret;
