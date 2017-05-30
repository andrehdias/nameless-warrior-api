var express = require('express'),
  router = express.Router(),
  Character = require('../models/characters'),
  User = require('../models/users'),
  middlewares = require('../middlewares/middlewares');

router.route('/')
  .post(middlewares.tokenMiddleware, function (req, res, next) {
    var character = new Character({
      _user: req.body.userId,

      characterClass: req.body.characterClass,

      strength: req.body.strength,
      constitution: req.body.constitution,
      dexterity: req.body.dexterity,
      intelligence: req.body.intelligence,
      charisma: req.body.charisma,

      health: req.body.health,
      currentHealth: req.body.health,
    });

    character.save(function (err) {
      if (err)
        return next(err);

      res.json({ created: true, message: 'Character Created!' });
    });
  });

router.route('/byUser/:user_id')
  .get(middlewares.tokenMiddleware, function (req, res, next) {
    Character.find({ _user: req.params.user_id }).sort('-updatedAt').exec(function (err, characters) {
      if (err)
        return next(err);

      res.json(characters);
    });
  });

router.route('/:character_id')
  .get(middlewares.tokenMiddleware, function (req, res, next) {
    Character.findById(req.params.character_id, function (err, character) {
      if (err)
        return next(err);

      res.json(character);
    });
  });

router.route('/updateLocation/:character_id')
  .put(middlewares.tokenMiddleware, function (req, res) {
    Character.findById(req.params.character_id, function (err, character) {
      if (err)
        return next(err);

      character.lastMap = req.body.lastMap;
      character.lastPositionX = req.body.lastPositionX;
      character.lastPositionY = req.body.lastPositionY;

      character.save(function (err) {
        if (err)
          res.send(err);

        res.json({ message: 'Character updated!' });
      });
    });
  });

router.route('/updateStatus/:character_id')
  .put(middlewares.tokenMiddleware, function (req, res) {
    Character.findById(req.params.character_id, function (err, character) {
      if (err)
        return next(err);

      character.strength = req.body.strength;
      character.strengthXP = req.body.strengthXP;
      character.constitution = req.body.constitution;
      character.constitutionXP = req.body.constitutionXP;
      character.dexterity = req.body.dexterity;
      character.dexterityXP = req.body.dexterityXP;
      character.intelligence = req.body.intelligence;
      character.intelligenceXP = req.body.intelligenceXP;
      character.charisma = req.body.charisma;
      character.charismaXP = req.body.charismaXP;
      character.health = req.body.health;
      character.currentHealth = req.body.currentHealth;
      character.mana = req.body.mana;
      character.currentMana = req.body.currentMana;

      character.save(function (err) {
        if (err)
          res.send(err);

        res.json({ message: 'Character updated!' });
      });
    });
  });

router.route('/updateCharacter/:character_id')
  .put(middlewares.tokenMiddleware, function (req, res) {
    Character.findById(req.params.character_id, function (err, character) {
      if (err)
        return next(err);

      character.strength = req.body.strength;
      character.strengthXP = req.body.strengthXP;
      character.constitution = req.body.constitution;
      character.constitutionXP = req.body.constitutionXP;
      character.dexterity = req.body.dexterity;
      character.dexterityXP = req.body.dexterityXP;
      character.intelligence = req.body.intelligence;
      character.intelligenceXP = req.body.intelligenceXP;
      character.charisma = req.body.charisma;
      character.charismaXP = req.body.charismaXP;
      character.health = req.body.health;
      character.currentHealth = req.body.currentHealth;
      character.mana = req.body.mana;
      character.currentMana = req.body.currentMana;

      character.lastMap = req.body.lastMap;
      character.lastPositionX = req.body.lastPositionX;
      character.lastPositionY = req.body.lastPositionY;
      character.firstDialog = req.body.firstDialog;

      if(req.body.quests) {
        character.quests.first.counter = req.body.quests.first.counter;
        character.quests.first.done = req.body.quests.first.done;
        character.quests.first.started = req.body.quests.first.started;
        character.quests.second.counter = req.body.quests.second.counter;
        character.quests.second.done = req.body.quests.second.done;
        character.quests.second.started = req.body.quests.second.started;
      }

      character.gameTimeHours = req.body.gameTimeHours;
      character.gameTimeMinutes = req.body.gameTimeMinutes;

      character.firstDialog = req.body.firstDialog;

      character.save(function (err) {
        if (err)
          res.send(err);

        res.json({ message: 'Character updated!' });
      });
    });
  });

module.exports = router;
