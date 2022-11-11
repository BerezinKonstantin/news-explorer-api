const articleRouter = require("express").Router();
const { celebrate, Joi } = require("celebrate");
const {
  getAllArticles,
  postArticle,
  deleteArticle,
} = require("../controllers/articles");

articleRouter.get("/", getAllArticles);
articleRouter.delete(
  "/:articleId",
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().alphanum().length(24),
    }),
  }),
  deleteArticle
);
articleRouter.post(
  "/",
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().uri(),
      image: Joi.string().required().uri(),
    }),
  }),
  postArticle
);

module.exports = articleRouter;
