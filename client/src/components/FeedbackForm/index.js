import React, { useState } from 'react';

import { useMutation } from '@apollo/react-hooks';
import { ADD_FEEDBACK } from '../../utils/mutations';

const FeedbackForm = ({ fretId }) => {
  const [feedbackBody, setBody] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [addFeedback, { error }] = useMutation(ADD_FEEDBACK);

  // update state based on form input changes
  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      await addFeedback({
        variables: { feedbackBody, fretId }
      });

      // clear form value
      setBody('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };


return (
  <div>
    <p className={`feedback-counter m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}>
      Character Count: {characterCount}/280
      {error && <span className="ml-2">Something went wrong...</span>}
    </p>
    <form
      className="feedback-form"
      onSubmit={handleFormSubmit}
    >
      <textarea
        placeholder="Leave some feedback on this fret work..."
        value={feedbackBody}
        className="form-input"
        onChange={handleChange}
      ></textarea>

      <button className="feedback-button btn" type="submit">
        Submit
      </button>
    </form>

    {error && <div>Something went wrong...</div>}
  </div>
);
};

export default FeedbackForm;
