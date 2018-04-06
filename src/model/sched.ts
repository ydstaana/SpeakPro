export class Sched {
	timeSlot : String;
	teacher: String;
	available : Boolean;

	 constructor(timeSlot: String,teacher: String,available: Boolean){ 
	 	this.timeSlot = timeSlot;
	 	this.teacher = teacher;
	 	this.available = available;
	 } 
}

