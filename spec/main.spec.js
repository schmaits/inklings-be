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
                    name: 'test club',
                    admin: savedData.users[1]._id
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
       
        it('should return a 400 status if an id of invalid format is passed', (done) => {
            request(app)
                .get('/api/clubs/3lj6h45i6h')
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(400);
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
                    expect(res.body.updatedCurrentlyReading).to.equal(savedData.books[2]._id.toString());
                    done();
                });
        });
    });

    describe('PUT /api/clubs/:clubId/read', () => {
        it('should be able to add a book to read', (done) => {
            request(app)
                .put(`/api/clubs/${savedData.clubs[0]._id}/read`)
                .send({ bookId: savedData.books[0]._id})
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.body.updatedReadList.length).to.equal(savedData.clubs[0].read.length + 1);
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });

    describe('DELETE /api/clubs/:clubId', () => {
        it('should delete a club, if the user requesting is the admin of the club', (done) => {
            request(app)
                .delete(`/api/clubs/${savedData.clubs[0]._id}`)
                .send({ userId: savedData.users[0]._id})
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.body.deleteConfirmation).to.eql({ n: 1, ok: 1 });
                    done();
                });
        });

        it('shouldn\'t delete a club, if the user requesting is not the admin of the club', (done) => {
            request(app)
                .delete(`/api/clubs/${savedData.clubs[0]._id}`)
                .send({ userId: savedData.users[1]._id})
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.body.deleteConfirmation).to.eql({ n: 0, ok: 1 });
                    done();
                });
        });
    });

    describe('GET /api/books', () => {
        it('should return an array of all books', (done) => {
            request(app)
                .get('/api/books')
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.body.allBooks.length).to.equal(3);
                    expect(res.status).to.equal(200);
                    done();
                });
        });
    });

    describe('GET /api/books/:bookId', () => {
        it('should return information for one book', (done) => {
            request(app)
                .get(`/api/books/${savedData.books[0]._id}`)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(200);
                    expect(res.body.book[0].name).to.equal(savedData.books[0].name);
                    done();
                });
        });

        it('should return an appropriate error if an invalid ID is passed', (done) => {
            request(app)
                .get('/api/books/5ad47287df24c36b3bec9d2f')
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(404);
                    done();
                });
        });
    });

    describe('POST /api/books', () => {
        it('should add a new book if all of the required information is provided', (done) => {
            request(app)
                .post('/api/books')
                .send({
                    title: 'Flowers for Algernon',
                    author: 'Daniel Keyes',
                    year: 1959,
                    coverImageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ea/FlowersForAlgernon.jpg',
                    genres: ['fiction', 'science fiction'],
                    country: 'United States'
                })
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(201);
                    expect(res.body.newBook).to.have.property('_id');
                    done();
                });
        });
    });

    describe('GET /api/users', () => {
        it('returns all users', (done) => {
            request(app)
                .get('/api/users')
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(200);
                    expect(res.body.allUsers.length).to.equal(2);
                    done();
                });
        });
    });

    describe('GET /api/users/:userId', () => {
        it('returns information about a specific user', (done) => {
            request(app)
                .get(`/api/users/${savedData.users[0]._id}`)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(200);
                    expect(res.body.user.name).to.equal(savedData.users[0].name);
                    done();
                });
        });
    });

    describe('PUT /api/users/:userId/currentlyReading', () => {
        it('should be able to change the currently reading book', (done) => {
            request(app)
                .put(`/api/users/${savedData.users[0]._id}/currentlyReading`)
                .send({ bookId: savedData.books[1]._id})
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(200);
                    expect(res.body.updatedCurrentlyReading.name).to.equal(savedData.books[1].name);
                    done();
                });
        });
    });
    
    describe('PUT /api/users/:userId/toRead', () => {
        it('should be able to add a book to the reading list', (done) => {
            request(app)
                .put(`/api/users/${savedData.users[0]._id}/toRead`)
                .send({ bookId: savedData.books[1]._id})
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(200);
                    expect(res.body.updatedToRead.length).to.equal(savedData.users[0].toRead.length + 1);
                    done();
                });
        });
    });

    describe('PUT /api/users/:userId/booksRead', () => {
        it('should be able to add a book to the read list', (done) => {
            request(app)
                .put(`/api/users/${savedData.users[0]._id}/booksRead`)
                .send({ bookId: savedData.books[1]._id})
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(200);
                    expect(res.body.updatedBooksRead.length).to.equal(savedData.users[0].booksRead.length + 1);
                    done();
                });
        });
    });

    describe('GET /api/comments/books/:bookId', () => {
        it('should return an array of all comments for a book', (done) => {
            request(app)
                .get(`/api/comments/books/${savedData.books[1]._id}`)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(200);
                    expect(res.body.bookComments.length).to.equal(2);
                    done();
                });
        });
    });

    describe('GET /api/comments/clubs/:clubId', () => {
        it('should return an array of all comments for a club', (done) => {
            request(app)
                .get(`/api/comments/clubs/${savedData.clubs[1]._id}`)
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(200);
                    expect(res.body.clubComments.length).to.equal(2);
                    done();
                });
        });
    });

    describe('POST /api/comments/clubs/:clubId/books/:bookId', () => {
        it('should add a new comment', (done) => {
            request(app)
                .post(`/api/comments/clubs/${savedData.clubs[0]._id}/books/${savedData.books[0]._id}`)
                .send({
                    body: 'This is a comment I\'m adding',
                    user: savedData.users[0]._id
                })
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(201);
                    expect(res.body.newComment).to.have.property('_id');
                    done();
                });
        });
    });

    describe('DELETE /api/comment/:commentId', () => {
        it('should delete a comment if it was posted by the specified user', (done) => {
            request(app)
                .delete(`/api/comments/${savedData.comments[0]._id}`)
                .send({
                    userId: savedData.comments[0].user
                })
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(200);
                    expect(res.body.deleteConfirmation).to.eql({ n: 1, ok: 1 });
                    done();
                });
        });
    });

    describe('PUT /api/comments/:commentId', () => {
        it('should allow editing of a comments body if they wrote that comment', (done) => {
            request(app)
                .put(`/api/comments/${savedData.comments[0]._id}`)
                .send({
                    updatedBody: 'This is an amended comment',
                    user: savedData.comments[0].user
                })
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(200);
                    expect(res.body.updatedComment.body).to.equal('This is an amended comment');
                    done();
                });
        });
    });

    describe('GET /api/quotes', () => {
        it('should get an array of all quotes', (done) => {
            request(app)
                .get('/api/quotes')
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(200);
                    expect(res.body.allQuotes.length).to.equal(9);
                    done();
                });
        });
    });

    describe('POST /api/quotes/books/:bookId', () => {
        it('should add a new quote', (done) => {
            request(app)
                .post(`/api/quotes/books/${savedData.books[0]._id}`)
                .send({ body: 'This is a new quote' })
                .end((err, res) => {
                    if (err) throw err;
                    expect(res.status).to.equal(201);
                    expect(res.body.newQuote.body).to.equal('This is a new quote');
                    done();
                });
        });
    });
});

