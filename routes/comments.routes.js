const commentsRouter = require('express').Router();
const { getBookComments, getClubComments, addNewComment, deleteComment } = require('../controllers/comments.controllers');

commentsRouter.get('/books/:bookId', getBookComments);

commentsRouter.get('/clubs/:clubId', getClubComments);

commentsRouter.post('/clubs/:clubId/books/:bookId', addNewComment);

commentsRouter.delete('/:commentId', deleteComment);

module.exports = commentsRouter;
