const jwt = require('jsonwebtoken');

const db = require('./database');

const auth = (req, res, next) => {
    req.auth = false;

    const token = req.header('X-Auth-Token');
    if (!token) return next();

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) return next();
        db.users.findOne({ _id: decoded.id }, { _id: 1 }, (err, user) => {
            if (err || !user) return next();
            req.auth = true;
            req.user_id = user._id;
            next();
        });
    });
};

module.exports = auth;
