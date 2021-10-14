const services = require('../services');

const getUser = async (parent, args, context) => {
  console.log(args);
  return services.users.getOne(args);
  // return Thought.find().sort({ createdAt: -1 });
};

const getAllUsers = async () => {
  return services.users.getAll();
};

const resolvers = {
  Query: {
    users: getAllUsers,
    user: getUser,
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
