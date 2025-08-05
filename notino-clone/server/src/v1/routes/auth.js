const router = require("express").Router();
const { body } = require("express-validator");

require("dotenv").config();

const User = require("../models/user");
const validation = require("../handlers/validation");
const userController = require("../controllers/user");
const tokenHandller = require("../handlers/tokenHandller");

router.post(
  "/register",
  body("username")
    .isLength({ min: 5 })
    .withMessage("ユーザー名は５文字以上入力して下さい。"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("パスワードは５文字以上入力して下さい。"),
  body("confirmPassword")
    .isLength({ min: 5 })
    .withMessage("確認用パスワードは５文字以上入力して下さい。"),
  body("username").custom((value) => {
    return User.findOne({ username: value }).then((user) => {
      if (user) {
        return Promise.reject("このユーザーはすでに使われています");
      }
    });
  }),
  validation.validate,
  userController.register
);

router.post(
  "/login",
  body("username")
    .isLength({ min: 5 })
    .withMessage("ユーザー名は５文字以上入力して下さい。"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("passwordは5文字以上入力して下さい。"),
  validation.validate,
  userController.login
);

router.post("/verify-token", tokenHandller.verifyToken, async (req, res) => {
  return res.status(200).json({ user: req.user });
});

module.exports = router;
