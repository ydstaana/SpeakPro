var mongoose = require('mongoose');
var Schedule = require('../../../../../../models/SchedSchema.js');
var User = require('../../../../../../models/UserSchema.js');

module.exports = function(req, res, next){

	User.findById(req.params.id)
	.exec(function(err, user){
		console.log(req.body);
		for(var i in req.body){
			user.schedule.push(req.body[i]);
			Schedule.findByIdAndUpdate(req.body[i], {student : req.params.id, available: false})
			.exec(function(err, sched){
				if (err) res.status(500).json({
					code : 500,
					message : err
				});
				res.status(200).json({
					code: 200,
					message : "Successfully enrolled student"
				});
			})
		}
		user.save();
	})
}