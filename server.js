/* eslint no-console: "off", no-unused-vars: "warn" */

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const apiRouter = require('./routes/api.routes');

const db = process.env.NODE_ENV === 'production' ? process.env.MONGODB_URI : require('./config').DB[process.env.NODE_ENV];

mongoose.Promise = Promise;

mongoose.connect(db)
	.then(() => 
		console.log('successfully connected to', db)
	)
	.catch(err => 
		console.log('connection failed', err)
	);

app.use(cors());

app.use(bodyParser.json());

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
	if (err.status === 400) return res.status(400).send({ status: err.status, msg: err.msg });
	if (err.status === 403) return res.status(403).send({ status: err.status, msg: err.msg });
	if (err.status === 404) return res.status(404).send({ status: err.status, msg: err.msg });
	next();
});

app.use((err, req, res, next) => {
	res.status(500).send({ msg: 'Something went wrong', err });
});

module.exports = app;
