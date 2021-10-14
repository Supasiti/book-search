const services = require('../services');
const { signToken } = require('../utils/auth'); // import sign token function from auth

const getSingleUser = async (req, res) => {
  const query = {
    id: req.user ? req.user._id : req.params.id,
    username: req.params.username,
  };
  const foundUser = await services.users.getOne(query);

  if (!foundUser) {
    return res
      .status(400)
      .json({ message: 'Cannot find a user with this id!' });
  }

  res.json(foundUser);
};

const createUser = async ({ body }, res) => {
  const user = await services.users.create(body);

  if (!user) {
    return res.status(400).json({ message: 'Something is wrong!' });
  }
  const token = signToken(user);
  res.json({ token, user });
};

// login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
// {body} is destructured req.body
const login = async ({ body }, res) => {
  const user = await services.users.authenticate(body);
  if (!user) {
    return res.status(400).json({ message: 'User or password is incorrect' });
  }
  const token = signToken(user);
  res.json({ token, user });
};

// save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
// user comes from `req.user` created in the auth middleware function
const saveBook = async ({ user, body }, res) => {
  const data = { userId: user._id, ...body };
  console.log(data);
  try {
    const updatedUser = await services.users.saveBook(data);
    return res.json(updatedUser);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

// remove a book from `savedBooks`
const deleteBook = async ({ user, params }, res) => {
  const data = { userId: user._id, bookId: params.bookId };
  const updatedUser = await services.users.deleteBook(data);
  if (!updatedUser) {
    return res
      .status(404)
      .json({ message: "Couldn't find user with this id!" });
  }
  return res.json(updatedUser);
};

module.exports = {
  getSingleUser,
  createUser,
  login,
  saveBook,
  deleteBook,
};
