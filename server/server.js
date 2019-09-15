const express = require('express');
const morgan = require('morgan');

const database = require('./database');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/tweets', require('./routes/tweets'));
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api', (req, res) => res.sendStatus(404));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
