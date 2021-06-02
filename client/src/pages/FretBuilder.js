// import React from 'react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import FretForm from '../components/FretForm';

import builder from '../assets/images/builderDisplay.png';
import sample1 from '../assets/images/sampleBG-01.jpg';
import sample2 from '../assets/images/sampleBG-02.jpg';
import sample3 from '../assets/images/sampleBG-03.jpg';
import sample4 from '../assets/images/sampleBG-04.jpg';
import sample5 from '../assets/images/sampleBG-05.jpg';
import sample6 from '../assets/images/sampleBG-06.jpg';

import { useQuery } from '@apollo/react-hooks';
import { QUERY_FRETS } from '../utils/queries';

const Home = props => {

  const [webformatURL, setWebformatURL] = useState('');

  const { loading, data } = useQuery(QUERY_FRETS);
  const frets = data?.frets || [];
  let userInput = '';
  let imgAry = [];


  if (loading) {
    return <div>Loading...</div>;
  }

  const handlePixabaySubmit = (event) => {
    event.preventDefault();
    userInput = document.getElementById("userInput").value;
    let inputReady= userInput.split(' ').join('+');
    fetch(
      'https://pixabay.com/api/' +
      '?key=1403504-14e482c582efc463713e4ec08' +
      '&q=' +
      inputReady +
      '&image_type=photo' +
      '&per_page=151'
    )
    .then(function (response) {
      return response.json();
    })
    .then(function (response)  {
      console.log("⬇⬇⬇   Pixabay Response   ⬇⬇⬇");
      console.log(response);
      userInput = '';
      imgAry = [];
      let pixabayAryLn = response.hits.length;
      for(let i=0;i<6;i++) {
        let pixImg = response.hits[Math.floor(Math.random() * (pixabayAryLn-1))].largeImageURL;
        imgAry.push(pixImg);
      }
      console.log("⬇⬇⬇   imgAry   ⬇⬇⬇");
      console.log(imgAry);
    })
    .then(function ()  {
      for(let j=0;j<6;j++) {
        let pixImgEl = document.querySelector("[data-pixabay-img='" + j + "']");
        pixImgEl.setAttribute('src', imgAry[j]);
      }
    })
    .catch(function (error) {
        console.log("⬇⬇⬇   error   ⬇⬇⬇");
        console.log(error)
    })
    }

    const handleDisplay = event => {
      let disImg = event.target.getAttribute('src');
      console.log("⬇⬇⬇   disImg   ⬇⬇⬇");
      console.log(disImg);
      let displayEl = document.querySelector('[data-display-img="this"]');
      displayEl.style.backgroundImage = 'url('+disImg+')';
      console.log("⬇⬇⬇   disEl   ⬇⬇⬇");
      console.log(displayEl);

      setWebformatURL(disImg);
      
    };

    // const handleFormClick = event => {
    //   console.log("HANDLED NOTHING but check");
    // };

    // const handleSave = event => {
    //   console.log("HANDLED NOTHING but check");
    //   // setWebformatURL('');
    // };

  return (
    <main>
      <div className="builder-container">
        <h2>Fret Builder</h2>
        <div className="d-flex builder-box">
          <div className="builder-display">
            <div className="user-selection">
              <div data-display-img="this" className="user-selected"></div>
              <img src={builder} alt="A guitar fretboard template builder that displays dynamic designs to the user" />
            </div>
          </div>
          <div className="builder-controls">
            <div className="search-mod">
              <h3>Search Pixabay</h3>
              <div className="search-container">
                <input id="userInput" className="user-input" placeholder="background" />
                <div onClick={handlePixabaySubmit} className="search-button">
                  <span>Search</span>
                </div>
              </div>
            </div>
            <div className="display-mod">

              <div className="image-choice-item">
                <img data-pixabay-img="0" src={sample1} alt="a sample design for the fret werx application" onClick={handleDisplay} />
              </div>
              <div className="image-choice-item">
                <img data-pixabay-img="1" src={sample2} alt="a sample design for the fret werx application" onClick={handleDisplay} />
              </div>
              <div className="image-choice-item">
                <img data-pixabay-img="2" src={sample3} alt="a sample design for the fret werx application" onClick={handleDisplay} />
              </div>

              <div className="image-choice-item">
                <img data-pixabay-img="3" src={sample4} alt="a sample design for the fret werx application" onClick={handleDisplay} />
              </div>
              <div className="image-choice-item">
                <img data-pixabay-img="4" src={sample5} alt="a sample design for the fret werx application" onClick={handleDisplay} />
              </div>
              <div className="image-choice-item">
                <img data-pixabay-img="5" src={sample6} alt="a sample design for the fret werx application" onClick={handleDisplay} />
              </div>

            </div>
            <div className="form-mod">
              <FretForm webformatURL={webformatURL} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
