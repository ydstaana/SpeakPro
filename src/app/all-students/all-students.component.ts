import { AuthService } from './../../service/auth.service';
import { UserService } from './../../service/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { toast } from 'angular2-materialize';


@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css'],
  providers: [UserService]
})
export class AllStudentsComponent implements OnInit {
  students: User[];
  constructor(private userService: UserService, private auth: AuthService) { }

  ngOnInit() {
    this.fetch();
  }

  suspendUser(userId) {
    this.userService.suspendUser(userId)
      .subscribe((response: any) => {
        if (response.success !== false) {
          toast('Student has been suspended', 2000);
          this.fetch();
        }
        else {
          alert('Your session has expired. Please login again to continue.')
          this.auth.logout();
        }
      });
  }

  fetch() {
    this.userService.getAllStudents()
      .subscribe((response: any) => {
        if (response.success !== false) {
          this.students = response;
        }
        else {
          alert('Your session has expired. Please login again to continue.')
          this.auth.logout();
        }
      });
  }

}
