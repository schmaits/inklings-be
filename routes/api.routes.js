const apiRouter = require('express').Router();
const clubsRouter = require('./clubs.routes');
const booksRouter = require('./books.routes');

apiRouter.use('/clubs', clubsRouter);

apiRouter.use('/books', booksRouter);

module.exports = apiRouter;
