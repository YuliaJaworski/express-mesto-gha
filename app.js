/* eslint-disable linebreak-style */
/* eslint-disable import/order */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");
const auth = require("./middlwares/auth");
const { createUser, login } = require("./controllers/users");
const error = require("./middlwares/error");
const { celebrate, Joi, errors } = require("celebrate");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());

const validateUserBody = celebrate({
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

app.post("/signin", validateUserBody, login);

app.post("/signup", validateUserBody, createUser);

app.use(auth);

app.use(userRoutes);
app.use(cardRoutes);

app.use("*", (req, res) => {
  res.status(404).send({ message: "Произошла ошибка на сервере" });
});

app.use(errors());
app.use(error);

app.listen(3000, () => {
  console.log("Слушаю порт 3000");
});
