require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');

const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHahdler');
const { DATA_BASE } = require('./constants/config');

const { PORT = 3000 } = process.env;

const whitelist = [
  'https://api.bko-news.students.nomoreparties.xyz',
  'http://api.bko-news.students.nomoreparties.xyz',
  'localhost:3000',
];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
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

app.options('*', cors());
app.use('*', cors(corsOptions));

app.use('/', router);

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // Централизованный обработчик ошибок

app.listen(PORT);
