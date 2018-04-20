const quotesRouter = require('express').Router();
const { getAllQuotes, addNewQuote } = require('../controllers/quotes.controllers');

quotesRouter.get('/', getAllQuotes);

quotesRouter.post('/books/:bookId', addNewQuote);

module.exports = quotesRouter;
