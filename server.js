var express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		router = express.Router(),
		port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/nameless-warrior');

var User = require('./models/user');

router.get('/', function(req, res) {
	res.json({message: 'Hey, Get out of there!'});
});

router.route('/users')
	.post(function(req, res) {
		var user = new User();
		user.name = req.body.name;

		user.save(function(err) {
			if(err)
				res.send(err);

			res.json({message: 'User created!'});
		});
	})

	.get(function(req, res) {
	  User.find(function(err, users) {
      if (err)
          res.send(err);

      res.json(users);
    });
	});

router.route('/users/:user_id')
	.get(function(req, res) {

	})

	.put(function(req, res) {

	})

	.delete(function(req, res) {

	});

app.use('/api', router);

app.listen(port);
console.log('Server up on port: '+port);
