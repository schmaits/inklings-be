const booksRouter = require('express').Router();
const { getAllBooks, getOneBook, addNewBook, updateRating } = require('../controllers/books.controllers');

booksRouter.get('/', getAllBooks);

booksRouter.get('/:bookId', getOneBook);

booksRouter.post('/', addNewBook);

booksRouter.put('/:bookId', updateRating);

module.exports = booksRouter;
