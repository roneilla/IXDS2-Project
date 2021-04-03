const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
		},
		role: {
			type: String,
		},
		career: {
			type: String,
		},
		salary: {
			type: Number,
		},
		bank: {
			type: Number,
		},
		budget: {
			housing: {
				type: Number,
			},
			utilities: {
				type: Number,
			},
			transportation: {
				type: Number,
			},
			grocery: {
				type: Number,
			},
			entertainment: {
				type: Number,
			},
			restaurants: {
				type: Number,
			},
			pets: {
				type: Number,
			},
			clothing: {
				type: Number,
			},
			health: {
				type: Number,
			},
			household: {
				type: Number,
			},
			personal: {
				type: Number,
			},
		},
		budgetTotal: {
			type: Number,
		},
		financialGoal: {
			type: String,
		},
		financialCheckpoints: {
			first: {
				type: Number,
			},
			second: {
				type: Number,
			},
			goal: {
				type: Number,
			},
		},
		chequing: {
			type: Number,
		},
		savings: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
