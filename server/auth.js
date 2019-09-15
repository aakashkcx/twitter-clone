const jwt = require('jsonwebtoken');

const db = require('./database');

const auth = (req, res, next) => {
    const token = req.header('X-Auth-Token');
    req.auth = false;
    jwt.verify(token, 'secret', (err, decoded) => {
        if (!err)
            db.users.findOne({ _id: decoded.id }, { _id: 1 }, (err, user) => {
                if (!err && user) {
                    req.auth = true;
                    req.user_id = user._id;
                }
                next();
            });
    });
};

module.exports = auth;
