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

	addNewQuote: (req, res, next) => {
		const quoteToAdd = {
			book: req.params.bookId,
			body: req.body.body
		};
		addNewQuote(quoteToAdd)
			.then(newQuote => {
				res.status(201).json({newQuote});
			})
			.catch(err => {
				if (err.name === 'ValidationError') return next({ status: 400, msg: `You have not provided the required information. Error: "${err.message}"`});
				res.status(500).send(err);
			});
	}
};
