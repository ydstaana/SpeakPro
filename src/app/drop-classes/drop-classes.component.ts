import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Sched } from './../../model/sched';
import { ClassService } from '../../service/class.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { forkJoin } from 'rxjs/observable/forkJoin';


@Component({
  selector: 'app-drop-classes',
  templateUrl: './drop-classes.component.html',
  styleUrls: ['./drop-classes.component.css']
})
export class DropClassesComponent implements OnInit {
  enrolledClasses = null;
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
    this.userService.getEnrolledClass()
      .subscribe(response => {
        this.enrolledClasses = response;
        this.form.setControl('enrolledClasses', this.buildCheckboxes());
      });

  }

  isCheckboxDisabled() {
    let arr = this.form.value.enrolledClasses.find((selected) => {
      return selected == true;
    })

    if (typeof arr === 'undefined') return true; //if no classes are checked
    else return false; //if there is atleast one that is checked
  }


  createForm() {
    this.form = this.fb.group({
      enrolledClasses: this.fb.array([
      ])
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

      form.enrolledClasses
        .forEach((selected, index) => {
          if (selected) {
            selectedClasses.push(this.enrolledClasses[index]._id, );
          }
        });

      this.classService.dropClasses(selectedClasses)
        .subscribe(response => {
          console.log(response);
          alert('You have successfully drop these classes');
        });
    }
  }


  viewTeacher(teacherId) {
    this.router.navigate(['dashboard', 'teachers', teacherId]);
  }




}
