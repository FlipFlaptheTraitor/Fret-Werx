const { AuthenticationError } = require('apollo-server-express');
const { User, Fret } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('frets');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('frets');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('frets');
    },
    frets: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Fret.find(params).sort({ createdAt: -1 });
    },
    fret: async (parent, { _id }) => {
      return Fret.findOne({ _id });
    }
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addFret: async (parent, args, context) => {
      if (context.user) {
        const fret = await Fret.create({ ...args, username: context.user.username });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { frets: Fret._id } },
          { new: true }
        );

        return fret;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addFeedback: async (parent, {fretId, feedbackBody }, context) => {
      if (context.user) {
        const updatedFret = await Fret.findOneAndUpdate(
          { _id: fretId },
          { $push: { feedbacks: { feedbackBody, username: context.user.username } } },
          { new: true, runValidators: true }
        );

        return updatedFret;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;
