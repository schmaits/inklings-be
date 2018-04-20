const quotesRouter = require('express').Router();
const { getAllQuotes } = require('../controllers/quotes.controllers');

quotesRouter.get('/', getAllQuotes);

module.exports = quotesRouter;
