/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable no-shadow */
/* eslint-disable quotes */
/* eslint-disable max-classes-per-file */
class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

class ValidError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

class ServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
}

const error = (err, req, res, next) => {
  let error;

  if (err.message === "Not found") {
    error = new NotFoundError("Пользователь по указанному _id не найден.");
  } else if (err.message === "Not found userId") {
    error = new NotFoundError("Пользователь по указанному _id не найден.");
  } else if (err.message === "Not found card") {
    error = new NotFoundError("Карточка с указанным _id не найдена.");
  } else if (err.message === "Not found cardId") {
    error = new NotFoundError(
      "Переданы некорректные данные для постановки/снятии лайка."
    );
  } else if (err.name === "CastError") {
    error = new ValidError("Переданы некорректные данные.");
  } else if (err.name === "ValidationError") {
    error = new ValidError("Переданы некорректные данные.");
  } else {
    error = new ServerError("Internal server Error");
  }

  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = error;
