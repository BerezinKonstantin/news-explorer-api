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
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Authorization, Origin, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.use('/', router);

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // Централизованный обработчик ошибок

app.listen(PORT);
