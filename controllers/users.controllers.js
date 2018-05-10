const { getOneUser, getAllUsers, updateCurrentlyReading, updateToRead, updateBooksRead } = require('../lib/users.queries');

module.exports = {
	getAllUsers: (req, res) => {
		getAllUsers()
			.then(allUsers => {
				res.status(200).json({allUsers});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	},
    
	getOneUser: (req, res, next) => {
		const userId = req.params.userId;
		getOneUser(userId)
			.then(user => {
				if (user.length === 0) return next({ status: 404, msg: `Couldn't find user with ID ${userId}`});
				res.status(200).json({user});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	},
    
	updateCurrentlyReading: (req, res, next) => {
		const userId = req.params.userId;
		const bookId = req.body.bookId;
		const query = req.query.update;

		updateCurrentlyReading(userId, bookId, query)
			.then(updatedUser => {
				const updatedCurrentlyReading = updatedUser.currentlyReading;

				res.status(200).json({updatedCurrentlyReading});
			})
			.catch(err => {
				if (err.message === 'Cannot read property \'currentlyReading\' of null') return next({ status: 404, msg: `Can't find book with ID ${bookId}`});
				res.status(500).send(err);
			});
	},

	updateToRead: (req, res, next) => {
		const userId = req.params.userId;
		const bookId = req.body.bookId;
		const query = req.query.update;

		updateToRead(userId, bookId, query)
			.then(updatedUser => {
				const updatedToRead = updatedUser.toRead; 
				res.status(200).json({updatedToRead});
			})
			.catch(err => {
				if (err.message === 'Cannot read property \'toRead\' of null') return next({ status: 404, msg: `Can't find book with ID ${bookId}`});
				res.status(500).send(err);
			});
	},

	updateBooksRead: (req, res) => {
		const userId = req.params.userId;
		const bookId = req.body.bookId;
		updateBooksRead(userId, bookId)
			.then(updatedUser => {
				const updatedBooksRead = updatedUser.booksRead;
				res.status(200).json({updatedBooksRead});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	}
};
