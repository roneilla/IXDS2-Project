const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const http = require('http').createServer(app);
const io = require('socket.io')(http);

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

const sampleRouter = require('./routes/sample');
const userRouter = require('./routes/user');
const serverRouter = require('./routes/serverRoom');

app.use('/sample', sampleRouter);
app.use('/serverRoom', serverRouter);
app.use('/users', userRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});

let users = [];

io.use('connection', (socket) => {
	console.log(socket.id + 'connected');

	socket.on('disconnect', () => {
		console.log(socket.id + 'disconnected');
	});
});
