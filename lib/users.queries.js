const { Users } = require('../models/models');

module.exports = {
    getOneUser: (userId) => {
        return new Promise((resolve, reject) => {
            Users.find({ _id: userId }, (err, user) => {
                if (err) reject(new Error(err));
                resolve(user);
            });
        });
    }
};
