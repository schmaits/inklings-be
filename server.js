if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const db = require('./config').DB[process.env.NODE_ENV];

const app = express();
mongoose.Promise = Promise;

mongoose.connect(db)
  .then(() => console.log('successfully connected to', db))
  .catch(err => console.log('connection failed', err));

app.use(bodyParser.json());

module.exports = app;
