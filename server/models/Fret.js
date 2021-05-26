const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const fretSchema = new Schema(
  {
    // pixelbay api name
    webformatURL: {
      type: String,
      required: 'Please select a image!'
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
    
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

fretSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Fret = model('Fret', fretSchema);

module.exports = Fret;
