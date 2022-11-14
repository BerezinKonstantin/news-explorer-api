require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { errors } = require("celebrate");

const router = require("./routes");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const rateLimiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHahdler");
const { DATA_BASE } = require("./constants/config");

const PORT = process.env.PORT || 3001;
const allowedCors = ["https://berezinkonstantin.github.io", "localhost:3000"];
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

app.use(function (req, res, next) {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  // сохраняем список заголовков исходного запроса
  const requestHeaders = req.headers["access-control-request-headers"];
  // Если это предварительный запрос, добавляем нужные заголовки
  if (method === "OPTIONS") {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header("Access-Control-Allow-Headers", requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }
  next();
});

app.use("/", router);

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // Централизованный обработчик ошибок

app.listen(PORT, () => {
  console.log(`Подключен порт: http://localhost:${PORT}`);
});
