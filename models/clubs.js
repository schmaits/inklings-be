const mongoose = require('mongoose');
const Schema = mongoose.Schema();

const ClubsSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    summary: {
        type: String
    },
    members: [Schema.Types.ObjectId],
    admin: {
        type: Schema.Types.ObjectId,
        required: true
    },
    currentlyReading: Schema.Types.ObjectId,
    read: [Schema.Types.ObjectId]
});

module.exports = mongoose.model('Clubs', ClubsSchema);
