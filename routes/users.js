var express 		= require('express'),
		router  		= express.Router(),
		User    		= require('../models/users'),
    jwt     		= require('jsonwebtoken'),
    app     		= require('../app'),
    middlewares = require('../middlewares/middlewares');

router.route('/')
	.post(function(req, res, next) {
		var user = new User({
			email: req.body.signupEmail,
			password: req.body.signupPassword
		});

		User.findOne({email: req.body.signupEmail}, function(err, foundUser) {
			if(!foundUser) {
				user.save(function(err) {
					if(err)
						return next(err);

					res.json({created: true, message: 'User created!'});
				});
			} else {
				res.json({created: false, message: 'E-mail already registered!'});
			}
		});
	})

  //For debugging reasons
	.get(function(req, res, next) {
	  User.find(function(err, users) {
      if (err)
         return next(err);

      res.json(users);
    });
});

router.route('/:user_id')
	.get(middlewares.tokenMiddleware, function(req, res, next) {
		User.findById(req.params.user_id, function(err, user) {
			if (err)
				return next(err);

			res.json(user);
		});
	})

	.delete(function(req, res, next) {
		User.remove({
			_id: req.params.user_id
		}, function(err, user) {
			if(err)
				return next(err);

			res.json({message: 'User deleted!'});
		});
	});

router.route('/login')
	.post(function(req, res, next) {
		var user = new User({
			email: req.body.loginEmail,
			password: req.body.loginPassword
		});

    User.findOne({email: req.body.loginEmail}, function(err, user) {
    	if(err)
				return next(err);

			if(!user) {
				res.json({logged: false, message: 'E-mail not found!'});
			} else {
				user.comparePassword(req.body.loginPassword, function(err, isMatch) {
	        if (err)
	        	return next(err);

	        if(isMatch) {
            var token = jwt.sign({"id": user._id, "email": user.email}, app.get('superSecret'), {
              expiresIn: 60*60*24
            });

	        	res.json({logged: true, userId: user._id , email: user.email, message: 'Logged!', token: token});
          } else {
	        	res.json({logged: false, message: 'Invalid data!'});
          }
		    });
			}

		});
	});

module.exports = router;


