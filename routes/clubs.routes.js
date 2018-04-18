const clubsRouter = require('express').Router();
const { getAllClubs, addNewClub, getOneClub, updateMembersList, updateBooks, deleteClub } = require('../controllers/clubs.controllers');

clubsRouter.get('/', getAllClubs);

clubsRouter.get('/:clubId', getOneClub);

clubsRouter.post('/', addNewClub);

clubsRouter.put('/:clubId/users', updateMembersList);

clubsRouter.put('/:clubId/:updateField', updateBooks);

clubsRouter.delete('/:clubId', deleteClub)

module.exports = clubsRouter;
