const router = require('express').Router();
let ServerRoom = require('../models/serverRoom.model');

router.route('/').get((req, res) => {
	ServerRoom.find()
		.then((serverRooms) => res.json(serverRooms))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/currentRound/:servername').get((req, res) => {
	ServerRoom.findOne({ servername: req.params.servername })
		.then((serverRooms) => res.json(serverRooms))
		.catch((err) => res.status(400).json('Error: ' + err));
});
router.route('/add').post((req, res) => {
	const servername = req.body.servername;
	const population = req.body.population;
	const roundcounter = 1;

	const newServerRoom = new ServerRoom({
		servername,
		population,
		roundcounter,
	});

	newServerRoom
		.save()
		.then(() => res.json('Server Room added!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/updatePopulation/:servername').post((req, res) => {
	ServerRoom.findOne({ servername: req.params.servername })
		.then((serverRoom) => {
			if (serverRoom.population < 7) {
				serverRoom.population = serverRoom.population + 1;
			} else {
				alert('max 7 players per room');
			}
			// return an error if room has 7 users

			serverRoom
				.save()
				.then(() =>
					res.json('ServerRoom now has ' + serverRoom.population + ' users')
				)
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/updateRound/:servername').post((req, res) => {
	ServerRoom.findOne({ servername: req.params.servername })
		.then((serverRoom) => {
			serverRoom.roundcounter = Number(req.body.roundcounter);

			serverRoom
				.save()
				.then(() => res.json('Server is in round ' + serverRoom.roundcounter))
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:servername').delete((req, res) => {
	ServerRoom.findOneAndDelete({ servername: req.params.servername })
		.then(() => res.json('Server deleted.'))
		.catch((err) => res.status(400).json('Error: ' + err));
});
module.exports = router;
