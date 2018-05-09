const { Clubs } = require('../models/models');

module.exports = {
	getAllClubs: () => {
		return Clubs.find({})
			.then(allClubs => {
				return allClubs;
			})
			.catch(err => {
				throw err;
			});
	},

	addNewClub: (newClub) => {
		return new Clubs(newClub).save()
			.then((addedClubReponse) => {
				return addedClubReponse;
			})
			.catch((err) => {
				throw err;
			});
	},

	getOneClub: (clubId) => {
		return Clubs.findOne({_id: clubId})
			.then(club => {
				return club;
			})
			.catch(err => {
				throw err;
			});
	},

	updateMembersList: (clubId, updateQuery, userId) => {
		if (updateQuery === 'add') {
			return Clubs.findOneAndUpdate(
				{ _id: clubId }, 
				{ $addToSet: { members: userId } },
				{ 'new': true })
				.then(updatedClub => {
					return updatedClub.members;
				})
				.catch(err => {
					throw err;
				});
		}
		else if (updateQuery === 'remove') {
			return Clubs.findOneAndUpdate(
				{ _id: clubId },
				{ $pull: { members: userId } },
				{ 'new': true })
				.then(updatedClub => {
					return updatedClub.members;
				})
				.catch(err => {
					throw err;
				});
		}
	},

	updateCurrentlyReading: (clubId, bookId) => {
		return Clubs.findOneAndUpdate(
			{ _id: clubId },
			{ currentlyReading: bookId },
			{ 'new': true })
			.then(updatedClub => {
				return updatedClub.currentlyReading;
			})
			.catch(err => {
				throw err;
			});
	},

	updateRead: (clubId, bookId) => {
		return Clubs.findOneAndUpdate(
			{ _id: clubId },
			{ $addToSet: { read: bookId } },
			{ 'new': true })
			.then(updatedClub => {
				return updatedClub.read;
			})
			.catch(err => {
				throw err;
			});
	},

	deleteClub: (clubId, userId) => {
		return Clubs.deleteOne({ _id: clubId, admin: userId})
			.then(deleteConfirmation => {
				return deleteConfirmation;
			})
			.catch(err => {
				throw err;
			});
	}
};
