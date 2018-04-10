var mongoose = require('mongoose');
var User = require('../../../../../../models/UserSchema.js');

module.exports = function(req, res, next){
	req.body.newUser = true;
	User.create(req.body, function (err, post) {
		if (err) res.status(500).json({
	    	code : 500,
	    	message : err
	    });
	    res.status(200).json({
	    	code : 200,
	    	message : "Successfully created user"
	    });
	});
}