const { getAllBooks, getOneBook, addNewBook } = require('../lib/books.queries.js');

module.exports = {
    getAllBooks: (req, res) => {
        getAllBooks()
            .then(allBooks => {
                res.status(200).json({allBooks});
            })
            .catch(err => {
                res.status(500).send(err);
            });
    },

    getOneBook: (req, res) => {
        const bookId = req.params.bookId;
        getOneBook(bookId)
            .then(book => {
                res.status(200).json({book});
            })
            .catch(err => {
                if (err.message === 'That ID could not be found') res.status(404).send(err);
                res.status(500).send(err);
            });
    },

    addNewBook: (req, res) => {
        const newBookToAdd = req.body;
        addNewBook(newBookToAdd)
            .then(newBook => {
                res.status(201).json({newBook});
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
};
