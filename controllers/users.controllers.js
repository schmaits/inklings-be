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
    
	getOneUser: (req, res) => {
		const userId = req.params.userId;
		getOneUser(userId)
			.then(user => {
				res.status(200).json({user});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	},
    
	updateCurrentlyReading: (req, res) => {
		const userId = req.params.userId;
		const bookId = req.body.bookId;
		const query = req.query.update;

		updateCurrentlyReading(userId, bookId, query)
			.then(updatedCurrentlyReading => {
				res.status(200).json({updatedCurrentlyReading});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	},

	updateToRead: (req, res) => {
		const userId = req.params.userId;
		const bookId = req.body.bookId;
		const query = req.query.update;

		updateToRead(userId, bookId, query)
			.then(updatedToRead => {
				res.status(200).json({updatedToRead});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	},

	updateBooksRead: (req, res, next) => {
		const userId = req.params.userId;
		const bookId = req.body.bookId;
		updateBooksRead(userId, bookId)
			.then(updatedBooksRead => {
				res.status(200).json({updatedBooksRead});
			})
			.catch(err => {
				next();
			});
	}
};
