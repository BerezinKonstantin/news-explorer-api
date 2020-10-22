const User = require('../models/users');
const NotFoundError = require('../middlewares/errorHandlers/notFoundError');
const { notFoundUserErrMsg } = require('../constants/errMessages');

const getUserInfo = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .orFail(new NotFoundError(notFoundUserErrMsg))
    .then((user) => {
      res
        .status(200)
        .send(user);
    })
    .catch((err) => next(err));
};

module.exports = getUserInfo;
