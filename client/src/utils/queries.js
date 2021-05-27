import gql from 'graphql-tag';

export const QUERY_FRETS = gql`
  query frets($username: String) {
    frets(username: $username) {
      _id
      webformatURL
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_FRET = gql`
  query fret($id: ID!) {
    fret(_id: $id) {
      _id
      webformatURL
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      frets {
        _id
        webformatURL
        title
        createdAt
        reactionCount
      }
    }
  }
`;
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      frets {
        _id
        webformatURL
        createdAt
        reactionCount
        reactions {
          _id
          createdAt
          reactionBody
          username
        }
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email 
    }
  }
`;
