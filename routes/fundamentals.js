const express = require('express');
router = express.Router();

router.get('/datadisplay', (req, res) => {res.render('fundamentals/datadisplay');})

module.exports = router;
