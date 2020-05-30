const express = require('express');

const db = require('../database');
const auth = require('../auth');

const router = express.Router();

router.post('/', (req, res) => {});

router.get('/user/:id', (req, res) => {});

router.get('/tweet/:id', (req, res) => {});
