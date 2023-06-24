/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const cardRoutes = require("./routes/cards");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/mestodb", {
  useNewUrlParser: true,
});

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: "6493f2839932b64635c39736",
  };

  next();
});

app.use(userRoutes);
app.use(cardRoutes);

app.use("*", (req, res) => {
  res.status(404).send({ message: "Произошла ошибка на сервере" });
});

app.listen(3000, () => {
  console.log("Слушаю порт 3000");
});
