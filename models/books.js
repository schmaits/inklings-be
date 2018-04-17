const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BooksSchema = new Schema({
    title: String,
    author: String,
    summary: String,
    year: Number,
    coverImageUrl: String,
    genres: [String],
    rating: {
        type: Number, 
        min: 0,
        max: 5
    },
    country: String
});

module.exports = BooksSchema;
