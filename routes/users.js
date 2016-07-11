var express = require('express'),
		router = express.Router(),
		User = require('../models/users');


//JADE Routes
router.route('/list')
	.get(function(req, res, next) {
    User.find(function(err, users) {
      if (err)
        return next(err);
      
      res.render('users/list', {'users': users});
    });
  });


//REST Routes
router.route('/')
	.post(function(req, res, next) {
		var user = new User({
			email: req.body.email,
			password: req.body.password
		});

		User.findOne({email: req.body.email}, function(err, foundUser) {
			if(!foundUser) {
				user.save(function(err) {
					if(err)
						return next(err);

					res.json({created: true, message: 'Usuário Criado!'});	       		
				});				
			} else {				
				res.json({created: false, message: 'E-mail já cadastrado!'});	       		
			}
		});
	})

	.get(function(req, res, next) {
	  User.find(function(err, users) {
      if (err)
         return next(err);

      res.json(users);
    });
});

router.route('/:user_id')
	.get(function(req, res, next) {
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

			res.json({message: 'Usuário Deletado!'});
		});
	});

router.route('/login')
	.post(function(req, res, next) {
		var user = new User({
			email: req.body.email,
			password: req.body.password
		});

    User.findOne({email: req.body.email}, function(err, user) {			
    	if(err)
				return next(err);

			if(!user) {
				res.json({logged: false, message: 'E-mail não cadastrado!'});	       		
			} else {
				user.comparePassword(req.body.password, function(err, isMatch) {
	        if (err)
	        	return next(err);
	        
	        if(isMatch)
	        	res.json({logged: true, userId: user._id , email: user.email, message: 'Logado com sucesso!'});
	       	else
	        	res.json({logged: false, message: 'Dados Inválidos!'});	       		
		    });				
			}

		});
	});


module.exports = router;