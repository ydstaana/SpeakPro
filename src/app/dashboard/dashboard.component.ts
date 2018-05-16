import { AuthService } from './../../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showSidebar: boolean = false;

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit() {
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/home']);
  }

  greetings() {
    const user = this.auth.decodeAccessToken(localStorage.getItem('token'));
    return `${user.username}`;
  }


  toggleSidebar() {
    this.showSidebar = this.showSidebar ? false : true;
  }
}
