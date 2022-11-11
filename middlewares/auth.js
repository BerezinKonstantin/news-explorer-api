const jwt = require("jsonwebtoken");
const AuthError = require("./errorHandlers/authError");
const { authErrMsg, wrongTokenErrMsg } = require("../constants/errMessages");
const { JWT_SECRET } = require("../constants/config");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AuthError(authErrMsg);
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    throw new AuthError(wrongTokenErrMsg);
  }
  req.user = payload;
  next();
};
