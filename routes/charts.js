const express = require('express');
router = express.Router();

router.get('/bargraph-numerical', (req, res) => {
  res.render('charts/bargraph-numerical');
})
router.get('/bargraph-datetime', (req, res) => {
  res.render('charts/bargraph-datetime');
})
router.get('/bargraph-categorical', (req, res) => {
  res.render('charts/bargraph-categorical');
})
router.get('/scatterplot', (req, res) => {
  res.render('charts/scatterplot');
})

module.exports = router;
