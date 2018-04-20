const { getAllQuotes, addNewQuote } = require('../lib/quotes.queries');

module.exports = {
    getAllQuotes: (req, res) => {
        getAllQuotes()
            .then(allQuotes => {
                res.status(200).json({allQuotes});
            })
            .catch(err => {
                res.status(500).send(err);
            });
    },

    addNewQuote: (req, res) => {
        const quoteToAdd = {
            book: req.params.bookId,
            body: req.body.body
        };
        addNewQuote(quoteToAdd)
            .then(newQuote => {
                res.status(201).json({newQuote});
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
};
