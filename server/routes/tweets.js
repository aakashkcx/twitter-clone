const express = require('express');

const db = require('../database');

const router = express.Router();

router.get('/', (req, res) => {
    db.tweets
        .find({})
        .sort({ date: -1 })
        .exec((err, tweets) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(tweets);
        });
});

router.get('/:id', (req, res) => {
    db.tweets.findOne({ _id: req.params.id }, (err, tweet) => {
        if (err) return res.status(500).json(err);
        if (!tweet) return res.sendStatus(404);
        return res.status(200).json(tweet);
    });
});

router.post('/', (req, res) => {
    if (!req.body.tweet) return res.sendStatus(400);

    const newTweet = {
        tweet: req.body.tweet,
        date: Date.now()
    };

    db.tweets.insert(newTweet, (err, createdTweet) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json(createdTweet);
    });
});

router.delete('/:id', (req, res) => {
    db.tweets.remove(
        { _id: req.params.id },
        { multi: false },
        (err, numRemoved) => {
            if (err) return res.status(500).json(err);
            if (!numRemoved) return res.sendStatus(404);
            return res.status(204).json(numRemoved);
        }
    );
});

module.exports = router;
