const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../database');

const router = express.Router();

router.get('/', (req, res) => {
    db.users
        .find({}, { password: 0 })
        .sort({ date: -1 })
        .exec((err, users) => {
            if (err) return res.status(500).json({ err });
            res.status(200).json({ users });
        });
});

router.get('/:id', (req, res) => {
    db.users.findOne({ _id: req.params.id }, { password: 0 }, (err, user) => {
        if (err) return res.status(500).json({ err });
        if (!user) return res.status(404).json({ msg: 'User not found.' });

        db.tweets.count({ user_id: req.params.id }, (err, num) => {
            if (err) return res.status(500).json({ err });
            user.numTweets = num;
            res.status(200).json({ user });
        });
    });
});

router.post('/', (req, res) => {
    const { username, email, password } = req.body;

    if (!(username && email && password))
        return res.status(400).json({ msg: 'Complete registration form.' });

    db.users.findOne({ $or: [{ username }, { email }] }, (err, user) => {
        if (err) return res.status(500).json(err);
        if (user) return res.status(400).json({ msg: 'User already exists.' });

        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return res.status(500).json(err);

            const newUser = {
                username,
                email,
                password: hash,
                date: Date.now()
            };

            db.users.insert(newUser, (err, createdUser) => {
                if (err) return res.status(500).json(err);

                jwt.sign(
                    { id: createdUser._id },
                    'secret',
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) return res.status(500).json(err);

                        res.status(201).json({
                            token,
                            user_id: createdUser._id
                        });
                    }
                );
            });
        });
    });
});

module.exports = router;
