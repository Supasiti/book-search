const services = require('../services');

const getUser = async (parent, args, context) => services.users.getOne(args);

const getAllUsers = async () => services.users.getAll();

const addUser = async (parent, args, context) => {
  const user = await services.users.create(args);
  if (!user) {
    throw new UserInputError('Invalid argument value');
  }
  const token = services.auth.signToken(user);
  return { token, user };
};

// resolvers
const resolvers = {
  Query: {
    users: getAllUsers,
    user: getUser,
  },

  Mutation: {
    addUser,
  },
  // Mutation: {
  //   addThought: async (parent, { thoughtText, thoughtAuthor }) => {
  //     return Thought.create({ thoughtText, thoughtAuthor });
  //   },
  //   addComment: async (parent, { thoughtId, commentText }) => {
  //     return Thought.findOneAndUpdate(
  //       { _id: thoughtId },
  //       {
  //         $addToSet: { comments: { commentText } },
  //       },
  //       {
  //         new: true,
  //         runValidators: true,
  //       },
  //     );
  //   },
  //   removeThought: async (parent, { thoughtId }) => {
  //     return Thought.findOneAndDelete({ _id: thoughtId });
  //   },
  //   removeComment: async (parent, { thoughtId, commentId }) => {
  //     return Thought.findOneAndUpdate(
  //       { _id: thoughtId },
  //       { $pull: { comments: { _id: commentId } } },
  //       { new: true },
  //     );
  //   },
  // },
};

module.exports = resolvers;
