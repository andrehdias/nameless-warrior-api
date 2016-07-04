var express = require('express'),
		router = express.Router(),
		User = require('../models/users');

router.route('/list')
	.get(function(req, res) {
    User.find(function(err, users) {
      if (err)
          res.send(err);
      
      res.render('users/list', {'users': users});
    });

  });

router.route('/')
	.post(function(req, res) {
		var user = new User();

		user.email = req.body.email;
		user.password = req.body.password;

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

router.route('/:user_id')
	.get(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err);

			res.json(user);
		});
	})

	.put(function(req, res) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				res.send(err);

			user.email = req.body.email;
			user.password = req.body.password;

			user.save(function(err) {
				if(err)
					res.send(err);

				res.json({message: 'User updated!'});
			})
		});		
	})

	.delete(function(req, res) {
		User.remove({
			_id: req.params.user_id			
		}, function(err, user) {
			if(err)
				res.send(err);

			res.json({message: 'Successfully deleted!'});
		});
	});

router.route('/login')
	.post(function(req, res) {
		var user = new User();

		user.email = req.body.email;
		user.password = req.body.password;


    User.findOne({email: req.body.email }, function(err, user) {
			if (err)
				res.send(err);

			user.comparePassword(req.body.password, function(err, isMatch) {
	        if (err)
	        	res.send(err);
	        
	        if(isMatch)
	        	res.json({message: 'Successfully logged!'});
	       	else
	        	res.json({message: 'Invalid data!'});	       		
	    });
		});
	});

module.exports = router;