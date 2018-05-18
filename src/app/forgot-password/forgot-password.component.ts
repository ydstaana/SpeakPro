import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetService } from '../../service/reset.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [ResetService]
})
export class ForgotPasswordComponent implements OnInit {
  private form: FormGroup;
  private errorMsg: string = null;
  private confirmation: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private resetService: ResetService) { }

  ngOnInit() {
    this.form = this.createForm();
  }

  createForm() {
    return this.fb.group({
      username: ['', [Validators.required]]
    });
  }

  forgotPassword(username) {
    this.errorMsg = null;
    this.form.get('username').disable();
    this.resetService.forgotPassword(username)
      .subscribe((response) => this.confirmation = true,
        (err) => {
          this.errorMsg = err.error.message;
          this.form.get('username').enable();
        });
  }

  goToHomepage() {
    this.router.navigate(['/home']);
  }

}
