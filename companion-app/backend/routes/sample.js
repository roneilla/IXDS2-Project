const router = require('express').Router();
let Sample = require('../models/sample.model');

router.route('/').get((req, res) => {
	Sample.find()
		.then((samples) => res.json(samples))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const username = req.body.username;
	const description = req.body.description;
	const duration = Number(req.body.duration);
	const date = Date.parse(req.body.date);

	const newSample = new Sample({
		username,
		description,
		duration,
		date,
	});

	newSample
		.save()
		.then(() => res.json('Sample added!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
	Sample.findById(req.params.id)
		.then((sample) => res.json(sample))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
	Sample.findByIdAndDelete(req.params.id)
		.then(() => res.json('Sample deleted.'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
	Sample.findById(req.params.id)
		.then((sample) => {
			sample.username = req.body.username;
			sample.description = req.body.description;
			sample.duration = Number(req.body.duration);
			sample.date = Date.parse(req.body.date);

			sample
				.save()
				.then(() => res.json('sSample updated!'))
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
