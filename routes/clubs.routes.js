const clubsRouter = require('express').Router();
const { getAllClubs, addNewClub, getOneClub } = require('../controllers/clubs.controllers');

clubsRouter.get('/', getAllClubs);

clubsRouter.get('/:clubId', getOneClub);

clubsRouter.post('/', addNewClub);

module.exports = clubsRouter;
