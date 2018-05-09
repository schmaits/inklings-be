const { Users } = require('../models/models');

module.exports = {
	getAllUsers: () => {
		return Users.find();
	},
    
	getOneUser: (userId) => {
		return Users.find({ _id: userId });
	},

	updateCurrentlyReading: (userId, bookId, query) => {
		const operation = query === 'add' ? '$addToSet' : query === 'remove' ? '$pull' : null;

		return Users.findOneAndUpdate(
			{ _id: userId },
			{ [operation]: { currentlyReading: bookId } },
			{ 'new': true });
	},

	updateToRead: (userId, bookId, query) => {
		const operation = query === 'add' ? '$addToSet' : query === 'remove' ? '$pull' : null;
		return Users.findOneAndUpdate(
			{ _id: userId },
			{ [operation]: { toRead: bookId } },
			{ 'new': true });
	},

	updateBooksRead: (userId, bookId) => {
		return Users.findOneAndUpdate(
			{ _id: userId },
			{ $addToSet: { booksRead: bookId } },
			{ 'new': true });
	}
};
