const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const AuthError = require('../middlewares/errorHandlers/authError');
const { wrongAuthErrMsg } = require('../constants/errMessages');
const { JWT_SECRET } = require('../constants/config');

const signIn = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(wrongAuthErrMsg);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(wrongAuthErrMsg);
          }
          const token = jwt.sign(
            { _id: user._id },
            JWT_SECRET,
            { expiresIn: '7d' },
          );
          res.send({
            name: user.name,
            email: user.email,
            token,
          });
        });
    })
    .catch((err) => next(err));
};

module.exports = signIn;
