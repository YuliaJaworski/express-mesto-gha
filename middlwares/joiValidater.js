/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
const { celebrate, Joi } = require("celebrate");

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
      .uri({
        scheme: [/https?/],
      })
      .message('Поле "avatar" должно быть валидным url-адресом'),
  }),
});

module.exports = validateUserBody;
