const { User } = require('../models'); // import user model

const getOne = async ({ user = null, id, username }) => {
  const result = await User.findOne({
    $or: [{ _id: user ? user._id : id }, { username: username }],
  });
  return result;
};

const create = async (data) => {
  const result = await User.create(data);
  return result;
};

const authenticate = async ({ username, email, password }) => {
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    return null;
  }
  const isValid = await user.isCorrectPassword(password);
  return isValid ? user.toJSON() : null;
};

const saveBook = async ({ book, user }) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { $addToSet: { savedBooks: book } },
    { new: true, runValidators: true },
  );
  return updatedUser;
};

const deleteBook = async ({ userId, bookId }) => {
  const updatedUser = User.findOneAndUpdate(
    { _id: userId },
    { $pull: { savedBooks: { bookId: bookId } } },
    { new: true },
  );
  return updatedUser;
};

module.exports = {
  getOne,
  create,
  authenticate,
  saveBook,
  deleteBook,
};
