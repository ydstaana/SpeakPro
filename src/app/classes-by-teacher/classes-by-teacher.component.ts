import { ClassService } from './../../service/class.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { UserService } from '../../service/user.service';
import { Sched } from '../../model/sched';
import { toast } from 'angular2-materialize';


@Component({
  selector: 'app-classes-by-teacher',
  templateUrl: './classes-by-teacher.component.html',
  styleUrls: ['./classes-by-teacher.component.css'],
  providers: [ClassService, UserService]
})
export class ClassesByTeacherComponent implements OnInit {
  private teacher: User;
  private classes: Sched[];

  constructor(private route: ActivatedRoute, private router: Router, private classService: ClassService, private userService: UserService) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.getClasses(params['username']);
      });
  }

  getClasses(username) {
    forkJoin(this.userService.getUserByUsername(username),
      this.classService.getAllClassesOfTeacherByUsername(username))
      .subscribe((response: any) => {
        if (response[0].success !== false || response[1].success !== false) {
          this.teacher = response[0];
          this.classes = response[1];
        }
        else {
          toast('Something went wrong. Please try logging in again.', 2000);
        }
      })
  }






}
