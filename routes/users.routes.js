const usersRouter = require('express').Router();
const { getOneUser, getAllUsers } = require('../controllers/users.controllers');

usersRouter.get('/', getAllUsers);

usersRouter.get('/:usersId', getOneUser);

module.exports = usersRouter;
