import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.css'],
  providers: [UserService]
})
export class AllTeachersComponent implements OnInit {
  teachers: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.fetch();
  }

  suspendUser(userId) {
    this.userService.suspendUser(userId)
      .subscribe(response => {
        alert('Teacher has been suspended');
        this.fetch();
      })
  }

  fetch() {
    this.userService.getAllTeachers()
      .subscribe((teachers: User[]) => {
        this.teachers = teachers;
      });
  }

}
