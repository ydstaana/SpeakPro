import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { window } from 'rxjs/operator/window';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  form: FormGroup = null;
  loggedUser: User;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  }

  ngOnInit() {
    this.form = this.createForm('TEACHER');
  }

  ngAfterViewInit() {

  }

  createForm(userType: String) {
    let form: FormGroup = this.fb.group({
      firstName: [this.loggedUser.firstName, Validators.required],
      lastName: [this.loggedUser.lastName, Validators.required],
      username: [this.loggedUser.username, Validators.required],
      password: ['', Validators.required],
      email: [this.loggedUser.email, Validators.required],
      skypeID: [this.loggedUser.skypeID, Validators.required],
      userType: [this.loggedUser.userType],
      newUser: [true]
    });

    return form;
  }

  editProfile(form) {
    const updatedUser = this.isPasswordEmpty(form);


    const prompt = confirm('Are you sure you want to update your profile?');

    if (prompt === true) {
      this.userService.editProfile(updatedUser, this.loggedUser.username)
        .subscribe(response => {
          alert('Your profile has been updated');
          if (response) {
            // console.log(response);
            // localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
          }
        });
    }
  }

  isPasswordEmpty(form) {
    if (form.password.length === 0) {
      let { password, ...arr } = form;
      return arr;
    }
    return form;
  }
}
