const { Books } = require('../models/models');

module.exports = {
	getAllBooks: () => {
		return Books.find();
	},

	getOneBook: (bookId) => {
		return Books.find({ _id: bookId });
	},

	addNewBook: (newBookToAdd) => {
		return new Books(newBookToAdd).save();
	},

	updateRating: (newRating, bookId) => {
		return Books.findOneAndUpdate({ _id: bookId}, 
			{ $push: { rating: newRating } },
			{ 'new': true });
	}
};
