/* eslint-disable linebreak-style */
/* eslint-disable import/order */
/* eslint-disable comma-dangle */
/* eslint-disable function-paren-newline */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { errors } = require("celebrate");
const helmet = require("helmet");

const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");
const auth = require("./middlwares/auth");
const { createUser, login } = require("./controllers/users");
const error = require("./middlwares/error");
const validateUserBody = require("./middlwares/joiValidater");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());
app.use(helmet());

app.post("/signin", validateUserBody, login);

app.post("/signup", validateUserBody, createUser);

app.use(auth);

app.use(userRoutes);
app.use(cardRoutes);

app.use("*", (req, res, next) => {
  next(new Error("Маршрут не найден."));
});

app.use(errors());
app.use(error);

app.listen(3000, () => {
  console.log("Слушаю порт 3000");
});
