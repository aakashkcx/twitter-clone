const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../database');

const router = express.Router();

router.get('/', (req, res) => {
    if (!req.auth) return res.status(401).json({ msg: 'Unauthorized.' });

    db.users.findOne({ _id: req.user_id }, { password: 0 }, (err, user) => {
        if (err) return res.status(500).json(err);

        res.status(200).json({ user });
    });
});

router.post('/', (req, res) => {
    const { username, password } = req.body;

    if (!(username && password))
        return res.status(400).json({ msg: 'Enter a username and password.' });

    db.users.findOne({ username }, (err, user) => {
        if (err) return res.status(500).json(err);

        if (!user) return res.status(400).json({ msg: 'User does not exist.' });

        bcrypt.compare(password, user.password, (err, success) => {
            if (err) return res.status(500).json(err);

            if (!success)
                return res.status(400).json({ msg: 'Incorrect password.' });

            jwt.sign(
                { id: user._id },
                'secret',
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) return res.status(500).json(err);

                    delete user.password;
                    res.status(201).json({ token, user });
                }
            );
        });
    });
});

module.exports = router;
