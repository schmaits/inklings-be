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

const saveUsers = () => {
    const users = new Array(60).fill({}).map(() => {
        return {
            firstName: faker.name.firstName(),
            secondName: faker.name.lastName(),
            username: faker.internet.userName(),
            bio: faker.lorem.paragraph(3),
            location: `${faker.address.city()}, ${faker.address.country()}`,
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            toRead: faker.random.arrayElement(savedData.books)._id,
            booksRead: [faker.random.arrayElement(savedData.books)._id, faker.random.arrayElement(savedData.books)._id],
            favouriteQuotes: [faker.random.arrayElement(savedData.quotes)._id, faker.random.arrayElement(savedData.quotes)._id],
            profilePictureUrl: faker.image.avatar().toLowerCase()
        };
    }).map(user => new Users(user).save());
    return Promise.all(users);
};

const saveClubs = () => {
    const clubs = [
        {
            name: 'Classics',
            summary: faker.lorem.paragraph(2),
            members: [faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id],
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: [faker.random.arrayElement(savedData.books)._id, faker.random.arrayElement(savedData.books)._id],
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Russian Literature',
            summary: faker.lorem.paragraph(2),
            members: [faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id],
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: [faker.random.arrayElement(savedData.books)._id, faker.random.arrayElement(savedData.books)._id],
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Poetry',
            summary: faker.lorem.paragraph(2),
            members: [faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id],
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: [faker.random.arrayElement(savedData.books)._id, faker.random.arrayElement(savedData.books)._id],
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Plays',
            summary: faker.lorem.paragraph(2),
            members: [faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id],
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: [faker.random.arrayElement(savedData.books)._id, faker.random.arrayElement(savedData.books)._id],
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Tragedies',
            summary: faker.lorem.paragraph(2),
            members: [faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id],
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: [faker.random.arrayElement(savedData.books)._id, faker.random.arrayElement(savedData.books)._id],
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Feminist',
            summary: faker.lorem.paragraph(2),
            members: [faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id],
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: [faker.random.arrayElement(savedData.books)._id, faker.random.arrayElement(savedData.books)._id],
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Depressing',
            summary: faker.lorem.paragraph(2),
            members: [faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id],
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: [faker.random.arrayElement(savedData.books)._id, faker.random.arrayElement(savedData.books)._id],
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Hopeful',
            summary: faker.lorem.paragraph(2),
            members: [faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id],
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: [faker.random.arrayElement(savedData.books)._id, faker.random.arrayElement(savedData.books)._id],
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Dystopian',
            summary: faker.lorem.paragraph(2),
            members: [faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id, faker.random.arrayElement(savedData.users)._id],
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: [faker.random.arrayElement(savedData.books)._id, faker.random.arrayElement(savedData.books)._id],
            admin: faker.random.arrayElement(savedData.users)._id
        },
    ].map(club => new Clubs(club).save());
    return Promise.all(clubs);
};

const saveComments = () => {
    let comments = [];
    savedData.clubs.forEach(club => {
        club.read.forEach(bookRead => {
            const bookComments = new Array(25).fill({}).map(() => {
                return {
                    user: faker.random.arrayElement(club.members),
                    body: faker.lorem.paragraph(4),
                    book: bookRead,
                    club: club._id,
                    createdAt: faker.date.recent()
                };
            });
            comments = comments.concat(bookComments);
        });
    });
    comments.map(comment => new Comments(comment).save());
    return Promise.all(comments);
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
        return saveUsers();
    })
    .then(savedUsers => {
        console.log(`Saved ${savedUsers.length} users`);
        savedData.users = savedUsers;
        return saveClubs();
    })
    .then(savedClubs => {
        console.log(`Saved ${savedClubs.length} clubs`);
        savedData.clubs = savedClubs;
        return saveComments();
    })
    .then(savedComments => {
        console.log(`Saved ${savedComments.length} comments`);
        savedData.comments = savedComments;
    })
    .catch(err => {
        console.log(err);
    });

