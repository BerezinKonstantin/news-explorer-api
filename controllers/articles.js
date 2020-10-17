const Article = require('../models/articles');
const NotFoundError = require('../middlewares/errorHandlers/notFoundError');
const WrongDataError = require('../middlewares/errorHandlers/wrongDataError');

const getAllArticles = (req, res, next) => {
  Article.find({})
    .then((articles) => {
      res
        .status(200)
        .send(articles);
    })
    .catch((err) => next(err));
};

const deleteArticleById = (req, res, next) => {
  Article.findOneAndDelete({ _id: req.params.articleId, owner: req.user._id })
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((article) => res.send(article))
    .catch((err) => next(err));
};

const createArticle = (req, res, next) => {
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
    .then((article) => res.send(article))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new WrongDataError('Переданы некорректные данные');
      }
      next(err);
    })
    .catch((err) => next(err));
};

module.exports = {
  getAllArticles,
  deleteArticleById,
  createArticle,
};
