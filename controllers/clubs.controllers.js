const { getAllClubs, addNewClub, getOneClub } = require('../lib/clubs.queries');

module.exports = {
    getAllClubs: (req, res) => {
        getAllClubs()
            .then(allClubs => {
                res.status(200).json({allClubs});
            })
            .catch(err => {
                res.status(500).send(err);
            });
    },

    addNewClub: (req, res) => {
        let clubToBeAdded = req.body;
        addNewClub(clubToBeAdded)
            .then(newClub => {
                res.status(201).json({newClub});
            })
            .catch(err => {
                res.status(400).send(err);
            });
    },
    
    getOneClub: (req, res) => {
        let clubId = req.params.clubId;
        getOneClub(clubId)
            .then(club => {
                res.status(200).json({club});
            })
            .catch(err => {
                res.status(404).send(err);
            });
    }
};
