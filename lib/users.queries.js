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

    updateCurrentlyReading: (userId, bookId, query) => {
        if (query === 'add') {
            return new Promise((resolve, reject) => {
                Users.findOneAndUpdate(
                    { _id: userId },
                    { $addToSet: { currentlyReading: bookId } },
                    { 'new': true },
                    (err, updatedUser) => {
                        if (err) reject(new Error(err));
                        resolve(updatedUser.currentlyReading);
                    }
                );
            });
        }

        if (query === 'remove') {
            return new Promise((resolve, reject) => {
                Users.findOneAndUpdate(
                    { _id: userId },
                    { $pull: { currentlyReading: bookId } },
                    { 'new': true },
                    (err, updatedUser) => {
                        if (err) reject(new Error(err));
                        resolve(updatedUser.currentlyReading);
                    }
                );
            });
        }
    },

    updateToRead: (userId, bookId, query) => {
        if (query === 'add') {
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
        }
       
        if (query === 'remove') {
            return new Promise((resolve, reject) => {
                Users.findOneAndUpdate(
                    { _id: userId },
                    { $pull: { toRead: bookId } },
                    { 'new': true },
                    (err, updatedUser) => {
                        if (err) reject(new Error(err));
                        resolve(updatedUser.toRead);
                    }
                );
            });
        }
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
