import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Sched } from './../../model/sched';
import { ClassService } from '../../service/class.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { toast } from 'angular2-materialize';


@Component({
  selector: 'app-drop-classes',
  templateUrl: './drop-classes.component.html',
  styleUrls: ['./drop-classes.component.css']
})
export class DropClassesComponent implements OnInit {
  enrolledClasses: any[];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private classService: ClassService,
    private userService: UserService,
    private router: Router) {

    this.createForm();
  }

  ngOnInit() {
    this.getEnrolledClasses();
  }

  compare(otherArray) {
    return function (current) {
      return otherArray.filter(function (other) {
        return other._id == current._id;
      }).length == 0;
    }
  }

  getEnrolledClasses() {
    this.enrolledClasses = null;
    this.userService.getEnrolledClass()
      .subscribe((response: any) => {
        // //If token is valid and not yet expired
        if (response.success !== false) {
          this.enrolledClasses = response;
          this.form.setControl('enrolledClasses', this.buildCheckboxes());
        }
        else {
          toast('Something went wrong. Please try logging in again.', 2000);
        }
      });
  }

  isSelectedClassesEmpty() {
    const selectedClasses = this.form.value.enrolledClasses.find((selected) => {
      return selected == true;
    });

    if (typeof selectedClasses === 'undefined') {
      return true; //if there are no classes selected
    }

    return false; //if there is at least one class selected
  }


  createForm() {
    this.form = this.fb.group({
      enrolledClasses: this.fb.array([])
    });
  }

  get enrolledClassesFormArray() {
    return this.form.get('enrolledClasses');
  };

  buildCheckboxes() {
    const arr = this.enrolledClasses.map(item => {
      return this.fb.control(false);
    });

    return this.fb.array(arr);
  }

  submit(form) {
    const msg = confirm('Are you sure you want to drop these?');
    if (msg === true) {
      let selectedClasses = [];

      form.enrolledClasses.forEach((selected, index) => {
        if (selected) {
          selectedClasses.push(this.enrolledClasses[index]._id);
        }
      });

      this.classService.dropClasses(selectedClasses)
        .subscribe((response: any) => {
          //If token is valid and not yet expired
          if (response.success !== false) {
            toast('You have successfully drop classes', 2000);
            this.getEnrolledClasses();
          }
          else {
            toast('Something went wrong. Please try logging in again.', 2000);
          }
        });
    }
  }


  viewTeacher(username) {
    this.router.navigate(['dashboard', 'teachers', username]);
  }

}
