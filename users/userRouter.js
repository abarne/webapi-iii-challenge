const router = require('express').Router();
const userDb = require('./userDb');

router.post('/', validateUser, (req, res) => {
	userDb
		.insert(req.body)
		.then((user) => {
			res.status(201).json(req.body);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error adding user' });
		});
});

router.post('/:id/posts', (req, res) => {});

router.get('/', (req, res) => {
	userDb
		.get()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: 'Error retrieving the users' });
		});
});

router.get('/:id', validateUserId, (req, res) => {
	const id = req.params.id;
	userDb
		.getById(id)
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error retrieving the user' });
		});
});

router.get('/:id/posts', validateUserId, (req, res) => {});

router.delete('/:id', validateUserId, (req, res) => {
	const id = req.params.id;
	userDb.remove(id).then((user) => {
		res.status(200).json({ message: 'User deleted.' });
	});
});

router.put('/:id', validateUser, (req, res) => {
	const id = req.params.id;
	const userInfo = req.body;

	userDb
		.update(id, userInfo)
		.then((user) => {
			res.status(200).json({
				message: 'The user was updated',
				post: userInfo
			});
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error updating the user' });
		});
});

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
	if (!req.body.name) {
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
