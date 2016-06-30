var mongoose = require('mongoose'),
		Schema = mongoose.Schema;

var UserSchema = new Schema({	
	email: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);