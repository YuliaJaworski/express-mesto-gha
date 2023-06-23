/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
const routerCard = require("express").Router();
const {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
} = require("../controllers/cards");

routerCard.get("/cards", getCards);

routerCard.delete("/cards/:id", deleteCardById);

routerCard.post("/cards", createCard);

routerCard.put("/cards/:id/likes", likeCard);

routerCard.delete("/cards/:id/likes", dislikeCard);

module.exports = routerCard;
