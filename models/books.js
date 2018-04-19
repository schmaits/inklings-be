const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BooksSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    coverImageUrl: {
        type: String,
        required: true
    },
    genres: {
        type: [String],
        required: true
    },
    rating: {
        type: Number, 
        min: 0,
        max: 5,
    },
    country: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('books', BooksSchema);
