import gql from 'graphql-tag';

export const QUERY_FRETS = gql`
  query frets($username: String) {
    frets(username: $username) {
      _id
      webformatURL
      title
      fretText
      createdAt
      username
      feedbackCount
      feedbacks {
        _id
        createdAt
        username
        feedbackBody
      }
    }
  }
`;

export const QUERY_FRET = gql`
  query fret($id: ID!) {
    fret(_id: $id) {
      _id
      webformatURL
      title
      fretText
      createdAt
      username
      feedbackCount
      feedbacks {
        _id
        createdAt
        username
        feedbackBody
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
        feedbackCount
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
       feedbackCount
        feedbacks {
          _id
          createdAt
         feedbackBody
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
