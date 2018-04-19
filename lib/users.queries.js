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
    }
};