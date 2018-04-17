process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');
const app = require('../server');

describe('API endpoints', () => {
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
});
