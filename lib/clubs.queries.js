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
    },

    updateMembersList: (clubId, updateQuery, userId) => {
        return new Promise((resolve, reject) => {
            if (updateQuery === 'add') {
                Clubs.findOneAndUpdate(
                    { _id: clubId }, 
                    { $addToSet: { members: userId } },
                    { 'new': true },
                    (err, updatedClub) => {
                        if (err) reject(new Error(err));
                        resolve(updatedClub.members);
                });
            }
            else if (updateQuery === 'remove') {
                Clubs.findOneAndUpdate(
                    { _id: clubId },
                    { $pull: { members: userId } },
                    { 'new': true },
                    (err, updatedClub) => {
                        if (err) reject(new Error(err));
                        resolve(updatedClub.members);
                    }
                );
            }
        });
    },

    updateBooks: (clubId, bookId, updateField) => {
        return new Promise((resolve, reject) => {
            const query = {};
            query[updateField] = bookId;
            Clubs.findOneAndUpdate(
                { _id: clubId },
                query,
                { 'new': true },
                (err, updatedClub) => {
                    if (err) reject(new Error(err));
                    resolve(updatedClub[updateField]);
                });
        });
    },

    deleteClub: (clubId, userId) => {
        return new Promise((resolve, reject) => {
            Clubs.deleteOne({ _id: clubId, admin: userId}, (err, deleteConfirmation) => {
                if (err) reject(new Error(err));
                resolve(deleteConfirmation);
            });
        });
    }
};
