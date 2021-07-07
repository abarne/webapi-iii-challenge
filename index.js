// code away!
const express = require('express');

const server = express();

const postsRouter = require('./posts/postRouter');
const usersRouter = require('./users/userRouter');

server.use(express.json());
server.use(logger);
server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
	res.send(`<h2>Let's write some middleware!</h2>`);
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
	console.log(`\n*** Server Running on localhost:${port} ***\n`);
});

function logger(req, res, next) {
	console.log(`${new Date().toISOString()} ${req.method} to ${req.url} `);

	next();
}
