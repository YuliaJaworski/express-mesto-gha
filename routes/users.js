/* eslint-disable linebreak-style */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
const router = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUserInfo,
  updateUserAvatar,
} = require("../controllers/users");

router.get("/users", getUsers);

router.get("/users/:id", getUserById);

router.post("/users", createUser);

router.patch("/users/me", updateUserInfo);

router.patch("/users/me/avatar", updateUserAvatar);

// router.post("/signup", createUser);

// router.post("/signin", login);

module.exports = router;
