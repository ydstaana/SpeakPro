import { AuthService } from './../../service/auth.service';
import { TimeslotService } from './../../service/timeslot.service';
import { ClassService } from './../../service/class.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Sched } from '../../model/sched';
import { User } from '../../model/user';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-my-classes',
  templateUrl: './my-classes.component.html',
  styleUrls: ['./my-classes.component.css']
})
export class MyClassesComponent implements OnInit {
  classes: Sched[];
  form: FormGroup;
  private teacherId: any;
  timeslots: any[];
  days: any[];

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private classService: ClassService,
    private timeslotService: TimeslotService) {
  }

  ngOnInit() {
    //Get dropdown items
    this.timeslots = this.timeslotService.getAllTimeslots();
    this.days = this.timeslotService.getAllDays();

    //Get teacher id
    this.teacherId = this.auth.getUserId();

    //Get classes by teacher id
    this.getClasses(this.teacherId);

    //Create form
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      timeslot: ['1~7:00 AM - 8:00 AM'], //Timeslot values: 1-17
      day: ['0~Monday'], //Day values: 1-5
      teacher: [this.teacherId],
    });
  }




  getClasses(teacherId) {
    this.classes = null;
    this.classService.getAllClassesByTeacher(teacherId)
      .subscribe((response: any) => {
        if (response.success !== false) this.classes = response;
        else {
          this.classes = null;
          alert('Your session has expired. Please login again to continue.')
          this.auth.logout();
        }
      });
  }

  openClass(form) {
    const timeslot = form.timeslot.split('~')[1];
    const timeslotCode = form.timeslot.split('~')[0];
    const day = form.day.split('~')[1];
    const dayCode = form.day.split('~')[0];
    const code = parseInt(timeslotCode) + (17 * parseInt(dayCode)); //curr_timeslot + (max_timeslot + curr_day)


    const newClass = {
      timeSlot: timeslot,
      day: day,
      code: code,
      teacher: form.teacher,
      student: null,
      available: true
    };

    //Get user credentials first from the server
    this.auth.getUserCreds()
      .subscribe((response: any) => {
        if (response.success !== false) { //If token is invalid or not yet expired
          const teacher = response; //response is teacher when token is valid

          //Check if teacher already has a class on the selected timeslot
          if (teacher.classCodes.includes(code)) {
            toast('You already have a class on this timeslot.', 2000);
          }
          else {
            //If there is no conflict, the teacher can open the class
            const prompt = confirm('Are you sure you want to create this class?');
            if (prompt === true) {
              this.classService.openClass(newClass)
                .subscribe((response: any) => {

                  //If token is invalid or not yet expired
                  if (response.success !== false) {
                    toast('You have successfully created a class.', 2000);
                    this.getClasses(this.teacherId);
                  }
                  else {
                    alert('Your session has expired. Please login again to continue.')
                    this.auth.logout();
                  }
                });
            }
          }
        }
        else {
          alert('Your session has expired. Please login again to continue.')
          this.auth.logout();
        }
      });
  }

  closeClass(selectedClass) {
    const prompt = confirm('Are you sure you want to delete this class?');
    if (prompt === true) {
      this.classService.closeClass(selectedClass)
        .subscribe((response: any) => {
          if (response.success !== false) {
            toast('You have successfully deleted a class.', 2000);
            this.getClasses(this.teacherId);
          }
          else {
            alert('Your session has expired. Please login again to continue.')
            this.auth.logout();
          }
        })
    }

  }
}
