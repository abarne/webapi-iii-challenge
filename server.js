const express = require;

const server = express();

//custom middleware

function logger(req, res, next) {
	console.log(`[${new Date().toISOString()} ${req.method} to ${req.url} ${req.get('Origin')}]`);

	next();
}

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
