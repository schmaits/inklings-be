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
                    done()
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
});

