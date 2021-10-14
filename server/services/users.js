const { User } = require('../models'); // import user model

const getAll = async () => {
  const result = await User.find({});
  return result;
};

const getOne = async ({ id, email, username }) => {
  const result = await User.findOne({
    $or: [{ _id: id }, { email }, { username }],
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

// save a book to a user's `savedBooks` field by adding it to the set
// (to prevent duplicates)
const saveBook = async ({ userId, ...book }) => {
  console.log(book);
  const updatedUser = await User.findOneAndUpdate(
    { _id: userId },
    { $addToSet: { savedBooks: book } },
    { new: true, runValidators: true },
  );
  return updatedUser;
};

// remove a book from `savedBooks`
const deleteBook = async ({ userId, bookId }) => {
  const updatedUser = User.findOneAndUpdate(
    { _id: userId },
    { $pull: { savedBooks: { bookId: bookId } } },
    { new: true },
  );
  return updatedUser;
};

module.exports = {
  getAll,
  getOne,
  create,
  authenticate,
  saveBook,
  deleteBook,
};
