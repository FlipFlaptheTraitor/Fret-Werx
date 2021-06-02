import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_FRET } from '../../utils/mutations';
import { QUERY_FRETS, QUERY_ME } from '../../utils/queries';

// import webformatURL from '../assets/images/sampleBG-06.jpg';

const FretForm = ({ webformatURL }) => {
  const [fretText, setText] = useState('');
  const [title, setTitle] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addFret, { error }] = useMutation(ADD_FRET, {
    update(cache, { data: { addFret } }) {
      try {
        // update fret array's cache
        // could potentially not exist yet, so wrap in a try/catch
        const { frets } = cache.readQuery({ query: QUERY_FRETS });
        cache.writeQuery({
          query: QUERY_FRETS,
          data: { frets: [addFret, ...frets] }
        });
      } catch (e) {
        console.error(e);
      }
      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, frets: [...me.frets, addFret] } }
      });
    }
  });

  // update state based on form input changes
  const handleChangeTitle = event => {
      setTitle(event.target.value);
  };

  const handleChangeText = event => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      await addFret({
        variables: { webformatURL, title, fretText }
      });
      // clear form value
      setText('');
      setTitle('');
      setCharacterCount(0)
    } catch (e) {
      console.log("error down below");
      console.error(e);
    }
    window.location = './forum';
  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="builder-form"
        onSubmit={handleFormSubmit}
      >
        <input
          placeholder="Here's a new title..."
          value={title}
          className="form-input"
          onChange={handleChangeTitle}
        ></input>
        <textarea
          placeholder="Here's a new description..."
          value={fretText}
          className="form-input"
          onChange={handleChangeText}
        ></textarea>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FretForm;
