import { AuthService } from './../../service/auth.service';
import { UserService } from './../../service/user.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { window } from 'rxjs/operator/window';
import { toast, MaterializeAction } from 'angular2-materialize';
declare var Materialize: any;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  form: FormGroup = null;
  confirmPassForm: FormGroup = null;
  loggedUser: User;
  available: boolean = null;
  confirmPassModal: EventEmitter<string | MaterializeAction> = new EventEmitter<string | MaterializeAction>();

  constructor(private fb: FormBuilder, private userService: UserService, private auth: AuthService) {
    this.form = this.createForm('TEACHER');
    this.confirmPasswordForm();
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
        alert('Your session has expired. Please login again to continue.')
        this.auth.logout();
      }
    });
  }

  ngOnInit() { }

  createForm(userType: String) {
    let form: FormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', Validators.minLength(8)],
      email: ['', [Validators.required, Validators.email]],
      skypeID: ['', Validators.required],
      userType: [''],
      newUser: [false]
    });

    return form;
  }

  confirmPasswordForm() {
    this.confirmPassForm = this.fb.group({
      password: ['', Validators.required],
    });
  }

  openModal() {
    this.confirmPassModal.emit({ action: "modal", params: ['open'] });
    this.form.disable();
  }

  closeModal() {
    this.confirmPassModal.emit({ action: "modal", params: ['close'] });
    this.confirmPassForm.reset({ password: '' });
    this.form.enable();
  }

  confirmPassword() {
    this.confirmPassForm.get('password').disable();
    this.auth.confirmPassword({ username: this.loggedUser.username, password: this.confirmPassForm.controls.password.value })
      .subscribe((res: any) => {
        this.closeModal();
        this.confirmPassForm.get('password').enable();
        this.editProfile(this.form.value);
      }, err => {
        this.closeModal();
        this.confirmPassForm.get('password').enable();
        toast(err.statusText, 2000);
      });
  }

  editProfile(form) {
    const updatedUser = this.isPasswordEmpty(form);
    console.log(updatedUser);
    this.userService.editProfile(updatedUser, this.loggedUser.username)
      .subscribe((response: any) => {
        console.log(response);
        if (response.success !== false) {
          const token = response.token;
          localStorage.setItem('token', token);
          this.loggedUser = this.auth.decodeAccessToken(token);
          toast('Your profile has been updated', 2000);
        }
        else {
          alert('Your session has expired. Please login again to continue.')
          this.auth.logout();
        }
      }, err => console.log);

  }

  isPasswordEmpty(updatedForm) {
    if (updatedForm.password.length === 0) {
      let { password, ...updatedFormNoPassword } = updatedForm;
      return updatedFormNoPassword;
    }
    return updatedForm;
  }

  checkAvailability() {
    this.available = null;
    const newUsername = this.form.get('username').value;
    if (newUsername.length > 5) {
      this.userService.checkUsernameAvailability(newUsername)
        .subscribe((res: any) => {
          if (res.available) {
            this.available = true;
            this.form.controls.username.setErrors(null);
          } else {
            this.available = newUsername === this.loggedUser.username ? true : false;
            if (newUsername !== this.loggedUser.username) this.form.controls.username.setErrors({ taken: true });
          }
        });
    }
  }


}
