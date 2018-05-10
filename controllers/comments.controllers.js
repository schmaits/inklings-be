const { getBookComments, getClubComments, addNewComment, deleteComment, editComment } = require('../lib/comments.queries');

module.exports = {
	getBookComments: (req, res) => {
		const bookId = req.params.bookId;
		getBookComments(bookId)
			.then(bookComments => {
				res.status(200).json({bookComments});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	},

	getClubComments: (req, res, next) => {
		const clubId = req.params.clubId;
		getClubComments(clubId)
			.then(clubComments => {
				if (clubComments.length === 0) return next({ status: 404, msg: `Can't find a club with ID ${clubId}` });
				res.status(200).json({clubComments});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	},

	addNewComment: (req, res, next) => {
		const commentToBeAdded = req.body;
		commentToBeAdded.club = req.params.clubId;
		commentToBeAdded.book = req.params.bookId;

		addNewComment(commentToBeAdded)
			.then(newComment => {
				res.status(201).json({newComment});
			})
			.catch(err => {
				if (err.name === 'ValidationError') return next({ status: 400, msg: `You have not provided the required information. Error: "${err.message}"` });
				res.status(500).send(err);
			});
	},

	deleteComment: (req, res) => {
		const commentId = req.params.commentId;
		const userId = req.params.userId;
		deleteComment(commentId, userId)
			.then(deleteConfirmation => {
				res.status(200).json({deleteConfirmation});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	},

	editComment: (req, res) => {
		const commentId = req.params.commentId;
		const userId = req.body.user;
		const bodyToUpdate = req.body.updatedBody;
		editComment(commentId, userId, bodyToUpdate)
			.then(updatedComment => {
				res.status(200).json({updatedComment});
			})
			.catch(err => {
				res.status(500).send(err);
			});
	}
};
