const { getAllBooks, getOneBook } = require('../lib/books.queries.js');

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
                res.status(500).send(err);
            });
    }
};
