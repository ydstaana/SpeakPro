import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers:[UserService]
})
export class HomepageComponent implements OnInit {
  fullImagePath: string;
  studentForm: FormGroup;
  teacherForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {

    this.fullImagePath = 'assets/images';
    this.studentForm = this.createForm('STUDENT');
    this.teacherForm = this.createForm('TEACHER');
  }

  ngOnInit() {

  }

  createForm(userType: String){
    let form: FormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required],
      skypeID: ['', Validators.required],
      userType: [userType],
      newUser: [true]
    });

    return form;
  }

  submitForm(user: User){
    this.userService.createUser(user)
      .subscribe(
        data => {
          console.log(data);
        },
        err => console.log(err)
      );
  }

}
