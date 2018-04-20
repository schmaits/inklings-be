const commentsRouter = require('express').Router();
const { getBookComments, getClubComments } = require('../controllers/comments.controllers');

commentsRouter.get('/books/:bookId', getBookComments);

commentsRouter.get('/clubs/:clubId', getClubComments);

module.exports = commentsRouter;
