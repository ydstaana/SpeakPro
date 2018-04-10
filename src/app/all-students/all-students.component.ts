import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css'],
  providers: [UserService]
})
export class AllStudentsComponent implements OnInit {
  students: User[];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.fetch();
  }

  suspendUser(userId) {
    this.userService.suspendUser(userId)
      .subscribe(response => {
        alert('Student has been suspended');
        this.fetch();
      })
  }

  fetch() {
    this.userService.getAllStudents()
      .subscribe((users: User[]) => {
        this.students = users;
      });
  }

}
