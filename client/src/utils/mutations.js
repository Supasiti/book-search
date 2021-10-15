import { gql } from '@apollo/client';

const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
    }
  }
`;

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
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

const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      savedBooks {
        image
        bookId
        authors
        title
        description
      }
    }
  }
`;

export { ADD_USER, LOGIN, SAVE_BOOK, DELETE_BOOK };
