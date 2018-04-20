const commentsRouter = require('express').Router();
const { getBookComments } = require('../controllers/comments.controllers');

commentsRouter.get('/books/:bookId', getBookComments);

module.exports = commentsRouter;
