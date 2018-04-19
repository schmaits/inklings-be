const usersRouter = require('express').Router();
const { getOneUser, getAllUsers, updateCurrentlyReading, updateToRead, updateBooksRead } = require('../controllers/users.controllers');

usersRouter.get('/', getAllUsers);

usersRouter.get('/:usersId', getOneUser);

usersRouter.put('/:userId/currentlyReading', updateCurrentlyReading);

usersRouter.put('/:userId/ToRead', updateToRead);

usersRouter.put('/:userId/booksRead', updateBooksRead)

module.exports = usersRouter;
