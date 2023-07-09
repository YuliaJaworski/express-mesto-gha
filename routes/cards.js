/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
const routerCard = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      "string.min": 'Минимальная длина поля "name" - 2',
      "string.max": 'Максимальная длина поля "name" - 30',
    }),
    link: Joi.string()
      .uri({
        scheme: [/https?/],
      })
      .message('Поле "link" должно быть валидным url-адресом'),
  }),
});

routerCard.get("/cards", getCards);

routerCard.delete(
  "/cards/:id",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
    }),
  }),
  deleteCardById
);

routerCard.post("/cards", validateCard, createCard);

routerCard.put(
  "/cards/:id/likes",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
    }),
  }),
  likeCard
);

routerCard.delete(
  "/cards/:id/likes",
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().alphanum().length(24),
    }),
  }),
  dislikeCard
);

module.exports = routerCard;
