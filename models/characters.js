var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CharacterSchema = new Schema({
  _user: { type: Schema.Types.ObjectId, ref: 'User' },

  characterClass: { type: Number, default: 0 },

  strength: { type: Number, required: true },
  strengthXP: { type: Number, default: 0 },

  constitution: { type: Number, required: true },
  constitutionXP: { type: Number, default: 0 },

  dexterity: { type: Number, required: true },
  dexterityXP: { type: Number, default: 0 },

  intelligence: { type: Number, required: true },
  intelligenceXP: { type: Number, default: 0 },

  charisma: { type: Number, required: true },
  charismaXP: { type: Number, default: 0 },

  health: { type: Number, default: 0 },
  currentHealth: { type: Number, default: 0 },

  mana: { type: Number, default: 0 },
  currentMana: { type: Number, default: 0 },

  stamina: { type: Number, default: 0 },
  currentStamina: { type: Number, default: 0 },

  hunger: { type: Number, default: 0 },
  currentHunger: { type: Number, default: 0 },

  sleep: { type: Number, default: 0 },
  currentSleep: { type: Number, default: 0 },

  lastMap: { type: String },
  lastPositionX: { type: Number, default: 0 },
  lastPositionY: { type: Number, default: 0 },

  firstDialog: { type: Boolean, default: false },

  quests: {
    first: {
      counter: { type: Number, default: 0 },
      done: { type: Boolean, default: false }
    },

    second: {
      counter: { type: Number, default: 0 },
      done: { type: Boolean, default: false }
    }
  },

  gameTimeHours: { type: Number, default: 0 },
  gameTimeMinutes: { type: Number, default: 0 }
},
{
  timestamps: true
});

CharacterSchema.pre('save', function(next) {
  next();
});

CharacterSchema.methods.fillStats = function() {
  var health = 100 + (this.constitution) * 2,
      mana = 100 + (this.intelligence) * 2,
      stamina = 100 + (this.dexterity) * 2;

  this.health = health;
  this.currentHealth = health;
  this.mana = mana;
  this.currentMana = mana;
  this.stamina = stamina;
  this.currentStamina = stamina;
  this.sleep = 100,
  this.currentSleep = 100,
  this.hunger = 100;
  this.currentHunger = 100;
};

module.exports = mongoose.model('Character', CharacterSchema);
