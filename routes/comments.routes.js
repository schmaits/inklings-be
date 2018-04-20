const commentsRouter = require('express').Router();
const { getBookComments, getClubComments, addNewComment } = require('../controllers/comments.controllers');

commentsRouter.get('/books/:bookId', getBookComments);

commentsRouter.get('/clubs/:clubId', getClubComments);

commentsRouter.post('/clubs/:clubId/books/:bookId', addNewComment);

module.exports = commentsRouter;
