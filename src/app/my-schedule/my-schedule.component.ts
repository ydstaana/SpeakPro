import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Sched } from '../../model/sched';
import { toast } from 'angular2-materialize';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.css']
})
export class MyScheduleComponent implements OnInit {
  enrolledClasses: Sched[];

  constructor(
    private userService: UserService,
    private router: Router,
    private auth: AuthService) { }

  ngOnInit() {
    this.getEnrolledClasses();
  }

  /* MY SCHEDULE METHODS */
  getEnrolledClasses() {
    this.userService.getEnrolledClass()
      .subscribe((response: any) => {
        if (response.success !== false) { //If token is invalid or not yet expired
          this.enrolledClasses = response
        }
        else {
          alert('Your session has expired. Please login again to continue.')
          this.auth.logout();
        }
      });
  }

  viewTeacher(teacherId) {
    this.router.navigate(['dashboard', 'teachers', teacherId]);
  }
}
