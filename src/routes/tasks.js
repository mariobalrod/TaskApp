const express = require('express');
const router = express.Router();

router.get('/task', (req, res) => {
    res.render('task')
});

router.get('/task/add', (req, res) => {
    res.render('tasks/addTask');
});


module.exports = router;