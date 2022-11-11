const router = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const userRouter = require("./users");
const articleRouter = require("./articles");
const signUp = require("../controllers/signup");
const signIn = require("../controllers/signin");
const auth = require("../middlewares/auth");
const NotFoundError = require("../middlewares/errorHandlers/notFoundError");
const { notFoundPageErrMsg } = require("../constants/errMessages");

router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  signIn
);
router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  signUp
);

router.use("/users", auth, userRouter);
router.use("/articles", auth, articleRouter);

router.use("/*", (req, res, next) =>
  next(new NotFoundError(notFoundPageErrMsg))
);

module.exports = router;
