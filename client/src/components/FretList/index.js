import React from 'react';
import { Link } from 'react-router-dom';

import thumb from '../../assets/images/thumbnailSeeder.jpg';

const FretList = ({ frets, title }) => {
  if (!frets.length) {
    return <h3>No Fret Creations Yet</h3>;
  }

  return (
    <div className="fretlist-container">
      <h2>{title}</h2>
      {frets &&
        frets.map(fret => (
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
              <div className="thumb-wrap">
                <img src={thumb} alt="test thumbnail" />
              </div>
              <div className="info-wrap">
              <p>{fret.fretText}</p>
                <Link to={`/fret/${fret._id}`}>
                  <p className="mb-0">
                    Reactions: {fret.feedbackCount} || Click to{' '}
                    {fret.feedbackCount ? 'see' : 'start'} the discussion!
                  </p>
                </Link>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default FretList;
