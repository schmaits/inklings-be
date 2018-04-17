process.env.NODE_ENV = 'test';

const { Books, Quotes, Users, Clubs, Comments } = require('../models/models');
const mongoose = require('mongoose');
const DB = require('../config').DB[process.env.NODE_ENV];

mongoose.Promise = Promise;

const savedData = {
    books: [],
    quotes: [],
    users: [],
    clubs: [],
    comments: []
};

const saveBooks = () => {
    const books = [
        {
            title: 'The Grapes of Wrath',
            author: 'John Steinbeck',
            summary: 'Drought and economic depression are driving thousands from Oklahoma. As their land becomes just another strip in the dust bowl, the Joads, a family of sharecroppers, decide they have no choice but to follow. They head west, towards California, where they hope to find work and a future for their family. But while the journey to this promised land will take its inevitable toll, there remains uncertainty about what awaits their arrival.',
            year: 1939,
            coverImageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1f/JohnSteinbeck_TheGrapesOfWrath.jpg',
            genres: ['fiction', 'classics', 'historical'],
            rating: 4,
            country: 'United States'
        },
        {
            title: 'Never Let Me Go',
            author: 'Kazuo Ishiguro',
            summary: 'Narrated by Kathy, now thirty-one, Never Let Me Go dramatises her attempts to come to terms with her childhood at the seemingly idyllic Hailsham School and with the fate that has always awaited her and her closest friends in the wider world. A story of love, friendship and memory, Never Let Me Go is charged throughout with a sense of the fragility of life.',
            year: 2005,
            coverImageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/25/Never_Let_Me_Go.jpg',
            genres: ['fiction', 'dystopian', 'science fiction'],
            rating: 5, 
            country: 'United Kingdom'
        },
        {
            title: 'The Blind Assassin',
            author: 'Margaret Atwood',
            summary: 'Laura Chase\'s older sister Iris, married at eighteen to a politically prominent industrialist but now poor and eighty-two, is living in Port Ticonderoga, a town dominated by their once-prosperous family before the First War. While coping with her unreliable body, Iris reflects on her far from exemplary life, in particular the events surrounding her sister\'s tragic death. Chief among these was the publication of The Blind Assassin, a novel which earned the dead Laura Chase not only notoriety but also a devoted cult following. Sexually explicit for its time, The Blind Assassin describes a risky affair in the turbulent thirties between a wealthy young woman and a man on the run. During their secret meetings in rented rooms, the lovers concoct a pulp fantasy set on Planet Zycron. As the invented story twists through love and sacrifice and betrayal, so does the real one; while events in both move closer to war and catastrophe. By turns lyrical, outrageous, formidable, compelling and funny, this is a novel filled with deep humour and dark drama.',
            year: 2000,
            coverImageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/17/Novel_the_blind_assassin_cover.jpg',
            genres: ['fiction', 'mystery'],
            rating: 3,
            country: 'Canada'
        }
    ].map(book => {
        book = new Books(book);
        savedData.books.push(book);
        book.save();
    });
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
    ].map(quote => {
        quote = new Quotes(quote);
        savedData.quotes.push(quote);
        quote.save();
    });
    return Promise.all(quotes);
};

mongoose.connect(DB)
    .then(() => {
        console.log(`Successfully connected to ${DB}`);
        return mongoose.connection.dropDatabase();
    })
    .then(() => {
        console.log('Database dropped');
    })
    .then(() => {
        return saveBooks();
    })
    .then(() => {
        console.log(`Saved ${savedData.books.length} books`);
        return saveQuotes();
    })
    .then(() => {
        console.log(`Saved ${savedData.quotes.length} quotes`);
    })
    .catch(err => {
        console.log(err);
    });
