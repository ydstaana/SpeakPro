import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Sched } from './../../model/sched';
import { ClassService } from '../../service/class.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { forkJoin } from 'rxjs/observable/forkJoin';


@Component({
  selector: 'app-add-classes',
  templateUrl: './add-classes.component.html',
  styleUrls: ['./add-classes.component.css'],
  providers: [ClassService]
})
export class AddClassesComponent implements OnInit {
  classes = [];
  enrolledClasses = [];
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private classService: ClassService,
    private userService: UserService) {

    this.createForm();
  }

  ngOnInit() {
    this.getEnrollableClasses();
  }

  compare(otherArray) {
    return function (current) {
      return otherArray.filter(function (other) {
        return other._id == current._id;
      }).length == 0;
    }
  }

  getEnrollableClasses() {
    let availableClasses: any, enrolledClasses: any;
    forkJoin([this.classService.getAvailableClasses(), this.userService.getEnrolledClass()])
      .subscribe(response => {
        availableClasses = response[0];
        enrolledClasses = response[1];

        if (enrolledClasses.length > 0) this.classes = availableClasses.filter(this.compare(enrolledClasses));
        else this.classes = availableClasses;

        this.enrolledClasses = enrolledClasses;
        this.form.setControl('availableClasses', this.buildCheckboxes());

      });

  }


  createForm() {
    this.form = this.fb.group({
      availableClasses: this.fb.array([
      ])
    });
  }

  get availableClasses() {
    return this.form.get('availableClasses');
  };

  buildCheckboxes() {
    const arr = this.classes.map(item => {
      return this.fb.control(false);
    });

    return this.fb.array(arr);
  }

  submit(form) {
    const msg = confirm('Are you sure you want to enroll this?');
    if (msg === true) {
      let selectedClasses = [];

      form.availableClasses
        .forEach((selected, index) => {
          if (selected) {
            selectedClasses.push(this.classes[index]._id, );
          }
        });

      this.classService.addClass(selectedClasses)
        .subscribe(res => {
          this.getEnrollableClasses();
        });
    }
  }

  getEnrolledClass(userId: String) {
    this.userService.getEnrolledClass()
      .subscribe((response) => {
        console.log(response);
      })
  }

<<<<<<< HEAD
  deleteArray(){
    this.classService.deleteClass(this.classString)
    .subscribe(
      data => {
        console.log("Success");
      },
      err => console.log(err)
    );
  }
=======


>>>>>>> 8c1884957ff5fe070f6a2d0705064b6efa37f03c

}
