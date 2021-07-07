const router = require('express').Router();
const postsDb = require('./postDb');

router.get('/', (req, res) => {
	postsDb
		.get()
		.then((posts) => {
			res.status(200).json(posts);
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ message: 'Error retrieving the posts' });
		});
});

router.get('/:id', validatePostId, (req, res) => {
	const id = req.params.id;
	postsDb
		.getById(id)
		.then((post) => {
			res.status(200).json(post);
		})
		.catch((error) => {
			res.status(500).json({ message: 'Error retrieving the post' });
		});
});

router.delete('/:id', validatePostId, (req, res) => {
	const id = req.params.id;
	postsDb.remove(id).then((post) => {
		res.status(200).json({ message: 'Post deleted.' });
	});
});

router.put('/:id', validatePostId, (req, res) => {
	const id = req.params.id;
	const postInfo = req.body;

	postsDb
		.update(id, postInfo)
		.then((post) => {
			res.status(200).json({
				message: 'The post was updated',
				post: postInfo
			});
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error updating the post' });
		});
});

// custom middleware

function validatePostId(req, res, next) {
	if (req.params.id) {
		next();
	} else {
		res.status(400).json({ message: 'Invalid post ID' });
	}
}

module.exports = router;
