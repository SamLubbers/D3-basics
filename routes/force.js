const express = require('express');
const router = express.Router();

router.get('/network', (req, res) => {
	res.render('force/network');
});

module.exports = router;
