const { getOneUser, getAllUsers } = require('../lib/users.queries');

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
    }
};
