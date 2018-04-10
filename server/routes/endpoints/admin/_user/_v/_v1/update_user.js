var mongoose = require('mongoose');
var User = require('../../../../../../models/UserSchema.js');

module.exports = function(req, res, next){
	User.findOneAndUpdate({username: req.params.username}, req.body, function (err, post) {
		if (err) res.status(500).json({
	    	code : 500,
	    	message : err
	    });
	    res.status(200).json({
	    	code : 200,
	    	message : "Successfully updated user"
	    });
	});
}