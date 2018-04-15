import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  user: User;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('loggedUser'));
  }


  isStudent() {
    return this.user.userType === 'STUDENT' ? true : false;
  }

  isTeacher(){
    return this.user.userType === 'TEACHER' ? true : false;
  }

  isAdmin(){
    return this.user.userType === 'ADMIN' ? true : false;
  }

}
