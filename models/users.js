const mongoose = require('mongoose');
const Schema = mongoose.Schema();

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
        required: true
    },
    bio: String,
    location: String,
    booksRead: [Schema.Types.ObjectId],
    favouriteQuotes: [Schema.Types.ObjectId]
});

module.exports = UserSchema;
