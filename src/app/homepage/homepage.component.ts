import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../model/user';
import { MaterializeAction } from 'angular2-materialize';
import { toast } from 'angular2-materialize';


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


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
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
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
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

  submitForm(form: FormGroup, modal: EventEmitter<string | MaterializeAction>) {
    this.userService.createUser(form.value)
      .subscribe(
        data => this.closeModal(form, modal),
        err => console.log(err));
        toast('You have successfully registered. Please check your email.', 4000)
  }

  closeModal(form, modal) {
    form.reset(this.resetForm(form.value))
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
      .subscribe((response: any) => {
        if (response) {
          const { token, ...loggedUser } = response;
          this.loginModal.emit({ action: "modal", params: ['close'] });
          this.loginForm.reset();
          window.localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard/add-classes']);
          this.tokenTry();
        }
        else {
          alert('Error. Please try again.');
        }


      });
  }

  tokenTry() {
    var loggedUser = this.userService.getDecodedAccessToken(window.localStorage.getItem('token'));
    window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
  }

}
