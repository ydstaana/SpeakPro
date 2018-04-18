import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { Sched } from '../../model/sched';

@Component({
  selector: 'app-my-schedule',
  templateUrl: './my-schedule.component.html',
  styleUrls: ['./my-schedule.component.css']
})
export class MyScheduleComponent implements OnInit {
  enrolledClasses: Sched[];

  constructor(
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.getEnrolledClasses();
  }

  /* MY SCHEDULE METHODS */
  getEnrolledClasses() {
    this.userService.getEnrolledClass()
      .subscribe((response: Sched[]) => { this.enrolledClasses = response });
  }

  viewTeacher(teacherId) {
    this.router.navigate(['dashboard', 'teachers', teacherId]);
  }
}
