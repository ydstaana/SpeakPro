import { AuthService } from './../../service/auth.service';
import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Sched } from './../../model/sched';
import { ClassService } from '../../service/class.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { User } from '../../model/user';
import { toast } from 'angular2-materialize';


@Component({
  selector: 'app-add-classes',
  templateUrl: './add-classes.component.html',
  styleUrls: ['./add-classes.component.css']
})
export class AddClassesComponent implements OnInit {
  classes: any[];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private classService: ClassService,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {
    this.createForm();
    this.getEnrollableClasses();
  }

  /************************************
   *  Fetch data from Server
   ************************************/

  getEnrollableClasses() {
    this.classes = null;
    forkJoin([this.classService.getAvailableClasses(), this.userService.getEnrolledClass()])
      .subscribe((response: any) => {
        //If token is invalid or not yet expired0
        if (response[0].success !== false && response[1].success !== false) {
          let availableClasses = response[0];
          let enrolledClasses = response[1];
          if (enrolledClasses.length > 0) this.classes = availableClasses.filter(this.compare(enrolledClasses));
          else this.classes = availableClasses;
          this.form.setControl('availableClasses', this.buildCheckboxes(this.classes));
        }
        else {
          toast('Something went wrong. Please try logging in again.', 2000);
        }
      });
  }

  /************************************
   *  Utility Functions
   ************************************/

  //Bind selected box to its corresponding classes
  bindSelected(form) {
    return new Promise((resolve, reject) => {
      let selectedClasses = [];

      form.availableClasses.forEach((selected, index) => {
        if (selected) {
          selectedClasses.push(this.classes[index]);
        }
      });

      resolve(selectedClasses);
    });
  }

  //Builds checkboxes from an array of classes
  buildCheckboxes(classes) {
    const arr = classes.map(item => {
      return this.fb.control(false);
    });

    return this.fb.array(arr);
  }

  compare(otherArray) {
    return function (current) {
      return otherArray.filter(function (other) {
        return other._id == current._id;
      }).length == 0;
    }
  }

  //Creates checkboxes form
  createForm() {
    this.form = this.fb.group({
      availableClasses: this.fb.array([])
    });
  }

  //Check conflicts in the selected classes
  findConflicts(selectedClasses) {
    let codes = []; //Stores unique class codes
    let conflictingTimeslots = new Set(); //Set is used to avoid duplicate values

    for (let i = 0; i < selectedClasses.length; i++) {
      if (codes.includes(selectedClasses[i].code)) { //Checks if there is an existing class using the code
        conflictingTimeslots.add(`${selectedClasses[i].day}, ${selectedClasses[i].timeSlot}`) //Adds the timeslot and day of the conflicting class
        continue;
      }
      codes.push(selectedClasses[i].code);
    }

    return Array.from(conflictingTimeslots);
  }

  /************************************
   *  Functions Invoked in HTML
   ************************************/

  get availableClasses() {
    return this.form.get('availableClasses');
  };

  isCheckboxDisabled() {
    let arr = this.form.value.availableClasses.find((selected) => {
      return selected == true;
    })

    if (typeof arr === 'undefined') return true; //if no classes are checked
    else return false; //if there is atleast one that is checked
  }

  async submit(form) {
    const selectedClasses: any = await this.bindSelected(form);
    const conflictingTimeslots = this.findConflicts(selectedClasses);

    //Check conflicting classes on selected classes
    if (conflictingTimeslots.length > 0) {
      conflictingTimeslots.forEach((timeslot) => {
        toast(`You have selected conflicting classes for ${timeslot}`, 5000)
      });
    }
    else {
      //Get user credentials from server
      this.auth.getUserCreds()
        .subscribe((response: any) => {
          if (response.success !== false) { //If token is invalid or not yet expired
            const student = response; //response is student when token is valid
            const enrolledClasses = selectedClasses.filter(selectedClass => student.classCodes.includes(selectedClass.code));

            //Check if there is already an existing class on the selected timeslot/day
            if (enrolledClasses.length > 0) {
              enrolledClasses.forEach((enrolledClass) => {
                toast(`You already have a class on ${enrolledClass.day}, ${enrolledClass.timeSlot}`, 5000)
              });
            }
            else { //If there are no conflicts, add the classes to cart
              const msg = confirm('Are you sure you want to enroll this?');
              if (msg === true) {
                this.classService.setCart(selectedClasses);
                this.router.navigate(['dashboard/checkout']);
              }
            }
          }
          else {
            toast('Something went wrong. Please try logging in again.', 2000);
          }
        });
    }
  }

  //View All Classes of the Selected Teacher
  viewTeacher(username) {
    this.router.navigate(['dashboard', 'teachers', username]);
  }

}
