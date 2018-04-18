const { Clubs } = require('../models/models');

module.exports = {
    getAllClubs: () => {
        return new Promise((resolve, reject) => {
            Clubs.find({}, (err, allClubs) => {
                if (err) reject(new Error(err));
                resolve(allClubs);
            });
        });
    },

    addNewClub: (newClub) => {
        return new Promise((resolve, reject) => {
            new Clubs(newClub).save()
                .then((addedClubReponse) => {
                    resolve(addedClubReponse);
                })
                .catch((err) => {
                    reject(new Error (err));
                });
        });
    },

    getOneClub: (clubId) => {
        return new Promise((resolve, reject) => {
            Clubs.findOne({_id: clubId}, (err, club) => {
                if (err) reject(new Error(err));
                if (!club) reject(new Error('That ID does not exist'));
                resolve(club);
            });
        });
    }
};
