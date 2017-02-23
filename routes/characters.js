var express 		= require('express'),
    router 			= express.Router(),
		Character 	= require('../models/characters'),
		User 				= require('../models/users'),
		middlewares = require('../middlewares/middlewares');

router.route('/')
	.post(middlewares.tokenMiddleware, function(req, res, next) {
		var character = new Character({
			_user: req.body.userId,

			characterClass: req.body.characterClass,

			strength: req.body.strength,
			constitution: req.body.constitution,
			dexterity: req.body.dexterity,
			intelligence: req.body.intelligence,
			charisma: req.body.charisma
		});

		character.save(function(err) {
			if(err)
				return next(err);

			res.json({created: true, message: 'Character Created!'});
		});
	})

  //For debugging reasons
  .get(function(req, res, next) {
    Character.find(function(err, characters) {
      if (err)
        return next(err);

      res.json(characters);
    });
  });

router.route('/byUser/:user_id')
	.get(middlewares.tokenMiddleware, function(req, res, next) {
		Character.find({_user: req.params.user_id}, function(err, characters) {
			if (err)
				return next(err);

			res.json(characters);
		});
	});

router.route('/:character_id')
	.get(middlewares.tokenMiddleware, function(req, res, next) {
		Character.findById(req.params.character_id, function(err, character) {
			if (err)
				return next(err);

			res.json(character);
		});
	});


module.exports = router;
