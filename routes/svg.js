var express = require('express');
var router = express.Router();

router.get('/rectangle', (req, res) => {res.render('svg/rectangle');});
router.get('/circle', (req, res) => {res.render('svg/circle');});
router.get('/ellipse', (req, res) => {res.render('svg/ellipse');});
router.get('/line', (req, res) => {res.render('svg/line');});
router.get('/polygon', (req, res) => {res.render('svg/polygon');});
router.get('/polyline', (req, res) => {res.render('svg/polyline');});
router.get('/path', (req, res) => {res.render('svg/path');});
router.get('/text', (req, res) => {res.render('svg/text');});
router.get('/definition', (req, res) => {res.render('svg/definition');});

module.exports = router;
