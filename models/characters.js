var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CharacterSchema = new Schema({ 
  _user: { type: Schema.Types.ObjectId, ref: 'User' },

  nickname: { type: String, required: true },
  characterClass: { type: String, required: true },

  strength: { type: Number, required: true },
  constitution: { type: Number, required: true },
  dexterity: { type: Number, required: true },
  intelligence: { type: Number, required: true },
  charisma: { type: Number, required: true },

  health: { type: Number, default: 0 },
  mana: { type: Number, default: 0 },
  stamina: { type: Number, default: 0 },

  hunger: { type: Number, default: 0 },
  sleep: { type: Number, default: 0 }
});

module.exports = mongoose.model('Character', CharacterSchema);
