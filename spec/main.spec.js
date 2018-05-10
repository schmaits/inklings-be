/* eslint no-console: "off" */

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
    
	after(() => {
		mongoose.connection.close();
		console.log('Connection closed');
	});
    
	describe('GET /api/clubs', () => {
		it('should return an array of all clubs', () => {
			return request(app)
				.get('/api/clubs')
				.then(res => {
					expect(res.body.allClubs.length).to.equal(2);
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('POST /api/clubs', () => {
		it('should add a new club', () => {
			return request(app)
				.post('/api/clubs')
				.send({
					name: 'test club',
					admin: savedData.users[1]._id
				})
				.then(res => {
					expect(res.status).to.equal(201);
					expect(res.body.newClub).to.have.property('_id');
				})
				.catch(err => {
					throw err;
				});
		});

		it('shouldn\'t work if the correct data is not provided', () => {
			return request(app)
				.post('/api/clubs')
				.send({
					title: 'test-should-fail'
				})
				.then(res => {
					expect(res.status).to.equal(400);
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('GET /api/clubs/:clubId', () => {
		it('should return an object with the data from the specified club', () => {
			return request(app)
				.get(`/api/clubs/${savedData.clubs[0]._id}`)
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.body.club.name).to.equal(savedData.clubs[0].name);
				})
				.catch(err => {
					throw err;
				});
		});

		it('should return a 404 status if an invalid id is passed', () => {
			return request(app)
				.get('/api/clubs/5ad72e653e05e33c0541cf83')
				.then(res => {
					expect(res.status).to.equal(404);
				})
				.catch(err => {
					throw err;
				});
		});
       
		it('should return a 400 status if an id of invalid format is passed', () => {
			return request(app)
				.get('/api/clubs/3lj6h45i6h')
				.then (res => {
					expect(res.status).to.equal(400);
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('PUT /api/clubs/:clubId/users', () => {
		it('should be able to add a member to a club', () => {
			return request(app)
				.put(`/api/clubs/${savedData.clubs[1]._id}/users?update=add`)
				.send({ userId: savedData.users[1]._id })
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.body.updatedMemberList.length).to.equal(savedData.clubs[1].members.length + 1);
				})
				.catch(err => {
					throw err;
				});
		});

		it('should be able to remove a member of a club', () => {
			return request(app)
				.put(`/api/clubs/${savedData.clubs[1]._id}/users?update=remove`)
				.send({ userId: savedData.users[0]._id})
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.body.updatedMemberList.length).to.equal(savedData.clubs[1].members.length - 1);
				})
				.catch(err => {
					throw err;
				});
		});

		it('should return an error if an invalid club ID is passed', () => {
			return request(app)
				.put('/api/clubs/5ad72e653e05e33c0541cf83/users?update=add')
				.send({ userId: savedData.users[0]._id})
				.then(res => {
					expect(res.status).to.equal(404);
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('PUT /api/clubs/:clubId/currentlyReading', () => {
		it('should be able to update the current book', () => {
			return request(app)
				.put(`/api/clubs/${savedData.clubs[1]._id}/currentlyReading`)
				.send({ bookId: savedData.books[2]._id})
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.body.updatedCurrentlyReading).to.equal(savedData.books[2]._id.toString());
				})
				.catch(err => {
					throw err;
				});
		});
		
		it('should return an error if an invalid club ID is passed', () => {
			return request(app)
				.put('/api/clubs/5ad72e653e05e33c0541cf83/currentlyReading')
				.send({ bookId: savedData.books[2]._id})
				.then(res => {
					expect(res.status).to.equal(404);
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('PUT /api/clubs/:clubId/read', () => {
		it('should be able to add a book to read', () => {
			return request(app)
				.put(`/api/clubs/${savedData.clubs[0]._id}/read`)
				.send({ bookId: savedData.books[0]._id})
				.then(res => {
					expect(res.body.updatedReadList.length).to.equal(savedData.clubs[0].read.length + 1);
					expect(res.status).to.equal(200);
				})
				.catch(err => {
					throw err;
				});
		});

		it('should return an error if an invalid club ID is passed', () => {
			return request(app)
				.put('/api/clubs/5ad72e653e05e33c0541cf83/read')
				.send({ bookId: savedData.books[2]._id})
				.then(res => {
					expect(res.status).to.equal(404);
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('DELETE /api/clubs/:clubId', () => {
		it('should delete a club, if the user requesting is the admin of the club', () => {
			return request(app)
				.delete(`/api/clubs/${savedData.clubs[0]._id}`)
				.send({ userId: savedData.users[0]._id})
				.then(res => {
					expect(res.body.deleteConfirmation).to.eql({ n: 1, ok: 1 });
				})
				.catch(err => {
					throw err;
				});
		});

		it('shouldn\'t delete a club, if the user requesting is not the admin of the club', () => {
			return request(app)
				.delete(`/api/clubs/${savedData.clubs[0]._id}`)
				.send({ userId: savedData.users[1]._id})
				.then(res => {
					expect(res.status).to.equal(403);
				})
				.catch(err => {
					throw err;
				});
		});
		
	});

	describe('GET /api/books', () => {
		it('should return an array of all books', () => {
			return request(app)
				.get('/api/books')
				.then(res => {
					expect(res.body.allBooks.length).to.equal(3);
					expect(res.status).to.equal(200);
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('GET /api/books/:bookId', () => {
		it('should return information for one book', () => {
			return request(app)
				.get(`/api/books/${savedData.books[0]._id}`)
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.body.book[0].name).to.equal(savedData.books[0].name);
				})
				.catch(err => {
					throw err;
				});
		});

		it('should return an appropriate error if an invalid ID is passed', () => {
			return request(app)
				.get('/api/books/5ad47287df24c36b3bec9d2f')
				.then(res => {
					expect(res.status).to.equal(404);
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('POST /api/books', () => {
		it('should add a new book if all of the required information is provided', () => {
			return request(app)
				.post('/api/books')
				.send({
					title: 'Flowers for Algernon',
					author: 'Daniel Keyes',
					year: 1959,
					coverImageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ea/FlowersForAlgernon.jpg',
					genres: ['fiction', 'science fiction'],
					country: 'United States'
				})
				.then(res => {
					expect(res.status).to.equal(201);
					expect(res.body.newBook).to.have.property('_id');
				})
				.catch(err => {
					throw err;
				});
		});

		it('should return an error if the necessary information is not provided', () => {
			return request(app)
				.post('/api/books')
				.send({
					name: 'Flowers for Algernon',
					author: 'Daniel Keyes',
					year: 1959,
					coverImageUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ea/FlowersForAlgernon.jpg',
					genres: ['fiction', 'science fiction'],
					country: 'United States'
				})
				.then(res => {
					expect(res.status).to.equal(400);
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('PUT /api/books/:bookId', () => {
		it('should add a new rating to the ratings array', () => {
			return request(app)
				.put(`/api/books/${savedData.books[0]._id}`)
				.send({ addedRating: 4 })
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.body.updatedRatingArray.length).to.equal(savedData.books[0].rating.length + 1);
				})
				.catch(err => {
					throw err;
				});
		});

		it('should return an error if an incorrect ID is passed', () => {
			return request(app)
				.put('/api/books/5ad47287df24c36b3bec9d2f')
				.send({ addedRating: 4 })
				.then(res => {
					expect(res.status).to.equal(404);
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('GET /api/users', () => {
		it('returns all users', () => {
			return request(app)
				.get('/api/users')
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.body.allUsers.length).to.equal(2);
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('GET /api/users/:userId', () => {
		it('returns information about a specific user', () => {
			return request(app)
				.get(`/api/users/${savedData.users[0]._id}`)
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.body.user[0].firstName).to.equal(savedData.users[0].firstName);
				})
				.catch(err => {
					throw err;
				});
		});
		
		it('returns an error if an incorrect ID is passed', () => {
			return request(app)
				.get('/api/users/5ad47287df24c36b3bec9d2f')
				.then(res => {
					expect(res.status).to.equal(404);
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('PUT /api/users/:userId/currentlyReading', () => {
		it('should be able to add to the currently reading book', () => {
			return request(app)
				.put(`/api/users/${savedData.users[0]._id}/currentlyReading?update=add`)
				.send({ bookId: savedData.books[1]._id})
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.body.updatedCurrentlyReading.includes(savedData.books[1]._id.toString())).to.be.true;
				})
				.catch(err => {
					throw err;
				});
		});
	
		it('should be able to remove a book from the currently reading list', () => {
			return request(app)
				.put(`/api/users/${savedData.users[0]._id}/currentlyReading?update=remove`)
				.send({ bookId: savedData.books[0]._id})
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.body.updatedCurrentlyReading.includes(savedData.books[0]._id.toString())).to.be.false;
				})
				.catch(err => {
					throw err;
				});
		});
		
		it('should return a 404 error if an incorrect user ID is supplied', () => {
			return request(app)
				.put('/api/users/5ad47287df24c36b3bec9d2f/currentlyReading?update=add')
				.send({ bookId: savedData.books[1]._id})
				.then(res => {
					expect(res.status).to.equal(404);
				})
				.catch(err => {
					throw err;
				});
		});
	});
    
	describe('PUT /api/users/:userId/toRead', () => {
		it('should be able to add a book to the reading list', () => {
			return request(app)
				.put(`/api/users/${savedData.users[0]._id}/toRead?update=add`)
				.send({ bookId: savedData.books[0]._id})
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.body.updatedToRead.length).to.equal(savedData.users[0].toRead.length + 1);
				})
				.catch(err => {
					throw err;
				});
		});
       
		it('should be able to remove a book from the reading list', () => {
			return request(app)
				.put(`/api/users/${savedData.users[0]._id}/toRead?update=remove`)
				.send({ bookId: savedData.books[1]._id})
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.body.updatedToRead.length).to.equal(savedData.users[0].toRead.length - 1);
				})
				.catch(err => {
					throw err;
				});
		});
		
		it('should return a 404 error if an incorrect user ID is supplied', () => {
			return request(app)
				.put('/api/users/5ad47287df24c36b3bec9d2f/toRead?update=remove')
				.send({ bookId: savedData.books[1]._id})
				.then(res => {
					expect(res.status).to.equal(404);
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('PUT /api/users/:userId/booksRead', () => {
		it('should be able to add a book to the read list', () => {
			return request(app)
				.put(`/api/users/${savedData.users[0]._id}/booksRead`)
				.send({ bookId: savedData.books[1]._id})
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.body.updatedBooksRead.length).to.equal(savedData.users[0].booksRead.length + 1);
				})
				.catch(err => {
					throw err;
				});
		});
		
		it('should return a 404 error if an incorrect user ID is supplied', () => {
			return request(app)
				.put('/api/users/5ad47287df24c36b3bec9d2f/booksRead')
				.send({ bookId: savedData.books[1]._id})
				.then(res => {
					expect(res.status).to.equal(404);
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('GET /api/comments/books/:bookId', () => {
		it('should return an array of all comments for a book', () => {
			return request(app)
				.get(`/api/comments/books/${savedData.books[1]._id}`)
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.body.bookComments.length).to.equal(2);
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('GET /api/comments/clubs/:clubId', () => {
		it('should return an array of all comments for a club', () => {
			return request(app)
				.get(`/api/comments/clubs/${savedData.clubs[1]._id}`)
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.body.clubComments.length).to.equal(2);
				})
				.catch(err => {
					throw err;
				});
		});
		
		it('should return an error if an invalid ID is passed', () => {
			return request(app)
				.get('/api/comments/clubs/5ad47287df24c36b3bec9d2f')
				.then(res => {
					expect(res.status).to.equal(404);
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('POST /api/comments/clubs/:clubId/books/:bookId', () => {
		it('should add a new comment', () => {
			return request(app)
				.post(`/api/comments/clubs/${savedData.clubs[0]._id}/books/${savedData.books[0]._id}`)
				.send({
					body: 'This is a comment I\'m adding',
					user: savedData.users[0]._id
				})
				.then(res => {
					expect(res.status).to.equal(201);
					expect(res.body.newComment).to.have.property('_id');
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('DELETE /api/comments/:commentId/user/:userId', () => {
		it('should delete a comment if it was posted by the specified user', () => {
			return request(app)
				.delete(`/api/comments/${savedData.comments[0]._id}/users/${savedData.comments[0].user}`)
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.body.deleteConfirmation).to.eql({ n: 1, ok: 1 });
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('PUT /api/comments/:commentId', () => {
		it('should allow editing of a comments body if they wrote that comment', () => {
			return request(app)
				.put(`/api/comments/${savedData.comments[0]._id}`)
				.send({
					updatedBody: 'This is an amended comment',
					user: savedData.comments[0].user
				})
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.body.updatedComment.body).to.equal('This is an amended comment');
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('GET /api/quotes', () => {
		it('should get an array of all quotes', () => {
			return request(app)
				.get('/api/quotes')
				.then(res => {
					expect(res.status).to.equal(200);
					expect(res.body.allQuotes.length).to.equal(9);
				})
				.catch(err => {
					throw err;
				});
		});
	});

	describe('POST /api/quotes/books/:bookId', () => {
		it('should add a new quote', () => {
			return request(app)
				.post(`/api/quotes/books/${savedData.books[0]._id}`)
				.send({ body: 'This is a new quote' })
				.then(res => {
					expect(res.status).to.equal(201);
					expect(res.body.newQuote.body).to.equal('This is a new quote');
				})
				.catch(err => {
					throw err;
				});
		});
	});
});

