const clubsRouter = require('express').Router();
const { getAllClubs, addNewClub } = require('../controllers/clubs.controllers');

clubsRouter.get('/', getAllClubs);

clubsRouter.post('/', addNewClub);

module.exports = clubsRouter;
