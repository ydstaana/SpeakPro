var mongoose = require('mongoose');
var User = require('../../../../../../models/UserSchema.js');

module.exports = function(req, res, next){
	User.authenticate(req.body.username, req.body.password, function(err,user){
		console.log(req.body)
		if(err) return next(err);
		console.log(user);
		res.json(user);
	})
}