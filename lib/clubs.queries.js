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
        return Clubs.findOne({_id: clubId})
            .then(club => {
                return club;
            })
            .catch(err => {
                throw err;
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

    updateCurrentlyReading: (clubId, bookId) => {
        return new Promise((resolve, reject) => {
            Clubs.findOneAndUpdate(
                { _id: clubId },
                { currentlyReading: bookId },
                { 'new': true },
                (err, updatedClub) => {
                    if (err) reject(new Error(err));
                    resolve(updatedClub.currentlyReading);
                });
        });
    },

    updateRead: (clubId, bookId) => {
        return new Promise((resolve, reject) => {
            Clubs.findOneAndUpdate(
                { _id: clubId },
                { $addToSet: { read: bookId } },
                { 'new': true },
                (err, updatedClub) => {
                    if (err) reject(new Error(err));
                    resolve(updatedClub.read);
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
