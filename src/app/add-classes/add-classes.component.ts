import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Sched } from './../../model/sched';
import { ClassService } from '../../service/class.service';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { User } from '../../model/user';


@Component({
  selector: 'app-add-classes',
  templateUrl: './add-classes.component.html',
  styleUrls: ['./add-classes.component.css']
})
export class AddClassesComponent implements OnInit {
  classes = null;
  enrolledClasses = null;
  form: FormGroup;
  student : User;

  constructor(
    private fb: FormBuilder,
    private classService: ClassService,
    private userService: UserService,
    private router: Router) {

    this.createForm();
  }

  ngOnInit() {
    this.getEnrollableClasses();
    this.student = JSON.parse(localStorage.getItem('loggedUser'));
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
        console.log(response)
        availableClasses = response[0];
        enrolledClasses = response[1];

        if (enrolledClasses.length > 0) this.classes = availableClasses.filter(this.compare(enrolledClasses));
        else this.classes = availableClasses;

        

        var conflictClasses = this.classes.filter(myClass => this.student.classCodes.includes(myClass.code))
        //SET DIFFERENCE OF AVAILABLE CLASSES AND CONFLICT CLASSES 
        this.classes = this.classes.filter(currClass => conflictClasses.find(sched => sched.code == currClass.code) == undefined);
        console.log(this.classes);
        this.enrolledClasses = enrolledClasses;
        this.form.setControl('availableClasses', this.buildCheckboxes());

      });

  }

  isCheckboxDisabled() {
    let arr = this.form.value.availableClasses.find((selected) => {
      return selected == true;
    })

    if (typeof arr === 'undefined') return true; //if no classes are checked
    else return false; //if there is atleast one that is checked
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
      console.log(form)
      this.bindSelected(form)
        .then((selected) => {
          this.classService.setCart(selected);
          this.router.navigate(['dashboard/checkout']);
        })


      // this.classService.addClass(selectedClasses)
      //   .subscribe(res => {
      //     this.getEnrollableClasses();
      //   });
    }
  }

  getEnrolledClass(userId: String) {
    this.userService.getEnrolledClass()
      .subscribe((response) => {
        console.log(response);
      })
  }

  viewTeacher(teacherId) {
    this.router.navigate(['dashboard', 'teachers', teacherId]);
  }

  bindSelected(form) {
    return new Promise((resolve, reject) => {
      let selectedClasses = [];
      form.availableClasses
        .forEach((selected, index) => {
          if (selected) {
            console.log(this.classes[index]);
            selectedClasses.push(this.classes[index]);
          }
        });

      resolve(selectedClasses);
    });


  }




}
