/* eslint-disable linebreak-style */
/* eslint-disable newline-per-chained-call */
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
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'Минимальная длина поля "name" - 2',
      "string.max": 'Максимальная длина поля "name" - 30',
    }),
    link: Joi.string()
      .required()
      .uri({
        scheme: [/https?/],
      })
      .message('Поле "link" должно быть валидным url-адресом'),
  }),
});

const validateCardId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

routerCard.get("/cards", getCards);

routerCard.delete("/cards/:id", validateCardId, deleteCardById);

routerCard.post("/cards", validateCard, createCard);

routerCard.put("/cards/:id/likes", validateCardId, likeCard);

routerCard.delete("/cards/:id/likes", validateCardId, dislikeCard);

module.exports = routerCard;
