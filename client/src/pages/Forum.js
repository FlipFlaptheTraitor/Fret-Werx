import React from 'react';
import FretList from '../components/FretList';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_FRETS } from '../utils/queries';

const Forum = () => {
  const { loading, data } = useQuery(QUERY_FRETS);
  const frets = data?.frets || [];

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <FretList frets={frets} title="Zee Creaschuns..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Forum;
