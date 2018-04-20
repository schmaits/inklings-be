const { getBookComments, getClubComments } = require('../lib/comments.queries');

module.exports = {
    getBookComments: (req, res) => {
        const bookId = req.params.bookId;
        getBookComments(bookId)
            .then(bookComments => {
                res.status(200).json({bookComments});
            })
            .catch(err => {
                res.status(404).send(err);
            });
    },

    getClubComments: (req, res) => {
        const clubId = req.params.clubId;
        getClubComments(clubId)
            .then(clubComments => {
                res.status(200).json({clubComments});
            })
            .catch(err => {
                res.status(404).send(err);
            });
    }
};
