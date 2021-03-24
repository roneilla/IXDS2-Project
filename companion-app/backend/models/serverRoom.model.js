const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serverSchema = new Schema(
	{
		servername: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
		},
		population: {
			type: Number,
		},
		roundcounter: {
			type: Number,
		},
	},
	{
		timestamps: true,
	}
);

const ServerRoom = mongoose.model('ServerRoom', serverSchema);

module.exports = ServerRoom;
