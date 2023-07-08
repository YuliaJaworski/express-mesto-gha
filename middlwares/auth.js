/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable eol-last */
/* eslint-disable linebreak-style */
// eslint-disable-next-line quotes
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, "SECRET");
  } catch (err) {
    next(err);
  }

  req.user = payload;
  next();
};

module.exports = auth;
