const { Comments } = require('../models/models');

module.exports = {
    getBookComments: (bookId) => {
        return new Promise((resolve, reject) => {
            Comments.find({ book: bookId }, (err, bookComments) => {
                if (err) reject(new Error(err));
                resolve(bookComments);
            });
        });
    },

    getClubComments: (clubId) => {
        return new Promise((resolve, reject) => {
            Comments.find({ club: clubId }, (err, clubComments) => {
                if (err) reject(new Error(err));
                resolve(clubComments);
            });
        });
    }
};
