var mongoose = require('mongoose');
var Schedule = require('../../../../../../models/SchedSchema.js');
var User = require('../../../../../../models/UserSchema.js');

module.exports = function(req, res, next){
	Schedule.findById(req.params.id)
	.remove()
	.exec(function(err, sched){
	    if (err) res.status(500).json({
		code : 500,
		message : err
		});
		res.status(200).json({
			code :200,
			message : "Successfully closed class"
		});
	  });
}