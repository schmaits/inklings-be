process.env.NODE_ENV = 'test';

const { Books, Quotes, Users, Clubs, Comments } = require('../models/models');
const mongoose = require('mongoose');
const DB = require('../config').DB[process.env.NODE_ENV];

mongoose.Promise = Promise;

const savedData = {};

const saveBooks = () => {
    const books = [
        {
            title: 'The Grapes of Wrath',
            author: 'John Steinbeck',
            year: 1939,
            coverImageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1f/JohnSteinbeck_TheGrapesOfWrath.jpg',
            genres: ['fiction', 'classics', 'historical'],
            rating: 4,
            country: 'United States'
        },
        {
            title: 'Never Let Me Go',
            author: 'Kazuo Ishiguro',
            year: 2005,
            coverImageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/25/Never_Let_Me_Go.jpg',
            genres: ['fiction', 'dystopian', 'science fiction'],
            rating: 5, 
            country: 'United Kingdom'
        },
        {
            title: 'The Blind Assassin',
            author: 'Margaret Atwood',
            year: 2000,
            coverImageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/17/Novel_the_blind_assassin_cover.jpg',
            genres: ['fiction', 'mystery'],
            rating: 3,
            country: 'Canada'
        }
    ].map(book => new Books(book).save());
    return Promise.all(books);
};

const saveQuotes = () => {
    const quotes = [
        {
            body: 'Already my childhood seemed far away—a remote age, faded and bittersweet, like dried flowers. Did I regret its loss, did I want it back? I didn\'t think so.',
            book: savedData.books[2]._id
        },
        {
            body: 'One look at a banana and you can tell it came from outer space.',
            book: savedData.books[2]._id
        },
        {
            body: 'Stick a shovel in the ground almost anywhere and some horrible thing or other will come to light.',
            book: savedData.books[2]._id
        },
        {
            body: 'There ain\'t no sin and there ain\'t no virtue. There\'s just stuff people do.',
            book: savedData.books[0]._id
        },
        {
            body: 'It was her habit to build up laughter out of inadequate materials.',
            book: savedData.books[0]._id
        },
        {
            body: 'And the little screaming fact that sounds through all history: repression works only to strengthen and knit the repressed.',
            book: savedData.books[0]._id
        },
        {
            body: 'Memories, even your most precious ones, fade surprisingly quickly. But I don’t go along with that. The memories I value most, I don’t ever see them fading.',
            book: savedData.books[1]._id
        },
        {
            body: 'Sometimes I get so immersed in my own company, if I unexpectedly run into someone I know, it\'s a bit of a shock and takes me a while to adjust.',
            book: savedData.books[1]._id
        },
        {
            body: 'She always wanted to believe in things.',
            book: savedData.books[1]._id
        }
    ].map(quote => new Quotes(quote).save());
    return Promise.all(quotes);
};

const saveUsers = () => {
    const users = [
        {
            firstName: 'Rebecca',
            secondName: 'Jenkins',
            username: 'jenks425',
            location: 'Kansas, USA',
            booksRead: [savedData.books[0]._id, savedData.books[2]._id],
            favouriteQuotes: [savedData.quotes[1]._id]
        },
        {
            firstName: 'Mary',
            secondName: 'Hunt',
            username: 'ilikebooks',
            location: 'Panama',
            booksRead: [savedData.books[0]._id, savedData.books[1]._id, savedData.books[2]._id],
            favouriteQuotes: [savedData.quotes[4]._id, savedData.quotes[8]._id]
        }
    ].map(user => new Users(user).save());
    return Promise.all(users);
};

const saveClubs = () => {
    let clubs = [
        {
            name: 'Great Books',
            summary: 'Just great books',
            members: [savedData.users[0]._id],
            currentlyReading: savedData.books[0]._id,
            read: [savedData.books[1]._id, savedData.books[2]._id],
            admin: savedData.users[0]._id
        },
        {
            name: 'Dystopian',
            summary: 'Unfortunate worlds',
            members: [savedData.users[0]._id],
            currentlyReading: savedData.books[1]._id,
            admin: savedData.users[0]._id
        }
    ].map(club => new Clubs(club).save());
    return Promise.all(clubs);
};

const saveComments = () => {
    let comments = [
        {
            body: 'This is a comment',
            user: savedData.users[1]._id,
            book: savedData.books[1]._id,
            club: savedData.clubs[1]._id
        },
        {
            body: 'This is another comment',
            user: savedData.users[0]._id,
            book: savedData.books[1]._id,
            club: savedData.clubs[1]._id
        }
    ].map(comment => new Comments(comment).save());
    return Promise.all(comments);
};

const seedTestDatabase = () => {
    return mongoose.connect(DB)
        .then(() => {
            console.log(`Successfully connected to ${DB}`);
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
            return savedData;
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = seedTestDatabase;
