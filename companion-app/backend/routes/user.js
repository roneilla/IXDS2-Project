const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const username = req.body.username;
	const role = req.body.role;

	const newUser = new User({ username, role });

	newUser
		.save()
		.then(() => res.json('User added!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/end/:id').delete((req, res) => {
	User.findOneAndDelete({ username: req.params.id })
		.then(() => res.json('User deleted.'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
