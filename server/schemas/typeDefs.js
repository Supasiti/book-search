const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    _id: ID
    thoughtText: String
    thoughtAuthor: String
    createdAt: String
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    commentText: String
    createdAt: String
  }

  type Query {
    thoughts: [Thought]!
    thought(thoughtId: ID!): Thought
  }
`;

module.exports = typeDefs;
