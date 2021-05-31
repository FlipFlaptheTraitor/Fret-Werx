import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_FRET = gql`
  mutation addFret($webformatURL: String!) {
    addFret(webformatURL: $webformatURL) {
      _id
      webformatURL
      createdAt
      username
      feedbackCount
      feedbacks {
        _id
      }
    }
  }
`;

export const ADD_FEEDBACK = gql`
  mutation addFeedback($fretId: ID!, $feedbackBody: String!) {
    addFeedback(fretId: $fretId, feedbackBody: $feedbackBody) {
      _id
      feedbackCount
      feedbacks {
        _id
        feedbackBody
        createdAt
        username
      }
    }
  }
`;
