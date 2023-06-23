/* eslint-disable linebreak-style */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
const User = require("../models/user");

const getUsers = (req, res) => {
  User.find({})
    .orFail(() => new Error("Not found"))
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err.message === "Not found") {
        res
          .status(400)
          .send({ message: "Переданы некорректные данные пользователя." });
      } else {
        res
          .status(500)
          .send({ message: "Internal server Error", err: err.message });
      }
    });
};

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .orFail(() => new Error("Not found"))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === "Not found") {
        res
          .status(404)
          .send({ message: "Пользователь по указанному _id не найден." });
      } else {
        res
          .status(500)
          .send({ message: "Internal server Error", err: err.message });
      }
    });
};

const createUser = (req, res) => {
  User.create(req.body)
    .orFail(() => new Error("Not found"))
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.message === "Not found") {
        res
          .status(400)
          .send({ message: "Переданы некорректные данные пользователя." });
      } else {
        res
          .status(500)
          .send({ message: "Internal server Error", err: err.message });
      }
    });
};

const updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .orFail(() => new Error("Not found"))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === "Not found") {
        res
          .status(404)
          .send({ message: "Пользователь по указанному _id не найден." });
      } else {
        res
          .status(500)
          .send({ message: "Internal server Error", err: err.message });
      }
    });
};

const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .orFail(() => new Error("Not found"))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.message === "Not found") {
        res
          .status(404)
          .send({ message: "Пользователь по указанному _id не найден." });
      } else {
        res
          .status(500)
          .send({ message: "Internal server Error", err: err.message });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
};
