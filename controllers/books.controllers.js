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
				if (book.length === 0) return next({ status: 404, msg: `Couldn\'t find a book with ID ${bookId}`});
				res.status(200).json({book});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	},

	addNewBook: (req, res) => {
		const newBookToAdd = req.body;
		addNewBook(newBookToAdd)
			.then(newBook => {
				res.status(201).json({newBook});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	},

	updateRating: (req, res) => {
		const newRating = req.body.addedRating;
		const bookId = req.params.bookId;
		updateRating(newRating, bookId)
			.then(updatedRatingArray => {
				res.status(200).json({updatedRatingArray});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	}
};
