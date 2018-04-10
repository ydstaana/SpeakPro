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
  form: FormGroup;
  classes: Sched[];
  teacher: User;
  timeslots = ['7:00 AM - 8:00 AM', '8:00 AM - 9:00 AM', '9:00 AM - 10:00 AM', '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM', '12:00 PM - 1:00 PM', '1:00 PM - 2:00 PM', '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM', '4:00 PM - 5:00 PM', '5:00 PM - 6:00 PM', '6:00 PM - 7:00 PM']

  constructor(private classService: ClassService, private fb: FormBuilder) { }

  ngOnInit() {
    this.teacher = JSON.parse(localStorage.getItem('loggedUser'));
    this.getClasses(this.teacher._id);
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      timeSlot: ['7:00 AM - 8:00 AM', Validators.required],
      date: ['01/01/2018'],
      teacher: [this.teacher._id],
      student: [null],
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
    console.log(form);
    this.classService.openClass(form)
      .subscribe(response => {
        const prompt = confirm('Are you sure you want to open this class?');
        if (prompt === true) {
          alert('Successfully opened a class');
          this.classes = null;
          this.getClasses(this.teacher._id);
        }
      })
  }

  closeClass(classId) {
    const prompt = confirm('Are you sure you want to close this class?');
    if (prompt === true) {
      this.classService.closeClass(classId)
        .subscribe(response => {
          alert('Successfully closed a class');
          this.classes = null;
          this.getClasses(this.teacher._id);
        })
    }

  }
}
