const booksRouter = require('express').Router();
const { getAllBooks, getOneBook, addNewBook } = require('../controllers/books.controllers');

booksRouter.get('/', getAllBooks);

booksRouter.get('/:bookId', getOneBook);

booksRouter.post('/', addNewBook);

module.exports = booksRouter;
