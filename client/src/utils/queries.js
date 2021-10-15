import { gql } from '@apollo/client';

const GET_USER = gql`
  query getUser {
    user {
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
