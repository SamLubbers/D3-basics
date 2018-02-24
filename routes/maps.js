const express = require('express');
router = express.Router();

router.get('/map', (req, res) => {
	res.render('maps/map');
});

module.exports = router;
