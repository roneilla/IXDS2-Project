const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
	User.find()
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:username').get((req, res) => {
	User.findOne({ username: req.params.username })
		.then((users) => res.json(users))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
	const username = req.body.username;
	const role = req.body.role;
	const chequing = 0;
	const savings = 0;

	const newUser = new User({ username, role, chequing, savings });

	newUser
		.save()
		.then(() => res.json('User added!'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/setCareer/:username').post((req, res) => {
	User.findOne({ username: req.params.username })
		.then((users) => {
			users.career = req.body.careerName;
			users.salary = Number(req.body.startingSalary);

			users
				.save()
				.then(() => res.json('Career updated!'))
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/setBudget/:username').post((req, res) => {
	User.findOne({ username: req.params.username })
		.then((users) => {
			users.budget.housing = req.body.housing;
			users.budget.utilities = req.body.utilities;
			users.budget.transporation = req.body.transporation;
			users.budget.grocery = req.body.grocery;
			users.budget.entertainment = req.body.entertainment;
			users.budget.restaurants = req.body.restaurants;
			users.budget.pets = req.body.pets;
			users.budget.clothing = req.body.clothing;
			users.budget.health = req.body.health;
			users.budget.household = req.body.household;
			users.budget.personal = req.body.personal;
			users.budgetTotal = req.body.total;

			users
				.save()
				.then(() => res.json('Budget updated!'))
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/setFinancialGoal/:username').post((req, res) => {
	User.findOne({ username: req.params.username })
		.then((users) => {
			users.financialGoal = req.body.financialGoal;
			users.financialCheckpoints.first = req.body.firstCheckpoint;
			users.financialCheckpoints.second = req.body.secondCheckpoint;
			users.financialCheckpoints.goal = req.body.goalCheckpoint;

			users
				.save()
				.then(() => res.json('Financial Goal updated!'))
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/bankAccount/:username').post((req, res) => {
	User.findOne({ username: req.params.username })
		.then((users) => {
			users.chequing = Number(+users.chequing + +req.body.chequingDeposit);
			users.savings = Number(+users.savings + +req.body.savingsDeposit);

			users
				.save()
				.then(() => res.json('Bank account updated!'))
				.catch((err) => res.status(400).json('Error: ' + err));
		})
		.catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/end/:username').delete((req, res) => {
	User.findOneAndDelete({ username: req.params.username })
		.then(() => res.json('User deleted.'))
		.catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;