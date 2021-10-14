const {
  AuthenticationError,
  UserInputError,
} = require('apollo-server-express');
const services = require('../services');

// get user
const getUser = async (parent, args, context) => {
  if (context.user) {
    return services.users.getOne({ id: context.user._id });
  }
  throw new AuthenticationError('you must be logged in');
};

// get all users
const getAllUsers = async () => services.users.getAll();

// add new user
const addUser = async (parent, args, context) => {
  const user = await services.users.create(args);
  if (!user) {
    throw new UserInputError('Invalid argument value');
  }
  const token = services.auth.signToken(user);
  return { token, user };
};

// log user in
const login = async (parent, args, context) => {
  const user = await services.users.authenticate(args);
  if (!user) {
    throw new UserInputError('User or password is incorrect');
  }
  const token = services.auth.signToken(user);
  return { token, user };
};

// save book to a user
const saveBook = async (parent, args, context) => {
  if (context.user) {
    const data = { ...args, userId: context.user._id };
    const updatedUser = await services.users.saveBook(data);
    return updatedUser;
  }
  throw new AuthenticationError('you must be logged in');
};

// delete book
const deleteBook = async (parent, args, context) => {
  if (context.user) {
    const data = { ...args, userId: context.user._id };
    const updatedUser = await services.users.deleteBook(data);
    if (!updatedUser) {
      throw new UserInputError(`Couldn't find user with this id!`);
    }
    return updatedUser;
  }
  throw new AuthenticationError('you must be logged in');
};

// resolvers
const resolvers = {
  Query: {
    users: getAllUsers,
    user: getUser,
  },

  Mutation: {
    addUser,
    login,
    saveBook,
    deleteBook,
  },
};

module.exports = resolvers;
