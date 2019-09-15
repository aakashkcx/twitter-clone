const express = require('express');

const db = require('../database');

const router = express.Router();

router.get('/', (req, res) => {
    db.tweets
        .find({})
        .sort({ date: -1 })
        .exec((err, tweets) => {
            if (err) return res.status(500).json({ err });
            res.status(200).json({ tweets });
        });
});

router.get('/:id', (req, res) => {
    if (!req.params.id) return res.status(400).json({ msg: 'No tweet id.' });

    db.tweets.findOne({ _id: req.params.id }, (err, tweet) => {
        if (err) return res.status(500).json({ err });
        if (!tweet) return res.status(404).json({ msg: 'Tweet not Found.' });
        res.status(200).json({ tweet });
    });
});

router.post('/', (req, res) => {
    if (!req.auth) return res.status(401).json({ msg: 'Unauthorized.' });

    const { tweet } = req.body;
    if (!tweet) return res.status(400).json({ msg: 'Enter a tweet.' });

    db.users.findOne({ _id: req.user_id }, { username: 1 }, (err, user) => {
        if (err) return res.status(500).json({ err });
        if (!user) return res.status(404).json({ msg: 'User not found.' });

        const newTweet = {
            user_id: req.user_id,
            username: user.username,
            tweet,
            date: Date.now()
        };

        db.tweets.insert(newTweet, (err, createdTweet) => {
            if (err) return res.status(500).json({ err });
            res.status(201).json({ createdTweet });
        });
    });
});

router.get('/user/:id', (req, res) => {
    if (!req.params.id) return res.status(400).json({ msg: 'No user id.' });

    db.users.findOne({ _id: req.params.id }, (err, user) => {
        if (err) return res.status(500).json({ err });
        if (!user) return res.status(404).json({ msg: 'User not found.' });

        db.tweets
            .find({ user_id: req.params.id })
            .sort({ date: -1 })
            .exec((err, tweets) => {
                if (err) return res.status(500).json({ err });
                res.status(200).json({ tweets });
            });
    });
});

module.exports = router;
