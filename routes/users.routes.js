const usersRouter = require('express').Router();
const { getOneUser, getAllUsers, updateCurrentlyReading } = require('../controllers/users.controllers');

usersRouter.get('/', getAllUsers);

usersRouter.get('/:usersId', getOneUser);

usersRouter.put('/:userId/currentlyReading', updateCurrentlyReading);

module.exports = usersRouter;
