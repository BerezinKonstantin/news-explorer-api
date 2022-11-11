const bcrypt = require("bcryptjs");
const User = require("../models/users");
const ConflictError = require("../middlewares/errorHandlers/conflictError");
const WrongDataError = require("../middlewares/errorHandlers/wrongDataError");
const { conflictErrMsg, wrongDataErrMsg } = require("../constants/errMessages");

const signUp = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      })
    )
    .then((user) => {
      res.status(201).send({
        name: user.name,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.name === "MongoError") {
        throw new ConflictError(conflictErrMsg);
      }
      if (err.name === "ValidationError") {
        throw new WrongDataError(wrongDataErrMsg);
      }
      next(err);
    })
    .catch((err) => next(err));
};

module.exports = signUp;
