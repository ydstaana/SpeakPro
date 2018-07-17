import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { toast } from 'angular2-materialize';


@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.css'],
  providers: [UserService]
})
export class AllTeachersComponent implements OnInit {
  teachers: User[];

  constructor(private userService: UserService, private auth: AuthService) { }

  ngOnInit() {
    this.fetch();
  }

  suspendUser(userId) {
    this.userService.suspendUser(userId)
      .subscribe((response: any) => {
        if (response.success !== false) {
          toast('Teacher has been suspended', 2000);
          this.fetch();
        }
        else {
          alert('Your session has expired. Please login again to continue.')
          this.auth.logout();
        }
      })
  }

  fetch() {
    this.userService.getAllTeachers()
      .subscribe((response: any) => {
        if (response.success !== false) {
          this.teachers = response;
        }
        else {
          alert('Your session has expired. Please login again to continue.')
          this.auth.logout();
        }
      });
  }

}
