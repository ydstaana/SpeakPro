var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,

	username: String,
	password: String,
	email: String,
	skypeID: String,
	
	userType: String,
	schedule: { 
		type: [mongoose.Schema.Types.ObjectId], 
		default: []
	},
	newUser: Boolean
});

var User = mongoose.model('User', UserSchema);

module.exports = User;