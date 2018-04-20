const apiRouter = require('express').Router();
const clubsRouter = require('./clubs.routes');
const booksRouter = require('./books.routes');
const usersRouter = require('./users.routes');
const commentsRouter = require('./comments.routes');

apiRouter.use('/clubs', clubsRouter);

apiRouter.use('/books', booksRouter);

apiRouter.use('/users', usersRouter);

apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;
