/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
const Card = require("../models/card");

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Internal server Error", err: err.message });
    });
};

const deleteCardById = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => new Error("Not found"))
    .then(() => res.status(200).send({ message: "Карточка удалена" }))
    .catch((err) => {
      if (err.message === "Not found") {
        res
          .status(404)
          .send({ message: "Карточка с указанным _id не найдена." });
      } else {
        res
          .status(400)
          .send({ message: "Internal server Error", err: err.message });
      }
    });
};

const createCard = (req, res) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (!name || !link || name.length < 2 || name.length > 30) {
        res.status(400).send({
          message: "Переданы некорректные данные при создании карточки.",
        });
      } else {
        res
          .status(500)
          .send({ message: "Internal server Error", err: err.message });
      }
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(() => new Error("Not found"))
    .then((like) => res.status(200).send(like))
    .catch((err) => {
      if (err.message === "Not found") {
        res.status(404).send({
          message: "Переданы некорректные данные для постановки/снятии лайка.",
        });
      } else {
        res.status(400).send({
          message: "Передан несуществующий _id карточки.",
          err: err.message,
        });
      }
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail(() => new Error("Not found"))
    .then((like) => res.status(200).send(like))
    .catch((err) => {
      if (err.message === "Not found") {
        res.status(404).send({
          message: "Переданы некорректные данные для постановки/снятии лайка.",
        });
      } else {
        res.status(400).send({
          message: "Передан несуществующий _id карточки.",
          err: err.message,
        });
      }
    });
};

module.exports = {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
};
