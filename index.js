// code away!
const express = require('express');

const server = express();
server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

server.listen(8000, () => {
	console.log(`\n*** Server Running on localhost:8000 ***\n`);
});

function logger(req, res, next) {
	console.log(`[${new Date().toISOString()} ${req.method} to ${req.url} ${req.get('Origin')}]`);

	next();
}
