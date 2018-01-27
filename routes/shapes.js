var express = require('express');
var router = express.Router();

router.get('/rectangle', (req, res) => {res.render('shapes/rectangle');});
router.get('/circle', (req, res) => {res.render('shapes/circle');});

module.exports = router;
