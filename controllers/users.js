// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
const User = require('../models/users');
const NotFoundError = require('../middlewares/errorHandlers/notFoundError');
// const WrongDataError = require('../middlewares/errorHandlers/wrongDataError');
// const AuthError = require('../middlewares/errorHandlers/authError');
// const ConflictError = require('../middlewares/errorHandlers/conflictError');

// const { NODE_ENV, JWT_SECRET } = process.env;

const getUserInfo = (req, res, next) => {
  User.findOne({ _id: req.params.userId })
    .orFail(new NotFoundError('Нет пользователя с таким id'))
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((err) => next(err));
};

/* const registerUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    }))
    .then((user) => {
      res
        .status(200)
        .send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        });
    })
    .catch((err) => {
      if (err.name === 'MongoError') {
        throw new ConflictError('Пользователь с таким email уже существует');
      }
      if (err.name === 'ValidationError') {
        throw new WrongDataError('Переданы некорректные данные');
      }
      next(err);
    })
    .catch((err) => next(err));
};
*/

/* const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильные почта или пароль!'));
      }
      return bcrypt.compare(password, user.password)
        // eslint-disable-next-line consistent-return
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new AuthError('Неправильные почта или пароль'));
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'veeeeery-secret-key',
            { expiresIn: '7d' });
          res.cookie('token', token, { httpOnly: true, sameSite: true });
          res.send({
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
          });
        });
    })
    .catch((err) => next(err));
};
*/

module.exports = {
  getUserInfo,
  // registerUser,
  // login,
};
