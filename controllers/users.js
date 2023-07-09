/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

// получить всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => new Error("Not found"))
    .then((users) => res.status(200).send(users))
    .catch(next);
};

// получить пользователя по id
const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => new Error("Not found"))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new Error("Not found"))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

// создать пользователя
const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) {
      return res
        .status(409)
        .send({ message: "Пользователь с таким email уже существует" });
    }
  });

  bcrypt
    .hash(String(password), 10)
    .then((hashPassword) => {
      User.create({ name, about, avatar, email, password: hashPassword })
        .then((user) => res.status(201).send(user))
        .catch(next);
    })
    .catch(next);
};

// изменить данные пользователя
const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true }
  )
    .orFail(() => new Error("Not found userId"))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

// изменить аватар пользователя
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true })
    .orFail(() => new Error("Not found userId"))
    .then((user) => res.status(200).send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(401).send({ message: "введите данные" });
    return;
  }
  User.findOne({ email })
    .select("+password")
    .orFail(() => new Error("Пользователь не найден"))
    .then((user) => {
      bcrypt.compare(String(password), user.password).then((isValidUser) => {
        if (isValidUser) {
          const jwt = jsonwebtoken.sign(
            {
              _id: user._id,
            },
            "SECRET"
          );
          res.cookie("jwt", jwt, {
            maxAge: 360000,
            httpOnly: true,
          });
          res.send({ data: user.toJSON() });
        } else {
          res.status(401).send({ message: "неправильный email или пароль" });
        }
      });
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
  login,
  getUser,
};
