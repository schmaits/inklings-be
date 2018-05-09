const { Clubs } = require('../models/models');

module.exports = {
	getAllClubs: () => {
		return Clubs.find();
	},

	addNewClub: (newClub) => {
		return new Clubs(newClub).save();
	},

	getOneClub: (clubId) => {
		return Clubs.findOne({_id: clubId});
	},

	updateMembersList: (clubId, updateQuery, userId) => {
		const operation = updateQuery === 'add' ? '$addToSet' : updateQuery === 'remove' ? '$pull' : null;

		return Clubs.findOneAndUpdate(
			{ _id: clubId }, 
			{ [operation]: { members: userId } },
			{ 'new': true });
	},

	updateCurrentlyReading: (clubId, bookId) => {
		return Clubs.findOneAndUpdate(
			{ _id: clubId },
			{ currentlyReading: bookId },
			{ 'new': true });
	},

	updateRead: (clubId, bookId) => {
		return Clubs.findOneAndUpdate(
			{ _id: clubId },
			{ $addToSet: { read: bookId } },
			{ 'new': true });
	},

	deleteClub: (clubId, userId) => {
		return Clubs.deleteOne({ _id: clubId, admin: userId});
	}
};
