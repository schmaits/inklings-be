const { Books } = require('../models/models');

module.exports = {
    getAllBooks: () => {
        return new Promise((resolve, reject) => {
            Books.find({}, (err, allBooks) => {
                if (err) reject(new Error(err));
                resolve(allBooks);
            });
        });
    }
};
