const express = require('express');

const db = require('../database');
const authorization = require('../authorization');

const router = express.Router();

router.post('/', authorization, (req, res) => {
    if (!req.body.id) return res.status(400).json({ msg: 'No tweet id.' });

    db.tweets.findOne({ _id: req.body.id }, (err, tweet) => {
        if (err) return res.status(500).json(err);
        if (!tweet) return res.status(404).json({ msg: 'Tweet not found.' });

        const newLike = {
            user: req.user,
            tweet,
            date: Math.floor(Date.now() / 1000),
        };

        db.likes.insert(newLike, (err, createdLike) => {
            if (err) return res.status(500).json({ err });
            res.status(201).json({ createdLike });
        });
    });
});

router.get('/user/:id', (req, res) => {
    if (!req.params.id) return res.status(400).json({ msg: 'No user id.' });

    db.users.findOne({ _id: req.params.id }, (err, user) => {
        if (err) return res.status(500).json({ err });
        if (!user) return res.status(404).json({ msg: 'User not found.' });

        db.likes
            .find({ 'user._id': req.params.id })
            .sort({ date: -1 })
            .exec((err, likes) => {
                if (err) return res.status(500).json({ err });
                res.status(200).json({ likes });
            });
    });
});

router.get('/tweet/:id', (req, res) => {
    if (!req.params.id) return res.status(400).json({ msg: 'No tweet id.' });

    db.tweets.findOne({ _id: req.params.id }, (err, tweet) => {
        if (err) return res.status(500).json({ err });
        if (!tweet) return res.status(404).json({ msg: 'Tweet not found.' });

        db.likes
            .find({ 'tweet._id': req.params.id })
            .sort({ date: -1 })
            .exec((err, likes) => {
                if (err) return res.status(500).json({ err });
                res.status(200).json({ likes });
            });
    });
});

module.exports = router;
