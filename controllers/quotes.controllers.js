const { getAllQuotes } = require('../lib/quotes.queries');

module.exports = {
    getAllQuotes: (req, res) => {
        getAllQuotes()
            .then(allQuotes => {
                res.status(200).json({allQuotes});
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }
};
