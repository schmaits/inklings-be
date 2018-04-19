const { getOneUser } = require('../lib/users.queries');

module.exports = {
    getOneUser: (req, res) => {
        const userId = req.params.userId;
        getOneUser(userId)
            .then(user => {
                res.status(200).json({user});
            })
            .then(err => {
                res.status(500).send(err);
            });
    }
};
