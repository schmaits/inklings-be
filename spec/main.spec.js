process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');
const seedTestDatabase = require('../seed/test.seed');

describe('API endpoints', () => {    
    let savedData;

    beforeEach((done) => {
        seedTestDatabase()
            .then(seededData => {
                savedData = seededData;
                done();
            });
    });
    
    afterEach(() => {
        mongoose.connection.close();
        console.log('Connection closed');
    });
    
    describe('GET /api/clubs', () => {
        it('should return an array of all clubs', (done) => {
            request(app)
                .get('/api/clubs')
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.body.allClubs.length).to.equal(2);
                    done();
                });
        });

    });

    describe('POST /api/clubs', () => {
        it('should add a new club', (done) => {
            request(app)
                .post('/api/clubs')
                .send({
                    name: 'test club'
                })
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(201);
                    expect(res.body.newClub).to.have.property('_id');
                    done();
                });
        });

        it('shouldn\'t work if the correct data is not provided', (done) => {
            request(app)
                .post('/api/clubs')
                .send({
                    title: 'test-should-fail'
                })
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(400);
                    done();
                });
        });
    });

    describe('GET /api/clubs/:clubId', () => {
        it('should return an object with the data from the specified club', (done) => {
            request(app)
                .get(`/api/clubs/${savedData.clubs[0]._id}`)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(200);
                    expect(res.body.club.name).to.equal(savedData.clubs[0].name);
                    done();
                });       
        });

        it('should return a 404 status if an invalid id is passed', (done) => {
            request(app)
                .get('/api/clubs/5ad72e653e05e33c0541cf83')
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(404);
                    done();
                });
        });
    });

    describe('PUT /api/clubs/:clubId/users', () => {
        it('should be able to add a member to a club', (done) => {
            request(app)
                .put(`/api/clubs/${savedData.clubs[1]._id}/users?update=add`)
                .send({ userId: savedData.users[1]._id })
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(200);
                    expect(res.body.updatedMemberList.length).to.equal(savedData.clubs[1].members.length + 1);
                    done();
                });
        });

        it('should be able to remove a member of a club', (done) => {
            request(app)
                .put(`/api/clubs/${savedData.clubs[1]._id}/users?update=remove`)
                .send({ userId: savedData.users[0]._id})
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(200);
                    expect(res.body.updatedMemberList.length).to.equal(savedData.clubs[1].members.length - 1);
                    done();
                });
        });
    });

    describe('PUT /api/clubs/:clubId/currentlyReading', () => {
        it('should be able to update the current book', (done) => {
            request(app)
                .put(`/api/clubs/${savedData.clubs[1]._id}/currentlyReading`)
                .send({ bookId: savedData.books[2]._id})
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(200);
                    expect(res.body.updatedBooks).to.equal(savedData.books[2]._id.toString());
                    done();
                });
        });
    });

    describe('PUT /api/clubs/:clubId/read', () => {
        it('should be able to add a book to read', (done) => {
            request(app)
                .put(`/api/clubs/${savedData.clubs[1]._id}/read`)
                .send({ bookId: savedData.books[0]._id})
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.body.updatedBooks.length).to.equal(savedData.clubs[1].read.length + 1);
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });
});

