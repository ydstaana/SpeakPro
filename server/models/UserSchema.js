var mongoose = require('mongoose')

var UserSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,

	username: String,
	password: String,
	email: String,
	skypeID: String,
	
	userType: String
,	schedule: [mongoose.Schema.Types.ObjectId];

});

var User = mongoose.model('User', UserSchema);

module.exports = User;