# Inklings API
This is the RESTful API for Inklings, an online reading list and book club app.

The API serves books, clubs, comments, users and quotes, as well as allowing a user to post a comment, rate books, join or leave a club, and move books onto different lists depending on whether they have read it or not.

It is deployed at https://secure-scrubland-24650.herokuapp.com/, where full documentation for the routes can be found.

## Getting Started
### Prerequisites
* Node.js - v9.2.0
* npm - v6.0.0
* MongoDB - v3.4.9

### Installing
Clone the repo (https://github.com/schmaits/inklings-be)
```
git clone https://github.com/schmaits/inklings-be.git
```

Download the dependencies
```
npm install
```

Create a config.js file - this should be of the following form:
```
module.exports = {
  DB_URI: {
    test: LOCAL URI STRING FOR TEST DATABASE,
    dev: LOCAL URI STRING FOR DEV DATABASE
  },
  PORT: {
    test: PORT NUMBER,
    dev: PORT NUMBER
  }
};
```

Start the MongoDB process
```
mongod
```

Seed the dev data
```
npm run seed:dev
```

Start the server on the dev environment
```
npm run dev
```

### Running the tests
Start the MongoDB process
```
mongod
```

Run the test suite
```
npm test
```

Tests are available for every route, including expected errors.

#### Authors
Caitlin Stansfield (https://github.com/schmaits)