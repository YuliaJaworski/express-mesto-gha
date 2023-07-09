/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getUsers,
  getUserById,
  updateUserInfo,
  updateUserAvatar,
  getUser,
} = require("../controllers/users");

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'Минимальная длина поля "name" - 2',
      "string.max": 'Максимальная длина поля "name" - 30',
    }),
    about: Joi.string().min(2).max(30).messages({
      "string.min": 'Минимальная длина поля "about" - 2',
      "string.max": 'Максимальная длина поля "about" - 30',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'Поле "password" должно быть заполнено',
    }),
    email: Joi.string()
      .required()
      .email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        "string.empty": 'Поле "email" должно быть заполнено',
      }),
    avatar: Joi.string()
      .uri()
      .message('Поле "avatar" должно быть валидным url-адресом'),
  }),
});

router.get("/users", getUsers);

router.get("/users/me", getUser);

router.get("/users/:id", validateUser, getUserById);

router.patch("/users/me", validateUser, updateUserInfo);

router.patch("/users/me/avatar", validateUser, updateUserAvatar);

// router.post("/signup", createUser);

// router.post("/signin", login);

module.exports = router;
