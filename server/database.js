const DataStore = require('nedb');

const db = {};

db.tweets = new DataStore({ filename: 'tweets.db', autoload: true });

db.users = new DataStore({ filename: 'users.db', autoload: true });

module.exports = db;
