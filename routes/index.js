var express = require('express'),
		router = express.Router();

router.get('/', function(req, res) {
  res.send('<h1>GET OUT OF HERE!</h1>');
});

router.use('/users', require('./users'));

router.use('/characters', require('./characters'));

module.exports = router;
