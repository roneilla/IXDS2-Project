const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.options('*', cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;

const uri =
	'mongodb+srv://roneilla:Odfx4FRWvO2Mc7Q2@ixds2-webapp.zzvbq.mongodb.net/sampleDb?retryWrites=true&w=majority';

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

if (process.env.NODE_ENV == 'production') {
	app.use(express.static('frontend/build'));
}

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
