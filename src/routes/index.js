const express = require('express');
const router = express.Router();

const sendMail = require('../models/email');

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.post('/contact', (req, res) => {
    const { subject, email, text } = req.body;
    console.log('Data: ', req.body);

    sendMail(email, subject, text, function(err, data) {
        if (err) {
            console.log('ERROR: ', err);
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }
        console.log('Email sent!');
        res.redirect('contact');
    });
});

router.get('/about', (req, res) => {
    res.render('about');
});

module.exports = router;