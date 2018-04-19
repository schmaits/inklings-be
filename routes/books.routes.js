const booksRouter = require('express').Router();
const { getAllBooks } = require('../controllers/books.controllers');

booksRouter.get('/', getAllBooks);

module.exports = booksRouter;
