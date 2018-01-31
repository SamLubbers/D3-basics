const express = require('express');
router = express.Router();

router.get('/bargraph', (req, res) => {res.render('charts/bargraph');})
router.get('/scatterplot', (req, res) => {res.render('charts/scatterplot');})

module.exports = router;
