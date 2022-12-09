import User from '../models/User';

// Update user
export const updateUser = async (req, res) => {
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body },
    { new: true },
  );
  res.status(200).json(updatedUser);
};

// delete user
export const deleteUser = async (req, res) => {
  await User.findOneAndDelete({ _id: req.params.id });
  res.status(200).json({ msg: 'User has been deleted.' });
};

// get user
export const getUser = async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });
  res.status(200).json(user);
};

// get all users
export const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};
