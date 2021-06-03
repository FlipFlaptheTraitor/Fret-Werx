import React from 'react';
import { useParams } from 'react-router-dom';

import FretList from '../components/FretList';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_USER } from '../utils/queries';

const MyFrets = props => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam }
  });

  const user = data?.user || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4 className="no-user">
        No user found with this name!
      </h4>
    );
  }

  return (
    <div>
      <div className="my-frets-container">
        <div className="">
          <FretList frets={user.frets} title={`Peepin' ${user.username}'s fret creations`} />
        </div>
      </div>
    </div>
  );
};

export default MyFrets;
