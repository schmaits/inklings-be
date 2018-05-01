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
            rating: new Array(15).fill(1).map(number => {
                return number * faker.random.number(5);
            }),
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
    const users = new Array(100).fill({}).map(() => {
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
            name: 'Cool Story, Bro',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Readers of Russian Literature',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Poetry Peeps',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Theatre Geeks',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Greek Tragedies',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Feminists',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Pessimists',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Optimists',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Dystopian Worlds Club',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'The Book Worms',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'The Bloomsbury Group',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Sentences & Sensibility',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Break the Spine',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Papercuts Anonymous',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Just One More Chapter… ',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Where My Prose At?',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Clueless Mysteries Book Club',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'Perfictionists',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'We Like Big Books and We Cannot Lie',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
        {
            name: 'The Great Fratsby',
            summary: faker.lorem.paragraph(faker.random.number({min:1, max:4})),
            members: new Array(15).fill('').map(() => { 
                return faker.random.arrayElement(savedData.users)._id;
            }),
            currentlyReading: faker.random.arrayElement(savedData.books)._id,
            read: new Array(faker.random.number({min:1, max:6})).fill('').map(() => {
                return faker.random.arrayElement(savedData.users)._id;
            }),
            admin: faker.random.arrayElement(savedData.users)._id
        },
    ].map(club => new Clubs(club).save());
    return Promise.all(clubs);
};

const saveComments = () => {
    let comments = [];
    savedData.clubs.forEach(club => {
        const bookComments = new Array(10).fill({}).map(() => {
            return {
                user: faker.random.arrayElement(club.members),
                body: faker.lorem.paragraph(4),
                book: club.currentlyReading,
                club: club._id,
                createdAt: faker.date.recent()
            };
        });
        club.read.forEach(book => {
            const readBookComments = new Array(10).fill({}).map(() => {
                return {
                    user: faker.random.arrayElement(club.members),
                    body: faker.lorem.paragraph(4),
                    book: book,
                    club: club._id,
                    createdAt: faker.date.recent()
                };
            });
            comments = comments.concat(bookComments).concat(readBookComments);
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

