const { getAllClubs, addNewClub, getOneClub, updateMembersList, updateBooks } = require('../lib/clubs.queries');

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
                if (err.message === 'That ID does not exist') res.status(404).send(err);
                res.status(500).send(err);
            });
    },

    updateMembersList: (req, res) => {
        const clubId = req.params.clubId;
        const updateQuery = req.query.update;
        const userId = req.body.userId;
        updateMembersList(clubId, updateQuery, userId)
            .then(updatedMemberList => {
                res.status(200).json({updatedMemberList});
            })
            .catch(err => {
                res.status(400).send(err);
            });
    },

    updateBooks: (req, res) => {
        const clubId = req.params.clubId;
        const bookId = req.body.bookId;
        const updateField = req.params.updateField;
        updateBooks(clubId, bookId, updateField)
            .then(updatedBooks => {
                res.status(200).json({updatedBooks});
            })
            .catch(err => {
                res.status(500).send(err);
            });
    }

    // updateRead: (req, res) => {
    //     const clubId = req.params.clubId;
    //     const bookId = req.body.bookId;
    //     updateRead(clubId, bookId)
    //         .then(updatedReadList => {
    //             res.status(200).json({updatedReadList});
    //         })
    //         .catch(err => {
    //             res.status(500).send(err);
    //         });
    // }
};
