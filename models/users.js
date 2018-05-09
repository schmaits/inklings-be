const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
	firstName: {
		type: String,
		required: true,
	},
	secondName: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		lowercase: true,
		unique: true,
		required: true
	},
	bio: String,
	location: String,
	currentlyReading: [Schema.Types.ObjectId],
	toRead: [Schema.Types.ObjectId],
	booksRead: [Schema.Types.ObjectId],
	favouriteQuotes: [Schema.Types.ObjectId],
	profilePictureUrl: {
		type: String,
		lowercase: true
	}
});

module.exports = mongoose.model('Users', UserSchema);
