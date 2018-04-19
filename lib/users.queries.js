const { Users } = require('../models/models');

module.exports = {
    getAllUsers: () => {
        return new Promise((resolve, reject) => {
            Users.find({}, (err, allUsers) => {
                if (err) reject(new Error(err));
                resolve(allUsers);
            });
        });
    },
    
    getOneUser: (userId) => {
        return new Promise((resolve, reject) => {
            Users.find({ _id: userId }, (err, user) => {
                if (err) reject(new Error(err));
                resolve(user);
            });
        });
    },

    updateCurrentlyReading: (userId, bookId) => {
        return new Promise((resolve, reject) => {
            Users.findOneAndUpdate(
                { _id: userId },
                { currentlyReading: bookId },
                { 'new': true },
                (err, updatedUser) => {
                    if (err) reject(new Error(err));
                    resolve(updatedUser.currentlyReading);
                }
            );
        });
    },

    updateToRead: (userId, bookId) => {
        return new Promise((resolve, reject) => {
            Users.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { toRead: bookId } },
                { 'new': true },
                (err, updatedUser) => {
                    if (err) reject(new Error(err));
                    resolve(updatedUser.toRead);
                }
            );
        });
    },

    updateBooksRead: (userId, bookId) => {
        return new Promise((resolve, reject) => {
            Users.findOneAndUpdate(
                { _id: userId },
                { $addToSet: { booksRead: bookId } },
                { 'new': true },
                (err, updatedUser) => {
                    if (err) reject(new Error(err));
                    resolve(updatedUser.booksRead);
                }
            );
        });
    }
};
