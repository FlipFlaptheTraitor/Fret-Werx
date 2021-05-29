const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    frets: [Fret]
  }

  type Fret {
    _id: ID
    webformatURL: String
    title: String
    fretText: String
    createdAt: String
    username: String
    feedbackCount: Int
    feedbacks: [Feedback]
  }

  type Feedback {
    _id: ID
    feedbackBody: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    frets(username: String): [Fret]
    fret(_id: ID!): Fret
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addFret(webformatURL: String!): Fret
    addFeedback(fretId: ID!, feedbackBody: String!): Fret
  }
`;

module.exports = typeDefs;
