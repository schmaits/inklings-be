const clubsRouter = require('express').Router();
const { getAllClubs, addNewClub, getOneClub, updateMembersList, updateCurrentlyReading, updateRead } = require('../controllers/clubs.controllers');

clubsRouter.get('/', getAllClubs);

clubsRouter.get('/:clubId', getOneClub);

clubsRouter.post('/', addNewClub);

clubsRouter.put('/:clubId/users', updateMembersList);

clubsRouter.put('/:clubId/currentlyReading', updateCurrentlyReading);

clubsRouter.put('/:clubId/read', updateRead);

module.exports = clubsRouter;
