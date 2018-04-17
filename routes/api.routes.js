const apiRouter = require('express').Router();
const clubsRouter = require('./clubs.routes');

apiRouter.use('/clubs', clubsRouter);

module.exports = apiRouter;
