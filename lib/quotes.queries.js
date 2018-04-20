const { Quotes } = require('../models/models');

module.exports = {
    getAllQuotes: () => {
        return new Promise((resolve, reject) => {
            Quotes.find({}, (err, allQuotes) => {
                if (err) reject(new Error(err));
                resolve(allQuotes);
            });
        });
    }
};
