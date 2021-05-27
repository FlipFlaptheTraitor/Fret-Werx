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
    createdAt: String
    username: String
    reactionCount: Int
    reactions: [Reaction]
  }

  type Reaction {
    _id: ID
    reactionBody: String
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
    addReaction(fretId: ID!, reactionBody: String!): Fret
  }
`;

module.exports = typeDefs;
