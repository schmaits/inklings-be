const usersRouter = require('express').Router();
const { getOneUser } = require('../controllers/users.controllers');

usersRouter.get('/:usersId', getOneUser);

module.exports = usersRouter;
