import React, { useEffect, useState } from 'react';

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
      console.log("1");
      try {
        // update fret array's cache
        // could potentially not exist yet, so wrap in a try/catch
        const { frets } = cache.readQuery({ query: QUERY_FRETS });
        console.log("2");
        cache.writeQuery({
          query: QUERY_FRETS,
          data: { frets: [addFret, ...frets] }
        });
        console.log("3");
      } catch (e) {
        console.log("error top of file");
        console.error(e);
      }
      console.log("4");
      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      console.log("5");
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, frets: [...me.frets, addFret] } }
      });
      console.log("6");
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
    console.log(webformatURL);


        
   
    // useEffect(async () => {
    //   const usersObject = await axios.get('/api/users')
    //   setUsers(usersObject)
    // }, [])


    try {
      await addFret({
        variables: { webformatURL, title, fretText }
      });

      // clear form value
      setText('');
      setTitle('');
      setCharacterCount(0);
      // setWebformatURL('');
      
    } catch (e) {
      console.log("error down below");
      console.error(e);
    }



  };

  return (
    <div>
      <p className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <input
          placeholder="Here's a new title..."
          value={title}
          className="form-input col-12 col-md-9"
          onChange={handleChangeTitle}
        ></input>
        <textarea
          placeholder="Here's a new description..."
          value={fretText}
          className="form-input col-12 col-md-9"
          onChange={handleChangeText}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default FretForm;
