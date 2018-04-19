const { getOneUser, getAllUsers, updateCurrentlyReading, updateToRead } = require('../lib/users.queries');

module.exports = {
    getAllUsers: (req, res) => {
        getAllUsers()
            .then(allUsers => {
                res.status(200).json({allUsers});
            })
            .catch(err => {
                res.status(500).send(err);
            });
    },
    
    getOneUser: (req, res) => {
        const userId = req.params.userId;
        getOneUser(userId)
            .then(user => {
                res.status(200).json({user});
            })
            .catch(err => {
                res.status(500).send(err);
            });
    },
    
    updateCurrentlyReading: (req, res) => {
        const userId = req.params.userId;
        const bookId = req.body.bookId;
        updateCurrentlyReading(userId, bookId)
            .then(updatedCurrentlyReading => {
                res.status(200).json({updatedCurrentlyReading});
            })
            .catch(err => {
                res.status(500).send(err);
            });
    },

    updateToRead: (req, res) => {
        const userId = req.params.userId;
        const bookId = req.body.bookId;
        updateToRead(userId, bookId)
            .then(updatedToRead => {
                res.status(200).json({updatedToRead});
            })
            .catch(err => {
                res.status(500).send(err);
            });
    },
};
