const clubsRouter = require('express').Router();
const { getAllClubs } = require('../controllers/clubs.controllers');

clubsRouter.get('/', getAllClubs);

module.exports = clubsRouter;
