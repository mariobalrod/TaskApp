const express = require('express');
const router = express.Router();

router.get('/user/signin', (req, res) => {
    res.render('user/signIn');
});

router.get('/user/signup', (req, res) => {
    res.render('user/signUp');
});

router.get('/user/profile', (req, res) => {
    res.render('user/profile');
});

module.exports = router;