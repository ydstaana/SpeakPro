import { ClassService } from './../../service/class.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../model/user';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { UserService } from '../../service/user.service';
import { Sched } from '../../model/sched';

@Component({
  selector: 'app-classes-by-teacher',
  templateUrl: './classes-by-teacher.component.html',
  styleUrls: ['./classes-by-teacher.component.css'],
  providers: [ClassService, UserService]
})
export class ClassesByTeacherComponent implements OnInit {
  private teacherId;
  private teacher: User;
  private classes: Sched[];

  constructor(private route: ActivatedRoute, private router: Router, private classService: ClassService, private userService: UserService) { }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.teacherId = params['id'];
        console.log(this.teacherId);
        this.getClasses(this.teacherId);
      });
  }

  getClasses(teacherId) {
    forkJoin(this.userService.getUserById(teacherId), this.classService.getAllClassesByTeacher(teacherId))
      .subscribe((response: any) => {
        this.teacher = response[0];
        this.classes = response[1];
      })
  }






}
