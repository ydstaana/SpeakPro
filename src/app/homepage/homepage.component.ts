import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [UserService]
})
export class HomepageComponent implements OnInit {
  fullImagePath: string;
  studentForm: FormGroup;
  teacherForm: FormGroup;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {

    this.fullImagePath = 'assets/images';
    this.studentForm = this.createForm('STUDENT');
    this.teacherForm = this.createForm('TEACHER');
    this.loginForm = this.createLoginForm();
  }

  ngOnInit() {

  }

  createForm(userType: String) {
    let form: FormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      skypeID: ['', Validators.required],
      userType: [userType],
      newUser: [true],
      active: [true]
    });

    return form;
  }

  createLoginForm() {
    let form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    return form;
  }

  submitForm(user: User) {
    this.userService.createUser(user)
      .subscribe(
      data => {
        console.log(data);
      },
      err => console.log(err)
      );
  }

  login(credentials) {
    this.userService.login(credentials)
      .subscribe((response: any) => {
        if (response) {
          const { password, ...loggedUser } = response;
          window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
          this.router.navigate(['/dashboard/add-classes']);
        }
        else{
          alert('Error. Please try again.');
        }
      });
  }

}
