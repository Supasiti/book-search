const services = require('../services');

// get user
const getUser = async (parent, args, context) => services.users.getOne(args);

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
// TODO - add context
const saveBook = async (parent, args, context) => {
  const updatedUser = await services.users.saveBook(args);
  return updatedUser;
};

// delete book
// TODO - add context
const deleteBook = async (parent, args, context) => {
  const updatedUser = await services.users.deleteBook(args);
  if (!updatedUser) {
    throw new UserInputError(`Couldn't find user with this id!`);
  }
  return updatedUser;
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
