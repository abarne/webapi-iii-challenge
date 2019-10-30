const express = 'express';

const router = express.Router();

router.post('/', (req, res) => {});

router.post('/:id/posts', (req, res) => {});

router.get('/', (req, res) => {});

router.get('/:id', (req, res) => {});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
	//validate user ID here (ID param)
	if (req.params.id) {
		next();
	} else {
		res.status(400).json({ message: 'Invalid user ID' });
	}
}

function validateUser(req, res, next) {
	//validate body (name field) on request to create a new user
	if (!req.body) {
		res.status(400).json({ message: 'Missing user data' });
	} else if (!req.body.name) {
		res.status(400).json({ message: 'Missing required name field' });
	} else {
		next();
	}
}

function validatePost(req, res, next) {
	//validate body (text field) of request to create a new post
	if (!req.body) {
		res.status(400).json({ message: 'Missing post data' });
	} else if (!req.body.test) {
		res.status(400).json({ message: 'Missing required text field' });
	} else {
		next();
	}
}

module.exports = router;
