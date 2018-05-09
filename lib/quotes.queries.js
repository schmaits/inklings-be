const { Quotes } = require('../models/models');

module.exports = {
	getAllQuotes: () => {
		return Quotes.find();
	},

	addNewQuote: (quoteToAdd) => {
		return new Quotes(quoteToAdd).save();
	}
};
