const booksRouter = require('express').Router();
const { getAllBooks, getOneBook } = require('../controllers/books.controllers');

booksRouter.get('/', getAllBooks);

booksRouter.get('/:bookId', getOneBook);

module.exports = booksRouter;
