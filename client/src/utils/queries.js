import { gql } from '@apollo/client';

const GET_USER = gql`
  query getUser($email: String, $username: String, $id: ID) {
    user(email: $email, username: $username, id: $id) {
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

export { GET_USER };
