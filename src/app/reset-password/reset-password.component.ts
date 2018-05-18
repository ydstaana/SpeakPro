import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ResetService } from '../../service/reset.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [ResetService]
})
export class ResetPasswordComponent implements OnInit {
  private form: FormGroup;
  private resetToken: string;
  private errorMsg: string = null;
  private resetConfirmation: boolean = false;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private resetService: ResetService) { }

  ngOnInit() {
    this.form = this.createForm();
    this.route.queryParams
      .subscribe(params => {
        this.resetToken = params.token;
      });
  }

  createForm() {
    return this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  resetPassword(newPassword) {
    this.resetService.resetPassword(this.resetToken, newPassword)
      .subscribe(response => this.resetConfirmation = true, err => this.errorMsg = err.error.message);
  }

  goToHomepage() {
    this.router.navigate(['/home']);
  }

}
