const { Comments } = require('../models/models');

module.exports = {
	getBookComments: (bookId) => {
		return Comments.find({ book: bookId });
	},

	getClubComments: (clubId) => {
		return Comments.find({ club: clubId });	
	},

	addNewComment: (commentToBeAdded) => {
		return new Comments(commentToBeAdded).save();
	},

	deleteComment: (commentId, userId) => {
		return Comments.deleteOne({
			_id: commentId,
			user: userId
		});
	},

	editComment: (commentId, userId, body) => {
		return Comments.findOneAndUpdate(
			{ _id: commentId, user: userId },
			{ body: body },
			{ 'new': true });
	}
};
