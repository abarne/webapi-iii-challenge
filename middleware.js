function validatePostId(req, res, next) {
	if (req.params.id) {
		next();
	} else {
		res.status(400).json({ message: 'Invalid post ID' });
	}
}
function validatePostId2(req, res, next) {
	if (req.body.adfasdflkj) {
		next();
	} else {
		res.status(400).json({ message: 'Invalid post ID' });
	}
}

module.exports = {
	validatePostId,
	validatePostId2
};
