const mongoose = require('mongoose');
const faker = require('faker');

const DB = 'mongodb://localhost/book-club-api';
const { Books, Clubs, Comments, Quotes, Users } = require('../models/models');
const booksData = require('./data/books.json');
const quotesData = require('./data/quotes.json');

mongoose.Promise = Promise;

const savedData = {};

const saveBooks = () => {
    let books = booksData.books.map(book => {
        return {
            title: book.title,
            author: book.author,
            year: book.year,
            coverImageUrl: book.imageLink,
            genres: book.genres,
            rating: Math.round(Math.random() * 5),
            country: book.country
        };
    }).map(book => new Books(book).save());
    return Promise.all(books);
};

const saveQuotes = () => {
    const quotes = quotesData.quotes.map(quote => {
        let book = savedData.books.filter(book => {
            return book.title === quote.book;
        });
        return {
        body: quote.body,
        book: book[0]._id
        };
    }).map(quote => new Quotes(quote).save());
    return Promise.all(quotes);
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
        return saveQuotes();
    })
    .then(savedQuotes => {
        console.log(`Saved ${savedQuotes.length} quotes`);
        savedData.quotes = savedQuotes;
    })
    .catch(err => {
        console.log(err);
    });

