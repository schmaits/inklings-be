const { Comments } = require('../models/models');

module.exports = {
	getBookComments: (bookId) => {
		return new Promise((resolve, reject) => {
			Comments.find({ book: bookId }, (err, bookComments) => {
				if (err) reject(new Error(err));
				resolve(bookComments);
			});
		});
	},

	getClubComments: (clubId) => {
		return new Promise((resolve, reject) => {
			Comments.find({ club: clubId }, (err, clubComments) => {
				if (err) reject(new Error(err));
				resolve(clubComments);
			});
		});
	},

	addNewComment: (commentToBeAdded) => {
		return new Promise((resolve, reject) => {
			new Comments(commentToBeAdded).save()
				.then(newComment => {
					resolve(newComment);
				})
				.catch(err => {
					reject(new Error(err));
				});
		});
	},

	deleteComment: (commentId, userId) => {
		return new Promise((resolve, reject) => {
			Comments.deleteOne({
				_id: commentId,
				user: userId
			}, 
			(err, deleteConfirmation) => {
				if (err) reject(new Error(err));
				resolve(deleteConfirmation);
			});
		});
	},

	editComment: (commentId, userId, body) => {
		return new Promise((resolve, reject) => {
			Comments.findOneAndUpdate(
				{ _id: commentId, user: userId },
				{ body: body },
				{ 'new': true },
				(err, updatedComment) => {
					if (err) reject(new Error(err));
					resolve(updatedComment);
				}
			);
		});
	}
};
