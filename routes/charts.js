const express = require('express');
router = express.Router();

router.get('/bargraph', (req, res) => {res.render('charts/bargraph');})

module.exports = router;
