const DataStore = require('nedb');

const db = {};

db.tweets = new DataStore({ filename: 'tweets.db', autoload: true });

module.exports = db;
