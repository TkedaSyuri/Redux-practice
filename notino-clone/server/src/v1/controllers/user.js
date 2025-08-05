const CryptJS = require("crypto-js");
const JWT = require("jsonwebtoken");

const User = require("../models/user");

//ユーザー登録API
exports.register = async (req, res) => {
  const password = req.body.password;

  try {
    req.body.password = CryptJS.AES.encrypt(password, process.env.SECRET_KEY);
    const user = await User.create(req.body);
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });

    return res.status(200).json({ user, token });
  } catch (err) {
    return res.status(500).json(err);
  }
};
//ログインAPI
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
        return  res.status(401).json({
        errors: [{
          param: "username",
          msg: "ユーザーが無効です。",
        }],
      });
    }
    const decryptedPassword = CryptJS.AES.decrypt(
      user.password,
      process.env.SECRET_KEY
    ).toString(CryptJS.enc.Utf8);
    if (decryptedPassword !== password) {
      return res.status(401).json({
        errors: [{
          param: "password",
          msg: "パスワードが無効です。",
        }],
      });
    }
    const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "24h",
    });
    return res.status(201).json({user,token})
  } catch (err) {
    res.status(500).json(err);
  }
};
