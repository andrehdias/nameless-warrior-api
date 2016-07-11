var express = require('express'),
		router = express.Router();

router.use('/users', require('./users'));

router.use('/characters', require('./characters'));

router.get('/', function(req, res) {
  res.render('index')
});

module.exports = router;