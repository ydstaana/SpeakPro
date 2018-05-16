export class Sched {
	timeSlot : String;
	teacher: String;
	available : Boolean;
	student: String;
	code: Number;

	 constructor(timeSlot: String,teacher: String,code:Number, student: String,available: Boolean){ 
	 	this.timeSlot = timeSlot;
	 	this.teacher = teacher;
	 	this.available = available;
	 	this.student = student;
	 	this.code = code;
	 } 
}

