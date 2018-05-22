import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { MaterializeAction } from 'angular2-materialize';
import { toast } from 'angular2-materialize';
import { AuthService } from '../../service/auth.service';


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

  studentModal: EventEmitter<string | MaterializeAction>;
  teacherModal: EventEmitter<string | MaterializeAction>;
  loginModal: EventEmitter<string | MaterializeAction>;

  available: boolean = null;


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private auth: AuthService) {
    this.fullImagePath = 'assets/images';
    this.studentForm = this.createForm('STUDENT');
    this.teacherForm = this.createForm('TEACHER');
    this.loginForm = this.createLoginForm();
    this.studentModal = new EventEmitter<string | MaterializeAction>();
    this.teacherModal = new EventEmitter<string | MaterializeAction>();
    this.loginModal = new EventEmitter<string | MaterializeAction>();
  }

  ngOnInit() { }

  createForm(userType: String) {
    let form: FormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      skypeID: ['', Validators.required],
      userType: [userType],
      newUser: [true],
      active: [false]
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

  submitForm(form: FormGroup, modal: EventEmitter<string | MaterializeAction>) {
    this.userService.createUser(form.value)
      .subscribe(
        data => this.closeModal(form, modal),
        err => console.log(err));
    toast('You have successfully registered. Please check your email.', 4000)
  }

  closeModal(form, modal) {
    form.reset(this.resetForm(form.value))
    this.available = null;
    modal.emit({ action: "modal", params: ['close'] });
  }

  resetForm(form) {
    return {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      email: '',
      skypeID: '',
      userType: form.userType,
      newUser: true,
      active: true,
    }
  }

  login(credentials) {
    this.userService.login(credentials)
      .subscribe(
        (response: any) => {
          const token = response.token;
          localStorage.setItem('token', token);
          this.closeModal(this.loginForm, this.loginModal);
          this.router.navigate(['/dashboard/add-classes']);
        },
        (error) => {
          this.closeModal(this.loginForm, this.loginModal);
          toast(error.statusText, 2000);
        }
      );
  }

  forgotPassword() {
    this.closeModal(this.loginForm, this.loginModal);
    this.router.navigate(['forgot-password']);
  }


  checkAvailability(form) {
    this.available = null;
    const newUsername = form.get('username').value;
    if (newUsername.length > 5) {
      this.userService.checkUsernameAvailability(newUsername)
        .subscribe((res: any) => {
          if (res.available) {
            this.available = true;
            form.controls.username.setErrors(null);
          } else {
            this.available = false;
            form.controls.username.setErrors({ taken: true });
          }
        });
    }
  }
}
