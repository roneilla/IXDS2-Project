const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});

const router = require('./router');

const sampleRouter = require('./routes/sample');
const userRouter = require('./routes/user');
const serverRouter = require('./routes/serverRoom');

app.use('/sample', sampleRouter);
app.use('/serverRoom', serverRouter);
app.use('/users', userRouter);
app.use(router);

io.on('connect', (socket) => {
	socket.on('join', ({ username, servername }, callback) => {
		const { error, user } = addUser({
			id: socket.id,
			username,
			servername,
		});

		if (error) return callback(error);

		socket.join(username.servername);

		// system mesages when user joins or leaves
		socket.emit('message', {
			user: 'admin',
			text: `${user.username}, welcome to the room ${user.servername}`,
		});

		// sends a message to everyone except one user
		socket.broadcast.to(user.servername).emit('message', {
			user: 'admin',
			text: `${user.username} has joined!`,
		});

		// io.to(user.servername).emit('roomData', {
		// 	servername: user.servername,
		// 	users: getUsersInRoom(user.servername),
		// });

		callback();
	});

	socket.on('sendMessage', (message, callback) => {
		const user = getUser(socket.id);

		io.to(user.servername).emit('message', {
			user: user.username,
			text: message,
		});

		callback();
	});

	socket.on('disconnect', () => {
		console.log('Connection lost');
	});
});

server.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
