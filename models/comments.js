const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const CommentsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    book: {
        type: Schema.Types.ObjectId,
        required: true
    },
    club: {
        type: Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = CommentsSchema;
