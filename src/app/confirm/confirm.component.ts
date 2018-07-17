import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetService } from '../../service/reset.service';
import { toast } from 'angular2-materialize';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  providers: [ResetService]
})
export class ConfirmComponent implements OnInit {
  private id: string;
  private token: string;

  constructor(private route: ActivatedRoute, private router: Router, private resetService: ResetService) { 
    this.route.queryParams
    .subscribe(params => {
      this.id = params.id;
      this.token = params.token;
      this.confirmUser();
    });
  }

  ngOnInit() {
  }
  
  confirmUser(){
    this.resetService.confirmUser(this.id, this.token)
      .subscribe((response) => {
        this.router.navigate(['/home']);
        toast('You may now login with your SpeakPro account', 2000);
      }, (err) => {
        this.router.navigate(['/home']);
        toast('The confirmation link has already expired or might be invalid', 5000);
      });
  }
}
