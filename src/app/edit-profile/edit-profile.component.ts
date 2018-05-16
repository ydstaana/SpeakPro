import { AuthService } from './../../service/auth.service';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { window } from 'rxjs/operator/window';
import { toast } from 'angular2-materialize';
declare var Materialize: any;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  form: FormGroup = null;
  loggedUser: User;

  constructor(private fb: FormBuilder, private userService: UserService, private auth: AuthService) {
    this.form = this.createForm('TEACHER');
    this.auth.getUserCreds().subscribe((response: any) => {
      if (response.success !== false) {
        this.loggedUser = response;
        this.form.setValue({
          firstName: this.loggedUser.firstName,
          lastName: this.loggedUser.lastName,
          username: this.loggedUser.username,
          password: '',
          email: this.loggedUser.email,
          skypeID: this.loggedUser.skypeID,
          userType: this.loggedUser.userType,
          newUser: false
        });
        Materialize.updateTextFields();
      }
      else {
        toast('Something went wrong. Please try logging in again.', 2000);
      }
    });
  }

  ngOnInit() { }

  createForm(userType: String) {
    let form: FormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.minLength(8)],
      email: ['', [Validators.required, Validators.email]],
      skypeID: ['', Validators.required],
      userType: [''],
      newUser: [false]
    });

    return form;
  }

  editProfile(form) {
    const updatedUser = this.isPasswordEmpty(form);
    const prompt = confirm('Are you sure you want to update your profile?');

    if (prompt === true) {
      console.log(updatedUser);
      this.userService.editProfile(updatedUser, this.loggedUser.username)
        .subscribe((response: any) => {
          console.log(response);
          if (response.success !== false) {
            toast('Your profile has been updated', 2000);
          }
          else {
            toast('Something went wrong. Please try logging in again.', 2000);
          }
        }, err => console.log);
    }
  }

  isPasswordEmpty(updatedForm) {
    if (updatedForm.password.length === 0) {
      let { password, ...updatedFormNoPassword } = updatedForm;
      return updatedFormNoPassword;
    }
    return updatedForm;
  }
}
