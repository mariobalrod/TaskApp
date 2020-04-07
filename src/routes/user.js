const express = require('express');
const router = express.Router();

router.get('/user/signin', (req, res) => {
    res.send('Login');
});

router.get('/user/signup', (req, res) => {
    res.send('Formulario');
});

router.get('/user/profile', (req, res) => {
    res.send('Your profile');
});

module.exports = router;