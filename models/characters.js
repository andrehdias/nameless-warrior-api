var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CharacterSchema = new Schema({ 
  _user: { type: Number, ref: 'User' },

  nickname: { type: String, required: true },
  class: { type: String, required: true },

  strength: { type: Number, required: true },
  constitution: { type: Number, required: true },
  dexterity: { type: Number, required: true },
  intelligence: { type: Number, required: true },
  charisma: { type: Number, required: true },

  health: { type: Number, required: true },
  mana: { type: Number, required: true },
  stamina: { type: Number, required: true },

  hunger: { type: Number, required: true },
  sleep: { type: Number, required: true }
});

module.exports = mongoose.model('Character', CharacterSchema);
