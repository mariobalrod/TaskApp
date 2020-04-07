const express = require('express');
const router = express.Router();

router.get('/task', (req, res) => {
    res.send('Home');
});

module.exports = router;