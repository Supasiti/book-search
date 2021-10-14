const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    savedBooks: [Book]
    bookCount: Int
  }

  type Book {
    _id: ID
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    users: [User]!
    user(id: ID, email: String): User
  }

  type Mutation {
    addUser(username: String!, password: String!, email: String!): Auth
  }
`;

module.exports = typeDefs;
