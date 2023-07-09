/* eslint-disable linebreak-style */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
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
        scheme: ["git", /git\+https?/],
      })
      .message('Поле "link" должно быть валидным url-адресом'),
  }),
});

const validateId = (req, res, next) => {
  const idValid = Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required();
  const { error } = idValid.validate(req.params.id);
  if (error) {
    return res.status(400).json({ message: "Некорректный id" });
  }
  next();
};

routerCard.get("/cards", getCards);

routerCard.delete("/cards/:id", validateId, deleteCardById);

routerCard.post("/cards", validateCard, createCard);

routerCard.put("/cards/:id/likes", validateId, likeCard);

routerCard.delete("/cards/:id/likes", validateId, dislikeCard);

module.exports = routerCard;
