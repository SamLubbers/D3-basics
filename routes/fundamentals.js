const express = require('express');
const router = express.Router();

router.get('/datadisplay', (req, res) => {
	res.render('fundamentals/datadisplay');
});

module.exports = router;
