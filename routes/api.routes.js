const apiRouter = require('express').Router();
const clubsRouter = require('./clubs.routes');
const booksRouter = require('./books.routes');
const usersRouter = require('./users.routes');

apiRouter.use('/clubs', clubsRouter);

apiRouter.use('/books', booksRouter);

apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
