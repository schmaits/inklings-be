const { getAllBooks, getOneBook, addNewBook, updateRating } = require('../lib/books.queries.js');

module.exports = {
	getAllBooks: (req, res) => {
		getAllBooks()
			.then(allBooks => {
				res.status(200).json({allBooks});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	},

	getOneBook: (req, res, next) => {
		const bookId = req.params.bookId;
		getOneBook(bookId)
			.then(book => {
				if (book.length === 0) return next({ status: 404, msg: `Couldn't find a book with ID ${bookId}`});
				res.status(200).json({book});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	},

	addNewBook: (req, res, next) => {
		const newBookToAdd = req.body;
		addNewBook(newBookToAdd)
			.then(newBook => {
				res.status(201).json({newBook});
			})
			.catch(err => {
				if (err.message.includes('ValidationError')) return next({ status: 400, msg: `The information you provided is not valid. Error: ${err.message}`});
				res.status(500).send(err);
			});
	},

	updateRating: (req, res, next) => {
		const newRating = req.body.addedRating;
		const bookId = req.params.bookId;
		updateRating(newRating, bookId)
			.then(updatedRatingArray => {
				res.status(200).json({updatedRatingArray});
			})
			.catch(err => {
				if (err.name === 'TypeError') return next({ status: 404, msg: `Couldn't find a book with ID ${bookId}`});
				res.status(500).send(err);
			});
	}
};
