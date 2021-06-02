import React from 'react';
import FretList from '../components/FretList';

import display from '../assets/images/dualDisplayBoards.png';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_FRETS } from '../utils/queries';
import Auth from '../utils/auth';

const Home = () => {
  const { loading, data } = useQuery(QUERY_FRETS);
  const frets = data?.frets || [];
  const loggedIn = Auth.loggedIn();
  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 hero-text">
          <p>CREATE CUSTOM FRETBOARD DESIGNS</p>
          <h1>SIGN UP TO START BUILDING!</h1>
          <div className="hero-button">
          {Auth.loggedIn() ? (
            <>
             <a href="/fret-builder">Click 2 Create!</a>
                </>
          ) : (
            <>
             <a href="/signup">Click 2 Create!</a>
                </>
          )}
           
          </div>
        </div>
        <div className="d-flex justify-content-between body-content">
          <div className="d-flex flex-column justify-content-between body-descrip">
            <p className="descrip-item">1.){"\n"}Sign Up Or Login</p>
            <p className="descrip-item">2.) Click 'fret builder' Link</p>
            <p className="descrip-item">3.) Search For An Image Or Design</p>
            <p className="descrip-item">4.) Test Out Different Results</p>
            <p className="descrip-item">5.) Share Your Creation</p>
          </div>
          <div className="d-flex justify-content-end body-display">
            <img src={display} alt="A side by side comparison of a before and after result from the fret builder app" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
