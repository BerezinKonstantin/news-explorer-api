# REST API для news-explorer

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

## Публичный IP-адрес

84.201.139.169

## Домен

Для обращения к API используется поддомен:
http://api.bko-news.students.nomoreparties.xyz
