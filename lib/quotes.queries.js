const { Quotes } = require('../models/models');

module.exports = {
    getAllQuotes: () => {
        return new Promise((resolve, reject) => {
            Quotes.find({}, (err, allQuotes) => {
                if (err) reject(new Error(err));
                resolve(allQuotes);
            });
        });
    },

    addNewQuote: (quoteToAdd) => {
        return new Promise((resolve, reject) => {
            new Quotes(quoteToAdd).save()
                .then(newQuote => {
                    resolve(newQuote);
                })
                .catch(err => {
                    reject(new Error(err));
                });
        });
    }
};
