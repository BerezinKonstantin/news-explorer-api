# REST API для news-explorer

Это backend для сервиса News Explorer:
https://github.com/BerezinKonstantin/news-explorer-frontend

Эта часть проекта представляет собой API для регистрации, аутентификации пользователей и сохранения статей.

## Функциональность

Запросы к API:

GET /users/me
возвращает информацию о пользователе (email и имя)

GET /articles
возвращает все сохранённые пользователем статьи

POST /articles
создаёт статью с переданными в теле keyword, title, text, date, source, link и image

DELETE /articles/articleId 
удаляет сохранённую статью  по _id

## Используемые технологии

- Node.js
- Express
- MongoDB

## Локальная установка

1. git clone https://github.com/BerezinKonstantin/news-explorer-api
2. cd news-explorer-api
3. npm i

## Запуск проекта

Для работы с проектом вам понадобятся NodeJS, MongoDB, Postman.

`npm run start` — запускает сервер   
`npm run dev` — запускает сервер с hot-reload

Локальный сервер доступен по адресу http://localhost:3001.
