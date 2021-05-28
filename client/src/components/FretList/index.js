import React from 'react';
import { Link } from 'react-router-dom';

const FretList = ({ frets, title }) => {
  if (!frets.length) {
    return <h3>No Fret Creations Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {frets &&
        fretts.map(fret => (
          <div key={fret._id} className="card mb-3">
            <p className="card-header">
              <Link
                to={`/my-frets/${fret.username}`}
                style={{ fontWeight: 700 }}
                className="text-light"
              >
                {fret.username}
              </Link>{' '}
              fret creation on {fret.createdAt}
            </p>
            <div className="card-body">
              <Link to={`/fret/${fret._id}`}>
                <p>{fret.fretText}</p>
                <p className="mb-0">
                  Reactions: {fret.feedbackCount} || Click to{' '}
                  {fret.feedbackCount ? 'see' : 'start'} the discussion!
                </p>
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FretList;
