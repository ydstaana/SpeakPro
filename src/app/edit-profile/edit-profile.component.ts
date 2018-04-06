import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  form: FormGroup;
  loggedUser: User;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    this.form = this.createForm('TEACHER');
  }

  ngOnInit() {
  }

  createForm(userType: String) {
    let form: FormGroup = this.fb.group({
      firstName: [this.loggedUser.firstName, Validators.required],
      lastName: [this.loggedUser.lastName, Validators.required],
      username: [this.loggedUser.username, Validators.required],
      password: [this.loggedUser.password, Validators.required],
      email: [this.loggedUser.email, Validators.required],
      skypeID: [this.loggedUser.skypeID, Validators.required],
      userType: [this.loggedUser.userType],
      newUser: [true]
    });

    return form;
  }
}
