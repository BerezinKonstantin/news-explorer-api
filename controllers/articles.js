const Article = require('../models/articles');
const NotFoundError = require('../middlewares/errorHandlers/notFoundError');
const WrongDataError = require('../middlewares/errorHandlers/wrongDataError');
const ForbidenError = require('../middlewares/errorHandlers/wrongDataError');
const { notFoundArticleErrMsg, forbidenErrMsg, wrongDataErrMsg } = require('../constants/errMessages');

const getAllArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      res
        .status(200)
        .send(articles);
    })
    .catch((err) => next(err));
};

const deleteArticle = (req, res, next) => {
  Article.findOne({ _id: req.params.articleId })
    .orFail(new NotFoundError(notFoundArticleErrMsg))
    .then((article) => {
      if (String(article.owner) !== req.user._id) throw new ForbidenError(forbidenErrMsg);
      return Article.findOneAndDelete(article._id);
    })
    .then((article) => res.send(article))
    .catch((err) => next(err));
};

const postArticle = (req, res, next) => {
  const data = {
    keyword: req.body.keyword,
    title: req.body.title,
    text: req.body.text,
    date: req.body.date,
    source: req.body.source,
    image: req.body.image,
    link: req.body.link,
    owner: req.user._id,
  };
  Article.create(data)
    .then((article) => res.status(201).send(article))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new WrongDataError(wrongDataErrMsg);
      }
      next(err);
    })
    .catch((err) => next(err));
};

module.exports = {
  getAllArticles,
  deleteArticle,
  postArticle,
};
