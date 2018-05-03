/* eslint-disable no-console  */
if (!process.env.NODE_ENV) process.env.NODE_ENV = 'dev';

const app = require('./server');
let PORT;
process.env.NODE_ENV === 'production' ? PORT = process.env.PORT : PORT = require('./config').PORT[process.env.NODE_ENV];

app.listen(PORT, function () {
	console.log(`listening on port ${PORT}`);
});
