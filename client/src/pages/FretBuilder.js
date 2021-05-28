import React from 'react';
import FretList from '../components/ThoughtList';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_FRETS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_FRETS);
  const frets = data?.frets || [];

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <FretList frets={frets} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
