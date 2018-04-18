process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');
const seedTestDatabase = require('../seed/test.seed');

describe('API endpoints', () => {    
    beforeEach((done) => {
        seedTestDatabase()
            .then(() => {
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
    });
});

