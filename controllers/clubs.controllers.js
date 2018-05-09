const { getAllClubs, addNewClub, getOneClub, updateMembersList, updateCurrentlyReading, updateRead, deleteClub } = require('../lib/clubs.queries');

module.exports = {
	getAllClubs: (req, res) => {
		getAllClubs()
			.then(allClubs => {
				res.status(200).json({allClubs});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	},

	addNewClub: (req, res, next) => {
		let clubToBeAdded = req.body;
		addNewClub(clubToBeAdded)
			.then(newClub => {
				res.status(201).json({newClub});
			})
			.catch(err => {
				if (err.name === 'ValidationError') return next({ status: 400, msg: 'You have not supplied the required information to create a club'});
				res.status(500).send(err);
			});
	},
    
	getOneClub: (req, res, next) => {
		let clubId = req.params.clubId;
		getOneClub(clubId)
			.then(club => {
				if (!club) return next({ status: 404, msg: `No club with ID ${clubId}`});
				res.status(200).json({club});
			})
			.catch(err => {
				if (err.name === 'CastError') return next({ status: 400, msg: 'Invalid ID format' });
				res.status(500).send(err);
			});
	},

	updateMembersList: (req, res, next) => {
		const clubId = req.params.clubId;
		const updateQuery = req.query.update;
		const userId = req.body.userId;
		updateMembersList(clubId, updateQuery, userId)
			.then(updatedClub => {
				if (updatedClub === null) return next({ status: 404, msg: `Couldn't find the club with ID ${clubId}`});

				const updatedMemberList = updatedClub.members;
				res.status(200).json({updatedMemberList});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	},

	updateCurrentlyReading: (req, res, next) => {
		const clubId = req.params.clubId;
		const bookId = req.body.bookId;
		updateCurrentlyReading(clubId, bookId)
			.then(updatedClub => {
				if (updatedClub === null) return next({ status: 404, msg: `Couldn't find club with ID ${clubId}`});

				const updatedCurrentlyReading = updatedClub.currentlyReading;
				res.status(200).json({updatedCurrentlyReading});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	},

	updateRead: (req, res, next) => {
		const clubId = req.params.clubId;
		const bookId = req.body.bookId;
		updateRead(clubId, bookId)
			.then(updatedClub => {
				if (updatedClub === null) return next({ status: 404, msg: `Couldn't find club with ID ${clubId}`});
				
				const updatedReadList = updatedClub. read;
				res.status(200).json({updatedReadList});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	},

	deleteClub: (req, res, next) => {
		const clubId = req.params.clubId;
		const userId = req.body.userId;
		deleteClub(clubId, userId)
			.then(deleteConfirmation => {
				if (deleteConfirmation.n === 0 && deleteConfirmation.ok === 1 &&
				Object.keys(deleteConfirmation).length === 2) return next ({ status: 403, msg: 'This user is not the admin of this club' });
				res.status(200).json({deleteConfirmation});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	}
};
