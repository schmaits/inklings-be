const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuotesSchema = new Schema({
	book: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	body: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Quotes', QuotesSchema);
