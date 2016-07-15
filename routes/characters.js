var express = require('express'),
router = express.Router();

Character = require('../models/characters');

router.route('/')
	.post(function(req, res, next) {
		var character = new Character({
			_user: req.body.userId,

			nickname: req.body.nickname,
			characterClass: req.body.characterClass,

			strength: req.body.strength,
			constitution: req.body.constitution,
			dexterity: req.body.dexterity,
			intelligence: req.body.intelligence,
			charisma: req.body.charisma,						
		});
		
		character.save(function(err) {
			if(err)
				return next(err);

			res.json({created: true, message: 'Personagem Criado!'});	       		
		});
	})
	.get(function(req, res, next) {
	  Character.find(function(err, characters) {
      if (err)
         return next(err);

      res.json(characters);
    });				
	});

router.route('/:user_id')
	.get(function(req, res, next) {
		Character.find({_user: req.params.user_id}, function(err, characters) {
			if (err)
				return next(err);

			res.json(characters);
		});
	});


module.exports = router;