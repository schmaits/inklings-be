const config = {
    DB: {
      test: 'mongodb://localhost/book-club-api-test',
      dev: 'mongodb://localhost/book-club-api'
    },
    PORT: {
      test: 3080,
      dev: 3010
    }
  };

module.exports = config;
