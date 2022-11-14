require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const { errors } = require("celebrate");

const router = require("./routes");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const rateLimiter = require("./middlewares/rateLimiter");
const errorHandler = require("./middlewares/errorHahdler");
const { DATA_BASE } = require("./constants/config");

const PORT = process.env.PORT || 3001;
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

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://bko-news.students.nomoreparties.xyz",
      "https://bko-news.students.nomoreparties.xyz",
    ],
    credentials: true,
  })
);

app.use("/", router);

app.use(errorLogger);

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // Централизованный обработчик ошибок

app.listen(PORT, () => {
  console.log(`Подключен порт: http://localhost:${PORT}`);
});
