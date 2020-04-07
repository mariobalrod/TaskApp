const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Home');
});

router.get('/contact', (req, res) => {
    res.send('Contact');
});

router.get('/about', (req, res) => {
    res.send('About');
});

module.exports = router;