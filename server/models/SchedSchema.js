var mongoose = require('mongoose')

var SchedSchema = new mongoose.Schema({
	timeSlot : String,
	teacher: {
		type : mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	student : {
		type : mongoose.Schema.Types.ObjectId,
		ref: 'User',
		default : null
	},
	available : Boolean
});

//This function drops all students from the class being deleted before deleting itself
SchedSchema.pre('remove', function(next) {
    this.update(
        { schedule : this._id}, 
        { $pull: { schedule: this._id } },
        { multi: true })  //if reference exists in multiple documents 
    .exec();
    next();
});
	
var Sched = mongoose.model('Sched', SchedSchema);

module.exports =Sched;