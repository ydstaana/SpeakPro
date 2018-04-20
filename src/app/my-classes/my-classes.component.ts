import { ClassService } from './../../service/class.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Sched } from '../../model/sched';
import { User } from '../../model/user';

@Component({
  selector: 'app-my-classes',
  templateUrl: './my-classes.component.html',
  styleUrls: ['./my-classes.component.css']
})
export class MyClassesComponent implements OnInit {
  shit = [1,2,3];
  form: FormGroup;
  classes: Sched[];
  teacher: User;
  timeslots = ['7:00 AM - 8:00 AM', '8:00 AM - 9:00 AM', '9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM', '12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM', '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM', '4:00 PM - 5:00 PM', '5:00 PM - 6:00 PM', '6:00 PM - 7:00 PM']

  scheds = [
    {time : "7:00 AM - 8:00 AM", code:1},
    {time : "8:00 AM - 9:00 AM", code:2},
    {time : "9:00 AM - 10:00 AM", code:3},
    {time : "10:00 AM - 11:00 AM", code:4},
    {time : "11:00 AM - 12:00 PM", code:5},
    {time : "12:00 PM - 1:00 PM", code:6},
    {time : "1:00 PM - 2:00 PM", code:7},
    {time : "2:00 PM - 3:00 PM", code:8},
    {time : "3:00 PM - 4:00 PM", code:9},
    {time : "4:00 PM - 5:00 PM", code:10},
    {time : "5:00 PM - 6:00 PM", code:11},
    {time : "6:00 PM - 7:00 PM", code:12},
  ]

  constructor(private classService: ClassService, private fb: FormBuilder) { }

  ngOnInit() {
    this.teacher = JSON.parse(localStorage.getItem('loggedUser'));
    this.getClasses(this.teacher.id);
    this.createForm();
    console.log(this.teacher);
  }

  createForm() {
    this.form = this.fb.group({
      timeSlot: ['7:00 AM - 8:00 AM'],
      date: ['01/01/2018'],
      teacher: [this.teacher.id],
      student: [null],
      code: [1],
      available: [true]
    });
  }


  getClasses(teacherId) {
    this.classService.getAllClassesByTeacher(teacherId)
      .subscribe((response: any) => {
        console.log(response);
        this.classes = response;
      })
  }

  openClass(form) {
    var selectedClass = this.scheds.find(sched => sched.code == form.code);
    if(this.teacher.classCodes.includes(selectedClass.code)){
      alert('You already have a class on this timeslot');
    }else{
      form.timeSlot = selectedClass.time;
      
      //update local teacher's class codes
      this.teacher.classCodes.push(parseInt(form.code));

      this.classService.openClass(form)
      .subscribe(response => {
        const prompt = confirm('Are you sure you want to open this class?');
        if (prompt === true) {
          alert('Successfully opened a class');
          this.classes = null;
          this.getClasses(this.teacher.id);
        }
      })
    }

    
  }

  closeClass(classId) {
    const prompt = confirm('Are you sure you want to close this class?');
    if (prompt === true) {
      this.classService.closeClass(classId)
        .subscribe(response => {
          alert('Successfully closed a class');
          this.classes = null;
          this.getClasses(this.teacher.id);
        })
    }

  }
}
