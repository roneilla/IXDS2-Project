const express = require('express');
const cors = require('cors');
const pusher = require('pusher');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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
const serverRouter = require('./routes/serverRoom');

app.use('/sample', sampleRouter);
app.use('/serverRoom', serverRouter);

app.listen(port, () => {
	console.log(`Server is running on port: ${port}`);
});
