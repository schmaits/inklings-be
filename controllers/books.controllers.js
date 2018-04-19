const { getAllBooks } = require('../lib/books.queries.js');

module.exports = {
    getAllBooks: (req, res) => {
        getAllBooks()
            .then(allBooks => {
                res.status(200).json({allBooks});
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
};
