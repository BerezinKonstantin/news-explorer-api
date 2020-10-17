const jwt = require('jsonwebtoken');
const AuthError = require('./errorHandlers/authError');

const { JWT_SECRET, NODE_ENV } = process.env;
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AuthError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'veeeeery-secret-key');
  } catch (e) {
    throw new AuthError('Неверный токен');
  }
  req.user = payload;
  next();
};
