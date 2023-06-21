/* eslint-disable quotes */
/* eslint-disable linebreak-style */
const express = require("express");
const userRoutes = require("./routes/users");

const app = express();

app.use(express.json());

app.use(userRoutes);

app.listen(3000, () => {
  console.log("Слушаю порт 3000");
});
