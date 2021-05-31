const { Schema, model } = require('mongoose');
const feedbackSchema = require('./Feedback');
const dateFormat = require('../utils/dateFormat');

const fretSchema = new Schema(
  {
    // pixabay api name
    webformatURL: {
      type: String,
      required: 'Please select a image!'
    },
    title:{
      type: String,
      required: 'Please add a title!'
    },
    fretText: {
      type: String,
      required: 'Please add a description!',
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
 
    
    feedbacks: [feedbackSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

fretSchema.virtual('feedbackCount').get(function() {
  return this.feedbacks.length;
});

const Fret = model('Fret', fretSchema);

module.exports = Fret;
