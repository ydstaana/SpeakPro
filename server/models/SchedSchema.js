var mongoose = require('mongoose')

var SchedSchema = new mongoose.Schema({
	timeSlot : String,
	teacher: {
		type : mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	available : Boolean
});

var Sched = mongoose.model('Sched', SchedSchema);

module.exports =Sched;