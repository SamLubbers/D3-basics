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
router.get('/linechart', (req, res) => {
  res.render('charts/linechart');
})
router.get('/piechart', (req, res) => {
  res.render('charts/piechart');
})

router.get('/donutchart', (req, res) => {
  res.render('charts/donutchart');
})

router.get('/stackedbars', (req, res) => {
	res.render('charts/stackedbars');
})
module.exports = router;
