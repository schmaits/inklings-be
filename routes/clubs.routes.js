const clubsRouter = require('express').Router();
const { getAllClubs, addNewClub, getOneClub, updateMembersList } = require('../controllers/clubs.controllers');

clubsRouter.get('/', getAllClubs);

clubsRouter.get('/:clubId', getOneClub);

clubsRouter.post('/', addNewClub);

clubsRouter.put('/:clubId/users', updateMembersList);

module.exports = clubsRouter;
