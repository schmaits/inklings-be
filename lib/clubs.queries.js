const { Clubs } = require('../models/models');

module.exports = {
    getAllClubs: () => {
        return new Promise((resolve, reject) => {
            Clubs.find({}, (err, allClubs) => {
                if (err) reject(new Error(err));
                resolve(allClubs);
            });
        });
    }
};
