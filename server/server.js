const express = require('express');
const morgan = require('morgan');
const path = require('path');

const database = require('./database');
const tweets = require('./routes/tweets');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/tweets', tweets);
app.use('/api', (req, res) => res.sendStatus(404));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
