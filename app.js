require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHahdler');
const { DATA_BASE } = require('./constants/config');

const allowedCors = [
  'http://bko-news.students.nomoreparties.xyz',
  'https://bko-news.students.nomoreparties.xyz',
  'http://localhost:3000',
];
const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(DATA_BASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(rateLimiter);
app.use(helmet());
app.use(bodyParser.json());

app.use(requestLogger);

// CORS
app.use((req, res, next) => {
  const { origin } = req.headers;
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization, Origin, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  next();
});

app.use('/', router);

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // Централизованный обработчик ошибок

app.listen(PORT);
