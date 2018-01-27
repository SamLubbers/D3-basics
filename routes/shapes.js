var express = require('express');
var router = express.Router();

router.get('/rectangle', function(req, res, next){
	res.render('shapes/rectangle');
});

module.exports = router;
