const router = require('express').Router();
let ServerRoom = require('../models/serverRoom.model');

router.route('/').get((req, res) => {
	ServerRoom.find()
		.then((serverRooms) => res.json(serverRooms))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const servername = req.body.servername;

	const newServerRoom = new ServerRoom({ servername });

	newServerRoom
		.save()
		.then(() => res.json('Server Room added!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
