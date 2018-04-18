const { getAllClubs, addNewClub } = require('../lib/clubs.queries');

module.exports = {
    getAllClubs: (req, res) => {
        getAllClubs()
            .then(allClubs => {
                res.status(200).json({allClubs});
            })
            .catch(err => {
                return res.status(500).send(err);
            });
    },

    addNewClub: (req, res) => {
        let clubToBeAdded = req.body;
        addNewClub(clubToBeAdded)
            .then(newClub => {
                res.status(201).json({newClub});
            })
            .catch(err => {
                return res.status(400).send(err);
            });
    }
};
