const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serverSchema = new Schema(
	{
		serverName: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
		},
	},
	{
		timestamps: true,
	}
);

const ServerRoom = mongoose.model('User', serverSchema);

module.exports = ServerRoom;
