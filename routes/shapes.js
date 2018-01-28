var express = require('express');
var router = express.Router();

router.get('/rectangle', (req, res) => {res.render('shapes/rectangle');});
router.get('/circle', (req, res) => {res.render('shapes/circle');});
router.get('/ellipse', (req, res) => {res.render('shapes/ellipse');});
router.get('/line', (req, res) => {res.render('shapes/line');});

module.exports = router;
