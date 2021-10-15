import { gql } from '@apollo/client';

const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

const SAVE_BOOK = gql`
  mutation saveBook(
    $authors: [String]
    $title: String!
    $description: String!
    $bookId: String!
    $image: String
    $link: String
  ) {
    saveBook(
      authors: $authors
      title: $title
      description: $description
      bookId: $bookId
      image: $image
      link: $link
    ) {
      username
      savedBooks {
        title
      }
    }
  }
`;

export { ADD_USER, LOGIN, SAVE_BOOK };
