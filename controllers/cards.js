/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
/* eslint-disable function-paren-newline */
/* eslint-disable comma-dangle */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
const Card = require("../models/card");

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
  // .catch((err) => {
  //   res
  //     .status(500)
  //     .send({ message: "Internal server Error", err: err.message });
  // });
};

const deleteCardById = (req, res, next) => {
  if (req.params.owner._id !== req.user._id) {
    res.status(403).send({ message: "Попытка удалить чужую карточку." });
    return;
  }
  Card.findByIdAndRemove(req.params.id)
    .orFail(() => new Error("Not found card"))
    .then(() => res.status(200).send({ message: "Карточка удалена" }))
    .catch(next);
  // .catch((err) => {
  //   if (err.message === "Not found card") {
  //     res
  //       .status(404)
  //       .send({ message: "Карточка с указанным _id не найдена." });
  //   } else if (err.name === "CastError") {
  //     res.status(400).send({
  //       message: "Передан несуществующий _id карточки.",
  //       err: err.message,
  //     });
  //   } else {
  //     res
  //       .status(500)
  //       .send({ message: "Internal server Error", err: err.message });
  //   }
  // });
};

const createCard = (req, res, next) => {
  console.log(req.user._id);
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch(next);
  // .catch((err) => {
  //   if (err.name === "ValidationError") {
  //     res.status(400).send({
  //       message: "Переданы некорректные данные при создании карточки.",
  //     });
  //   } else {
  //     res
  //       .status(500)
  //       .send({ message: "Internal server Error", err: err.message });
  //   }
  // });
};

const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .orFail(() => new Error("Not found cardId"))
    .then((like) => res.status(200).send(like))
    .catch(next);
  // .catch((err) => {
  //   if (err.message === "Not found cardId") {
  //     res.status(404).send({
  //       message: "Переданы некорректные данные для постановки/снятии лайка.",
  //     });
  //   } else if (err.name === "CastError") {
  //     res.status(400).send({
  //       message: "Передан несуществующий _id карточки.",
  //       err: err.message,
  //     });
  //   } else {
  //     res
  //       .status(500)
  //       .send({ message: "Internal server Error", err: err.message });
  //   }
  // });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .orFail(() => new Error("Not found cardId"))
    .then((like) => res.status(200).send(like))
    .catch(next);
  // .catch((err) => {
  //   if (err.message === "Not found cardId") {
  //     res.status(404).send({
  //       message: "Переданы некорректные данные для постановки/снятии лайка.",
  //     });
  //   } else if (err.name === "CastError") {
  //     res.status(400).send({
  //       message: "Передан несуществующий _id карточки.",
  //       err: err.message,
  //     });
  //   } else {
  //     res
  //       .status(500)
  //       .send({ message: "Internal server Error", err: err.message });
  //   }
  // });
};

module.exports = {
  getCards,
  deleteCardById,
  createCard,
  likeCard,
  dislikeCard,
};
