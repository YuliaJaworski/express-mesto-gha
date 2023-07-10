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

class TokenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

class DeleteError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
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
  } else if (err.message === "Пользователь не найден") {
    error = new TokenError("Введен несуществующий email");
  } else if (err.message === "Маршрут не найден.") {
    error = new NotFoundError("Маршрут не найден.");
  } else if (err.message === "необходима авторизация") {
    error = new TokenError("необходима авторизация");
  } else if (err.message === "Вы не можете удалить эту карточку") {
    error = new DeleteError("Вы не можете удалить эту карточку");
  } else if (err.name === "CastError") {
    error = new ValidError("Переданы некорректные данные.");
  } else if (err.name === "ValidationError") {
    error = new ValidError("Переданы некорректные данные.");
  } else if (err.name === "JsonWebTokenError") {
    error = new TokenError("Неверный JWT");
  } else {
    error = new ServerError("Internal server Error");
  }

  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = error;
