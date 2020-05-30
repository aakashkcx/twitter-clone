const DataStore = require('nedb');

const db = {};

db.users = new DataStore({ filename: 'users.db', autoload: true });
db.tweets = new DataStore({ filename: 'tweets.db', autoload: true });
db.likes = new DataStore({ filename: 'likes.db', autoload: true });

module.exports = db;
