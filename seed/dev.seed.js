const mongoose = require('mongoose');
const faker = require('faker');

const DB = 'mongodb://localhost/book-club-api';
const { Books, Clubs, Comments, Quotes, Users } = require('../models/models');
const booksData = require('./data/books.json');

mongoose.Promise = Promise;

const savedData = {};

const saveBooks = () => {
    const books = booksData.books.map(book => {
        return {
            title: book.title,
            author: book.author,
            year: book.year,
            coverImageUrl: book.imageLink,
            genres: book.genres,
            rating: Math.round(Math.random()) * 5,
            country: book.country
        };
    });
    books.map(book => new Books(book).save());
    return Promise.all(booksData.books);
};

mongoose.connect(DB)
    .then(() => {
        console.log(`Connected to ${DB}`);
        return mongoose.connection.dropDatabase();
    })
    .then(() => {
        console.log('Database dropped');
        return saveBooks();
    })
    .then(savedBooks => {
        console.log(`Saved ${savedBooks.length} books`);
        savedData.books = savedBooks;
    });
