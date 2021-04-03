const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sampleSchema = new Schema(
	{
		username: { type: String, required: true },
		description: { type: String, required: true },
		duration: { type: Number, required: true },
		date: { type: Date, required: true },
	},
	{
		timestamps: true,
	}
);

const Sample = mongoose.model('Sample', sampleSchema);

module.exports = Sample;
