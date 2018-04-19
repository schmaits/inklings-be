const usersRouter = require('express').Router();
const { getOneUser, getAllUsers, updateCurrentlyReading, updateToRead } = require('../controllers/users.controllers');

usersRouter.get('/', getAllUsers);

usersRouter.get('/:usersId', getOneUser);

usersRouter.put('/:userId/currentlyReading', updateCurrentlyReading);

usersRouter.put('/:userId/ToRead', updateToRead);

module.exports = usersRouter;
