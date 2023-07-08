/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable quotes */
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");
const auth = require("./middlwares/auth");
const { createUser, login } = require("./controllers/users");
const error = require("./middlwares/error");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cookieParser());

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use(userRoutes);
app.use(cardRoutes);

app.use("*", (req, res) => {
  res.status(404).send({ message: "Произошла ошибка на сервере" });
});

app.use(error);

app.listen(3000, () => {
  console.log("Слушаю порт 3000");
});
