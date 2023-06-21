/* eslint-disable linebreak-style */
const users = [];
let id = 0;

const getUsers = (req, res) => {
  res.status(200).send(users);
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find((item) => item.id === Number(id));
  if (user) {
    return res.status(200).send(user);
  }

  return res.status(404).send({ message: "User not found" });
};

const createUser = (req, res) => {
  id += 1;
  const newUser = {
    id,
    ...req.body,
  };
  users.push(newUser);
  res.status(201).send(newUser);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
};
