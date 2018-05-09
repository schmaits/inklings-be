const { Books } = require('../models/models');

module.exports = {
	getAllBooks: () => {
		return new Promise((resolve, reject) => {
			Books.find({}, (err, allBooks) => {
				if (err) reject(new Error(err));
				resolve(allBooks);
			});
		});
	},

	getOneBook: (bookId) => {
		return new Promise((resolve, reject) => {
			Books.find({ _id: bookId }, (err, book) => {
				// if (book.length === 0) reject(new Error('That ID could not be found'));
				if (err) reject(new Error(err));
				resolve(book);
			});
		});
	},

	addNewBook: (newBookToAdd) => {
		return new Promise((resolve, reject) => {
			new Books(newBookToAdd).save()
				.then(newBook => {
					resolve(newBook);
				})
				.catch(err => {
					reject(new Error(err));
				});
		});
	},

	updateRating: (newRating, bookId) => {
		return Books.findOneAndUpdate({ _id: bookId}, 
			{ $push: { rating: newRating } },
			{ 'new': true }
		)
			.then(updatedBook => {
				return updatedBook.rating;
			})
			.catch(err => {
				throw err;
			});
	}
};
