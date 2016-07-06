var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
    bcrypt = require('bcryptjs'),
    SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({	
	email: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true },
  characters: [{ type: Schema.Types.ObjectId, ref: 'Character' }]
});

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

UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
module.exports = mongoose.model('Character', CharacterSchema);